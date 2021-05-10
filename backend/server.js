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
app.post('/db/user/insert/:id/:email', async (req, res) => {
  const id = req.params.id;
  const email = req.params.email
  console.log("adding email" + email + id)
  res.send(await insertNewUser(id, email));
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
//owner share by email
app.post('/db/card/shareCardEmail/:id/:cardID/:email', async (req, res) => {
  const id = req.params.id;
  const cardID = req.params.cardID;
  const email = req.params.email;
  res.send(await shareCardEmail(id, cardID, email));
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

//get most recent snapshot
app.get('/db/snapshot/recent/:platform/:handle', async (req, res) => {
  const platform = req.params.platform;
  const handle = req.params.handle;
  res.send(await getMostRecent(platform, handle));
})

//getPlatformSnapshots OLD
// app.get('/db/snapshot/get/:platform/:handle', async (req, res) => {
//   const platform = req.params.platform;
//   const handle = req.params.handle;
//   res.send(await getPlatformSnapshots(platform, handle));
// })

//getPlatformSnapshots DUMMY
app.get('/db/snapshot/get/:platform/:handle', async (req, res) => {
  const platform = req.params.platform;
  const handle = req.params.handle;
  res.send(youtube_data);
})

//DUMMY DATA:
var youtube_data = {
  '1620520075': { subscribers: 6013, videos: 151, views: 12040 },
  '1620606475': { subscribers: 6030, videos: 152, views: 12133 },
  '1620692875': { subscribers: 6046, videos: 153, views: 12164 },
  '1620779275': { subscribers: 6057, videos: 154, views: 12220 },
  '1620865675': { subscribers: 6065, videos: 155, views: 12302 },
  '1620952075': { subscribers: 6070, videos: 156, views: 12340 },
  '1621038475': { subscribers: 6080, videos: 157, views: 12370 },
  '1621124875': { subscribers: 6086, videos: 158, views: 12412 },
  '1621211275': { subscribers: 6088, videos: 159, views: 12517 },
  '1621297675': { subscribers: 6105, videos: 160, views: 12563 },
  '1621384075': { subscribers: 6111, videos: 161, views: 12643 },
  '1621470475': { subscribers: 6122, videos: 162, views: 12743 },
  '1621556875': { subscribers: 6128, videos: 163, views: 12836 },
  '1621643275': { subscribers: 6149, videos: 164, views: 12901 },
  '1621729675': { subscribers: 6155, videos: 165, views: 12993 },
  '1621816075': { subscribers: 6156, videos: 166, views: 13026 },
  '1621902475': { subscribers: 6166, videos: 167, views: 13075 },
  '1621988875': { subscribers: 6177, videos: 168, views: 13110 },
  '1622075275': { subscribers: 6198, videos: 169, views: 13168 },
  '1622161675': { subscribers: 6211, videos: 170, views: 13216 },
  '1622248075': { subscribers: 6222, videos: 171, views: 13274 },
  '1622334475': { subscribers: 6234, videos: 172, views: 13359 },
  '1622420875': { subscribers: 6254, videos: 173, views: 13397 },
  '1622507275': { subscribers: 6255, videos: 174, views: 13491 },
  '1622593675': { subscribers: 6262, videos: 175, views: 13527 },
  '1622680075': { subscribers: 6264, videos: 176, views: 13563 },
  '1622766475': { subscribers: 6271, videos: 177, views: 13603 },
  '1622852875': { subscribers: 6284, videos: 178, views: 13654 },
  '1622939275': { subscribers: 6296, videos: 179, views: 13694 },
  '1623025675': { subscribers: 6310, videos: 180, views: 13728 },
  '1623112075': { subscribers: 6321, videos: 181, views: 13761 },
  '1623198475': { subscribers: 6336, videos: 182, views: 13797 },
  '1623284875': { subscribers: 6357, videos: 183, views: 13828 },
  '1623371275': { subscribers: 6375, videos: 184, views: 13866 },
  '1623457675': { subscribers: 6379, videos: 185, views: 13898 },
  '1623544075': { subscribers: 6392, videos: 186, views: 13941 },
  '1623630475': { subscribers: 6408, videos: 187, views: 14000 },
  '1623716875': { subscribers: 6429, videos: 188, views: 14044 },
  '1623803275': { subscribers: 6429, videos: 189, views: 14116 },
  '1623889675': { subscribers: 6446, videos: 190, views: 14163 },
  '1623976075': { subscribers: 6456, videos: 191, views: 14202 },
  '1624062475': { subscribers: 6459, videos: 192, views: 14271 },
  '1624148875': { subscribers: 6463, videos: 193, views: 14369 },
  '1624235275': { subscribers: 6484, videos: 194, views: 14415 },
  '1624321675': { subscribers: 6499, videos: 195, views: 14508 },
  '1624408075': { subscribers: 6504, videos: 196, views: 14558 },
  '1624494475': { subscribers: 6506, videos: 197, views: 14605 },
  '1624580875': { subscribers: 6514, videos: 198, views: 14638 },
  '1624667275': { subscribers: 6525, videos: 199, views: 14686 },
  '1624753675': { subscribers: 6545, videos: 200, views: 14739 }
};

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
function insertNewUser(id, email) {
  const userRef = db.collection('users').doc(id);
  userRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        return 
      } else {
        userRef.set({
            email: email
        })
      }
  });
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

// share by email
async function shareCardEmail(id, cardID, email) {
  // get card data
  const cardRef = await db.collection('cards').doc(id).collection('myCards').doc(cardID).get();
  const data = cardRef.data();

  // find user
  var sharedtoID = '';
  const ownerRef = await db.collection('users').where('email', '==', email).get();
  ownerRef.forEach(doc => {
    sharedtoID = doc.id;
  });
  console.log(sharedtoID);

  // add card to userID collection
  const sharedCards = db.collection('cards').doc(sharedtoID).collection("sharedCards").doc(cardID);

  sharedCards.get().then((cardData) => {
    if(cardData.exists){
      return 
    }
    else{
      sharedCards.set(data)
    }
  })
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
  // update most recent 
  const userRef = db.collection('snapshots').doc(platform+"_"+handle);
  userRef.set(snapshot);
  userRef.update({timestamp:timestamp});
  // add to collection
  const snapshotsDb = userRef.collection("snaps").doc(timestamp.toString());
  snapshotsDb.set(snapshot)
}

// get most recent snapshot
async function getMostRecent(platform, handle) {
  const userRef = db.collection('snapshots').doc(platform+"_"+handle);
  const snapshot = await userRef.get();
  return snapshot.data();
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
