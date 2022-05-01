const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const listID = ""; // Get from mailchimp
  const url = "https://us9.api.mailchimp.com/3.0/lists/" + listID;

  const apiKey = ""; // Get from mailchimp
  const options = {
    method: "POST",
    auth: "tariq:" + apiKey
  };

  const request = https.request(url, options, function(response){

    if(response.statusCode !== 200) {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      const jsonData = JSON.parse(data);
      if(jsonData.error_count === 0) {
        res.sendFile(__dirname + "/success.html");
      }
      else{
        res.sendFile(__dirname + "/failure.html");
      }
    })
  })

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
})
