import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import users from './Routes/Users_Router.js';
import incomes from './Routes/Incomes_Router.js';
import Pools from './Routes/Pools_Router.js';
import Charidy from './Routes/Charidy_Router.js';
import Email from './Routes/Email_Router.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", users);
app.use("/income" , incomes);
app.use("/pool" , Pools);
app.use("/charidy" , Charidy);
app.use("/email" , Email);



const port = process.env.PORT;
// port
app.listen(port, () => {
    console.log(`running on port ${port}`);
});