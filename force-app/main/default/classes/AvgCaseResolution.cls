public class AvgCaseResolution {
    public static void updateAvgCaseResolutionDays(List<ID> accountIds){
        
        Map<ID, integer> accountTotalCaseMap = new Map<ID, integer>();
        Map<ID, integer> accountTotalCaseDaysMap = new Map<ID, integer>();
        
        for(case caseObj : [Select ID,CreatedDate,ClosedDate,AccountID from case where ISClosed=True and AccountID IN :accountIds]){
            
            if(! accountTotalCaseMap.containsKey(caseObj.accountID)){
                
                accountTotalCaseMap.put(caseobj.accountID,0);
                accountTotalCaseDaysMap.put(caseobj.accountID,0);
                
            }
            Integer totalCase = accountTotalCaseMap.get(caseObj.accountID);
            totalCase++;
            accountTotalCaseMap.put(caseObj.accountID,totalCase);
            
            Integer totalDays = accountTotalCaseDaysMap.get(caseObj.accountID);
            totalDays += caseObj.CreatedDate.date().daysBetween(caseObj.ClosedDate.date());
            accountTotalCaseDaysMap.put(caseObj.accountID,totalDays);
        }
        
        List<account> accountToUpdate = new List<account>();
        for(id accountId : accountTotalCaseMap.KeySet()){
            Decimal resolutionValue = accountTotalCaseDaysMap.get(accountID) / accountTotalCaseMap.get(accountID);
            accountToUpdate.add(new Account(ID = accountID, Avg_Case_Resolution_Days__c = resolutionValue));
        }
        update accountToUpdate; 
    }

}