public class ContactUpdate {
    public static void deptUpdate(List<contact> ContactList){
        for(contact cc:ContactList){
            if(cc.Department==null)
            {
                cc.Department = 'IT';
            }
            cc.Description = 'Trigger fired';
            cc.LeadSource = 'unknown';
        }
    }

}