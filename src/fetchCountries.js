export function fetchCountries(name) {
    
  fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flag,languages`)
    .then(response => {
      if (!response) {
        throw new Error(response.status);
      }
      return response.json();
    })
     
    
}