import nodeOutlook from "nodejs-nodemailer-outlook";
import Incom_M from "../Models/Actions/Incomes_Model.js";
import Pool_M from "../Models/Actions/Pool_Model.js";
import Charidy_M from "../Models/Actions/Charidy_Model.js";
import Users from "../Models/Actions/Users_Model.js";


class Email {
  async sendEmail(req, res) {
    try {
      const users = await Users.getUsers();
   

      for (const user of users) {
        const { id, email } = user;

        // קבלת נתוני המשתמש
        const IncomeFdb = await Incom_M.getIncomsByUser_id(id);
        const PoolFdb = await Pool_M.getPoolByUser_id(id);
        const CharidyFdb = await Charidy_M.getOnlyCharidyByUser_id(id);
        const MaaserFdb = await Charidy_M.getMaasrotByUser_id(id);

        // חישוב סכומי ההכנסות והוצאות
        const totalIncome = IncomeFdb.reduce(
          (total, income) => total + parseFloat(income.dataValues.income_value),
          0
        );
        const totalPool = PoolFdb.reduce(
          (total, pool) => total + parseFloat(pool.dataValues.pool_value),
          0
        );
        const totalCharidy = CharidyFdb.reduce(
          (total, charidy) =>
            total + parseFloat(charidy.dataValues.charidy_value),
          0
        );
        const totalMaaser = MaaserFdb.reduce(
          (total, maaser) =>
            total + parseFloat(maaser.dataValues.charidy_value),
          0
        );

        const totalMaaserLeft = IncomeFdb.reduce(
          (total, income) =>
            total + (parseFloat(income.dataValues.income_value) * 0.1),
          0
        );

        const calculate =totalMaaser - totalMaaserLeft  ;
        let maaserText = "";
        if (totalMaaser === totalMaaserLeft) {
          maaserText = ` הופרשו מעשרות כדין נהדר! `;
        } else if (totalMaaser > totalMaaserLeft) {
          maaserText = ` הופרשו מעשרות מעל ומעבר כל הכבוד! `;
        } else if (totalMaaser < totalMaaserLeft) {
          maaserText = `נשאר לך עוד מעשרות להפריש החודש בסך : ${calculate.toFixed(2)}`;
        }
        const total = totalIncome - totalPool - totalCharidy;



        // פונקציה להמרת התאריך לתבנית מסוימת
        const formatDate = (date) => {
          const d = new Date(date);
          const day = d.getDate().toString().padStart(2, "0");
          const month = (d.getMonth() + 1).toString().padStart(2, "0");
          const year = d.getFullYear();
          return `${day}/${month}/${year}`;
        };

        // הכנת התבנית ה-HTML לאימייל
        const htmlTemplate = `
          <html>
          <head>
            <style>
              .container {
                display: flex;
                justify-content: space-between;
                background-image: url('https://th.bing.com/th/id/OIG1.ty4oP4kp7KFkdlcSTJ8S?pid=ImgGn');
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                background-attachment: fixed;
              }
              .table-container {
                flex: 1;
                margin: 10px;
              }
              .head-of-tabels{
                color: white;
                text-align: center;
                font-size: 1.5em;
              }
              .headTable{
                text-align: center;
                font-size: 2em;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
                text-align: center;
              }
              th, td {
                padding: 8px;
                text-align: center;
                border-bottom: 1px solid #ddd;
              }
              th {
                background-color: #f2f2f2;
              }
              .total-container {
                margin-top: 20px;
                text-align: center;
                font-size: 1.2em;
              }
              td{
                background-color: rgba(255, 255, 255, 0.5);
                backdrop-filter: blur(5px);
              }
              .congrats-message {
                text-align: center;
                margin-top: 20px;
                font-size: 1.2em;
                color: green; 
              }
              .next-month-message {
                text-align: center;
                margin-top: 20px;
                font-size: 1.2em;
                color: red; 
              }
              .CoTitle{
                font-size: 1.2em;
              }
            </style>
          </head>
          <body dir="rtl">
            <h6> מומלץ לסובב את הפלאפון לרוחב לתצוגה מירבית </h6>
            <h1 class= "headTable">סיכום פעילות חודשי</h1>
            <div class="container">
              <div class="table-container">
                <h2 class = "head-of-tabels">הכנסות:</h2>
                <table>
                  <thead>
                    <tr>
                      <th>סכום ההכנסה</th>
                      <th>מקור ההכנסה</th>
                      <th>תאריך ההכנסה</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${IncomeFdb.map(
                      (income) => `
                    <tr>
                      <td>${income.dataValues.income_value} ש"ח</td>
                      <td>${income.dataValues.source}</td>
                      <td>${formatDate(income.dataValues.createdAt)}</td>
                    </tr>`
                    ).join("")}
                  </tbody>
                </table>
              </div>
              <div class="table-container">
                <h2 class = "head-of-tabels"> הוצאות:</h2>
                <table>
                  <thead>
                    <tr>
                      <th>סכום ההוצאה</th>
                      <th>סיבת ההוצאה</th>
                      <th>תאריך ההוצאה</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${PoolFdb.map(
                      (pool) => `
                    <tr>
                      <td>${pool.dataValues.pool_value} ש"ח</td>
                      <td>${pool.dataValues.resion}</td>
                      <td>${formatDate(pool.dataValues.createdAt)}</td>
                    </tr>`
                    ).join("")}
                  </tbody>
                </table>
              </div>
              <div class="table-container">
                <h2 class="head-of-tabels">תרומות:</h2>
                <table>
                  <thead>
                    <tr>
                      <th>סכום התרומה</th>
                      <th>יעד התרומה</th>
                      <th>תאריך התרומה</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colspan="3"><b class ="CoTitle"> צדקה: </b></td> 
                    </tr>
                    ${CharidyFdb.map(
                      (charidy) => `
                    <tr>
                      <td>${charidy.dataValues.charidy_value} ש"ח</td>
                      <td>${charidy.dataValues.resion}</td>
                      <td>${formatDate(charidy.dataValues.createdAt)}</td>
                    </tr>`
                    ).join("")}
                    <tr>
                      <td colspan="3"><b class ="CoTitle"> מעשרות: </b></td> 
                    </tr>
                    ${MaaserFdb.map(
                      (maaser) => `
                    <tr>
                      <td>${maaser.dataValues.charidy_value} ש"ח</td>
                      <td>${maaser.dataValues.resion}</td>
                      <td>${formatDate(maaser.dataValues.createdAt)}</td>
                    </tr>`
                    ).join("")}
                  </tbody>
                </table>
              </div>
            </div>
            <div class="total-container">
              <strong>סך הכל הכנסות: ${totalIncome.toFixed(2)} ש"ח</strong>
              <br>
              <strong>סך הכל הוצאות: ${totalPool.toFixed(2)} ש"ח</strong>
              <br>
              <strong> סך הצדקה שחולקה : ${totalCharidy.toFixed(
                2
              )} ש"ח</strong>
              <br>
              <strong> סך המעשרות שנתרמו : ${totalMaaser.toFixed(
                2
              )} ש"ח</strong>
              <br>
            ${ totalMaaser >=  totalMaaserLeft ?
               `<strong class="congrats-message"> מצב המעשר : ${maaserText} 🎉 </strong>` :
                `<strong class="next-month-message"> מצב המעשר : ${maaserText} </strong>`
            }
               <br>
               <br>
               
              ${
                total > 0
                  ? `<strong class="congrats-message"> יתרתך היא : ${total.toFixed(
                      2
                    )} ש"ח</strong>`
                  : `<strong class="next-month-message"> יתרתך היא : ${total.toFixed(
                      2
                    )} ש"ח</strong>`
              }
              ${
                total > 0
                  ? '<div class="congrats-message"> ברכות על ניהול חודש נכון ואחלה חיסכון!! 🎉💪</div>'
                  : '<div class="next-month-message"> בעז"ה חודש הבא תצליח יותר ותחסוך כמו גדול! 💪</div>'
              }
            </div>
          </body>
          </html>
        `;

        // שליחת האימייל למשתמש הנוכחי
        const emailPromise = nodeOutlook.sendEmail({
          auth: {
            user: `${process.env.EMAIL_NAME}`,
            pass: `${process.env.EMAIL_PASS}`,
          },
          from: `${process.env.EMAIL_NAME}`,
          to: email,
          subject: "סיכום פעילות חודשית מאפליקצית Filth My Self",
          html: htmlTemplate,
          text: "This is text version!",
          replyTo: `${process.env.EMAIL_NAME}`,
        });
    
      }



   
    } catch (error) {
      console.error("Error sending emails or removing data:", error);
      res.status(500).send("Error sending emails or removing data");
    }
  }


}

export default new Email();
