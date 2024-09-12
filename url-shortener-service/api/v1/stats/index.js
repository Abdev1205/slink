import express from 'express';
import shortUrl from '../../../controller/url/shortUrlController.js';
import { authenticateUser } from '../../../middleware/authMiddleware.js';
import getWeeklyData from '../../../controller/stats/getWeeklyData.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('welcom to URL Shortener Service');
})
router.get('/weekly', authenticateUser, getWeeklyData)



export default router;