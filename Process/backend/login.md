we use import jwt from 'jsonwebtoken'

1. generate a token
   
const loginAdmin = async (req, res) => {
   1. first we have to veriy email & password
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      
      2. when we have the email and password we generate jwt using jwt.sign()
      /* ****** jwt.sign(payload, secret_key) -> it is a jsonwebtoken method use to generate token  ******** */
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });

    } else {
      res.json({ success: false, message: "Invalid credetials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

2. Then we pass the jwt token through the headers
const authAdmin = async (req, res, next) => {
  try {
   1. first fetch the atoken from the header
    const { atoken } = req.headers;
    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    2. If we have the atoken we need to verify it
     to verify it we need to decode this token
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    next()
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
