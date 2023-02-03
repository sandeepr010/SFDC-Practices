public class Fittness {
    public Decimal bodeyBMI;
    public Decimal bodeyPace;
    
    public Decimal calculateBMI(Decimal bodeyWeight,Decimal bodeyHeight){
        if(bodeyWeight>1 && bodeyHeight>1){
        bodeyBMI=bodeyWeight/(bodeyHeight*bodeyHeight);
        bodeyBMI = bodeyBMI.setscale(1);
        return bodeyBMI;
        }
        else{
            return 0;
        }
    }
    
    public Decimal calculatePace(Decimal distance,Decimal hour){
        if(distance>1 && hour>1)
        {
        String hourString = String.valueOf(hour);
        String[] mini = hourString.split('\\.');
        integer totalMini = (integer.valueOf(mini.get(0)))*60+integer.valueOf(mini.get(1));
        Decimal bodeyPaceInSec=(totalMini*60)/distance;
        bodeyPace = bodeyPaceInSec/60;
        return bodeyPace;
        }
        else{
            return 0;
        }
    }
}