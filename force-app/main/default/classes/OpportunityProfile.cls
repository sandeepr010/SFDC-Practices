public class OpportunityProfile {
    
    public static void updateProfile(List<Id> idList){
        
        List<Opportunity> updateProfiles = [SELECT Id,Amount,Profile__c FROM Opportunity WHERE ID IN :idList];
        
        for(Opportunity oppRecord:updateProfiles){
            
            if(oppRecord.Amount<=10000 || oppRecord.Amount == null){
                oppRecord.Profile__c = 'Low';
            }
            else if(oppRecord.Amount>10000 && oppRecord.Amount<=50000){
                oppRecord.Profile__c = 'Medium';
            }
            else
            {
                oppRecord.Profile__c = 'High';
            }
        }
        update updateProfiles;
    }

}