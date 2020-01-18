import express from 'express';
import * as db from '@upstay/db/reservations';

const router = express.Router();

router.get('/', db.getReservations);

export default router;
