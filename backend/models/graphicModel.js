const mongoose = require('mongoose');

const GraphicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  }
});

const Graphic = mongoose.model("Graphic", GraphicSchema);

module.exports = Graphic;