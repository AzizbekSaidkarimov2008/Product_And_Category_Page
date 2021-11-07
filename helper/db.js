const mongoose = require("mongoose");
const URI =
  "mongodb+srv://azizbek:family1225vsburxon@adminpanel.htwy9.mongodb.net/adminPanel";

module.exports = async () => {
  try {
    await mongoose.connect(URI);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Console error"));
    db.once("open", function () {
      console.log("MongoDb succes connected");
    });
  } catch (error) {
    console.log(error);
  }
};