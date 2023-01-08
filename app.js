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

// const client = require('@mailchimp/mailchimp_marketing');
//
// client.setConfig({
//     apiKey: "your key",
//     server: "YOUR_SERVER_PREFIX you will find it in the end of your key",
//   });
//
//   const run = async () => {
//     const response = await client.lists.addListMember("LIST ID", {
//       email_address: Email,
//       status: "subscribed",
//       merge_fields: { FNAME: FirstName, LNAME: LastName}
//     });
//     console.log(response);
//   };
//
//   run();

// const url = 'https://us9.api.mailchimp.com/3.0/lists/791d81b943'
// const options = {
//         method: "POST",
//         headers: {
//             authorization: 'jordan: 81faa76982ab61120eab6abd8749a8b7-us9'
//         }
//       }
// const jsonData = JSON.stringify(data)
// const request = https.request(url, options, function(response) {
//   response.on('data', function(data) {
//     console.log(JSON.parse(data))
//   })
// })
// request.write(jsonData)
// request.end()

// Api key
// 81faa76982ab61120eab6abd8749a8b7-us9

// list id
// 791d81b943



// {
//   new_members: [
//     {
//       id: '0bb2856c9b52ff282c1ba90c94f9f061',
//       email_address: 'marcia@gmail.com',
//       unique_email_id: '11a2d783c8',
//       email_type: 'html',
//       status: 'subscribed',
//       merge_fields: [Object],
//       stats: [Object],
//       ip_signup: '',
//       timestamp_signup: '',
//       ip_opt: '200.158.205.195',
//       timestamp_opt: '2022-08-31T05:29:46+00:00',
//       member_rating: 2,
//       last_changed: '2022-08-31T05:29:46+00:00',
//       language: '',
//       vip: false,
//       email_client: '',
//       location: [Object],
//       tags_count: 0,
//       tags: [],
//       list_id: '791d81b943',
//       _links: [Array]
//     }
//   ],
//   updated_members: [],
//   errors: [],
//   total_created: 1,
//   total_updated: 0,
//   error_count: 0,
//   _links: [
//     {
//       rel: 'self',
//       href: 'https://us9.api.mailchimp.com/3.0/lists/791d81b943',
//       method: 'GET',
//       targetSchema: 'https://us9.api.mailchimp.com/schema/3.0/Definitions/Lists/Response.json'
//     },
//     {
//       rel: 'parent',
//       href: 'https://us9.api.mailchimp.com/3.0/lists',
//       method: 'GET',
//       targetSchema: 'https://us9.api.mailchimp.com/schema/3.0/Definitions/Lists/CollectionResponse.json',
//       schema: 'https://us9.api.mailchimp.com/schema/3.0/Paths/Lists/Collection.json'
//     },
//     {
//       rel: 'update',
//       href: 'https://us9.api.mailchimp.com/3.0/lists/791d81b943',
//       method: 'PATCH',
//       targetSchema: 'https://us9.api.mailchimp.com/schema/3.0/Definitions/Lists/Response.json',
//       schema: 'https://us9.api.mailchimp.com/schema/3.0/Definitions/Lists/PATCH.json'
//     },
//     {
//       rel: 'batch-sub-unsub-members',
//       href: 'https://us9.api.mailchimp.com/3.0/lists/791d81b943',
//       method: 'POST',
//       targetSchema: 'https://us9.api.mailchimp.com/schema/3.0/Definitions/Lists/BatchPOST-Response.json',
//       schema: 'https://us9.api.mailchimp.com/schema/3.0/Definitions/Lists/BatchPOST.json'
//     },
//     {
//       rel: 'delete',
//       href: 'https://us9.api.mailchimp.com/3.0/lists/791d81b943',
//       method: 'DELETE'
//     },
//     {
//       rel: 'abuse-reports',
//       href: 'https://us9.api.mailchimp.com/3.0/lists/791d81b943/abuse-reports',
//       method: 'GET',
//       targetSchema: 'https://us9.api.mailchimp.com/schema/3.0/Definitions/Lists/Abuse/CollectionResponse.json',
//       schema: 'https://us9.api.mailchimp.com/schema/3.0/Paths/Lists/Abuse/Collection.json'
//     },
//     {
//       rel: 'activity',
//       href: 'https://us9.api.mailchimp.com/3.0/lists/791d81b943/activity',
//       method: 'GET',
//       targetSchema: 'https://us9.api.mailchimp.com/schema/3.0/Definitions/Lists/Activity/Response.json'
//     },
//     {
//       rel: 'clients',
//       href: 'https://us9.api.mailchimp.com/3.0/lists/791d81b943/clients',
//       method: 'GET',
//       targetSchema: 'https://us9.api.mailchimp.com/schema/3.0/Definitions/Lists/Clients/Response.json'
//     },
//     {
//       rel: 'growth-history',
//       href: 'https://us9.api.mailchimp.com/3.0/lists/791d81b943/growth-history',
//       method: 'GET',
//       targetSchema: 'https://us9.api.mailchimp.com/schema/3.0/Definitions/Lists/Growth/CollectionResponse.json',
//       schema: 'https://us9.api.mailchimp.com/schema/3.0/Paths/Lists/Growth/Collection.json'
//     },
//     {
//       rel: 'interest-categories',
//       href: 'https://us9.api.mailchimp.com/3.0/lists/791d81b943/interest-categories',
//       method: 'GET',
//       targetSchema: 'https://us9.api.mailchimp.com/schema/3.0/Definitions/Lists/InterestCategories/CollectionResponse.json',
//       schema: 'https://us9.api.mailchimp.com/schema/3.0/Paths/Lists/InterestCategories/Collection.json'
//     },
//     {
//       rel: 'members',
//       href: 'https://us9.api.mailchimp.com/3.0/lists/791d81b943/members',
//       method: 'GET',
//       targetSchema: 'https://us9.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/CollectionResponse.json',
//       schema: 'https://us9.api.mailchimp.com/schema/3.0/Paths/Lists/Members/Collection.json'
//     },
//     {
//       rel: 'merge-fields',
//       href: 'https://us9.api.mailchimp.com/3.0/lists/791d81b943/merge-fields',
//       method: 'GET',
//       targetSchema: 'https://us9.api.mailchimp.com/schema/3.0/Definitions/Lists/MergeFields/CollectionResponse.json',
//       schema: 'https://us9.api.mailchimp.com/schema/3.0/Paths/Lists/MergeFields/Collection.json'
//     },
//     {
//       rel: 'segments',
//       href: 'https://us9.api.mailchimp.com/3.0/lists/791d81b943/segments',
//       method: 'GET',
//       targetSchema: 'https://us9.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/CollectionResponse.json',
//       schema: 'https://us9.api.mailchimp.com/schema/3.0/Paths/Lists/Segments/Collection.json'
//     },
//     {
//       rel: 'webhooks',
//       href: 'https://us9.api.mailchimp.com/3.0/lists/791d81b943/webhooks',
//       method: 'GET',
//       targetSchema: 'https://us9.api.mailchimp.com/schema/3.0/Definitions/Lists/Webhooks/CollectionResponse.json',
//       schema: 'https://us9.api.mailchimp.com/schema/3.0/Paths/Lists/Webhooks/Collection.json'
//     },
//     {
//       rel: 'signup-forms',
//       href: 'https://us9.api.mailchimp.com/3.0/lists/791d81b943/signup-forms',
//       method: 'GET',
//       targetSchema: 'https://us9.api.mailchimp.com/schema/3.0/Definitions/Lists/SignupForms/CollectionResponse.json',
//       schema: 'https://us9.api.mailchimp.com/schema/3.0/Paths/Lists/SignupForms/Collection.json'
//     },
//     {
//       rel: 'locations',
//       href: 'https://us9.api.mailchimp.com/3.0/lists/791d81b943/locations',
//       method: 'GET',
//       targetSchema: 'https://us9.api.mailchimp.com/schema/3.0/Definitions/Lists/Locations/CollectionResponse.json',
//       schema: 'https://us9.api.mailchimp.com/schema/3.0/Paths/Lists/Locations/Collection.json'
//     }
//   ]
// }
