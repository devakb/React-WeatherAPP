import { Button, Card, CardContent, Skeleton, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import moment from 'moment/moment';
import ForecastItem from './Forecast/ForecastItem';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import React from 'react';

function ReportCard({weatherReport, fetching, tempUnit}) {

 
  let {location, current, forecast} = weatherReport;

  const toDayDate = moment().format('dddd h:mm A, MMMM DD, YYYY');

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


  const charlabels = forecast.forecastday[0].hour.map((item) =>  moment(item.time).format('h:mm A'))
  const chartTemps = forecast.forecastday[0].hour.map((item) =>  tempUnit == "C" ? item.temp_c : item.temp_f)




  return (
    <React.Fragment>
        <Card variant="outlined" >
            <CardContent>
               {!fetching && <>
                    <div className="flex justify-between">
                        <div className="w-4/12">
                            <p className="text-slate-400 text-sm">
                                <small>{location.name}, {location.region}, {location.country}</small> <br />
                                {toDayDate}
                            </p>
                            
                            <div className="text-center my-10">
                                <div className="flex items-center justify-center">
                                    <img src={current.condition.icon} />
                                    <h3 className="text-3xl font-bold">{tempUnit == "C" ? current.temp_c : current.temp_f } <sup>°{tempUnit}</sup></h3>
                                </div>
                                <br />
                                <h3 className="text-xl font-bold text-center">
                                {current.condition.text}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-y-7 justify-between mt-9">
                            
                                <div className="w-6/12 text-center">
                                    <p className="text-sm text-slate-400">Real Feel</p>
                                    <p className="text-sm text-black">{tempUnit == "C" ? current.feelslike_c : current.feelslike_f } °{tempUnit}</p>
                                </div>
                                <div className="w-6/12 text-center">
                                    <p className="text-sm text-slate-400">Pressure</p>
                                    <p className="text-sm text-black">{current.pressure_mb}  mbar</p>
                                </div>
                                <div className="w-6/12 text-center">
                                    <p className="text-sm text-slate-400">Humidity</p>
                                    <p className="text-sm text-black">{current.humidity}%</p>
                                </div>
                                <div className="w-6/12 text-center">
                                    <p className="text-sm text-slate-400">UV Index</p>
                                    <p className="text-sm text-black">{current.uv}</p>
                                </div>
                            
                                <div className="w-6/12 text-center">
                                    <p className="text-sm text-slate-400">Wind Direction</p>
                                    <p className="text-sm text-black">{current.wind_dir}</p>
                                </div>
                                <div className="w-6/12 text-center">
                                    <p className="text-sm text-slate-400">Wind Speed</p>
                                    <p className="text-sm text-black">{current.wind_kph} KM/H</p>
                                </div>
                            </div>

                        </div>

                        <div className="w-7/12">
                            <Line
                                options={{
                                    responsive: true,
                                    bezierCurve : true,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                            display: false,
                                        },
                                        title: {
                                            display: true,
                                            text: 'Temperature',
                                        },

                                    },
                                }}
                                data={{
                                    labels: charlabels,
                                    datasets: [
                                        {
                                            label: 'Temperature',
                                            data: chartTemps,
                                            fill: false,
                                            borderColor: '#0369A1',
                                            backgroundColor: '#fcde71',
                                        },
                                    ],
                                }}
                            />
                            <br /> 
                            <h1 className="title text-slate-400">Forecast</h1>
                            <br />
                            <div className="flex flex-wrap gap-y-6">
                                {
                                    forecast.forecastday.map((item, index) => {
                                        if(index == 0) return;
                                        return (
                                            <ForecastItem 
                                                key={`${item.date_epoch}-${index+1}`}
                                                className="w-4/12" 
                                                title={index == 1 ? "Tomorrow" : item.date} 
                                                icon={item.day.condition.icon} 
                                                max={tempUnit == "C" ? item.day.maxtemp_c : item.day.maxtemp_f}
                                                min={tempUnit == "C" ? item.day.mintemp_c : item.day.mintemp_f}
                                                tempUnit={tempUnit}
                                                active={index == 1 ? true : false}/>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div></>
                }

            </CardContent>
        </Card>
    </React.Fragment>
  )
}


export default ReportCard
