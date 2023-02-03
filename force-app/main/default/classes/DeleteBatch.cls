public with sharing class DeleteBatch implements Database.Batchable<sObject>{
    private final string query;
    public final string obj;
    
    public DeleteBatch(string query,string obj)
    {
        this.query = query;
        this.obj = obj;
    }
    
    public Database.QueryLocator start(Database.BatchableContext bc)
    {
        return Database.getQueryLocator(query);
    }
    
    public void execute(Database.BatchableContext bc, List<sObject> scope)
    {
        delete scope;
    }
    
    public void finish(Database.BatchableContext bc)
    {
        string objects = 'select id from '+ obj+' limit 1';
        List<sObject> sobjList = Database.query(objects);
        if(!sobjList.isEmpty())
        {
            DeleteBatch batchable = new DeleteBatch(query,obj);
            Database.executeBatch(batchable);
        }
        else
        {
            try{
            AsyncApexJob a = [Select Id, Status, NumberOfErrors, TotalJobItems from AsyncApexJob where Id =:bc.getJobId()];
    		Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
    		String[] toAddresses = new String[] {'nairsandeepramachandran@gmail.com'};
    		mail.setToAddresses(toAddresses);
    		mail.setSubject(obj+'Records Deleted' );
    		mail.setPlainTextBody(obj+'Records Delition Completed.');
    		Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        }
        catch(DmlException e){
            System.debug('The following exception has occurred: ' + e.getMessage());
        }
        }
    }
}