public class APILearning {
    private static final string Spoonacular_API = 'https://api.spoonacular.com/recipes/findByIngredients';
    private static final string API_KEY = 'afdd7d48525f47bf8e936491ac2f63e2';
    
    public static void SpoonacularAPI(string ingredients)
    {
        //public XmlStreamReader getXmlStreamReader();
        Http http = new HTTP();
        HttpRequest request = new HttpRequest();
        request.setEndPoint(Spoonacular_API+'?apiKey='+API_KEY+'&ingredients='+ingredients);
        request.setMethod('GET');
        
        HttpResponse response = http.send(request);
        
        if(response.getStatusCode()==200)
        {
            string data = response.getBody();
            system.debug('Data Available : '+data);
            list<object> results = (list<object>) JSON.deserializeUntyped(response.getBody());
            map<string,object> outMap = new map<string,object>();
            for(object result:results)
            {
                map<string,object> dish = (map<string,object>) result;
                system.debug('Dish Name : '+dish.get('title'));
                string dishName = string.valueOf(dish.get('title'));
                outMap.put(dishName,result);
            }
            system.debug(outMap);
        }
    }
    
    public static void animalAPI()
    {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
		request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
		request.setMethod('GET');
		HttpResponse response = http.send(request);
        system.debug(response.getBody());
		// If the request is successful, parse the JSON response.
		if(response.getStatusCode() == 200) {
            // Deserialize the JSON string into collections of primitive data types.
    		Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
    		// Cast the values in the 'animals' key as a list
    		List<Object> animals = (List<Object>) results.get('animals');
    		System.debug('Received the following animals:');
    		for(Object animal: animals) {
                System.debug(animal);
            }
        }
    }
}