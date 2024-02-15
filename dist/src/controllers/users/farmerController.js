"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFarmerById = exports.updateFarmerById = exports.getFarmerById = exports.getAllFarmers = exports.createFarmer = void 0;
const Farmer_1 = __importDefault(require("../../models/Farmer"));
const passwordUtils_1 = require("../../utils/passwordUtils");
const axios_1 = __importDefault(require("axios"));
// Create a new farmer
const createFarmer = async (req, res) => {
    try {
        try {
            const response = await axios_1.default.get(`${process.env.OPENCAGE_URL}`, {
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
            const hashedPassword = await (0, passwordUtils_1.hashPassword)(password);
            const newFarmer = await Farmer_1.default.create({
                ...rest,
                location: {
                    latitude,
                    longtude,
                },
                password: hashedPassword,
            });
            res.status(201).json(newFarmer);
            return;
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
            return;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
exports.createFarmer = createFarmer;
// Get all farmers
const getAllFarmers = async (_, res) => {
    try {
        const farmers = await Farmer_1.default.find();
        res.status(200).json(farmers);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
exports.getAllFarmers = getAllFarmers;
// Get a farmer by ID
const getFarmerById = async (req, res) => {
    const { id } = req.params;
    try {
        const farmer = await Farmer_1.default.findById(id);
        if (farmer) {
            res.status(200).json(farmer);
            return;
        }
        else {
            res.status(404).send("Farmer not found");
            return;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        return;
    }
};
exports.getFarmerById = getFarmerById;
// Update a farmer by ID
const updateFarmerById = async (req, res) => {
    const { id } = req.params;
    const { password, ...rest } = req.body;
    try {
        if (password) {
            const hashedPassword = await (0, passwordUtils_1.hashPassword)(password);
            const updatedFarmer = await Farmer_1.default.findByIdAndUpdate(id, { ...rest, password: hashedPassword }, { new: true });
            res.status(200).json(updatedFarmer);
            return;
        }
        else {
            const updatedFarmer = await Farmer_1.default.findByIdAndUpdate(id, rest, {
                new: true,
            });
            res.status(200).json(updatedFarmer);
            return;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        return;
    }
};
exports.updateFarmerById = updateFarmerById;
// Delete a farmer by ID
const deleteFarmerById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFarmer = await Farmer_1.default.findByIdAndDelete(id);
        if (deletedFarmer) {
            res.status(200).json(deletedFarmer);
            return;
        }
        else {
            res.status(404).send("Farmer not found");
            return;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        return;
    }
};
exports.deleteFarmerById = deleteFarmerById;
//# sourceMappingURL=farmerController.js.map