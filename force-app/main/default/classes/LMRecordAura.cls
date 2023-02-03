public class LMRecordAura {
    @AuraEnabled(cacheable=true)
    public static list<LM_Sales__c> salesData(id sID)
    {
        list<LM_Sales__c> sData = [select Quantity__c,Product_Price__c,Discount__c,Bill_Number__c,Sub_Total__c,Product_Total_Amount__c,Product_Name_ID__c from LM_Sales__c where ID=:sID];
        return sData;
    }
    
    @AuraEnabled(cacheable=true)
    public static list<LM_Customer__c> lmCustDataLoad(string custID)
    {
        list<LM_Customer__c> custData = [select Bill_No__c from LM_Customer__c where id=:custID];
        return custData;
    }
    
    @AuraEnabled(cacheable=true)
    public static list<LM_Product__c> lmproductDataLoad(id pID)
    {
        list<LM_Product__c> pData = [select Product_Price__c,Product_ID__c from LM_Product__c where ID=:pID];
        return pData;
    }

}