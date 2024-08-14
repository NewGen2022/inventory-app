import express from 'express';
import {
    getAllItems,
    getAllCategoryItems,
    getItem,
} from '../controllers/categoriesController.js';
import { handleItemChanging } from '../controllers/formsController.js';

const router = express.Router();

// route for getting all available items
router.get('/', getAllItems);
// route for getting category items by category id
router.get('/category/:id', getAllCategoryItems);
// route for getting item by id
router.get('/item/:id', getItem);

// route for item deleting
router.post('/item/:id', handleItemChanging);

export default router;
