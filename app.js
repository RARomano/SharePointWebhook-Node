var spauth = require('node-sp-auth');
var request = require('request-promise');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

/// username and password or clientid and clientsecret
var credentialOptions = {
  username: '',
  password: ''
}

/// Tenant Url
var url = 'https://[TENANT].sharepoint.com';

/// Add the list title
var resourceUrl = url + "/_api/web/lists/getbytitle('[LIST_TITLE]')";

var notificationUrl = '[URL_OF_YOUR_SERVICE]';

var headers;

//get auth options 
spauth.getAuth(url, credentialOptions)
  .then(function(options) {

    headers = options.headers;
    headers['Accept'] = 'application/json;odata=verbose';

    /// Set expiration date for the webhook
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    request.post({
      url: url + "/_api/contextinfo",
      headers: headers
    }).then(function(response) {
      var digest = (JSON.parse(response).d.GetContextWebInformation.FormDigestValue);

      headers['X-RequestDigest'] = digest;

      var 

      var data = {
        method: 'POST',
        uri: resourceUrl + "/subscriptions",
        body: {
          resource: resourceUrl,
          notificationUrl: ,
          expirationDateTime: expirationDate
        },
        headers: headers,
        json: true
      };

      request.post(data).then(function(response) {
        console.log("Subscription Id: ", response.d.id);
      });
    });
  });


var app = express();

var server = http.createServer(app).listen(8080, function() {
  console.log('Listening on port:', 8080);
});

app.use(bodyParser.json());

app.post('/', function(req, res, next) {
  var token = req.query.validationtoken;
  if (token) {
    console.log('Subscription validated. Token: ' + token);
    res.status(200).send(token);
  } else {
    console.log('Notification received: ' + JSON.stringify(req.body));

    var metadata = "{ 'query' : { '__metadata': { 'type': 'SP.ChangeQuery' }, 'Add': 'True', 'Item': 'True' }}";

    headers["content-type"] = "application/json; odata=verbose";

    // get changes
    request.post({
      url: resourceUrl + "/getchanges",
      headers: headers,
      body: metadata
    }).then(function(response) {

      /// Process changes
      console.log(response);
    });

    res.status(200).send('ok');
  }
});