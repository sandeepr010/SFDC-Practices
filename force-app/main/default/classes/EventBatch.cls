global class EventBatch implements Database.Batchable<sObject>,Schedulable  
{
    global Database.QueryLocator start(Database.BatchableContext bc)
    {
        return Database.getQueryLocator([Select id,Country__c,City__c from SFDC_Event__c]);
    }
    
    global void execute(Database.BatchableContext bc, list<SFDC_Event__c> eventData)
    {
        for(SFDC_Event__c eD : eventData)
        {
            eD.Country__c = 'India';
            eD.City__c = 'Mumbai';
        }
        update eventData;
    }
    
    global void finish(Database.BatchableContext bc)
    {
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        String[] toAddress = new String[]{'karthiksachin123@gmail.com','sandeeprnair1993@gmail.com'};
        mail.setToAddresses(toAddress);
        mail.setSubject('Event Batch Complete');
        mail.setPlainTextBody('The batch for updating country and state completed');
        Messaging.sendEmail(new Messaging.SingleEmailMessage[]{mail});
    }
    
    global void execute(SchedulableContext sc)
    {
        EventBatch eV = new EventBatch();
        Database.executeBatch(eV);
    }
}