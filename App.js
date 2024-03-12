import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import users from './Routes/Users_Router.js';
import incomes from './Routes/Incomes_Router.js';
app.use("/", users)
app.use("/income" , incomes);



const port = process.env.PORT;
// port
app.listen(port, () => {
    console.log(`running on port ${port}`);
});