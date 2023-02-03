public with sharing class CreateBatch implements Database.Batchable<sObject>{
    SObject[] records;
    
    public CreateBatch(SObject[] source)
    {
        records = source;
    }
    
    public List<sObject> start(Database.BatchableContext bc)
    {
        return records;
    }
    
    public void execute(Database.BatchableContext bc,SObject[] scope)
    {
        Database.insert(scope, false);
    }
    
    public void finish(Database.BatchableContext bc)
    {
        AsyncApexJob a = [Select Id, Status, NumberOfErrors, TotalJobItems from AsyncApexJob where Id =:bc.getJobId()];
    	Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
    	String[] toAddresses = new String[] {'sandeeprnair1993@gmail.com'};
    	mail.setToAddresses(toAddresses);
    	mail.setSubject('Create Records in Batch ' + a.Status);
    	mail.setPlainTextBody('Records processed ' + a.TotalJobItems +   'with '+ a.NumberOfErrors + ' failures from all the ZWTL Objects.');
    	Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
    }

}