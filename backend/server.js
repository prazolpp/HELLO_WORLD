const express = require('express');
const cors = require('cors')
const { sendRequest } = require('./sendRequest/sendRequest');
const { twitterInfoApi, youtubeApi, youtubeIdApi, instagramApi } = require('./apis/apis')
const { lookup } = require('./twitter/twitter')
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

// API calls
app.get('/bio/twitter/:twitter_name', (req, res) => {
  const twittername = req.params.twitter_name
  const data = Promise.resolve(lookup(twittername))
  console.log(data)
  res.send(data)
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
    }).catch((err) => res.send(err))
  }).catch((err) => res.send(err))
})

app.get('/bio/instagram/:instagram_name', (req, res) => {

  const username = req.params.instagram_name
  reqObj = {
    url: `${instagramApi}${username}/?__a=1`
  }
  console.log(username)
  sendRequest(reqObj).then((data) => {
    console.log(data)
    res.send(data)
  }).catch((err) => {
    console.log(err)
    res.send(err)
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`));