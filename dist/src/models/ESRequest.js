"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ESRequestModel = new mongoose_1.default.Schema({
    farmer: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Farmer",
        required: true,
    },
    esp: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "ESP",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    replies: {
        type: [
            {
                title: {
                    type: String,
                },
                description: {
                    type: String,
                },
            },
        ],
        default: [],
    },
    images: {
        type: String,
    },
}, { timestamps: true });
const ESRequest = mongoose_1.default.model("ESRequest", ESRequestModel);
exports.default = ESRequest;
//# sourceMappingURL=ESRequest.js.map