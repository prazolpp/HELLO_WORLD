import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { Line } from 'react-chartjs-2';
import './LineCharts.css';

const followData = {
    labels: ['January', 'February', 'March',
             'April', 'May'],
    datasets: [
      {
        label: 'Twitter Followers',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(29, 161, 242,1)',
        borderColor: 'rgba(0, 51, 102,1)',
        borderWidth: 2,
        data: [650, 800, 1200, 1100, 1300]
      },
      {
        label: 'Youtube Subscribers',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(255,0,0,1)',
        borderColor: 'rgba(160,82,45)',
        borderWidth: 2,
        data: [90, 300, 500, 430, 600]
      },
      {
        label: 'Instagram Followers',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(193,53,132,1)',
        borderColor: 'rgba(131,58,180)',
        borderWidth: 2,
        data: [1000, 1100, 1400, 1600, 600]
      }
    ]
  }

const options =  {
    title:{
        display:true,
        text:'Social Media Statistics',
        fontSize:20
    },
    legend:{
        display:true,
        position:'right'
    },
    maintainAspectRatio: false    
}                   

const LineCharts = ({twitterName, instaName, youtubeName}) => {

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