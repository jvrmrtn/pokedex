const form = document.getElementById("form");
const parent = document.getElementById("parent");
const cards = document.getElementById("cards");
const pokemones = [];

let cardCreated = false;
let pokeObject = {};
let pokeArray = [];
let pokeURL;

/* FUNCIONES POKEDEX */
const getPokemonApi = async (url) => {
  const request = await fetch(url);
  const json = await request.json();
  pokeArray = [...json.results];

  getAllPokemonURL(pokeArray);
};

const getAllPokemonURL = async (pokeArray) => {
  for (const pokemon of pokeArray) {
    const request = await fetch(pokemon.url);
    const pokeInfo = await request.json();
    if (pokeInfo.types.length <= 1) {
      type2: pokeInfo.types[0].type.name;
    } else {
      type2: pokeInfo.types[1].type.name;
    }
    const pokeObjectMini = {
      id: pokeInfo.id,
      name: pokeInfo.name,
      sprite: pokeInfo.sprites.front_default,
      type: pokeInfo.types[0].type.name,
      type2: "",
    };
    if (pokeInfo.types.length <= 1) {
      pokeObjectMini.type2 = pokeInfo.types[0].type.name;
    } else {
      pokeObjectMini.type2 = pokeInfo.types[1].type.name;
    }
    pokemones.push(pokeObjectMini);
  }
  writeAllPokemonMiniCard(pokemones);
};

const writeAllPokemonMiniCard = async (pokemones) => {
  const fragment = document.createDocumentFragment();

  for (const pokemon of pokemones) {
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("cards__card", pokemon.type, pokemon.name);

    const pokemonID = document.createElement("h2");
    pokemonID.classList.add("cards__id", pokemon.name);
    if (pokemon.id.toString().length <= 1) {
      pokemonID.textContent = "#00" + pokemon.id;
    }
    if (pokemon.id.toString().length > 1 && pokemon.id.toString().length <= 2) {
      pokemonID.textContent = "#0" + pokemon.id;
    }
    if (pokemon.id.toString().length > 2 && pokemon.id.toString().length <= 3) {
      pokemonID.textContent = "#" + pokemon.id;
    }

    const pokemonSprite = document.createElement("img");
    pokemonSprite.classList.add("cards__sprite", pokemon.name);
    pokemonSprite.src =
      /* pokemon.sprite; */
      /* "../03. POKEDEX/assets/images/primera generación/gif/" +
      pokemon.name +
      ".gif" */
      "../03. POKEDEX/assets/images/primera generación/png/" +
      pokemon.name +
      ".png";

    const pokemonName = document.createElement("h2");
    pokemonName.classList.add("cards__name", pokemon.name);
    pokemonName.textContent = pokemon.name.toUpperCase();

    const typesPokemon = document.createElement("div");
    typesPokemon.classList.add("cards__types", pokemon.name);

    const pokemonType = document.createElement("h2");
    pokemonType.classList.add("cards__type", pokemon.type, pokemon.name);
    pokemonType.textContent = pokemon.type;

    typesPokemon.append(pokemonType);

    if (pokemon.type !== pokemon.type2) {
      const pokemonType2 = document.createElement("h2");
      pokemonType2.classList.add("cards__type", pokemon.type2, pokemon.name);
      pokemonType2.textContent = pokemon.type2;

      typesPokemon.append(pokemonType2);
    }
    pokemonCard.append(pokemonID, pokemonSprite, pokemonName, typesPokemon);
    fragment.append(pokemonCard);
  }
  cards.append(fragment);
};

/* FUNCIONES TARJETA INFO */
const getPokemonURL = async (pokeArray) => {
  let regularName = form.pokemon.value.toLowerCase();

  if (
    regularName.length <= 3 &&
    regularName !== "muk" &&
    regularName !== "mew"
  ) {
    pokeURL = "https://pokeapi.co/api/v2/pokemon/" + regularName;
    getPokemon(pokeURL);
  } else {
    for (const poke of pokeArray) {
      if (poke.name === regularName) {
        pokeURL = poke.url;
        form.pokemon.value = "";
        getPokemon(pokeURL);
      }
    }
  }
};

const getPokemon = async (url) => {
  const request2 = await fetch(url);
  const pokemon = await request2.json();

  pokeObject = {
    id: pokemon.id,
    sprite: pokemon.sprites.front_default,
    gif:
      "../03. POKEDEX/assets/images/primera generación/gif/" +
      pokemon.name +
      ".gif",
    name: pokemon.name,
    type1: pokemon.types[0].type.name,
    type2: "",
    weight: pokemon.weight,
    height: pokemon.height,
    stat_1_hp: pokemon.stats[0].base_stat,
    stat_2_atk: pokemon.stats[1].base_stat,
    stat_3_def: pokemon.stats[2].base_stat,
    stat_4_atx: pokemon.stats[3].base_stat,
    stat_5_dfx: pokemon.stats[4].base_stat,
    stat_6_spe: pokemon.stats[5].base_stat,
  };

  if (pokemon.types.length <= 1) {
    pokeObject.type2 = pokemon.types[0].type.name;
  } else {
    pokeObject.type2 = pokemon.types[1].type.name;
  }

  buildPokemonCard(pokeObject);
};

const buildPokemonCard = (pokemon) => {
  const fragment = document.createDocumentFragment();

  const parent = document.getElementById("parent");
  parent.classList.add("parent");

  const card = document.createElement("div");
  card.classList.add("card");

  const closeCard = document.createElement("div");
  closeCard.classList.add("closeCard", pokemon.type1);
  closeCard.value = "×";

  const card_sup = document.createElement("div");
  card_sup.classList.add("card__sup", pokemon.type1);
  const card_id = document.createElement("h2");
  card_id.classList.add("card__id");
  if (pokemon.id.toString().length <= 1) {
    card_id.textContent = "#00" + pokemon.id;
  }
  if (pokemon.id.toString().length > 1 && pokemon.id.toString().length <= 2) {
    card_id.textContent = "#0" + pokemon.id;
  }
  if (pokemon.id.toString().length > 2 && pokemon.id.toString().length <= 3) {
    card_id.textContent = "#" + pokemon.id;
  }
  const card_sprite = document.createElement("img");
  card_sprite.classList.add("card__sprite");
  card_sprite.src = pokemon.gif;
  /* card_sprite.src = pokemon.sprite */
  const card_types = document.createElement("div");
  card_types.classList.add("card__types");
  const card_type1 = document.createElement("h2");
  card_type1.classList.add("card__type", pokemon.type1);
  card_type1.textContent = pokemon.type1;
  card_types.append(card_type1);
  if (pokemon.type1 !== pokemon.type2) {
    const card_type2 = document.createElement("h2");
    card_type2.classList.add("card__type", pokemon.type2);
    card_type2.textContent = pokemon.type2;

    card_types.append(card_type2);
  }

  const card_inf = document.createElement("div");
  card_inf.classList.add("card__inf");
  const card_name = document.createElement("h2");
  card_name.classList.add("card__name", pokemon.type1 + "__color");
  card_name.textContent = pokemon.name.toUpperCase();
  const card_trait = document.createElement("div");
  card_trait.classList.add("card__trait");
  const trait_height = document.createElement("div");
  trait_height.classList.add("trait__height");
  const height_label = document.createElement("h3");
  height_label.classList.add("trait__label");
  height_label.textContent = "HEIGHT";
  const height_number = document.createElement("p");
  height_number.classList.add("trait__number", pokemon.type1 + "__color");
  if (pokemon.height.toString().length <= 1) {
    height_number.textContent = `0.${pokemon.height} m`;
  }
  if (pokemon.height.toString().length >= 2) {
    height_number.textContent = `${pokemon.height
      .toString()
      .substring(0, 1)}.${pokemon.height.toString().substring(1, 2)} m`;
  }
  const trait_weight = document.createElement("div");
  trait_weight.classList.add("trait__weight");
  const weight_label = document.createElement("h3");
  weight_label.classList.add("trait__label");
  weight_label.textContent = "WEIGHT";
  const weight_number = document.createElement("p");
  weight_number.classList.add("trait__number", pokemon.type1 + "__color");
  if (pokemon.weight.toString().length === 1) {
    weight_number.textContent = `0.${pokemon.weight} kg`;
  }
  if (pokemon.weight.toString().length === 2) {
    weight_number.textContent = `${pokemon.weight
      .toString()
      .substring(0, 1)}.${pokemon.weight.toString().substring(1, 2)} kg`;
  }
  if (pokemon.weight.toString().length === 3) {
    weight_number.textContent = `${pokemon.weight
      .toString()
      .substring(0, 2)}.${pokemon.weight.toString().substring(2, 3)} kg`;
  }
  if (pokemon.weight.toString().length === 4) {
    weight_number.textContent = `${pokemon.weight
      .toString()
      .substring(0, 3)}.${pokemon.weight.toString().substring(3, 4)} kg`;
  }
  const card_stats = document.createElement("div");
  card_stats.classList.add("card__stats");
  const stats_title = document.createElement("h3");
  stats_title.classList.add("stats__title");
  stats_title.textContent = "BASE STATS";
  const stats_container = document.createElement("div");
  stats_container.classList.add("stats__container");

  const stats_linesHP = document.createElement("div");
  stats_linesHP.classList.add("stats__lines");
  const lines_titleHP = document.createElement("div");
  lines_titleHP.classList.add("lines__title");
  lines_titleHP.textContent = "HP";
  const lines_containerHP = document.createElement("div");
  lines_containerHP.classList.add("lines__container");
  const linesHP = document.createElement("div");
  linesHP.classList.add("lines", "hp");
  linesHP.style.width = (250 / 255) * pokemon.stat_1_hp + "px";

  const stats_linesATK = document.createElement("div");
  stats_linesATK.classList.add("stats__lines");
  const lines_titleATK = document.createElement("div");
  lines_titleATK.classList.add("lines__title");
  lines_titleATK.textContent = "ATK";
  const lines_containerATK = document.createElement("div");
  lines_containerATK.classList.add("lines__container");
  const linesATK = document.createElement("div");
  linesATK.classList.add("lines", "atk");
  linesATK.style.width = (250 / 150) * pokemon.stat_2_atk + "px";

  const stats_linesDEF = document.createElement("div");
  stats_linesDEF.classList.add("stats__lines");
  const lines_titleDEF = document.createElement("div");
  lines_titleDEF.classList.add("lines__title");
  lines_titleDEF.textContent = "DEF";
  const lines_containerDEF = document.createElement("div");
  lines_containerDEF.classList.add("lines__container");
  const linesDEF = document.createElement("div");
  linesDEF.classList.add("lines", "def");
  linesDEF.style.width = (250 / 230) * pokemon.stat_3_def + "px";

  const stats_linesATX = document.createElement("div");
  stats_linesATX.classList.add("stats__lines");
  const lines_titleATX = document.createElement("div");
  lines_titleATX.classList.add("lines__title");
  lines_titleATX.textContent = "ATX";
  const lines_containerATX = document.createElement("div");
  lines_containerATX.classList.add("lines__container");
  const linesATX = document.createElement("div");
  linesATX.classList.add("lines", "atx");
  linesATX.style.width = (250 / 154) * pokemon.stat_4_atx + "px";

  const stats_linesDFX = document.createElement("div");
  stats_linesDFX.classList.add("stats__lines");
  const lines_titleDFX = document.createElement("div");
  lines_titleDFX.classList.add("lines__title");
  lines_titleDFX.textContent = "DFX";
  const lines_containerDFX = document.createElement("div");
  lines_containerDFX.classList.add("lines__container");
  const linesDFX = document.createElement("div");
  linesDFX.classList.add("lines", "dfx");
  linesDFX.style.width = (250 / 230) * pokemon.stat_5_dfx + "px";

  const stats_linesSPE = document.createElement("div");
  stats_linesSPE.classList.add("stats__lines");
  const lines_titleSPE = document.createElement("div");
  lines_titleSPE.classList.add("lines__title");
  lines_titleSPE.textContent = "SPE";
  const lines_containerSPE = document.createElement("div");
  lines_containerSPE.classList.add("lines__container");
  const linesSPE = document.createElement("div");
  linesSPE.classList.add("lines", "spe");
  linesSPE.style.width = (250 / 160) * pokemon.stat_6_spe + "px";

  card.append(card_sup, card_inf, closeCard);

  card_sup.append(card_id, card_sprite, card_types);
  card_inf.append(card_name, card_trait, card_stats);

  card_trait.append(trait_height, trait_weight);
  trait_height.append(height_label, height_number);
  trait_weight.append(weight_label, weight_number);
  card_stats.append(stats_title, stats_container);
  stats_container.append(
    stats_linesHP,
    stats_linesATK,
    stats_linesDEF,
    stats_linesATX,
    stats_linesDFX,
    stats_linesSPE
  );
  stats_linesHP.append(lines_titleHP, lines_containerHP, linesHP);
  stats_linesATK.append(lines_titleATK, lines_containerATK, linesATK);
  stats_linesDEF.append(lines_titleDEF, lines_containerDEF, linesDEF);
  stats_linesATX.append(lines_titleATX, lines_containerATX, linesATX);
  stats_linesDFX.append(lines_titleDFX, lines_containerDFX, linesDFX);
  stats_linesSPE.append(lines_titleSPE, lines_containerSPE, linesSPE);

  fragment.append(card);
  parent.append(fragment);

  cardCreated = true;
  pokeURL = "";
};

/* EVENTOS DE LA PAGINA */
parent.addEventListener("click", (e) => {
  if (e.target.classList.contains("closeCard")) {
    e.target.parentElement.remove();
    parent.classList.remove("parent");
    cardCreated = false;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (cardCreated !== true) {
    if (form.pokemon.value !== "") {
      getPokemonURL(pokeArray);
    }
  }
});

cards.addEventListener("click", (e) => {
  for (const className of e.target.classList) {
    for (const poke of pokeArray) {
      if (className === poke.name) {
        pokeURL = poke.url;
        getPokemon(pokeURL);
      }
    }
  }
});

getPokemonApi("https://pokeapi.co/api/v2/pokemon?limit=385");
