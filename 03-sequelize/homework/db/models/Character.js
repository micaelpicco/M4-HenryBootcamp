const { DataTypes } = require('sequelize');

// code*: string (Máximo 5 caracteres) [PK]
// name*: string (Debe ser único)
// age: integer
// race: enum (Posibles valores: 'Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other')
// hp*: float
// mana*: float
// date_added: timestamp without time

module.exports = (sequelize) => {
  sequelize.define(
    'Character',
    {
      code: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
          len: [0, 5],
          notHenry() {
            if (this.code.toLowerCase() === 'henry') throw 'nope';
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notContains: ['Henry', 'Soyhenry', 'Soy Henry'],
        },
      },
      age: {
        type: DataTypes.INTEGER,
        defaultValue: null,
        get() {
          return this.getDataValue('age')
            ? `${this.getDataValue('age')} years old`
            : this.getDataValue('age');
        },
      },
      race: {
        type: DataTypes.ENUM(
          'Human',
          'Elf',
          'Machine',
          'Demon',
          'Animal',
          'Other'
        ),
        defaultValue: 'Other',
      },
      hp: {
        type: DataTypes.FLOAT,
      },
      mana: {
        type: DataTypes.FLOAT,
      },
      date_added: {
        type: DataTypes.DATEONLY,
        defaultValue: sequelize.fn('NOW'),
      },
    },
    { timestamps: false }
  );
};
