public class Maps {
    
    public static map<string,string> maplist(Map<string,list<string>> datam)
    {
        map<string,string> updatedMap = new map<string,string>();
        set<string> keys = datam.keyset();
        for(string valu:keys)
        {
            string newv;
          
            list<String> newList = datam.get(valu);
            for(string dat:newList)
            {
                if(newv == null){
                    newv=dat;
                    }
                else{
                    newv+=dat;
                }
            }
            updatedMap.put(valu,newv);
        }
        return updatedMap;
    }
}