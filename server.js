import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import initDB from './db/initDB.js';
import homePageRouter from './routes/homePage.js';
import categoriesRouter from './routes/categories.js';
import formsRouter from './routes/forms.js';

// environment config
dotenv.config();
const PORT = process.env.PORT || 8000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// main app
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve static files from the 'public' directory

// routes
app.use('/', homePageRouter);
app.use('/allItems', categoriesRouter);
app.use('/form', formsRouter);

// set templating language to ejs
app.set('view engine', 'ejs');

// database initialization
initDB()
    .then(() => {
        // run server
        app.listen(PORT, () => {
            `Server running on port ${PORT}`;
        });
    })
    .catch((error) => {
        console.error('Failed to initialize database:', error);
    });
