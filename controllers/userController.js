import bcrypt from "bcrypt";

// models
import User from "../models/User.js";

// utils
import { createToken } from "../utils/token.js";
import { userNodemailer } from "../utils/nodemailer.js";
import emailTemplate from "../utils/OTP.js";
import { validateEmail } from "../utils/validation.js";
import { add_minutes, generatepassword } from "../utils/generatepassword.js";

export const createAccount = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    if (!first_name || !last_name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ message: "Email already exists!" });

    if (!validateEmail(email))
      return res.status(400).json({ message: "The email is not valid" });

    if (password.length < 4)
      return res
        .status(400)
        .json({ message: "Password must be greater than or equal to 4" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const code = generatepassword(8);

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      otp: code,
      otp_expiry: add_minutes(new Date(), 5),
    });

    const token = createToken({
      id: newUser.id,
      email: newUser.email,
    });
    userNodemailer(email, "Email Verification", emailTemplate(code));
    return res.status(200).json({
      id: newUser.id,
      email: newUser.email,
      message: "Verification email sent to your email address.",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifiedSignUp = async (req, res) => {
  const { id } = req.userData;
  const { code } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!code) return res.status(400).json({ message: "Enter your opt" });
    else if (Date.now() > user.otp_expiry.getTime())
      return res.status(400).json({ message: "OTP expired" });
    else if (user.otp !== code)
      return res.status(400).json({ message: "Incorrect OTP" });

    user.is_verified = true;
    await user.save();

    return res.status(200).json({ message: "Your account has been verified." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, remember_me } = req.body;
  let token;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) return res.status(400).json({ message: "User is not exist" });

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    if (!user.is_verified) {
      const code = generatepassword(8);
      user.otp = code;
      user.otp_expiry = add_minutes(new Date(), 5);
      await user.save();
      userNodemailer(email, "Email Verification", emailTemplate(code));
      token = createToken({
        id: user.id,
        email: user.email,
      });
      return res.status(400).json({
        message: `Email is not verified to verify check ${user.email}.`,
        Token: token,
      });
    }

    if (remember_me) {
      token = createTokenRemember({
        id: user.id,
        email: user.email,
      });
    } else {
      token = createToken({
        id: user.id,
        email: user.email,
      });
    }
    const { password, otp, ...others } = user.dataValues;

    return res.status(200).json({ data: others, Token: token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
