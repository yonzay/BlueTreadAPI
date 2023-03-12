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

export function getDayMonthFromDate(timee) {
  const newTimee = new Date(timee);
  const day = newTimee.getUTCDate();

  return day + ' ' + formatAMPM(newTimee);
}