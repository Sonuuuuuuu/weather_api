const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post('/' , function(req , res){

   
   const query=req.body.cityName;

const apikey="31c5113b8e6494a090024e7016cf2827#";
const unit="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;


https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const wea_data=  JSON.parse(data);
      const temp=wea_data.main.temp;
      const description=wea_data.weather[0].description;
      const icon=wea_data.weather[0].icon;
      const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
     res.write("<p>"+description+"</p>"); 
      res.write("<h1>the temp is "+temp+"celcius</h1>");
      res.send();



})
})
})



app.listen(3000,function(){
    console.log("server is running on port 3000")
})

/*
const query="London";
const apikey="31c5113b8e6494a090024e7016cf2827#";
const unit="metric"
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;

https.get(url,function(response){
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const wea_data=  JSON.parse(data);
      const temp=wea_data.weather[0].descrition;
      const icon=wea_data.weather[0].icon;
      const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
     res.write("<img src="+imageURL+">"); 
      res.write("<h1>the temp is "+temp+"celcius</h1>");
      res.send();



})
})
*/