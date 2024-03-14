import Users_M from '../Models/Actions/Users_Model.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
// import nodeOutlook from 'nodejs-nodemailer-outlook';

// פונקציה להצפנת הסיסמה
async function hashPassword(password) {
  const saltRounds = 10; 
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

class UsersControll{
    
    async Allusers (req, res){
      try {
        const [usersFdb ,_] = await Users_M.getUsers() 
        res.json({usersFdb})

      } catch (error) {
        console.log(error.message);
      }
    }



    // הרשמה 
    

    async saveUser(req, res) {
      try {
          // בדיקה אם האימייל כבר קיים במערכת
          const existingUser = await Users_M.fineByEmail(req.body.email);
          if (existingUser) {
              console.log("Email already exists");
              return res.status(409).json({ error: "Email already exists" });
          }
          // הצפנת הסיסמה
          const hashedPassword = await hashPassword(req.body.password);
          // שמירת המשתמש עם הסיסמה המוצפנת
          await Users_M.save({ ...req.body, password: hashedPassword });
          res.json({ "add user": req.body });
      } catch (error) {
          console.error('Error saving user:', error);
          res.status(500).json({ "error": "Internal Server Error" });
      }
  }


/// התחברות 

async loginUser(req, res) {
  try {
      const { password } = req.body;
      // בודקים אם הסיסמה התקבלה
      if (!password) {
          return res.status(400).json({ error: "Password is required!!!!" });
      }
      // מוצאים את כל המשתמשים מהבסיס נתונים
      const allUsers = await Users_M.getUsers();
      
      if (!allUsers || allUsers.length === 0) {
          return res.status(404).json({ error: "לא נמצאו משתמשים בבסיס הנתונים עם הסיסמה הנתונה" });
      }
      // בודקים אם יש משתמש שהסיסמה שווה לסיסמה שהתקבלה בבקשה
      const user = allUsers.find(user => bcrypt.compareSync(password, user.password));
      if (!user) {
          return res.status(401).json({ error: "סיסמה לא חוקית" });
      }
      // אם הסיסמה נכונה, יוצרים טוקן JWT ומחזירים אותו
      const payload = { userId: user.id, userEmail: user.email };
      const token = jsonwebtoken.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

      // הוספת פרטי המשתמש לתגובה
      const userDetails = {id:user.id, name: user.userName, email: user.email }; 
      res.status(200).json({ success: "התחברות הצליחה", token, user: userDetails }); 

  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ "error": "שגיאה פנימית בשרת" });
  }
}


 /// שליחת אימייל 

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



    //Login user if is email exsist and create tokens

    


    // async Login(req, res) {
    //   try {
    //     const existsEmail = await Users_M.findByEmail(req.query.email);
    
    //     if (existsEmail && existsEmail.length > 0) {
    //       const user = existsEmail[0];
    //       const payload = { user_Id: user.id , user_Name: user.userName , user_Email: user.email };
    //       const token = jwt.sign(payload,process.env.SECRET_KEY );
    //       const loginTime = new Date();
    //       const off =  'none';
    //       const set_token = await Users.enterToken( user.id , loginTime, loginTime ,off, token )
    //       const loginName = user.userName;
    //       return res.status(200).json({ success: "Login successful", token , loginName});
    //     } else {
    //       return res.status(404).json({ error: "Email not found!" });
    //     }
    //   } catch (error) {
    //     console.error("Error in findTheEmail:", error);
    //     return res.status(500).json({ error: "Internal Server Error" });
    //   }
    // }




    // async Alllogin(req, res){
    //   try {
    //     const [loginFdb ,_] = await Users.showLog() 
    //     res.json({loginFdb})
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    //   }

    
    
  
  
  
 
    export default new UsersControll();