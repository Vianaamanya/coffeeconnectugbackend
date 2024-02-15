import { Request, Response } from "express";
import ESRequest from "../../models/ESRequest";

// Create a new ESRequest
export const createESRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newESRequest = await ESRequest.create(req.body);
    res.status(201).json(newESRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Get all ESRequests
export const getAllESRequests = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const esRequests = await ESRequest.find()
      .populate("farmer")
      .populate("esp");
    res.status(200).json(esRequests);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Get an ESRequest by ID
export const getESRequestById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const esRequest = await ESRequest.findById(id)
      .populate("farmer")
      .populate("esp");
    if (esRequest) {
      res.status(200).json(esRequest);
    } else {
      res.status(404).send("ESRequest not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Update an ESRequest by ID
export const updateESRequestById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedESRequest = await ESRequest.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedESRequest) {
      res.status(200).json(updatedESRequest);
    } else {
      res.status(404).send("ESRequest not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Update replies for an ESRequest by ID
export const updateRepliesById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { replies } = req.body;
  try {
    const updatedESRequest = await ESRequest.findByIdAndUpdate(
      id,
      { replies },
      { new: true }
    );
    if (updatedESRequest) {
      res.status(200).json(updatedESRequest);
    } else {
      res.status(404).send("ESRequest not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete an ESRequest by ID
export const deleteESRequestById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedESRequest = await ESRequest.findByIdAndDelete(id);
    if (deletedESRequest) {
      res.status(200).json(deletedESRequest);
    } else {
      res.status(404).send("ESRequest not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
