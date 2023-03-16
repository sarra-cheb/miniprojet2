const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const passport = require('passport');

const app = express();

require('./DataBase/connect')
require('./Passport-strategie/bearer')

app.use(require('express-session')({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyparser.json())

app.use('/api', require('./Routes/AdminApi'))
app.use('/api', require('./Routes/AuthApi'))
app.use('/api', require('./Routes/EtudiantApi'))
app.use('/api', require('./Routes/LivreApi'))

app.use('/api', require('./Routes/VerifyApi'))

app.listen(4000, console.log('App running on port ')
)