//Loading Firebase Package
const firebase = require("firebase-admin");
const serviceAccount = require('./klout-700eb-ed781de70da6.json');
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});
const db = firebase.firestore();
/**
* CRUD operations on users collection
*/

// insert new user
function insertNewUser(id, fields) {
  db.collection('users').doc(id).set(fields)
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
}


// update user field
function updateUserField(id, fields) {
  db.collection('users').doc(id).update(fields)
  .then(() => {
    console.log("Document updated"); // Document updated
  })
  .catch((error) => {
    console.error("Error updating doc", error);
  });	
}

// delete user
function deleteUser(id) {
  db.collection('users').doc(id).delete()
  .then(() => console.log("Document deleted")) // Document deleted
  .catch((error) => console.error("Error deleting document", error));
}


/**
* CRUD operations on cards collection
*/

const cardsDb = db.collection('cards');

// insert new card
function insertNewCard(id, fields) {
  db.collection('cards').doc(id).set(fields)
}

// get card
async function getCard(id) {
  const userCardRef = db.collection('cards').doc(id);
  const doc = await userCardRef.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    console.log('Document data:', doc.data());
  }  
}

// update card field
function updatecardField(id, fields) {
  db.collection('cards').doc(id).update(fields)
    .then(() => {
      console.log("Document updated"); // Document updated
    })
    .catch((error) => {
      console.error("Error updating doc", error);
    });	
}

// delete card
function deleteCard(id) {
  db.collection('cards').doc(id).delete()
  .then(() => console.log("Document deleted")) // Document deleted
  .catch((error) => console.error("Error deleting document", error));
}


/**
* CRUD operations on snapshots collection
*/

// insert new platform snapshot
function insertNewPlatformSnapshot(id, platform, timestamp, snapshot) {
  const snapshotsDb = db.collection('snapshots').doc(id).collection(platform).doc(timestamp.toString());
  snapshotsDb.set(snapshot)
}

// get platform snapshots
async function getPlatformSnapshots(id,platform) {
  const snapshotRef = db.collection('snapshots').doc(id).collection(platform);
  const snapshot = await snapshotRef.get();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
});
}


// user collection test
var user_data = {
  email:"jeff@gmail.com",
  instagram:"@jeff_insta",
  twitter:"@jeff_twitter",
  tiktok:"@jeff_tiktok"
}
var new_data = {
  tiktok:"@changed_jeff_tiktok"
}
//insertNewUser("test_user",user_data);
//getUser("test_user");
//updateUserField("test_user",new_data);
//deleteUser("test_user");
//getUser("test_user");


// card collection test
var card_data = {
  name: "name",
  email: "email",
  phoneNumber: "911",
	twitter: "twitter",
  instagram: "instagram",
	tiktok: "tiktok"
}
var new_data = {
  tiktok:"@changed_jeff_tiktok"
}
//insertNewCard("test_card",card_data);
//getCard("test_card");
//updatecardField("test_card",new_data);
//deleteCard("test_card")


var snapshot = {
  followers: 1,
  following: 2,
  posts: 3,
  likes: 4
}
//insertNewPlatformSnapshot("test_user", "instagram", Date.now(), snapshot);
//getPlatformSnapshots("test_user","twitter");
