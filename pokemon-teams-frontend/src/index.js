const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', e => {
  const main = document.querySelector('main')

  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(trainers => {
    trainers.forEach(trainer => {
      const trainerCard = document.createElement('div')
      trainerCard.className = 'card'
      // trainerCard.set.attribute("data-id", trainer.id)
      trainerCard.dataset.id = trainer.id
      trainerCard.innerHTML = `<p>${trainer.name}</p>`
      main.append(trainerCard)
      const addPokemonButton = document.createElement('button')
      // addPokemonButton.set.attribute("data-trainer-id", trainer.id)
      addPokemonButton.dataset.trainerId = trainer.id
      addPokemonButton.innerText = 'Add Pokemon'
      trainerCard.append(addPokemonButton)
      const ul = document.createElement('ul')
      trainerCard.append(ul)
      trainer.pokemons.forEach(pokemon => {
        const li = document.createElement('li')
        li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
        ul.append(li)
        const releasePokemonButton = document.createElement('button')
        releasePokemonButton.className = 'release'
        releasePokemonButton.dataset.pokemonId = pokemon.id
        releasePokemonButton.innerText = 'Release'
        li.append(releasePokemonButton)
      })
    })
  })



})
