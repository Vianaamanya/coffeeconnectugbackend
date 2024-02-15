"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteESRequestById = exports.updateRepliesById = exports.updateESRequestById = exports.getESRequestById = exports.getAllESRequests = exports.createESRequest = void 0;
const ESRequest_1 = __importDefault(require("../../models/ESRequest"));
// Create a new ESRequest
const createESRequest = async (req, res) => {
    try {
        const newESRequest = await ESRequest_1.default.create(req.body);
        res.status(201).json(newESRequest);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
exports.createESRequest = createESRequest;
// Get all ESRequests
const getAllESRequests = async (_, res) => {
    try {
        const esRequests = await ESRequest_1.default.find()
            .populate("farmer")
            .populate("esp");
        res.status(200).json(esRequests);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
exports.getAllESRequests = getAllESRequests;
// Get an ESRequest by ID
const getESRequestById = async (req, res) => {
    const { id } = req.params;
    try {
        const esRequest = await ESRequest_1.default.findById(id)
            .populate("farmer")
            .populate("esp");
        if (esRequest) {
            res.status(200).json(esRequest);
        }
        else {
            res.status(404).send("ESRequest not found");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
exports.getESRequestById = getESRequestById;
// Update an ESRequest by ID
const updateESRequestById = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedESRequest = await ESRequest_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (updatedESRequest) {
            res.status(200).json(updatedESRequest);
        }
        else {
            res.status(404).send("ESRequest not found");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
exports.updateESRequestById = updateESRequestById;
// Update replies for an ESRequest by ID
const updateRepliesById = async (req, res) => {
    const { id } = req.params;
    const { replies } = req.body;
    try {
        const updatedESRequest = await ESRequest_1.default.findByIdAndUpdate(id, { replies }, { new: true });
        if (updatedESRequest) {
            res.status(200).json(updatedESRequest);
        }
        else {
            res.status(404).send("ESRequest not found");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
exports.updateRepliesById = updateRepliesById;
// Delete an ESRequest by ID
const deleteESRequestById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedESRequest = await ESRequest_1.default.findByIdAndDelete(id);
        if (deletedESRequest) {
            res.status(200).json(deletedESRequest);
        }
        else {
            res.status(404).send("ESRequest not found");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
exports.deleteESRequestById = deleteESRequestById;
//# sourceMappingURL=esRequestController.js.map