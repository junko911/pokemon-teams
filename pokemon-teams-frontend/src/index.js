const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

const ce = (tag) => document.createElement(tag)
const qc = (selector) => document.querySelector(selector)
const main = qc('main')

const getTrainers = () => {
  fetch(TRAINERS_URL)
    .then((res) => res.json())
    .then((trainers) => { trainers.forEach(addTrainerOnDom) })
}

const addTrainerOnDom = ({ id, name, pokemons }) => {
  const trainerCard = ce('div')
  main.append(trainerCard)
  trainerCard.className = "card";
  trainerCard.dataset.id = id;

  const p = ce('p')
  trainerCard.append(p)
  p.textContent = name

  const addPokemonButton = ce('button')
  trainerCard.append(addPokemonButton)
  addPokemonButton.className = 'add-pokemon'
  addPokemonButton.dataset.trainerId = id
  addPokemonButton.textContent = 'Add Pokemon'

  const ul = ce('ul')
  trainerCard.append(ul)
  ul.dataset.id = id

  pokemons.forEach((pokemon) => { addPokemon(ul, pokemon) })
}
  
const addPokemon = (ul, pokemon) => {
  const li = ce('li')
  ul.append(li)
  li.textContent = `${pokemon.nickname} (${pokemon.species})`

  const releasePokemonButton = ce('button')
  li.append(releasePokemonButton)
  releasePokemonButton.className = 'release'
  releasePokemonButton.dataset.pokemonId = pokemon.id
  releasePokemonButton.textContent = 'Release'
}

const clickHandler = () => {
  document.addEventListener('click', e => {
    const btnClass = e.target.className
    switch (btnClass) {
      case 'add-pokemon':
        fetchPokemon(e.target)
        break
      case 'release':
        deletePokemon(e.target)
        break
      default: 
        break
    }
  })
}

const fetchPokemon = (target) => {
  const ul = target.nextElementSibling
  const trainer_id = target.dataset.trainerId
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( { trainer_id })
  }

  fetch(POKEMONS_URL, options)
  .then(res => res.json())
  // .then(res => {
    // res.json()
    // if (res.status !== 201) {
    //   console.log(res)
    // }
  // })
  .then(pokemon => addPokemon(ul, pokemon))
}

const deletePokemon = (target) => {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  }
  fetch(POKEMONS_URL + '/' + target.dataset.pokemonId, options)
  .then(res => res.json())
  .then(pokemon => {
    target.parentElement.remove()
  })
}

getTrainers()
clickHandler()
