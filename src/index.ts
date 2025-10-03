import express from "express";
import AuthRouter from "./routes/auth/auth";
import categoryRouter from "./routes/categories";
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
app.use("/api/category", categoryRouter);
app.listen(PORT, () => {
  console.log(`server runnning on ${PORT}`);
});
