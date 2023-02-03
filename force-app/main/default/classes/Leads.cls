public class Leads {
    
    public void FindData(String names,String phones,String leadSources){
        List<Lead> data = [Select Name,Phone,LeadSource FROM Lead WHERE Name=:names AND Phone=:phones AND LeadSource=:leadSources];
        Integer count= data.size();
        
        if(count==0){
            Lead newDatas = new Lead();
            newDatas.LastName=names;
            newDatas.Company='Nill';
            newDatas.Phone=phones;
            newDatas.LeadSource=leadSources;
            newDatas.Status='Open-Not Contacted';
            insert newDatas;
            system.debug('Data Added');
        }
        else{
            system.debug('Duplicate Data');
        }
    }
}