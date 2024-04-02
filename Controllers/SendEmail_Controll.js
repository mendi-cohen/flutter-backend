import nodeOutlook from 'nodejs-nodemailer-outlook';
import Incom_M from '../Models/Actions/Incomes_Model.js';
import Pool_M from '../Models/Actions/Pool_Model.js';
import Charidy_M from '../Models/Actions/Charidy_Model.js';

class Email {
  async sendEmail(req, res) {
    try {
      const IncomeFdb = await Incom_M.getIncomsByUser_id(req.params.userid);
      const PoolFdb = await Pool_M.getPoolByUser_id(req.params.userid);
      const CharidyFdb = await Charidy_M.getCharidysByUser_id(req.params.userid);
      const totalIncome = IncomeFdb.reduce((total, income) => total + parseFloat(income.dataValues.income_value), 0);
      const totalPool = PoolFdb.reduce((total, income) => total + parseFloat(income.dataValues.pool_value), 0);
      const totalCharidy = CharidyFdb.reduce((total, income) => total + parseFloat(income.dataValues.charidy_value), 0);
      const total = totalIncome - totalPool - totalCharidy;

      const htmlTemplate = `
        <html>
        <head>
          <style>
 
            .container {
              display: flex;
              justify-content: space-between;
              background-image: url('../Images/image-enterPage.jpg');
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center;
              background-attachment: fixed;
            }
            .table-container {
              flex: 1;
              margin: 0 10px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #f2f2f2;
            }
            .total-container {
              margin-top: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body dir="rtl">
          <h1>סיכום פעילות חודשי</h1>

          <div class="container">
            <div class="table-container">
              <h2>הכנסות:</h2>
              <table>
                <thead>
                  <tr>
                    <th>סכום ההכנסה</th>
                    <th>מקור ההכנסה</th>
                  </tr>
                </thead>
                <tbody>
                  ${IncomeFdb.map(income => `
                  <tr>
                    <td>${income.dataValues.income_value} ש"ח</td>
                    <td>${income.dataValues.source}</td>
                  </tr>`).join('')}
                </tbody>
              </table>
            </div>

            <div class="table-container">
              <h2>הוצאות:</h2>
              <table>
                <thead>
                  <tr>
                    <th>סכום הוצאה</th>
                    <th>סיבת הוצאה</th>
                  </tr>
                </thead>
                <tbody>
                  ${PoolFdb.map(pool => `
                  <tr>
                    <td>${pool.dataValues.pool_value} ש"ח</td>
                    <td>${pool.dataValues.resion}</td>
                  </tr>`).join('')}
                </tbody>
              </table>
            </div>
            <div class="table-container">
              <h2>תרומות:</h2>
              <table>
                <thead>
                  <tr>
                    <th>סכום התרומה</th>
                    <th>מקור התרומה</th>
                  </tr>
                </thead>
                <tbody>
                  ${CharidyFdb.map(charidy => `
                  <tr>
                    <td>${charidy.dataValues.charidy_value} ש"ח</td>
                    <td>${charidy.dataValues.resion}</td>
                  </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div class="total-container">
            <strong>סך הכל הכנסות: ${totalIncome.toFixed(2)} ש"ח</strong>
            <br>
            <strong>סך הכל הוצאות: ${totalPool.toFixed(2)} ש"ח</strong>
            <br>
            <strong> סכום הצדקה הכולל : ${totalCharidy.toFixed(2)} ש"ח</strong>
            <br>
            <strong> מצב חשבונך לאחר כל שיקלול: ${total.toFixed(2)} ש"ח</strong>
           
          </div>

 
        </body>
        </html>


      `;

      nodeOutlook.sendEmail({
        auth: {
          user: `${process.env.EMAIL_NAME}`,
          pass: `${process.env.EMAIL_PASS}`,
        },
        from: `${process.env.EMAIL_NAME}`,
        to: `${process.env.EMAIL_NAME}`,
        html: htmlTemplate,
        text: 'This is text version!',
        replyTo: `${process.env.EMAIL_NAME}`,

        onError: (e) => {
          console.log(e);
          res.status(500).send('Error sending email');
        },
        onSuccess: (i) => {
          console.log(i);
          res.status(200).send('Email sent successfully!');
        }
      });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    }
  }
}

export default new Email();
