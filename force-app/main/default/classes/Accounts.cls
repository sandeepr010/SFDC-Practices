public class Accounts {
    public void FindData(String accountNames,String contactName,String opertunityName){
        List<Account> accountData = [Select Name FROM Account WHERE Name=:accountNames];
        Integer count=accountData.size();
     
        if(count==0){
            Account accountDatas = new Account();
            accountDatas.Name=accountNames;
            insert accountDatas;
            
            ID accountID=accountDatas.Id;
            
            Contact contactsDatas = new Contact();
            contactsDatas.Accountid = accountID;
            contactsDatas.LastName = contactName;
            insert contactsDatas;
            
            Opportunity opportunityData = new Opportunity();
            opportunityData.Accountid = accountID;
            opportunityData.Name = opertunityName;
            opportunityData.CloseDate = Date.today()+30;
            opportunityData.StageName =  'Prospecting';
            insert opportunityData;
            system.debug('Data Added');
            
        }
        else{
            system.debug('Duplicate Data');
            
        }
    }
    public static list<Contact> accountData()
    {
        List<Contact> accountDetails = [select id,Name from Contact];
        return accountDetails;
    }

}