$(document).ready(() => {
  let lang = navigator.language ? navigator.language : "en";
  fetchData(city, lang);
  checkLocation();
  console.log(navigator.language);
  $(document).on("submit", "#search_button", () => {
    let values = $("#search").val();
    console.log(values);
    inputData();
  });
});

inputData = () => {
  console.log("submit ok!");
};

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

const city = 587081; // keycode for Baku

fetchData = (city, lang) => {
  const units = "metric";
  const key = "1e3ac1ae38ca57ec10bd8dfabf2819f8";
  const api = `http://api.openweathermap.org/data/2.5/forecast?id=${city}&appid=${key}&units=${units}&lang=${lang}`;

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
  $.each(res.list, (index, day) => {
    $(".container")
      .append(
        `
        <div class="styled">
          <p> ${day.dt_txt}</p>
          <p> ${day.weather[0].description}</p>
          <p> ${new Date(day.dt).toLocaleTimeString()}</p>
          <p> Temp ${day.main.temp} ℃ </p>
          <p> Humidity: ${day.main.humidity}% </p>
          <p> Pressure: ${day.main.pressure} hPa </p>
        </div>
        `
      )
      .hide()
      .fadeIn(400);
  });
};
