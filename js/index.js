const container = document.querySelector('.container');
const search = container.querySelector('.search');
const searchForm = search.querySelector('.search__form');
const searchTerm = searchForm.querySelector('.search__input');
const resultCount = container.querySelector('.result__count');
const resultCountNumber = resultCount.querySelector('.result__count-number');
const pokemonName = resultCountNumber.nextElementSibling;
const resultGrid = container.querySelector('.result__grid');
const loader = container.querySelector('.loader');

const API_URL = '//api.pokemontcg.io/v1/cards?name=';

function getPokemon(e) {
  e.preventDefault();
  
  loader.classList.add('loader--active');
  
  fetch(`${API_URL}${searchTerm.value}`)
    .then(res => res.json())
    .then(pokemons => {
      resultGrid.innerHTML = '';
      resultCountNumber.innerHTML = pokemons.cards.length;
      pokemonName.innerHTML = searchTerm.value;
      
      // Display all pokemon into grids
      for (let i = 0; i < pokemons.cards.length; i++) {
        const _cards = document.createElement('div');
        _cards.className = 'card';
        resultGrid.appendChild(_cards)
        
        const _img = document.createElement('img');
        _img.src = pokemons.cards[i].imageUrl;
        _img.setAttribute('class', 'card__img');
        _cards.appendChild(_img);
        
        const _pokemonName = document.createElement('div');
        _pokemonName.innerHTML = pokemons.cards[i].name;
        _pokemonName.setAttribute('class', 'card__title')
        
        _cards.appendChild(_pokemonName);
      }
    
      loader.classList.remove('loader--active');
    })
    .catch(err => {
      console.log(err);
      resultCount.innerHTML = 'Something is wrong' + err;
    })
}

searchForm.addEventListener('submit', getPokemon)

document.addEventListener('DOMContentLoaded', getPokemon);