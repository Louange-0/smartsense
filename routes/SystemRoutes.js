import { Router } from 'express';
const router = Router();
import { getAllAccidents, getAllOverspeeds, getAllDisconnected, addAccident, addOverspeeding, addDisconnected, getStats } from '../controllers/SystemController.js';

router.get('/accidents', getAllAccidents);
router.get('/overspeeds', getAllOverspeeds);
router.get('/disconnected', getAllDisconnected);
router.post('/add-accident', addAccident);
router.post('/add-overspeeding', addOverspeeding);
router.post('/add-disconnected', addDisconnected);
router.get('/stats', getStats);

export default router;
