const mongoose = require('mongoose')
const shortid = require('shortid')

const pasteSchema = new mongoose.Schema({
  pasteId:{
    type:String,
    required:true,
    default:shortid.generate

  },
  textData:{
    type:String,
    required:true
  }
})

module.exports = mongoose.model('PasteModel' , pasteSchema);
