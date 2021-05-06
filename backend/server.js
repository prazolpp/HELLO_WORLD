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

//Loading Firebase Package
const firebase = require("firebase-admin");
const serviceAccount = require('./klout-700eb-ed781de70da6.json');
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});
const db = firebase.firestore();
// API calls
app.get('/bio/twitter/:twitter_name', async (req, res) => {
  const twittername = req.params.twitter_name
  lookup(twittername, res)
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

// insert new user
app.post('/db/user/insert/:id', async (req, res) => {
  const id = req.params.id;
  res.send(await insertNewUser(id));
})

// get user data
app.get('/db/user/get/:id', async (req, res) => {
  const id = req.params.id;
  res.send(await getUser(id));
})

// update user field
app.post('/db/user/update/:id', async (req, res) => {
  const id = req.params.id;
  res.send(await updateUserField(id,req.body));
})

// delete user
app.post('/db/user/delete/:id', async (req, res) => {
  const id = req.params.id;
  res.send(await deleteUser(id));
})

// new card
app.post('/db/card/newCard/:id/:cardName', async (req, res) => {
  const id = req.params.id;
  const cardName = req.params.cardName;
  const cardid = hashString(id+cardName);
  console.log(req.body)
  res.send(await insertNewPersonalCard(id,cardid,req.body));
})

//getCard
app.get('/db/card/getCard/:cardid', async (req, res) => {
  const cardid = req.params.cardid;
  res.send(await getCard(cardid));
})


//get user card collection
app.get('/db/card/getCardCollection/:id/:collection', async (req, res) => {
  const id = req.params.id;
  const collection = req.params.collection;
  console.log(id, collection)
  res.send(await getCardCollection(id, collection));
})

//share card with user
app.post('/db/card/shareCard/:id/:cardID', async (req, res) => {
  const id = req.params.id;
  const cardID = req.params.cardID;
  res.send(await shareCard(id, cardID));
})

//updateCard
app.post('/db/card/updateCard/:id/:cardID', async (req, res) => {
  const id = req.params.id;
  const cardID = req.params.cardID;
  res.send(await updateCard(id, cardID, req.body));
})

//deleteCard
app.post('/db/card/deleteCard/:id/:cardID', async (req, res) => {
  const id = req.params.id;
  const cardID = req.params.cardID;
  res.send(await deleteCard(id, cardID));
})

//insertNewPlatformSnapshot
app.post('/db/snapshot/add/:platform/:handle', async (req, res) => {
  const platform = req.params.platform;
  const handle = req.params.handle;
  res.send(await insertNewPlatformSnapshot(platform, handle, Date.now(), req.body));
})

//getPlatformSnapshots
app.get('/db/snapshot/get/:platform/:handle', async (req, res) => {
  const platform = req.params.platform;
  const handle = req.params.handle;
  res.send(await getPlatformSnapshots(platform, handle));
})


// database operations
function hashString(string) {
                  
  var hash = 0;
    
  if (string.length == 0) return hash;
    
  for (i = 0; i < string.length; i++) {
      char = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
  }
    
  return hash.toString();
}

/**
* CRUD operations on users collection
*/

// insert new user
function insertNewUser(id) {
  db.collection('users').doc(id).set({})
}


// get user handles
async function getUser(id) {
  const userRef = db.collection('users').doc(id);
  const doc = await userRef.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    console.log('Document data:', doc.data());
  }
  return doc.data();
}


// update user field
async function updateUserField(id, fields) {
  const res = await db.collection('users').doc(id).update(fields);
}

// delete user
async function deleteUser(id) {
  const res = await db.collection('users').doc(id).delete();
}


/**
* CRUD operations on cards collection
*/

// new card user
function newCardUser(id) {
    const user = db.collection('cards').doc(id);
    user.set({
      myCards: [null],
      sharedCards: [null]
    })
  
  const userRef = db.collection('cards').doc(id);
  userRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        return 
      } else {
        user.set({
            myCards: [null],
            sharedCards: [null]
        })
      }
  });
}

// insert new personal card
async function insertNewPersonalCard(id, cardID, fields) {
  // create card user if doesn't exist
  const doc = await db.collection('cards').doc(id).get();
  if (!doc.exists) {
    await newCardUser(id);
  }

  // insert card
  const personalCards = db.collection('cards').doc(id).collection("myCards").doc(cardID);
  personalCards.set(fields)

  // update user doc
  const userRef = await db.collection('cards').doc(id).update({
    myCards: firebase.firestore.FieldValue.arrayUnion(cardID)
  });
}

// get card
async function getCard(cardID) {
  var id = null;
  const cardsDb = db.collection('cards')
  const ownerRef = await cardsDb.where('myCards', 'array-contains', cardID).get();
  ownerRef.forEach(userID => {
    id = userID.id;
  });
  const doc = await cardsDb.doc(id).collection('myCards').doc(cardID).get();
  return doc.data();
}

// get card collection
async function getCardCollection(id,collection) {
  const collectionRef = await db.collection('cards').doc(id).collection(collection).get();
  var obj = {};
  collectionRef.forEach(doc => {
    obj[doc.id] = doc.data();   
  });
  console.log(obj);
  return obj;
}

// share card with user
async function shareCard(sharedtoID, cardID) {
  // get card data
  const data = getCard(cardID);

  // add card to userID collection
  const sharedCards = db.collection('cards').doc(sharedtoID).collection("sharedCards").doc(cardID);
  sharedCards.set(data)

  // update userID doc
  const userRef = await db.collection('cards').doc(sharedtoID).update({
    sharedCards: firebase.firestore.FieldValue.arrayUnion(cardID)
  }); 
}

// update card
async function updateCard(id,cardID,data) {
  const cardsRef = db.collection('cards');
  // update owner
  const ownerRef = db.collection('cards').doc(id);
  const res = await ownerRef.collection('myCards').doc(cardID).update(data);
  
  // update shared users copy
  // get who has the card
  var shared = [];
  const sharedTo = await cardsRef.where('sharedCards', 'array-contains', cardID).get();
  sharedTo.forEach(doc => {
    shared.push(doc.id);
  });
  shared.forEach(userID => {
    const res = cardsRef.doc(userID).collection('sharedCards').doc(cardID).update(data);
  });
  
}

// delete card
async function deleteCard(id,cardID) {
  const cardsRef = db.collection('cards');
  // delete from owner
  const ownerRef = db.collection('cards').doc(id);
  const res = await ownerRef.collection('myCards').doc(cardID).delete();
  const removeRes = await ownerRef.update({myCards: firebase.firestore.FieldValue.arrayRemove(cardID)
  });
  
  // delete from shared to
  // get who has the card
  var shared = [];
  const sharedTo = await cardsRef.where('sharedCards', 'array-contains', cardID).get();
  sharedTo.forEach(doc => {
    shared.push(doc.id);
  });
  shared.forEach(userID => {
    const removeCard = cardsRef.doc(userID).collection('sharedCards').doc(cardID).delete();
    const removeField = cardsRef.doc(userID).update({sharedCards: firebase.firestore.FieldValue.arrayRemove(cardID)});
  });
  
}

/**
* CRUD operations on snapshots collection
*/

// insert new platform snapshot
function insertNewPlatformSnapshot(platform, handle, timestamp, snapshot) {
  const snapshotsDb = db.collection('snapshots').doc(platform+"_"+handle).collection("snaps").doc(timestamp.toString());
  snapshotsDb.set(snapshot)
}

// get platform snapshots
async function getPlatformSnapshots(platform, handle) {
  const snapshotRef = db.collection('snapshots').doc(platform+"_"+handle).collection("snapshots");
  const snapshot = await snapshotRef.get();
  var obj = {};
  snapshot.forEach(doc => {
    obj[doc.id] = doc.data();   
});
  return obj;
}
app.listen(port, () => console.log(`Listening on port ${port}`));
