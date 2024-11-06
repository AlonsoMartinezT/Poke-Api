const API_URL = "https://pokeapi.co/api/v2/";
const fetchPokemon = async(pokemon) =>{
    try {
        const response = await fetch(`${API_URL}pokemon/${pokemon}`);
        const parseRsponse = await response.json();
        return parseRsponse;
    } catch (err) {
        console.error(err)
    }
};

//GET 
document.getElementById('get-btn').addEventListener("click", async() => {
        const text= document.getElementById("poke-name").value.toLowerCase();
        const pokemon = await fetchPokemon(text);
        localStorage.setItem("pokemonId", pokemon.id);
        renderPokemonCard(pokemon);
        console.log(pokemon.name);
});

// GET-PREW
document.getElementById('prev-btn').addEventListener('click', async () =>{
    const currentPokemonId = parseInt(localStorage.getItem('pokemonId'));
    const newId = Math.max(1,currentPokemonId - 1);
    const pokemon = await fetchPokemon(newId);
    localStorage.setItem('pokemonId', newId);
    console.log(newId);
    console.log(pokemon);
    if (pokemon) {
        renderPokemonCard(pokemon);  // Mostrar tarjeta del nuevo Pokémon
    }
});

// GET-NEXT
document.getElementById('next-btn').addEventListener('click', async () =>{
    const currentPokemonId = parseInt(localStorage.getItem('pokemonId'));
    const newId = Math.max(1,currentPokemonId + 1);
    const pokemon = await fetchPokemon(newId);
    localStorage.setItem('pokemonId', newId);
    console.log(newId)
    console.log(pokemon);
    if (pokemon) {
        renderPokemonCard(pokemon);  // Mostrar tarjeta del nuevo Pokémon
    }
});


// Renderizar contenido 
const renderPokemonCard = (pokemon) => {
    const abilities = pokemon.abilities.map((ability) => ability.ability.name).join(", ");
    const cardContainer = document.querySelector('.card--container');
    cardContainer.innerHTML = `
        <div class="pokemon-card">
            <h2> Nombre: ${pokemon.name}</h2>
            <p>ID: ${pokemon.id}</p>
            <p>Peso: ${pokemon.weight} gr</p>
            <p><strong>Habilidades:</strong> ${abilities}</p>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
        </div>
    `;
};

// Cargar el Pokémon almacenado en localStorage al cargar la página
window.addEventListener('load', async () => {
    const savedPokemonId = localStorage.getItem('pokemonId');
    if (savedPokemonId) {
        const pokemon = await fetchPokemon(savedPokemonId);
        if (pokemon) {
            renderPokemonCard(pokemon); 
        }
    }
});
