const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

document.addEventListener("DOMContentLoaded", (e) => {
  const main = document.querySelector("main");

  fetch(TRAINERS_URL)
    .then((res) => res.json())
    .then((trainers) => {
      trainers.forEach((trainer) => {
        const trainerCard = document.createElement("div");
        trainerCard.className = "card";
        // trainerCard.set.attribute("data-id", trainer.id)
        trainerCard.dataset.id = trainer.id;
        trainerCard.innerHTML = `<p>${trainer.name}</p>`;
        main.append(trainerCard);
        const addPokemonButton = document.createElement("button");
        addPokemonButton.className = "add-pokemon";
        // addPokemonButton.set.attribute("data-trainer-id", trainer.id)
        addPokemonButton.dataset.trainerId = trainer.id;
        addPokemonButton.innerText = "Add Pokemon";
        trainerCard.append(addPokemonButton);
        const ul = document.createElement("ul");
        ul.dataset.id = trainer.id;
        trainerCard.append(ul);
        trainer.pokemons.forEach((pokemon) => {
          addPokemon(trainer, pokemon);
        });
      });
    });

  const addPokemon = (trainer, pokemon) => {
    const li = document.createElement("li");
    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`;
    const divCard = document.querySelector(`[data-id = "${trainer.id}"]`);
    const ul = divCard.children[2];
    ul.append(li);
    const releasePokemonButton = document.createElement("button");
    releasePokemonButton.className = "release";
    releasePokemonButton.dataset.pokemonId = pokemon.id;
    releasePokemonButton.innerText = "Release";
    li.append(releasePokemonButton);
  };

  const clickHandler = () => {
    document.addEventListener(`click`, (e) => {
      if (e.target.matches(".add-pokemon")) {
        // console.log(e.target.dataset.trainerId);
        fetch(POKEMONS_URL)
          .then((res) => res.json())
          .then((pokemons) => {
            const filteredPokemon = pokemons.filter(
              (pokemon) =>
                pokemon.trainer_id === parseInt(e.target.dataset.trainerId)
            );
            // console.log(filteredPokemon);

            const object = {
              datatype: "pokemons",
              value: {
                nickname: filteredPokemon[0].nickname,
                species: filteredPokemon[0].species,
                id: filteredPokemon[0].id,
              },
            };
            const options = {
              method: "POST",
              headers: {
                "Content-Type": `application/json`,
                Accept: "application/json",
              },
              body: JSON.stringify(object),
            };
            fetch(TRAINERS_URL, options);
          });
      }
    });
  };
  clickHandler();
});
