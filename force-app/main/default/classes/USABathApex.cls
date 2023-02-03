public class USABathApex implements Database.Batchable<sObject>, Database.stateful 
{
    public integer recordUpdated = 0;
    
    public Database.QueryLocator start(Database.BatchableContext bc)
    {
        return Database.getQueryLocator('SELECT ID, BillingStreet, BillingCity, BillingState, BillingPostalCode'+
                                       '(SELECT ID, MailingStreet, MailingCity, MailingState, MailingPostalCode'+
                                       'FROM Contacts) FROM Account where BillingCountry = \'USA\'');
    }
    
    public void execute(Database.BatchableContext bc, List<Account> scope)
    {
        List<contact> updatedContactData = new List<contact>();
        
        for(account data : scope)
        {
            for(contact contactData : data.contacts)
            {
                contactData.MailingStreet = data.BillingStreet;
                contactData.MailingCity = data.BillingCity;
                contactData.MailingState = data.BillingState;
                contactData.MailingPostalCode = data.BillingPostalCode;
                
                updatedContactData.add(contactData);
                recordUpdated = recordUpdated + 1;
            }
        }
        update updatedContactData;
    }
    
    public void finish(Database.BatchableContext bc)
    {
        system.debug('Total no of record updated = ' + recordUpdated);
        
        AsyncApexJob job = [SELECT Id, Status, NumberOfErrors, JobItemsProcessed, TotalJobItems, CreatedBy.Email
                            FROM AsyncApexJob WHERE Id = :bc.getJobId()];
        // call some utility to send email
        //EmailUtils.sendMessage(job, recordUpdated);
    }
}