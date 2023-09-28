const countryData = document.querySelector(".country-data");
const inputName = document.querySelector(".input-name");
const btn = document.querySelector(".btn");
const wrapper = document.querySelector(".wrapper");
const error = document.querySelector(".error");

btn.addEventListener("click", function () {
  let inputValue = inputName.value;
  console.log(inputValue);

  fetch(`https://restcountries.com/v3.1/name/${inputValue}`)
    .then((response) => {
      if (!response.ok) throw new Error("No information, please try again!");
      return response.json();
    })
    .then((data) => getData(data))
    .catch((err) => errorShow(err));

  const getData = function (countrys) {
    const country = countrys[0];
    console.log(country);
    renderData(country);
  };
  const renderData = function (country) {
    const html = `
        <h1>Country Name :${country.name.common} </h1>
        <p>Headquarters: ${country.capital[0]}</p>
        <p>CapitalInfo: ${country.capitalInfo.latlng[0]}</p>
        <p>border: ${country.borders}</p>
        <p>Car side: ${country.car.side}</p>
        <p>Flag: ${country.flags.png}</p>
        <p>population: ${country.population}</p>
        <a href="${country.maps.googleMaps}">Maps: </a>
    `;
    wrapper.insertAdjacentHTML("afterbegin", html);
  };
  const errorShow = function (err) {
    const html = `
        <h2>${err.message}</h2>
    `;
    error.insertAdjacentHTML("afterbegin", html);
  };
});
