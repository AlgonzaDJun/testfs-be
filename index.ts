import express from "express";
import connectDB from "./config/db";
import authRoute from "./routes/auth-route";
import productRoute from "./routes/product-route";
import morgan from "morgan";
import cors from "cors"
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./DOKUMENTASI_API.yml');

const app = express();

// connect to database
connectDB();

// middleware
app.use(cors())
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// home
app.get("/", (_, res) => {
  res.send("Hello there👋🏻");
});

// routes
app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(3000, () => {
  console.log("Server running at : http://localhost:3000");
});
