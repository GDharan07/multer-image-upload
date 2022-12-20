const express=require('express')
const cors=require('cors')
const multer=require('multer')
const app=express()
const mongoose=require('mongoose')
const schema=require('./models/schema')
const path=require('path')
const fs=require('fs')
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname)))


mongoose.connect('mongodb://localhost:27017/images',(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("server connected")
    }
})

const storage=multer.diskStorage({
    destination:'images',
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    }
})

const uplode=multer({storage:storage})

app.post('/',uplode.single('file'),async(req,res)=>{
    
   const data=new schema({
       originalname:req.file.originalname,
       filename:req.file.filename,
       path:req.file.path,
       mimetype:req.file.mimetype,
       size:req.file.size

   })

  await data.save()
   res.json('upload successfully')
   
   
    // console.log(req.file)
})


app.get('/',async(req,res)=>{
    const data=await schema.find()
    res.json(data)
})

app.get('/:id',async(req,res)=>{
    const data=await schema.findById(req.params.id)
    res.json(data)
})


app.put('/:id',uplode.single('file'), async(req,res)=>{
    const dataa=await schema.findById(req.params.id)

   await fs.unlink(dataa.path,(err)=>{
      if (err) throw err;
   })

   const data= await schema.findByIdAndUpdate(req.params.id)
   data.originalname=req.file.originalname,
   data.filename=req.file.filename,
   data.mimetype=req.file.mimetype,
   data.path=req.file.path,
   data.size=req.file.size

   data.save()
   res.json('updated successfully')
})

app.delete('/:id',async(req,res)=>{
   
   const dataa=await schema.findById(req.params.id)

   await fs.unlink(dataa.path,(err)=>{
      if (err) throw err;
   })

    const data=await schema.findByIdAndDelete(req.params.id)
    res.json('deleted successfully')
})




app.listen(8080,()=>{
    console.log('server started')
})

