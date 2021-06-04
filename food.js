class Food{
    constructor(){
        this.foodStock = 0;
        this.image = loadImage("Images/milk.png");
    }

    getfoodstock(){
        return this.foodStock;
    }
    
    getFedTime(lastFed){
        this.lastFed=lastFed;
    }

    updatefoodstock(foodStock){
        this.foodStock = foodStock;   
    }


    display(){
        var x= 80; 
        var y=100;
        
        imageMode(CENTER);
        image(this.image,720,220,50,50);
        if(this.foodStock!=0){
            //console.log(this.foodStock)
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x = 80;
                    y = y+50;
                }
                image(this.image,x,y,50,50);
                x = x+30;
            } 
        }
    }

}