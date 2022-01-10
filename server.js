const express = require('express')
const path = require('path')
const mongoose=require('mongoose')
const app = express();
const PasteModel = require('./models/pasteModel')

//MONGODB
mongoose.connect('mongodb://localhost/roughpages',{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

//CSS
app.use(express.static(path.join(__dirname, './public/styles')));
//VIEWS
app.set('views', path.join(__dirname, './public/views'));
//ENGINE
app.set('view engine','ejs');
//URL PARAM SET
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
  res.render('index');
});

app.post('/paste',async (req,res)=>{
  if(req.body.rawText!=="")
  {
    const newData = await PasteModel.create({textData:req.body.rawText});
    const pasteData = await PasteModel.findOne({pasteId:newData.pasteId});
    res.redirect('/'+pasteData.pasteId);
  }
  else
  {
    res.sendStatus(204); //no content
  }
});

app.get('/:pasteid',async (req,res)=>{
  const pasteData = await PasteModel.findOne({pasteId:req.params.pasteid});
  console.log(pasteData);
  if(pasteData==null)
  {
    res.render('notfoundview')
  }
  else
  {
    res.render('pasteview',{pasteData:pasteData});
  }
});

app.get('/delete/:pasteid',async (req,res)=>{
  const pasteData = await PasteModel.deleteOne({pasteId:req.params.pasteid});
  console.log(pasteData);
  if(pasteData==null)
  {
    return res.sendStatus(404);
  }
  else
  {
    res.redirect('/');
  }
});


app.listen(process.env.PORT || 3000);
