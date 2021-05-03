import StatCard from '../StatCard/StatCard';
import SearchBar from '../SearchBar/SearchBar';

const StatCards = ({platform, usersInfoState, setTwitterName, setYoutubeName, username}) => {


    let statcards_youtube = ""
    let statcards_twitter = ""
    let search_youtube = ""
    let search_twitter = ""

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
    return (
        <div class="StatCards">
            {search_youtube }
            <div class="statCards">
                {statcards_youtube}
            </div>
            {search_twitter}
            <div class="statCards">
                {statcards_twitter }
            </div>
        </div>
    )
}
export default StatCards