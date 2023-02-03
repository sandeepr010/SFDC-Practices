public class AccountController {
    
    public static List<Account> getAllAccount(){
        List<Account> accountsData = [SELECT Name, Phone FROM Account];
        return accountsData;
    }
    
    public void printAllAccount(){
        List<Account> accountsData = getAllAccount();
        for(Account data: accountsData){
            system.debug('Name : '+data.Name+' Phone No : '+data.Phone);
        }
    }
    
    public static void insertNewListOfDatas(List<Account> accountDataList){
        insert accountDataList;
    }
    
    public static void insertNewSingleData(Account accountDataSingle){
        insert accountDataSingle;
    }
    
    public static Integer sizeOfAccout(){
        List<Account> accountsData = getAllAccount();
        return accountsData.size();
    }

}