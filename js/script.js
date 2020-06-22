// main function when on page load
$(document).ready(() => {
  let lang = navigator.language || "en";
  // fetch weather data on button press
  $("#search_button").click(() => {
    fetchByCityName(inputData(), lang);
  });
  // fetch weather data on enter key press in input
  $("#search").keypress((e) => {
    if (e.keyCode == 13) {
      fetchByCityName(inputData(), lang);
    }
  });
  fetchData(city, lang);
  checkLocation();
});

// reading input to place as a city
inputData = () => {
  let values = $("#search").val();
  console.log(("values:", values));
  $("#search").val("");
  return values;
};

// get location for automatic query by location
checkLocation = () => {
  console.log(navigator.geolocation);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("longitude", position.coords.longitude);
      console.log("latitude", position.coords.latitude);
    });
  } else {
    console.log("location data isn't available");
  }
};

const city = 587081; // keycode for Baku (by default)

fetchData = (city, lang) => {
  const units = "metric";
  const key = "1e3ac1ae38ca57ec10bd8dfabf2819f8";
  const period = "hourly";
  const api = `https://api.openweathermap.org/data/2.5/forecast?id=${city}&appid=${key}&units=${units}&lang=${lang}&exclude=${period}`;

  $.ajax({
    async: true,
    dataType: "json",
    method: "GET",
    url: api,
    withCredentials: true,
  })
    .fail((xhr, status, err) => {
      console.log(xhr, status, err);
    })
    .done((res) => {
      console.log(res);
      renderBoxes(res);
    });
};

renderBoxes = (res) => {
  console.log(res);
  $(".container").empty();
  $(".city").text(`${res.city.name.replace("City", "")}`);
  $.each(res.list, (index, day) => {
    if (index % 6 === 0) {
      $(".container").append(
        `
        <ul class="styled" style="list-style-type:none">
          <li class="date"> ${day.dt_txt.slice(0, 10)}</li>
          <li><img 
          src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" 
          alt="${day.weather[0].description} icon" /></li>
          <li class="description"> ${day.weather[0].description}</li>
          <li class="temp"> <span>Temp</span> ${day.main.temp} ℃ </li>
          <li class="wind"> <span>Wind speed:</span> ${day.wind.speed} </li>
          <li class="humidity"> <span>Humidity:</span> ${
            day.main.humidity
          }% </li>
          <li class="hpa"> <span>Pressure: </span>${day.main.pressure} hPa </li>
        </ul>
        `
      );
    }
  });
};

function fetchByCityName(city) {
  const units = "metric";
  const key = "1e3ac1ae38ca57ec10bd8dfabf2819f8";
  const period = "hourly";
  const api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=${units}&exclude=${period}`;

  $.ajax({
    async: true,
    dataType: "json",
    method: "GET",
    url: api,
    withCredentials: true,
  })
    .fail((xhr, status, err) => {
      console.log(xhr, status, err);
    })
    .done((res) => {
      console.log(res);
      renderBoxes(res);
    });
}
