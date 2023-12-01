import express from "express";
const router = express.Router();

import checkAuth from "../middleware/checkAuth.js";


// anly to test
router.get("/", checkAuth, (req,res) => {
    res.json(dbToTest)
})




export default router