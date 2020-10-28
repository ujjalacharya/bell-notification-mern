const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Feed = new Schema(
  {
    title: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feed", Feed);
