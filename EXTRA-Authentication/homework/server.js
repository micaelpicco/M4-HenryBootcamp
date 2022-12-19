const express = require('express');
const morgan = require('morgan');
const cookieparser = require('cookie-parser');

const app = express();

const users = [
  { id: 1, name: 'Franco', email: 'Franco@mail.com', password: '1234' },
  { id: 2, name: 'Toni', email: 'Toni@mail.com', password: '1234' },
];

app.use(morgan('dev'));

app.use(cookieparser());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

app.get('/', (req, res) => {
  res.send(`
    <h1>Bienvenidos a Henry!</h1>
    ${
      req.cookies.userId
        ? `
      <a href='/home'>Perfil</a>
      <form method='post' action='/logout'>
        <button>Salir</button>
      </form>
      `
        : `
      <a href='/login'>Ingresar</a>
      <a href='/register'>Registrarse</a>
      `
    }
  `);
});

app.get('/register', (req, res) => {
  res.send(`
    <h1>Registrarse</h1>
    <form method='post' action='/register'>
      <input name='name' placeholder='Nombre' required />
      <input type='email' name='email' placeholder='Email' required />
      <input type='password' name='password' placeholder='Contraseña' required />
      <input type='submit' value='Registrarse' />
    </form>
    <a href='/login'>Iniciar sesión</a>
  `);
});

app.get('/login', (req, res) => {
  res.send(`
    <h1>Iniciar sesión</h1>
    <form method='post' action='/login'>
      <input type='email' name='email' placeholder='Email' required />
      <input type='password' name='password' placeholder='Contraseña' required />
      <input type='submit' value='Ingresar' />
    </form>
    <a href='/register'>Registrarse</a>
  `);
});

app.get('/home', (req, res) => {
  const user = users.find((el) => el.id === Number(req.cookies.userId));
  res.send(`
    <h1>Bienvenido ${user.name}</h1>
    <h4>${user.email}</h4>
    <a href='/'>Inicio</a>
  `);
});

app.post('/login', (req, res) => {
  // 1) Obtener el email y password desde el body del request
  // 2) Verificar que ambos datos hayan sido provistos
  // Si ambos datos fueron provistos:
  //   a) Obtener del listado de usuarios (si existe) el que tenga dicho email y contraseña
  //   b) Guardar los datos del usuario en la cookie: res.cookie('userId', user.id) donde el primer
  //   parámetro es el nombre de la cookie y el segundo su valor
  //   c) Redirigir a /home
  // En el caso de que no exista un usuario con esos datos o directamente no se hayan provisto o
  // el email o la password, redirigir a /login
  const { email, password } = req.body;
  const user = users.find((el) => el.email === email);
  if (!email || !password || !user) return res.redirect('/login');
  res.cookie('userId', user.id).redirect('/home');
});

app.post('/register', (req, res) => {
  // 1) Obtener el name, email y password desde el body del request
  // 2) Verificar que los tres datos hayan sido provistos
  // Si todos los datos fueron provistos:
  //   a) Buscar dentro del listado de usuarios si existe alguno que tenga dicho email para evitar
  //      que existan dos usuarios con mismo mail
  //   b) Crear un nuevo objeto con los datos del usuario y pushearlo al array de users
  //   c) Redirigir a la pantalla inicial '/'
  // En el caso de que ya exista un usuario con ese email o no se hayan provisto o
  // el name o el email o la password, redirigir a /register
});

app.post('/logout', (req, res) => {
  res.clearCookie('userId');
  res.redirect('/');
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening on localhost:3000');
  }
});
