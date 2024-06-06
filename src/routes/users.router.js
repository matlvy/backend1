import { Router } from "express";
const router = Router();

const users = [];

router.get("/", (req, res) => {
  res.json(users);
});
router.post("/", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.send("a new user has been successfully created");
});
export default router;
