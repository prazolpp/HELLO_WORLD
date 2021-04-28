const Twitter = require('twitter');
require('dotenv').config();

const client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token,
  access_token_secret: process.env.token_secret
});

const lookup = function(username) {
  var params={screen_name: username}
  client.get('users/show',  params, (error, data) => {
      if(!error){
          console.log(data)
        return data
      }
  });
}
module.exports = {lookup}