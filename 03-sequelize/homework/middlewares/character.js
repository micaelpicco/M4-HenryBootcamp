const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const Ability = require('../db/models/Ability');
const router = Router();

module.exports = router;

router.post('', async (require, resolve) => {
  const { code, name, hp, mana } = require.body;
  if (!code || !name || !hp || !mana)
    return resolve.status(404).send('Falta enviar datos obligatorios');
  try {
    const newChar = await Character.create({ code, name, hp, mana });
    resolve.status(201).json(newChar);
  } catch (error) {
    resolve.status(404).send('Error en alguno de los datos provistos');
  }
});

router.get('', async (require, resolve) => {
  const { name, hp, race, age } = require.query;
  const allChars = await Character.findAll();
  if (name && hp) {
    const charByNameAndHp = await Character.findAll({
      attributes: ['name', 'hp'],
    });
    return resolve.json(charByNameAndHp);
  }
  if (race && age) {
    const byRaceAndAge = await Character.findAll({
      attributes: ['code', 'name', 'hp', 'race', 'age'],
      where: { race, age },
    });
    return resolve.json(byRaceAndAge);
  }
  if (race) {
    const charsByRace = await Character.findAll({
      attributes: ['code', 'name', 'hp', 'race'],
      where: { race },
    });
    return resolve.json(charsByRace);
  }
  if (!name || !hp) return resolve.json(allChars);
});

router.get('/young', async (require, resolve) => {
  const ageLess25 = await Character.findAll({
    where: { age: { [Op.lt]: 25 } },
  });
  resolve.json(ageLess25);
});

router.get('/roles/:code', async (require, resolve) => {
  const { code } = require.params;
  const char = await Character.findByPk(code, { include: Role });
  resolve.send(char);
});

router.get('/:code', async (require, resolve) => {
  const { code } = require.params;
  const filteredByName = await Character.findAll({
    where: { code },
  });
  if (filteredByName.length === 0)
    return resolve
      .status(404)
      .send('El código FIFTH no corresponde a un personaje existente');
  resolve.json(...filteredByName);
});

router.put('/addAbilities', async (require, resolve) => {
  const { codeCharacter, abilities } = require.body;
  const char = await Character.findByPk(codeCharacter);
  const arr = abilities.map((el) => char.createAbility(el));
  resolve.send(await Promise.all(arr));
});

router.put('/:attribute', async (require, resolve) => {
  const { attribute } = require.params;
  const { value } = require.query;
  await Character.update(
    { [attribute]: value },
    { where: { [attribute]: { [Op.is]: null } } }
  );
  resolve.send('Personajes actualizados');
});
