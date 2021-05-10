module.exports = {
    getTwitterData: "http://localhost:5000/bio/twitter",
    getYoutubeData: "http://localhost:5000/bio/youtube",
    getInstagramData: "http://localhost:5000/bio/instagram",
    addCard: "http://localhost:5000/db/card/newCard",
    getCards: "http://localhost:5000/db/card/getCardCollection",
    getSnapshot: "http://localhost:5000/db/snapshot/get",
    getPlatformsnap: "http://localhost:5000/db/snapshot/get/:platform/:handle",
    // getPlatformsnap: "http://localhost:5000/db/snapshot/get/:youtube/:pewdiepie"
    addEmail: "http://localhost:5000/db/user/insert",
    shareCard: "http://localhost:5000/db/card/shareCardEmail"
    //"http://localhost:5000/db/snapshot/get/:platform/:handle"
};
