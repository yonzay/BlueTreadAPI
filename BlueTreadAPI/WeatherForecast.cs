namespace BlueTreadAPI
{
    public struct Hour
    {
        public DateTime timestamp { get; set; }
        public double temp_c { get; set; }
        public double temp_f { get; set; }
        public double feels_c { get; set; }
        public double feels_f { get; set; }
        public string summary { get; set; }
        public string icon { get; set; }
        public int cloud_coverage { get; set; }
        public double humidity { get; set; }
        public double wind { get; set; }
        public int chance_of_rain { get; set; }
        public int chance_of_snow { get; set; }
    }

    public struct Day
    {
        public DateTime date { get; set; }
        public double temp_c { get; set; }
        public double temp_f { get; set; }
        public double wind_mph { get; set; }
        public double humidity { get; set; }
        public int chance_of_rain { get; set; }
        public int chance_of_snow { get; set; }
        public string summary { get; set; }
        public string icon { get; set; }
        public Hour[] hours { get; set; }
    }

    public class WeatherForecast
    {
        public DateTime date { get; set; }
        public double temp_c { get; set; }
        public double temp_f { get; set; }
        public double feels_c { get; set; }
        public double feels_f { get; set; }
        public string summary { get; set; }
        public string icon { get; set; }
        public double wind_mph { get; set; }
        public int humidity { get; set; }
        public int cloud_coverage { get; set; }
        public Day[] days { get; set; }
    }
}