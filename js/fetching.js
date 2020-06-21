export function fetchData(city) {
  const key = "1e3ac1ae38ca57ec10bd8dfabf2819f8";
  const api = `http://api.openweathermap.org/data/2.5/forecast?id=${city}&appid=${key}&units=metric`;

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
