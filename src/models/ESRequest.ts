import mongoose from "mongoose";

const ESRequestModel = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },

    esp: {
      type: mongoose.Types.ObjectId,
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
  },
  { timestamps: true }
);

const ESRequest = mongoose.model("ESRequest", ESRequestModel);

export default ESRequest;
