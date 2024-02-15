import { Request, Response } from "express";
import Farmer from "../../models/Farmer";
import ESP from "../../models/ESP";
import { comparePasswords, excludePassword } from "../../utils/passwordUtils";
import { generateToken } from "../../utils/jwtUtils";

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    if (!(username || email)) {
      res.status(400).send("Either username or email is required for login");
      return;
    }

    let user;

    if (username) {
      user = await Farmer.findOne({ $or: [{ username }, { email: username }] });
      if (!user) {
        user = await ESP.findOne({ $or: [{ username }, { email: username }] });
      }
    } else {
      user = await Farmer.findOne({ email });
      if (!user) {
        user = await ESP.findOne({ email });
      }
    }

    if (!user) {
      res.status(401).send("Invalid credentials");
      return;
    }

    const isPasswordMatch = await comparePasswords(password, user.password);

    if (!isPasswordMatch) {
      res.status(401).send("Invalid credentials");
      return;
    }

    const userDataWithoutPassword = excludePassword(user);

    // Generate JWT token
    const token = generateToken({
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    res.status(200).json({ user: userDataWithoutPassword, token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
