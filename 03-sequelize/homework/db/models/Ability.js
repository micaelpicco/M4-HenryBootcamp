const { DataTypes } = require('sequelize');

// name*: string
// description: text
// mana_cost*: float

module.exports = (sequelize) => {
  sequelize.define(
    'Ability',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'name_mana',
      },
      description: {
        type: DataTypes.TEXT,
      },
      mana_cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: 'name_mana',
        validate: {
          min: 10,
          max: 250,
        },
      },
      summary: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.name} (${Math.floor(
            this.mana_cost
          )} points of mana) - Description: ${this.description}`;
        },
      },
    },
    { timestamps: false }
  );
};
