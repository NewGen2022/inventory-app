import express from 'express';
import dotenv from 'dotenv';

// environment config
dotenv.config();
const PORT = process.env.PORT || 8000;

// main app variable
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set templating language to ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { text: 'World' });
});

// run server
app.listen(PORT, () => {
    `Server running on port ${PORT}`;
});
