const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
const pokemons = require("./mock-pokemon");
const bcrypt = require("bcrypt");

let sequelize;
if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(
    "bzlrzsnsqajaqbfrmemx",
    "ucmyveelxa5gwhf0",
    "FLEHQbESDo2QKV2aGmPf",
    {
      host: "bzlrzsnsqajaqbfrmemx-mysql.services.clever-cloud.com",
      dialect: "mysql",
    }
  );
}
{
  sequelize = new Sequelize("pokedex", "root", "RAfikan31!!", {
    host: "localhost",
    dialect: "mysql",
  });
}
const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync().then((_) => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });

    bcrypt
      .hash("pikachu", 10)
      .then((hash) => User.create({ username: "pikachu", password: hash }))
      .then((user) => console.log(user.toJSON()));

    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
