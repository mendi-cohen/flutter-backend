import Users from '../Models/Users_Model.js';


class UsersControll{
    
    async Allusers (req, res){
      try {
        const [usersFdb ,_] = await Users.getUsers() 
        res.json({usersFdb})

      } catch (error) {
        console.log(error.message);
      }
    }


    async Alllogin(req, res){
    try {
      const [loginFdb ,_] = await Users.showLog() 
      res.json({loginFdb})
    } catch (error) {
      console.log(error.message);
    }
    }
    async findOne(req, res){
      const id = req.params.id
     const [userID,_] = await Users.findById(id)
     res.json({userID})
    }

    // Sign in user 
    

    async saveUser(req, res) {
      try {
          // בדיקה אם האימייל כבר קיים במערכת
          const existingUser = await Users.findByEmail(req.body.email);
          if (existingUser) {
              console.log("Email already exists");
              return res.status(409).json({ error: "Email already exists" });
          }

          // הצפנת הסיסמה
          const hashedPassword = await hashPassword(req.body.password);

          // שמירת המשתמש עם הסיסמה המוצפנת
          await Users.save({ ...req.body, password: hashedPassword });
          res.json({ "add user": req.body });
      } catch (error) {
          console.error('Error saving user:', error);
          res.status(500).json({ "error": "Internal Server Error" });
      }
  }

// פונקציה להצפנת הסיסמה
async hashPassword(password) {
  const saltRounds = 10; 
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}
}



    //Login user if is email exsist and create tokens

    


    // async Login(req, res) {
    //   try {
    //     const existsEmail = await Users.findByEmail(req.query.email);
    
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

    
    
  
  
  
 
    export default new UsersControll();