public with sharing class ZWTL_DataLoader {
    
    /*public static Map<Id, String> recordtypemap {get;set;}
    
    @AuraEnabled        
    public static String userData(id userID) {
        user userData = [select Id,Name from User where id=:userID];    
        return userData.Name;
    }
    
    @AuraEnabled        
    public static List<String> fetchRecordTypeValues() {
        List<Schema.RecordTypeInfo> recordtypes = ZWTL_Waste__c.SObjectType.getDescribe().getRecordTypeInfos();    
        recordtypemap = new Map<Id, String>();
        for(RecordTypeInfo rt : recordtypes) {
            if(rt.getName() != 'Master' && rt.isAvailable()) {
                recordtypemap.put(rt.getRecordTypeId(), rt.getName());
            } 
        }
        return recordtypemap.values();
    }
    
    @AuraEnabled
    public static Id getRecTypeId(String recordTypeLabel){
        Id recid = Schema.SObjectType.ZWTL_Waste__c.getRecordTypeInfosByName().get(recordTypeLabel).getRecordTypeId();        
        return recid;
    }      
     
    @AuraEnabled
    public string defaultRecordTypeId {get; set;}
    @AuraEnabled
    public Map<Id, String> contactRecordTypes {get; set;} 
    
    @AuraEnabled       
    public static ZWTL_DataLoader getRecordTypeValues(){
        ZWTL_DataLoader obj = new ZWTL_DataLoader ();
        Map<Id, String> recordtypeMap = new Map<Id, String>();
        
        List<Schema.RecordTypeInfo> recordTypeInfoList = ZWTL_Waste__c.SObjectType.getDescribe().getRecordTypeInfos();
        for(RecordTypeInfo info: recordTypeInfoList) {
            if(info.isAvailable()) {
                if(info.getName() != 'Master' && info.getName().trim() != ''){
                    recordtypeMap.put(info.getRecordTypeId(), info.getName());
                }
                if(info.isDefaultRecordTypeMapping()){
                    obj.defaultRecordTypeId = info.getRecordTypeId();
                }
            }
        }    
        obj.contactRecordTypes = recordtypeMap;
        return obj;
    }
    
    @AuraEnabled
    public static list<ZWTL_Swarm_materials__c> returnEstimate(string requirements)
    {
        list<ZWTL_Swarm_materials__c> data = [Select Estimated_Weight__c,Req_Opt_Qty__c,Req_Opt_Wt__c from ZWTL_Swarm_materials__c where id = :requirements];
        return data;
    }
    
    @AuraEnabled
    public static boolean checkforOpenPeriod(Date inputDate)
    {
        boolean flag;
        List<ZWTL_Period__c> lst = [Select id,Open_Status__c,Period_Begin_Date__c,Period_End_Date__c from ZWTL_Period__c where Period_Begin_Date__c <= :inputDate AND Period_End_Date__c >= :inputDate limit 1];
        flag = lst[0].Open_Status__c;
        return flag;
    }
    
    @AuraEnabled        
    public static id getCaseRecordTypeID() {
        id CaseRTID = Schema.SObjectType.ZWTL_Waste__c.getRecordTypeInfosByName().get('SWARM').getRecordTypeId();
        return CaseRTID;
    }
    
    @AuraEnabled        
    public static void addfile(String record, String contentId) {
        ContentDocumentLink cdl = new ContentDocumentLink();
        cdl.ContentDocumentId = contentId;
        cdl.LinkedEntityId = record;
        cdl.ShareType = 'V';
        cdl.Visibility = 'AllUsers';
        
        Insert cdl;        
    }*/
}