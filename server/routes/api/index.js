import { Router } from 'express';
const router = Router();
// helper files
import mint from "./mint.js"

// instantiate mint apis endpoint
router.use('/mint', mint);

export default router;
