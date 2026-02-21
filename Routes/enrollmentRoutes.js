import express from 'express';
import { createEnrollment, getEnrollments, deleteEnrollment } from '../Controllers/enrollmentController.js';
import authMiddleware from '../Middleware/auth.js';

const router = express.Router();

// Public route to submit enrollment
router.post('/', createEnrollment);

// Protected routes for admin
router.get('/', authMiddleware(['admin']), getEnrollments);
router.delete('/:id', authMiddleware(['admin']), deleteEnrollment);

export default router;
