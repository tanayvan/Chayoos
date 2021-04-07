const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    city: {
      type: ObjectId,
      ref: "City",
      required: true,
    },
    tables: {
      type: Number,
    },
    reserved_table: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Branch", branchSchema);
