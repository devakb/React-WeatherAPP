
import React from 'react'
import "./app.css";
import ReportCard from './Components/ReportCard';
import { Button, Card, CardContent, Skeleton, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import axios from 'axios';

export default function App(){

  let [weatherLocation, setWeatherLocation] = React.useState("Search");
  
  const searchWeather = () => {

        setFetching(true);
        setWeatherReport(null);
        axios.get(process.env.REACT_APP_X_RAPIDAPI_URL + "forecast.json", {
            params: {q: weatherLocation, days: 3},
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_X_RAPIDAPI_KEY,
                'X-RapidAPI-Host': process.env.REACT_APP_X_RAPIDAPI_HOST
            }
        }).then((response) => {
            setWeatherReport(response.data);
            setFetching(false);
        }).catch((error) => {
            setDisplayText(error.response.data.error.message);
            setFetching(false);
        });

  };

  let [weatherReport, setWeatherReport] = React.useState(null);
  let [fetching, setFetching] = React.useState(false);
  const [tempUnit, setTempUnit] = React.useState('C');

  let [displayText, setDisplayText] = React.useState("Not results to be displayed");

  const handleChange = ( event, tempUnit) => {
    setTempUnit(tempUnit)
  };

  return (
    <React.Fragment>
        <div className="page-wrapper">
            
            <div className="w-10/12 p-6">
                <div className="flex items-center gap-4">
                    <div>
                        <TextField
                            required
                            label="Location"
                            size="small"
                            value={weatherLocation}
                            onChange={(e) => setWeatherLocation(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button variant="contained" color="primary" onClick={searchWeather}>Search</Button>
                    </div>
                    <div>
                        <ToggleButtonGroup
                            value={tempUnit}
                            exclusive
                            onChange={handleChange}
                            aria-label="text alignment"
                        >
                            <ToggleButton value="C">
                                <Typography component="h4">°C</Typography>
                            </ToggleButton>
                            <ToggleButton value="F">
                            <Typography component="h4">°F</Typography>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </div>

                <br />

                {
                    fetching && <>
                        <div>
                            <Skeleton variant="rectangular" width={500} height={100} />
                        </div>
                    </>
                }

                {
                    weatherReport == null ? <>{!fetching && <Typography variant="h6" className="text-left">{displayText}</Typography>}</> : 
                    <ReportCard 
                        weatherReport={weatherReport} 
                        fetching={fetching}
                        tempUnit={tempUnit}
                    />
                }
            </div>
            
        </div> 
    </React.Fragment>
  )
}


