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
  }
  
  // insert new personal card
  async function insertNewPersonalCard(id, cardID, fields) {
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

module.exports = {
    hashString, insertNewUser, updateUserField, newCardUser, insertNewPersonalCard, getCard, updateCard, deleteCard, insertNewPlatformSnapshot, getPlatformSnapshots
}