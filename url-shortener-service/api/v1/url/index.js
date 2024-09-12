import express from 'express';
import shortUrl from '../../../controller/url/shortUrlController.js';
import { authenticateUser } from '../../../middleware/authMiddleware.js';
import { getUrlById } from '../../../controller/url/getUrlById.js';
import { getUrls } from '../../../controller/url/getUrl.js';

const router = express.Router();

router.post('/', authenticateUser, shortUrl)
router.get('/', authenticateUser, getUrls)
router.get('/:id', authenticateUser, getUrlById)



export default router;