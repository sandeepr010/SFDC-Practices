public with sharing class accountDataGrid {
    @AuraEnabled(cacheable=true)
    public static list<account> accountData()
    {
        /*list<accWrapper> accountDatasWrapper=new list<accWrapper>();
        integer counts = 1;
        for(account ac:[SELECT Id,Name from account])
        {
            if(counts == 1)
            {
                accWrapper newAc = new accWrapper();
                newAc.Name = ac.Name;
                newAc.Id = ac.Id;
                accountDatasWrapper.add(newAc);
                //system.debug(newAc);
            }
        }
        system.debug(accountDatasWrapper);
        return accountDatasWrapper;
    }
    
    public class accWrapper
    {
        public string Name;
        public string Id;
        public string classe;
        public string colour;
    }*/
    list<account> accList = [SELECT Id,Name from account];
    return accList;
    }

}