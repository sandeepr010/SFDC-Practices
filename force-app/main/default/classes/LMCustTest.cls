@isTest
public class LMCustTest {
    @isTest
    public static void mapTest()
    {
        LM_Product__c insertData = new LM_Product__c();
        insertData.Product_ID__c = 'Test Product ID';
        insertData.Name = 'Test Name';
        insertData.Category__c = 'Chaff Cutter';
        insertData.Product_Price__c = 100;
        insertData.Launched_Date__c = date.today();
        insert insertData;
        
        id newId = insertData.id;
        LM_Product__c updateData = [select Name from LM_Product__c where id = :newId];
        updateData.Name = 'Updated Name';
        update updateData;
    }
}