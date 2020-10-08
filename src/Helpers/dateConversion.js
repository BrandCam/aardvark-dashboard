const ConvertTimestamp = (timeStamp) => {
  let date = new Date(timeStamp);
  let yyyy = date.getFullYear();
  let mm = `0${date.getMonth() + 1}`.slice(-2);
  let dd = `0${date.getDate()}`.slice(-2);
  let hh = date.getHours();
  let h;
  let min = `0${date.getMinutes()}`.slice(-2);
  let ampm = "AM";
  let time;

  if (hh > 12) {
    h = hh - 12;
    ampm = "PM";
  } else if (hh === 12) {
    h = 12;
    ampm = "PM";
  } else if (hh === 0) {
    h = 12;
  } else {
    h = hh;
  }

  time = `${yyyy}-${mm}-${dd}, ${h}:${min} ${ampm}`;

  return time;
};

export default ConvertTimestamp;
