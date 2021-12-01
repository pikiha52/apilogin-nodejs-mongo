import express from "express";
import {
    signin,
    signUp
} from "../controllers/loginControllers.js";

const router = express.Router();

router.get('/signin', signin);
router.post('/signup', signUp);

export default router;