const express = require('express');
const cors = require('cors')
const { sendRequest } = require('./sendRequest/sendRequest');
const { twitterInfoApi, youtubeApi, youtubeIdApi } = require('./apis/apis')

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

app.get('/bio/youtube/:youtube_name', (req, res) => {

  const username = req.params.youtube_name
  const youtube_key = process.env.YOUTUBE_KEY
  console.log(youtube_key, username)
  reqObj = {
    url: `${youtubeIdApi}${username}&key=${youtube_key}`
  }
  sendRequest(reqObj).then((data) => {
    return data
  }).catch((err) => res.send(err))
  .then((data) => {
    const id = data.items[0].id
    reqObj = {
      url: `${youtubeApi}${id}&key=${youtube_key}`
    }
    sendRequest(reqObj).then((data) => {
      console.log(data)
      res.send(data)
    })
  })
})
app.listen(port, () => console.log(`Listening on port ${port}`));