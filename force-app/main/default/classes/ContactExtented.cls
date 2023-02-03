public class ContactExtented {
    
    public List<contact> contactData{get;set;}
    public ContactExtented(ApexPages.StandardController record)
    {
     contactData = [select FirstName,LastName from contact where Accountid=: record.getId()];   
    }

}