import React, { useState } from 'react';
import { Box, Container, Grid, Link, SvgIcon, Typography } from '@mui/material';
import Search from './components/Search/Search';
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';
import TodayWeather from './components/TodayWeather/TodayWeather';
import LoadingBox from './components/Reusable/LoadingBox';
import { ReactComponent as SplashIcon } from './assets/splash-icon.svg';
import Logo from './assets/logo.svg';
import ErrorBox from './components/Reusable/ErrorBox';
import GitHubIcon from '@mui/icons-material/GitHub';

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function App() {
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [weekForecast, setWeekForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchChangeHandler = async (enteredData) => {
    const location = enteredData.label.split(',')[0];
    setIsLoading(true);
    try {
        const weather_promise = ((await (await fetch(`https://localhost:44453/weatherforecast/${location}`)).json()));
        setTodayWeather({
            temp_f: weather_promise.temp_f,
            temp_c: weather_promise.temp_c,
            summary: weather_promise.summary,
            icon: weather_promise.icon,
            temp_f_feels_like: weather_promise.feels_f,
            temp_c_feels_like: weather_promise.feels_c,
            wind_speed: weather_promise.wind_mph,
            cloud_coverage: weather_promise.cloud_coverage,
            humidity: weather_promise.humidity,
            time: weather_promise.date,
            city: enteredData.label
        });
      
      setTodayForecast(weather_promise.days.find(elem => (new Date(elem.date)).toISOString().split('T')[0] === (new Date()).toISOString().split('T')[0]).hours.map(item => {
        return {
          time: formatAMPM(new Date(item.timestamp)),
          icon: item.icon,
          temperature: item.temp_c
        }
      }));

      setWeekForecast(weather_promise.days.map(item => {
          return {
            date: new Date(item.date).toDateString(),
            temp_c: item.temp_c,
            temp_f: item.temp_f,
            wind_mph: item.wind_mph,
            humidity: item.humidity,
            cloud_coverage: item.hours[0].cloud_coverage,
            chance_of_rain: item.chance_of_rain,
            chance_of_snow: item.chance_of_snow,
            icon: item.icon,
            summary: item.summary
          }
      }));
    } catch (error) {
      setError(true);
    }

    setIsLoading(false);
  };

  let appContent = (
    <Box
      xs={12}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        minHeight: '500px',
      }}
    >
      <SvgIcon
        component={SplashIcon}
        inheritViewBox
        sx={{ fontSize: { xs: '100px', sm: '120px', md: '140px' } }}
      />
    </Box>
  );

  if (todayWeather && todayForecast && weekForecast) {
    appContent = (
      <React.Fragment>
        <Grid item xs={12} md={todayWeather ? 6 : 12}>
          <Grid item xs={12}>
            <TodayWeather data={todayWeather} forecastList={todayForecast} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <WeeklyForecast data={weekForecast} />
        </Grid>
      </React.Fragment>
    );
  }

  if (error) {
    appContent = (
      <ErrorBox
        margin="3rem auto"
        flex="inherit"
        errorMessage="Something went wrong"
      />
    );
  }

  if (isLoading) {
    appContent = (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: '500px',
        }}
      >
        <LoadingBox value="1">
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: '10px', sm: '12px' },
              color: 'rgba(255, 255, 255, .8)',
              lineHeight: 1,
              fontFamily: 'Poppins',
            }}
          >
            Loading...
          </Typography>
        </LoadingBox>
      </Box>
    );
  }

  return (
    <Container
      sx={{
        backgroundImage: "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        maxWidth: { xs: '95%', sm: '80%', md: '1100px' },
        width: '100%',
        height: '100%',
        margin: '0 auto',
        padding: '1rem 0 3rem',
        marginBottom: '1rem',
        borderRadius: {
          xs: 'none',
          sm: '0 0 1rem 1rem',
        },
        boxShadow: {
          xs: 'none',
          sm: 'rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px',
        },
      }}
    >
      <Grid container columnSpacing={2}>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              width: '100%',
              marginBottom: '1rem',
            }}
          >
            <Box
              component="img"
              sx={{
                height: { xs: '32px', sm: '32px', md: '64px' },
                width: 'auto',
              }}
              alt="logo"
              src={Logo}
            />
            <Link
              href="https://github.com/yonzay"
              target="_blank"
              underline="none"
              sx={{ display: 'flex' }}
            >
              <GitHubIcon
                sx={{
                  fontSize: { xs: '20px', sm: '22px', md: '26px' },
                  color: 'white',
                  '&:hover': { color: 'grey' },
                }}
              />
            </Link>
          </Box>
          <Search onSearchChange={searchChangeHandler} />
        </Grid>
        {appContent}
      </Grid>
    </Container>
  );
}

export default App;
