public class AccountVF {
    
    /*public List<Account> getAccountData()  Here get is used to for feaching data or send data to vissual force page
    {
        
        return [select ID,Name,Phone,AccountNumber from Account];
    }*/
    
    public List<Account> AccountData {get;set;} /*giving permission to send and receive data*/
    
    public AccountVF() /* creating a constructor */
    {
        AccountData = [select ID,Name,Phone,AccountNumber from Account];
    }
    
    public void save()
    {
        update AccountData;
    }
    
    public PageReference cancel()
    {
        PageReference ref = new PageReference('https://lamkshmimachineries-dev-ed.lightning.force.com/lightning/o/Account/list?filterName=00B5i000003HkUlEAK');
        return ref;
    }

}