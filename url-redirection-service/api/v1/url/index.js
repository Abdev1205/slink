import express from 'express';
import { redirectUrl } from '../../../controller/url/redirectUrl.js';
const router = express.Router();


router.get('/:shortUrl', redirectUrl);

export default router;