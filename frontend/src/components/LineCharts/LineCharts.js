import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { getPlatformSnapshots, getSnapshot, getYoutubeData } from '../../apis/apis'
import { Line } from 'react-chartjs-2';
import './LineCharts.css';

let weeks = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"]
let months = [ "Jan", "Feb", "March", "April", "May", "June",
"July", "Aug", "Sep", "Oct", "Nov", "Dec" ];
let years = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2019", "2020", "2021"]

let followData = {
    labels: months,
    datasets: [
      {
        label: 'Twitter Followers',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(29, 161, 242,1)',
        borderColor: 'rgba(0, 51, 102,1)',
        borderWidth: 2,
        data: [650, 800, 1200, 1100, 1300, 650, 800, 1200, 1100, 1300, 1350, 2366]
      },
      {
        label: 'Youtube Subscribers',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(255,0,0,1)',
        borderColor: 'rgba(160,82,45)',
        borderWidth: 2,
        data: [90, 300, 500, 430, 600, 1200, 1100, 1300, 650, 800, 1200, 1100]
      },
      {
        label: 'Instagram Followers',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(193,53,132,1)',
        borderColor: 'rgba(131,58,180)',
        borderWidth: 2,
        data: [1000, 1100, 1400, 1600, 600,200, 1100, 1300, 650, 800,1300, 1350 ]
      }
    ]
  }

const options =  {
    title:{
        display:true,
        text:'Social Media Statistics for the past year',
        fontSize:20
    },
    legend:{
        display:true,
        position:'right'
    },
    maintainAspectRatio: false    
}                   

const LineCharts = ({twitter="", instagram="", youtube=""}) => {

    const [platformData, setPlatformData] = useState({
      "twitter":[],
      "youtube":[],
      "instagram": []
    })


    useEffect(() => {
      //"http://localhost:5000/db/snapshot/get/:platform/:handle"

      let youtubeObj = {
        url: `${getSnapshot}/youtube/${youtube}`
      }
      let twitterObj = {
        url: `${getSnapshot}/youtube/${twitter}`
      }
      let instagramObj = {
        url: `${getSnapshot}/youtube/${youtube}`
      }
      if(youtube){
        sendRequest(youtubeObj).then((data) => {

        })
      }
      if(twitter){
        sendRequest(twitterObj).then((data) => {

        })
      }
      if(instagram){
        sendRequest(instagramObj).then((data) => {

        })
      }

    }, platformData)
  
    return (
        <div className="LineCharts">
            <Line
                data={followData}
                options={options}
                height={null}
                width={null}
            />
        </div>
    )
}

export default LineCharts ;