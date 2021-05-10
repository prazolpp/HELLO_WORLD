import StatCard from '../StatCard/StatCard';
import SearchBar from '../SearchBar/SearchBar';

const StatCards = ({platform, usersInfoState, setTwitterName, setYoutubeName, setInstagramName}) => {


    let statcards_youtube = ""
    let statcards_twitter = ""
    let statcards_instagram = ""
    let search_youtube = ""
    let search_twitter = ""
    let search_instagram = ""


    const youtube_stats = ["followers", "posts", "views"]
    if(platform == "Youtube"){
        search_youtube = <SearchBar keyword={usersInfoState.youtubeName} handleChange={setYoutubeName} />
        if(usersInfoState.youtubeName){
            statcards_youtube = youtube_stats.map((media,i) => {
                return <StatCard media={`${platform} ${media} for ${usersInfoState.youtubeName}`} number={usersInfoState.data.youtube[media]} pastNumber={usersInfoState.data.youtube[media]} />
            })
        }
    }

    const twitter_stats = ["followers", "posts", "following"]
    if(platform == "Twitter"){
        search_twitter = <SearchBar keyword={usersInfoState.twitterName} handleChange={setTwitterName} />
        if(usersInfoState.twitterName){
            statcards_twitter = twitter_stats.map((media,i) => {
                return <StatCard media={`${platform} ${media} for ${usersInfoState.twitterName}`} number={usersInfoState.data.twitter[media]} pastNumber={usersInfoState.data.twitter[media]} />
            })
        }
    }
    const insta_stats = ["followers", "following"]
    if(platform == "Instagram"){
        search_instagram = <SearchBar keyword={usersInfoState.instagramName} handleChange={setInstagramName} />
        if(usersInfoState.instagramName){
            statcards_instagram = insta_stats.map((media,i) => {
                return <StatCard media={`${platform} ${media} for ${usersInfoState.instagramName}`} number={usersInfoState.data.instagram[media]} pastNumber={usersInfoState.data.instagram[media]} />
            })
        }
    }
    
    return (
        <div className="StatCards">
            {search_youtube }
            <div className="statCards">
                {statcards_youtube}
            </div>
            {search_twitter}
            <div className="statCards">
                {statcards_twitter }
            </div>
            {search_instagram}
            <div className="statCards">
                {statcards_instagram }
            </div>
        </div>
    )
}
export default StatCards