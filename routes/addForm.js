import express from 'express';
import { addNew } from '../controllers/addFormController.js';

const router = express.Router();

router.get('/:formType', addNew);

export default router;
