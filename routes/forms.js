import express from 'express';
import {
    newForm,
    handleCategoryAdding,
} from '../controllers/formsController.js';

const router = express.Router();

// Route to render forms
router.get('/:formType/:action', newForm);

// Route to handle form submission
router.post('/:formType/:action', handleCategoryAdding);

export default router;
