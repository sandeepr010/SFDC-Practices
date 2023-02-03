public class RecordDeleteBatchClass {
    public static void deleteRecord()
    {
        list<string> lstsObjectName = new List<string>{'SFDC_Attendee__c','SFDC_Volunteer__c'};
        string queryS = 'select id from ';
        for(string obj:lstsObjectName)
        {
            string query = queryS+obj+' limit 500';
            DeleteBatch batchable = new DeleteBatch(query,obj);
            Database.executeBatch(batchable);
        }
    }
    
    public static void createRecord(integer limits)
    {
        /*list<SFDC_Volunteer__c> newDataList1 = new list<SFDC_Volunteer__c>();
        for(integer i=0;i<limits;i++)
        {
            SFDC_Volunteer__c newData1 = new SFDC_Volunteer__c();
            newData1.Event__c = 'a055i00000DWEbeAAH';
            newData1.Category__c = 'Offline';
            newDataList1.add(newData1);
        }
        CreateBatch batchable1 = new CreateBatch(newDataList1);
        Database.executeBatch(batchable1);*/
        
        list<SFDC_Attendee__c> newDataList = new list<SFDC_Attendee__c>();
        for(integer i=0;i<limits;i++)
        {
            SFDC_Attendee__c newData = new SFDC_Attendee__c();
            newData.First_Name__c = 'Test'+string.valueOf(i);
            newData.Email__c = 'Email'+string.valueOf(i)+'@gmail.com';
            newDataList.add(newData);
        }
        CreateBatch batchable = new CreateBatch(newDataList);
        Database.executeBatch(batchable);
    }
}