import express from 'express';
import shortUrl from '../../../controller/url/shortUrlController.js';
import { authenticateUser } from '../../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('welcom to URL Shortener Service');
})
router.post('/', authenticateUser, shortUrl)



export default router;