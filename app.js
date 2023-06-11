const getPokemonURL=nome => `https://pokeapi.co/api/v2/pokemon/${nome}`

const fetchPokemon=()=>{

    const pokemonPromise =[]
   for (let i = 1; i <= 150; i++) {
        /**Fetch recebe a URL da API */
        pokemonPromise.push(fetch(getPokemonURL(i)).then(response => response.json())) 
   }
   
   /**Promise.all()   retorna uma única Promise que resolve quando todas as promises no argumento iterável forem resolvidas ou quando o iterável passado como argumento não contém promises. É rejeitado com o motivo da primeira promise que foi rejeitada.*/

   Promise.all(pokemonPromise)
    .then(pokemons =>{ 
        console.log(pokemons)
    
        const lisPokemons = pokemons.reduce((accumulator, pokemon)=>{
            accumulator += 
            `<li class="card ${pokemon.types.map((typeInfo)=> typeInfo.type.name)[0]}">
                <img class="card-image" src="${pokemon.sprites.other.dream_world.front_default
                }"/>
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                
                <p class="card-subtitle">${pokemon.types.map((typeInfo)=> typeInfo.type.name).join(' | ')}</p>
                
                
            </li>`
            return accumulator
        }, '')

        const ul = document.querySelector('[data-js="pokedex"]')
        ul.innerHTML=lisPokemons
    }) 
}

fetchPokemon()