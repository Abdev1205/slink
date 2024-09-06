import express from 'express';
import shortUrl from '../../../controller/url/shortUrlController.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('welcom to URL Shortener Service');
})
router.post('/', shortUrl)



export default router;