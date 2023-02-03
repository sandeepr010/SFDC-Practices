@isTest
public class helloworldTest {
    @isTest
    public static void printgreeting() {
        helloworld greeting = new helloworld();
        string greetings = greeting.printgreeting();
        system.assertEquals('Hellow World', greetings, 'The Value not Maching');
    }

}