import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryCardEl = document.querySelector('.country-info');

const onInput = function () {
  clearAll();
  let name = inputEl.value.trim();
  if (!name) {
    Notify.warning('Search field can not be empty.');
    return
  }

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
    .catch(error => Notify.failure('Oops, something went wrong!'));
};

const renderCountryList = function (countries) {
  let list = countries
    .map(item => `<li><img class="flag-icon" src=${item.flag}>${item.name}</li>`)
    .join('');
  countryListEl.innerHTML = list;
};
const renderCountryCard = function ([{ flag, name, capital, population, languages }] = item) {
  let text = `<div class="flex"><img class="big-flag" src=${flag}><h1>${name}</h1></div><ul><li><b>Capital:</b>${capital}</li><li><b>Population:</b>${population}</li><li><b>Languages:</b>${languages.map(
    item => item.name,
  )}</li><ul>`;
  countryCardEl.innerHTML = text;
};
const clearAll = function () {
  countryListEl.innerHTML = '';
  countryCardEl.innerHTML = '';
};
inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));