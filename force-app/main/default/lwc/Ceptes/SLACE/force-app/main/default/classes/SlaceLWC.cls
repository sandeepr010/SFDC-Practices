public with sharing class SlaceLWC {
    @AuraEnabled(cacheable=true)
    Public static string slaceActionPermission(){
        list<string> userName = new list<string>();
        set<string> profileName = new set<string>();
        set<string> groupName = new set<string>();
        set<string> roleName = new set<string>();
        
        for(user u:[SELECT Id,Name,Profile.Name,UserRole.Name FROM User where usertype!='Automatedprocess' WITH SECURITY_ENFORCED])
        {
            userName.add(u.Name);
            profileName.add(u.Profile.Name);
            roleName.add(u.UserRole.Name);
        }
        for(GroupMember g:[Select Id, UserOrGroupId,GroupId,Group.Name,Group.type From GroupMember  WITH SECURITY_ENFORCED])
        {
            groupName.add(g.Group.Name);
        }
        UserPermissionDataWrapper allData = new UserPermissionDataWrapper();
        allData.userNameList = userName;
        allData.profileNameList = new list<string>(profileName);
        allData.groupNameList = new list<string>(groupName);
        allData.roleNameList = new list<string>(roleName);
        
        return JSON.serialize(allData);
    }
    
    public class UserPermissionDataWrapper
    {
        public list<string> userNameList;
        public list<string> profileNameList;
        public list<string> groupNameList;
        public list<string> roleNameList;
    }
}