// you have to add your twilio account details here
var twilio = require('twilio')('ACCOUNT_SID', 'AUTH_TOKEN');
 
var craigslist = require('node-craigslist');
  
    client = craigslist({
    city : 'phoenix'
  }),
  
  options = {
    maxAsk :'12000',
    minAsk : '8000',
  };

client.search(options,'2007 civic', function (err, listings) {
var pids = '' ;
var pidsToText = '';
  // play with listings here...
  if (listings.length > 0 ) {
  
	listings.forEach(function (listing) {  
    console.log(listing.pid);
    pids =  listing.pid + ',' + pids;
     pidsToText = pids.substring(0, pids.length-1);
  } )

// Add your phone numbers here 

twilio.sendSms({
    to:'phoneNo',
    from:'TwilioNumber',
    body: pidsToText }
    , 
// a little output of success/failure 
function(error, message) {
if (!error) {
console.log('Success! The SID for this SMS message is:');
console.log(message.sid);
console.log('Message sent on:');
console.log(message.dateCreated);
        }
else {
console.log('Oops! There was an error.');
console.log(error);
        }
    });
    
  }

// );
});




