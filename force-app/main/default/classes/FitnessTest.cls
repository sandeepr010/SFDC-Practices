@isTest
public class FitnessTest {
    @isTest
    public static void calculateBMITest()
    {
        Fittness bmi = new Fittness();
        Decimal BMIvalue = bmi.calculateBMI(62,1.65);//Body Weight in KG, Body Hight in Meter
        system.assertEquals(22.8, BMIvalue, 'The Value not \'Maching\'');
    }
    @isTest
    public static void calculatePaceTest()
    {
        Fittness pace = new Fittness();
        Decimal paceValue = pace.calculatePace(2.5,1.30);//Distance in KM, Hour in HH:MM [Decimal]
        system.assertEquals(36, paceValue, 'The Value not Maching');
    }
    
    //Negative Value
    @isTest
    public static void calculateBMITestNegative()
    {
        Fittness bmi = new Fittness();
        Decimal BMIvalue = bmi.calculateBMI(-1,-1);//Body Weight in KG, Body Hight in Meter
        system.assertEquals(0, BMIvalue, 'The Value not Maching');
    }
    @isTest
    public static void calculatePaceNegative()
    {
        Fittness pace = new Fittness();
        Decimal paceValue = pace.calculatePace(-1,1.30);//Distance in KM, Hour in HH:MM [Decimal]
        system.assertEquals(0, paceValue, 'The Value not Maching');
    }
}