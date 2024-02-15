import mongoose from "mongoose";

const ESPModel = new mongoose.Schema(
  {
    phone_number: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    profile_image: {
      type: String,
    },

    location: {
      latitude: {
        type: Number,
        required: true,
      },

      longtude: {
        type: Number,
        required: true,
      },
    },

    //company name or person name
    full_name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    sub_county: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    district: {
      type: String,
      required: true,
    },

    street_address: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ESP = mongoose.model("ESP", ESPModel);

export default ESP;
