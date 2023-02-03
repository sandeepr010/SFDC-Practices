public with sharing class AccountDataFeatch {
    @AuraEnabled(cacheable=true)
 
    public static List<Account> accountData()
    {
        List<Account> accData = [select id,Name from account];
        return accData;
    }
}