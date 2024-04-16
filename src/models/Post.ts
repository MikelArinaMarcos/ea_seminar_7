const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    autor: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, // Referencia al modelo User
    titulo: { type: String, required: true },
    contenido: { type: String, required: true }
  });

export default mongoose.model("Post", schema);
