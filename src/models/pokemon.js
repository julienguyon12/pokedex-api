const validTypes = [
  "Plante",
  "Poison",
  "Eau",
  "Feu",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom est déjà pris.",
        },
        validate: {
          notEmpty: { msg: "Le nom ne peut pas être vide." },
          notNull: { msg: "Le nom est une propriété requise" },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez des nombres entiers pour les points de vie" },
          notNull: { msg: "Les points de vie sont une propriété requise" },
          min: {
            args: [0],
            msg: "Utilisez des nombres entiers supérieurs ou égale à 0 pour les points de vie",
          },
          max: {
            args: [999],
            msg: "Utilisez des nombres entiers inférieur à 1000 pour les points de vie",
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez des nombres entiers pour les dégats" },
          notNull: { msg: "Les dégats sont une propriété requise" },
          min: {
            args: [0],
            msg: "Utilisez des nombres entiers supérieurs ou égale à 0 pour les dégats",
          },
          max: {
            args: [99],
            msg: "Utilisez des nombres entiers inférieur à 100 pour les dégats",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: { msg: "Utilisez uniquement une URL valide pour l'image" },
          notNull: { msg: "L'image est une propriété requise" },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypesValid(value) {
            if (!value) {
              throw new Error("Un pokemon doit au moins avoir un type");
            }
            if (value.split(",").length > 3) {
              throw new Error("Un pokemon doit avoir moins de 4 type");
            }
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Ce type de Pokemon n'existe pas. Le pokemon doit appartenir à la liste suivante ${validTypes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
