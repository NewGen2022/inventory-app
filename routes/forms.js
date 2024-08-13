import express from 'express';
import {
    newForm,
    handleCategoryAdding,
    handleCategoryDeleting,
} from '../controllers/formsController.js';

const router = express.Router();

// Route to render forms
router.get('/:formType/:action', newForm);

// Route to handle form submission
router.post('/category/create', handleCategoryAdding);
router.post('/category/delete', handleCategoryDeleting);

export default router;
