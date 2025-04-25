import mongoose from "mongoose";

// Empêche les redéfinitions du modèle si déjà existant
const User = mongoose.models.Users || mongoose.model("Users", new mongoose.Schema({
    username: { 
      type: String, 
      required: true,
      minlength: 3,
      maxlength: 10
    },
    password: { 
      type: String, 
      required: true,
      minlength: 8,
      maxlength: 20
    },
    token: { 
      type: String 
    },
    canBookmark: { 
      type: Boolean, 
      default: true 
    },
  }));
  

export default User;