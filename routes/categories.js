import express from 'express';
import {
    getAllItems,
    getAllCategoryItems,
    getItem,
} from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/', getAllItems);
router.get('/category/:id', getAllCategoryItems);
router.get('/item/:id', getItem);

export default router;
