import bcrypt from "bcrypt";
import { User } from "../../models/user.js";
import {
  validateLogin,
  validateRegister,
} from "../../controllers/user/user.validator.js";

export const register = async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(409)
        .send({ message: "User with given email already exists." });
    }

    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully." });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error." });
  }
};

export const login = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).send({ message: "Invalid credentials." });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).send({ message: "Invalid credentials." });
    }

    const token = await user.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in successfully." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
