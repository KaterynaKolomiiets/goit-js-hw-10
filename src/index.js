import './css/styles.css';
import {fetchCountries} from './fetchCountries';
import debounce from 'lodash.debounce'
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryCardEl = document.querySelector(".country-info")

const onInput = function () {
  clearAll()
  let name = inputEl.value.trim();

    fetchCountries(name)
      .then(data => {
        if (data.length > 10) {
          Notify.info('Too many matches found. Please enter a more specific name.');
        }
        if (data.length >= 2 && data.length <= 10) {
          renderCountryList(data);
        }
        if (data.length === 1) {
          renderCountryCard(data);
        }
      })
      .catch(error => console.log(error));
}




    
const renderCountryList = function (arr) {
    let list = arr.map(item => `<li><img class="flag-icon" src=${item.flag}>${item.name}</li>`).join("");
    countryListEl.innerHTML = list
 }
const renderCountryCard = function ([{ flag, name, capital, population, languages}] = item){
    let text = `<div class="flex"><img class="big-flag" src=${flag}><h1>${name}</h1></div><b>Capital:</b><span>${capital}</span><b>Population:</b><span>${population}</span><b>Languages:</b><span>${languages.map((item)=>item.name)}</span>`
    countryCardEl.innerHTML = text
}
const clearAll = function () {
    countryListEl.innerHTML = "";
    countryCardEl.innerHTML = "";
}
inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));