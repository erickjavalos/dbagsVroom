// import libraries
import path from "path"
import { Router } from 'express';
const router = Router();
// import helper files
import apiRoutes from "./api/index.js"

// API routes
router.use('/api', apiRoutes);

// export router
export default router;
