import express from "express";
const router = express.Router();

// @routes     GET api/user
// @desc       Get user
router.get("/", async (req, res) => {
  res.status(200).send("유저 상태");
});

export default router;
