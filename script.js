const express = require('express');
const app= express();
const body= require('body-parser');
app.use(body.urlencoded({extended:true}));
//ejs
const ejs= require('ejs');
//loadash
const _ = require("lodash");
app.set("view engine","ejs");
const https = require('https');
// Function for extracting the values from thing speak
app.get("/",(req,res)=>{
    res.render("home");
});
app.get("/pH",(req,res)=>{
    res.render("pH") ;
});
app.post('/pHResult',(request,response)=>{
    let jsonData;
    let leng;
    let red,green,blue;
    url="https://api.thingspeak.com/channels/1426334/fields/1.json?api_key=HFU6IW5ZA7I0ZC9Q&results=2";
    const options = {
        hostname: 'api.thingspeak.com',
        port: 443,
        path: '/channels/1426334/feeds.json?api_key=HFU6IW5ZA7I0ZC9Q&results=2',
        method: 'GET'
      }
      const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
      
        res.on('data', d => {
            jsonData=JSON.parse(d);
            leng=jsonData['feeds'].length;
                leng-=1;
               let values=jsonData['feeds'][leng];
               console.log(values);
               red=Number(values['field1']);
               green=Number(values['field2']);
               blue=Number(values['field3']);
               console.log("R: "+red+" G: "+green+" B: "+blue);
               if(red>=33 && red<=47){
                   response.render('pHResult',{R: String(red),G: String(green), B:String(blue), result:"The pH is Very Acidic"});
           }
       
           if(red<=33 && red>=26 &&  blue <=35 && blue >= 27){
               response.render('pHResult',{R: String(red),G: String(green), B:String(blue), result:"The pH is moderately alkaline"});
       }
      else if( blue <=39 && blue >= 35){
           response.render('pHResult',{R: String(red),G: String(green), B:String(blue), result:"The pH is very alkaline"});
       }
     else  if( blue <=57 && blue >= 43){
        response.render('pHResult',{R: String(red),G: String(green), B:String(blue), result:"The pH is mildly acidic"});
       }
     else  if(  blue >=43 && blue<=49){
        response.render('pHResult',{R: String(red),G: String(green), B:String(blue), result:"The pH is mildly acidic"});
       }
      else if( green>= 78 && green<= 82){
        response.render('pHResult',{R: String(red),G: String(green), B:String(blue), result:"The pH is moderately acidic"});
       }  
       else {
        response.render('pHResult',{R: String(red),G: String(green), B:String(blue), result:"The pH is 6.5 to 7, Neutral"});
       }  
        })
      })
      
      req.on('error', error => {
        console.error(error)
      })
        
    req.end();

})
app.get("/N2",(req,res)=>{
    res.render("N2") ;
});
app.post('/N2Result',(request,response)=>{
    let jsonData;
    let leng;
    let red,green,blue;
    url="https://api.thingspeak.com/channels/1426334/fields/1.json?api_key=HFU6IW5ZA7I0ZC9Q&results=2";
    const options = {
        hostname: 'api.thingspeak.com',
        port: 443,
        path: '/channels/1426334/feeds.json?api_key=HFU6IW5ZA7I0ZC9Q&results=2',
        method: 'GET'
      }
      const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
      
        res.on('data', d => {
            jsonData=JSON.parse(d);
            leng=jsonData['feeds'].length;
                leng-=1;
               let values=jsonData['feeds'][leng];
               console.log(values);
               red=Number(values['field1']);
               green=Number(values['field2']);
               blue=Number(values['field3']);
               console.log("R: "+red+" G: "+green+" B: "+blue);
               if(red>=33 && red<=47){
                   response.render('N2Result',{R: String(red),G: String(green), B:String(blue), result:"The High Amounts of Nitrogen"});
           }
       
         else if(red>=37 && red<=47 &&  green >=69 && green<=61 && blue<=47 && blue>=41){
               response.render('N2Result',{R: String(red),G: String(green), B:String(blue), result:"The Moderate amounts of Nitrogen"});
       }
       else {
        response.render('N2Result',{R: String(red),G: String(green), B:String(blue), result:"There is Less or Trace amounts of Nitrogen"});
       }  
        })
      })
      
      req.on('error', error => {
        console.error(error)
      })
        
    req.end();

})
app.get('/Potassium',(re,res)=>{
    res.render("K");
})
app.post('/KResult',(request,response)=>{
  let jsonData;
  let leng;
  let red,green,blue;
  url="https://api.thingspeak.com/channels/1426334/fields/1.json?api_key=HFU6IW5ZA7I0ZC9Q&results=2";
  const options = {
      hostname: 'api.thingspeak.com',
      port: 443,
      path: '/channels/1426334/feeds.json?api_key=HFU6IW5ZA7I0ZC9Q&results=2',
      method: 'GET'
    }
    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
    
      res.on('data', d => {
          jsonData=JSON.parse(d);
          leng=jsonData['feeds'].length;
              leng-=1;
             let values=jsonData['feeds'][leng];
             console.log(values);
             red=Number(values['field1']);
             green=Number(values['field2']);
             blue=Number(values['field3']);
             console.log("R: "+red+" G: "+green+" B: "+blue);
             if(red>=47 && red<=52){
                 response.render('KResult',{R: String(red),G: String(green), B:String(blue), result:"The High amounts of Potassium"});
         }
     
       else if(red>=51&& red<=60 && green>=62 && green<=68){
             response.render('KResult',{R: String(red),G: String(green), B:String(blue), result:"The Less than high amounts of Potassium"});
     }
     else {
      response.render('KResult',{R: String(red),G: String(green), B:String(blue), result:"There is Low or Moderate amounts of Potassium"});
     }  
      })
    })
    
    req.on('error', error => {
      console.error(error)
    })
      
  req.end();

})
app.get("/Phosporous",(req,res)=>{
    res.render("P");
})

app.post('/PResult',(request,response)=>{
    let jsonData;
    let leng;
    let red,green,blue;
    url="https://api.thingspeak.com/channels/1426334/fields/1.json?api_key=HFU6IW5ZA7I0ZC9Q&results=2";
    const options = {
        hostname: 'api.thingspeak.com',
        port: 443,
        path: '/channels/1426334/feeds.json?api_key=HFU6IW5ZA7I0ZC9Q&results=2',
        method: 'GET'
      }
      const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
      
        res.on('data', d => {
            jsonData=JSON.parse(d);
            leng=jsonData['feeds'].length;
                leng-=1;
               let values=jsonData['feeds'][leng];
               console.log(values);
               red=Number(values['field1']);
               green=Number(values['field2']);
               blue=Number(values['field3']);
               console.log("R: "+red+" G: "+green+" B: "+blue);
               if(red>=56 && red<=62){
                   response.render('PResult',{R: String(red),G: String(green), B:String(blue), result:"The Low Amounts of Phosporous"});
           }
       
         else if(red>=51&& red<=53 && green>=62 && green<=64){
               response.render('PResult',{R: String(red),G: String(green), B:String(blue), result:"The Moderate amounts of Phosporous"});
       }
       else {
        response.render('PResult',{R: String(red),G: String(green), B:String(blue), result:"There is High or Moderate amounts of Phosporous"});
       }  
        })
      })
      
      req.on('error', error => {
        console.error(error)
      })
        
    req.end();

})

const port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("Server started on port 3000");
  });
