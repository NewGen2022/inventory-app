import express from 'express';
import {
    newForm,
    handleCategoryAdding,
    handleItemAdding,
    handleCategoryDeleting,
    handleItemEditing,
} from '../controllers/formsController.js';

const router = express.Router();

// route to render forms
router.get('/:formType/:action/:id?', newForm);

// route for category creating
router.post('/category/create', handleCategoryAdding);
// route for category deleting
router.post('/category/delete', handleCategoryDeleting);

// route for item creating
router.post('/item/create', handleItemAdding);
// route for updating item values
router.post('/item/edit/:id', handleItemEditing);

export default router;
