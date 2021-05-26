const Express = require('express');
const https = require('https');
const app = Express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(Express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const phno = req.body.phno;
    /*console.log(fname,lname,email);
    res.write("<p>Your FirstName : "+fname+"</p>");
    res.write("<p>Your LastName : "+lname+"</p>");
    res.write("<p>Your Email : "+email+"</p>");
    res.write("<h1>Has Been Recorded....Thanks for Signing Up. </h1>");
    res.send();*/
    const data={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname,
                    PHONE: phno
                }
            }
        ]
    }

    const jsonData= JSON.stringify(data);
    const url = "https://us6.api.mailchimp.com/3.0/lists/ccb40f9ea5d";

    const options={
        method:"post",
        auth:"mohit:fb23fad98a07a481a864b2c0f1003ee6-us6"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        /*response.on("data",function(data){
            console.log(JSON.parse(data));
        })*/
    });

    request.write(jsonData);
    request.end();
});

app.post('/failure', function(req,res){
    res.redirect("/");
});
app.listen(5000,function(){
    console.log("Server up and running at 5000.");
});

//ApiKey : fb23fad98a07a481a864b2c0f1003ee6-us6
//ListId : cb40f9ea5d