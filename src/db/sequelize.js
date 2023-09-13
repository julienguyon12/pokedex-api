const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
const pokemons = require("./mock-pokemon");
const bcrypt = require("bcrypt");

// const sequelize = new Sequelize({
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   dialect: "mysql",
//   port: process.env.DATABASE_PORT,
//   host: process.env.DATABASE_HOST,
// });

// let sequelize;
// if (process.env.NODE_ENV === "production") {
// const sequelize = new Sequelize(
//   "bzlrzsnsqajaqbfrmemx",
//   "ucmyveelxa5gwhf0",
//   "FLEHQbESDo2QKV2aGmPf",
//   {
//     host: "bzlrzsnsqajaqbfrmemx-mysql.services.clever-cloud.com",
//     dialect: "mysql",
//   }
// );
// }
// {
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  }
);
console.log(process.env.DATABASE_HOST);

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
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
