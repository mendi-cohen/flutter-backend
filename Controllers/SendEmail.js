import nodeOutlook from 'nodejs-nodemailer-outlook';

class Email {


async sendEmail(req, res) {
  
    const { toEmail, messageBody } = req.body;

    try {
        nodeOutlook.sendEmail({
        auth: {
          user: `${process.env.EMAIL_NAME}`,
          pass: `${process.env.EMAIL_PASS}`,
        },
        from: `${process.env.EMAIL_NAME}`,
        to: `${process.env.EMAIL_NAME}`,
        html: " ברוך הבא לאתר השולטים ",
        text: 'This is text version!',
        replyTo: `${process.env.EMAIL_NAME}`,
        
        onError: (e) => {
          console.log(e);
          res.status(500).send('Error sending SMS and email');
        },
        onSuccess: (i) => {
          console.log(i);
          res.status(200).send('SMS and email sent successfully!');
        }
      });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    }
  
    
  }

}
export default new Email();