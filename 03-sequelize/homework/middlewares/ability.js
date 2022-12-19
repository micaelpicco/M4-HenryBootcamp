const { Router } = require('express');
const { Ability, Character } = require('../db');
// const Character = require('../db/models/Character');
const router = Router();

module.exports = router;

router.post('', async (require, resolve) => {
  const { name, mana_cost } = require.body;
  try {
    const newAbility = await Ability.create({ name, mana_cost });
    resolve.status(201).json(newAbility);
  } catch (error) {
    resolve.status(404).send('Falta enviar datos obligatorios');
  }
});

router.put('/setCharacter', async (require, resolve) => {
  const { idAbility, codeCharacter } = require.body;
  const Aby = await Ability.findOne({
    where: {
      id: idAbility,
    },
  });
  await Aby.setCharacter(codeCharacter);
  resolve.json(Aby);
});
