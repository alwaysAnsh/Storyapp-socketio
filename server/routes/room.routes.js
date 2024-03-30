import  express  from "express";
import { createRoom, getRoom, test } from "../controllers/room.controller.js";

const router = express.Router();

router.post('/create', createRoom)
router.get('/getroom', getRoom)
router.get('/test', test)

export default router;