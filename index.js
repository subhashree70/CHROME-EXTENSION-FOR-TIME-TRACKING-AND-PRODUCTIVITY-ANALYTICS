const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/webtracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Activity = require("./models/Activity");
app.post("/api/activity", async (req, res) => {
  const { website, duration } = req.body;
  await Activity.create({ website, duration, date: new Date() });
  res.send({ status: "ok" });
});

app.get("/api/weekly", async (req, res) => {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const data = await Activity.aggregate([
    { $match: { date: { $gte: weekAgo } } },
    { $group: { _id: "$website", total: { $sum: "$duration" } } }
  ]);
  res.json(data);
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));