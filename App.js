import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import users from './Routes/Users_Router.js';
import schedule from 'node-schedule';
import Users from './Models/Actions/Users_Model.js';
import incomes from './Routes/Incomes_Router.js';
import Pools from './Routes/Pools_Router.js';
import Charidy from './Routes/Charidy_Router.js';
import Email from './Routes/Email_Router.js';
import OnEmail from './Controllers/SendEmail_Controll.js';







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




// שליחת אמייל סיכום החודש בסוף כל חודש לועזי 

const rule = new schedule.RecurrenceRule();
rule.month = new schedule.Range(0, 11);
rule.date = 22; 
rule.hour = 18; 
rule.minute = 21
;

const monthlyJob = schedule.scheduleJob(rule, async () => {
    await sendMonthlyEmails();
});
async function sendMonthlyEmails() {
    try {
        const users = await Users.getUsers();
        for (let i = 0; i < users.length; i++) { 
            const user = users[i];
            await OnEmail.sendEmail(user); 
        }
        console.log("All monthly emails sent successfully!");
    } catch (error) {
        console.error("Error sending monthly emails:", error);
    }
}

// port
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`running on port ${port}`);
});