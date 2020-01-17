import express from 'express';
import reservations from './reservations';

const router = express.Router();

router.use('/reservations', reservations);

export default router;
