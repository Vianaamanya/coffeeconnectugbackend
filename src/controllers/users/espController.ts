import { Request, Response } from "express";
import ESP from "../../models/ESP";
import { hashPassword } from "../../utils/passwordUtils";
import axios from "axios";

// Create a new ESP
export const createESP = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get(`${process.env.OPENCAGE_URL}`, {
      params: {
        key: process.env.OPENCAGE_API_KEY,
        q: `${req.body.sub_county}, ${req.body.district}, ${"Uganda"}`,
      },
    });

    // Example coordinates in DMS format
    const latitude = Number(response.data.results[0].geometry.lat);
    const longtude = Number(response.data.results[0].geometry.lng);
    console.log(latitude, longtude);

    const { password, ...rest } = req.body;
    const hashedPassword = await hashPassword(password);
    const newESP = await ESP.create({
      ...rest,
      location: {
        latitude,
        longtude,
      },
      password: hashedPassword,
    });
    res.status(201).json(newESP);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
    return;
  }
};

// Get all ESPs
export const getAllESPs = async (_: Request, res: Response): Promise<void> => {
  try {
    const esps = await ESP.find();
    res.status(200).json(esps);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
    return;
  }
};

// Get an ESP by ID
export const getESPById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const esp = await ESP.findById(id);
    if (esp) {
      res.status(200).json(esp);
      return;
    } else {
      res.status(404).send("ESP not found");
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
    return;
  }
};

// Update an ESP by ID
export const updateESPById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { password, ...rest } = req.body;

  try {
    if (password) {
      const hashedPassword = await hashPassword(password);
      const updatedESP = await ESP.findByIdAndUpdate(
        id,
        { ...rest, password: hashedPassword },
        { new: true }
      );
      res.status(200).json(updatedESP);
      return;
    } else {
      const updatedESP = await ESP.findByIdAndUpdate(id, rest, { new: true });
      res.status(200).json(updatedESP);
      return;
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
    return;
  }
};

// Delete an ESP by ID
export const deleteESPById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedESP = await ESP.findByIdAndDelete(id);
    if (deletedESP) {
      res.status(200).json(deletedESP);
      return;
    } else {
      res.status(404).send("ESP not found");
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
