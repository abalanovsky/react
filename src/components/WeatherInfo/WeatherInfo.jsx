import './WeatherInfo.css'
import {useEffect, useState} from "react";
import {ReactComponent as Loader} from '../../assets/loader2.svg'
import AirIcon from '@mui/icons-material/Air';
import ExploreIcon from '@mui/icons-material/Explore';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Badge, Typography, Box, Chip, CircularProgress } from '@mui/material';

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.inherit">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

export function WeatherInfo({ city }) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(city !== null){
            setLoading(true)
            fetch(`http://api.openweathermap.org/data/2.5/` +
                `weather?q=${city}&units=metric&APPID=5d066958a60d315387d9492393935c19`)
                .then((response) => response.json())
                .then((data) => {
                    setData(data)
                    setTimeout(() => setLoading(false), 1000)
                })
        }
    }, [city])

    if(loading){
        return <div className="info-section"><Loader /></div>
    }

    return (
        <div className="info-section">
            {city !== null ?
                <>
                    <div className="city-block">
                        <>{data?.weather[0].icon &&
                        <img src={`http://openweathermap.org/img/w/${data?.weather[0].icon}.png`} alt="weather"/>}</>
                        <h2 style={{margin:0}}>{Math.round(data?.main.temp)} °C</h2>
                        <h1 style={{margin:0, fontSize: 50}}>{data?.name}</h1>
                        <p>{data?.weather[0].description}</p>
                        <div>
                            <div className="container-additional-info">
                                <div className="additional-block-style">
                                    <span className="heading-add-block">Pressure</span>
                                    <Chip label={`${data?.main.pressure} hPa`} color="primary"/>
                                    </div>
                                <div className="additional-block-style">
                                    <span className="heading-add-block">Humidity</span>
                                    <CircularProgressWithLabel value={data?.main.humidity} />
                                    </div>
                            </div>
                            <div className="container-additional-info">
                                <div className="additional-block-style"><AirIcon color="white" />
                                    <Badge badgeContent="m/s" color="default" anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}>
                                        {data?.wind.speed}
                                    </Badge>
                                </div>
                                <div className="additional-block-style">
                                    <span className="heading-add-block">Wind direction</span>
                                    <div className="flex-item"><ExploreIcon/>&nbsp; {data?.wind.deg}°</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
                : <div className="city-block">
                    <WbSunnyIcon sx={{ fontSize: 60, mb: 2 }}/>
                    <h1 style={{margin:0}}>Welcome</h1>
                    <p>Chose city on the right bar, to see weather forecast</p>

                </div>}
        </div>
    )
}
