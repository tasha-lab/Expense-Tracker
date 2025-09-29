import express from "express";
import AuthRouter from "./routes/auth/auth";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Expense Tracker server is live",
    suscess: true,
  });
});
app.use("/api/auth", AuthRouter);
app.listen(PORT, () => {
  console.log(`server runnning on ${PORT}`);
});
