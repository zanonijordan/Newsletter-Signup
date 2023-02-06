const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const request = require('request')
const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}))
// ---------------------------------------


mailchimp.setConfig({
  apiKey: '',
  server: '',
});

async function callPing() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

callPing();

// ---------------------------------------

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/signup.html')
})

app.post('/', function(req, res) {
  const firstName = req.body.fName
  const lastName = req.body.lName
  const email = req.body.email

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
  }
  const run = async () => {
    try{
        const response = await mailchimp.lists.batchListMembers("791d81b943", data)
        console.log(response)
        res.sendFile(__dirname + "/success.html");
    } catch (e){
        console.log(e.status);
        res.sendFile(__dirname + "/failure.html");
    }
  };
  run();

});

app.post('/failure', function(req, res){
  res.redirect('/')
})

// -------------------------app listen
app.listen(process.env.PORT || 3000, function() {
  console.log('server ok')
})


