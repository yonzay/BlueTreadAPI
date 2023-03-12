using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Nodes;

namespace BlueTreadAPI.Controllers
{
    [ApiController]
    [Route("[controller]/{location}")]
    public class WeatherForecastController : ControllerBase
    {
        static readonly HttpClient http_client = new HttpClient();

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<WeatherForecast> NewGet(string location)
        {
            JsonNode result = JsonNode.Parse(await http_client.GetStringAsync($"https://api.weatherapi.com/v1/forecast.json?key=5532ec193ed34db89dd193757231003&q={location}&days=14&aqi=no&alerts=no"));
            return new WeatherForecast
            {
                date = DateTime.Parse((string)result["location"]["localtime"]),
                temp_c = (double)result["current"]["temp_c"],
                temp_f = (double)result["current"]["temp_f"],
                feels_f = (double)result["current"]["feelslike_f"],
                feels_c = (double)result["current"]["feelslike_c"],
                summary = (string)result["current"]["condition"]["text"],
                icon = (string)result["current"]["condition"]["icon"],
                wind_mph = (double)result["current"]["wind_mph"],
                humidity = (int)result["current"]["humidity"],
                cloud_coverage = (int)result["current"]["cloud"],
                days = (result["forecast"]["forecastday"]).AsArray().Select(x => new Day
                {
                    date = DateTime.Parse((string)x["date"]),
                    temp_c = (double)x["day"]["avgtemp_c"],
                    temp_f = (double)x["day"]["avgtemp_f"],
                    wind_mph = (double)x["day"]["maxwind_mph"],
                    humidity = (double)x["day"]["avghumidity"],
                    chance_of_rain = (int)x["day"]["daily_chance_of_rain"],
                    chance_of_snow = (int)x["day"]["daily_chance_of_snow"],
                    summary = (string)x["day"]["condition"]["text"],
                    icon = (string)x["day"]["condition"]["icon"],
                    hours = (x["hour"]).AsArray().Select(y => new Hour {
                        timestamp = DateTime.Parse((string)y["time"]),
                        temp_f = (double)y["temp_f"],
                        temp_c = (double)y["temp_c"],
                        feels_f = (double)y["feelslike_f"],
                        feels_c = (double)y["feelslike_c"],
                        cloud_coverage = (int)y["cloud"],
                        humidity = (double)y["humidity"],
                        wind = (double)y["wind_mph"],
                        chance_of_rain = (int)y["chance_of_rain"],
                        chance_of_snow = (int)y["chance_of_snow"],
                        summary = (string)y["condition"]["text"],
                        icon = (string)y["condition"]["icon"]
                    }).ToArray()
                }).ToArray()
            };
        }
    }
}