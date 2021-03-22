const express = require('express');
const cors = require('cors')
const { sendRequest } = require('./sendRequest/sendRequest');
const { twitterInfoApi } = require('./apis/apis')

require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;


// API calls
app.get('/bio/twitter/:twitter_name', (req, res) => {
  reqObj = {
    url: `${twitterInfoApi}${req.params.twitter_name}`
  }
  //url: `${twitterInfoApi}${req.username}`,
  const twitter_key = process.env.TWITTER_KEY
  const twitter_value = process.env.TWITTER_VALUE 
  console.log(twitter_key)
  reqObj[twitter_key] = twitter_value
  console.log(reqObj)

  sendRequest(reqObj).then((data) => {
    console.log(data)
    res.send(data)
  }).catch((err) => res.send(err))
});

app.listen(port, () => console.log(`Listening on port ${port}`));