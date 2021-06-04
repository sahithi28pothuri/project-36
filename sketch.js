var dog,sadDog,happyDog;
var button1;
var button2;
var foodObj;
var database;
var foodStock;
var foodS;
var fedTime,lastFed;
var feed;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  database = firebase.database();

  foodStock = database.ref('food');
  foodStock.on("value",readfoods); 

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodObj = new Food();

  button1 = createButton('feedDog');
  button1.position(400,30);
  button1.mousePressed(feedDog)

  button2 = createButton('AddFood');
  button2.position(470,30);
  button2.mousePressed(addfoods);

}


function draw() {
  background(46,139,87);

  foodObj.display();


  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 250,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",250,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 250,30);
   }


  drawSprites();
}

function readfoods(data){
  food = data.val();
  console.log(food);
  foodObj.foodStock = food;

}


function feedDog(){
  dog.addImage(happyDog);


  foodObj.foodStock--;

  database.ref('/').update({
    food:foodObj.foodStock,
    FeedTime:hour()
  })

  //foodObj.updatefoodStock(foodStock);


}

function addfoods(){

  foodObj.foodStock++;
  
  database.ref('/').update({
    food:foodObj.foodStock,
  })

}
