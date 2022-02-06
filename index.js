const express = require('express')

require("./db/connector")
const MensRanking = require("./models/schema_mens")
const app = express()
const port = 3023

app.use(express.json())


app.get('/', async (req, res) => {
  res.send('Hello World this is Api')
})


app.post("/mens", async (req,res)=>{
    try {
        const addingrecords = new MensRanking(req.body) //app.use(express.json()) use this
        const recordsave = await addingrecords.save()
        res.status(201).send(recordsave)
    } catch (e) {
        res.status(400).send(e)
        
    }

})

app.get("/mens",async (req,res)=>{
    try {
        const getting  = await MensRanking.find().sort({"ranking" : 1})
        res.status(201).send(getting)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get("/mens/:id",async (req,res)=>{
    try {
        const _id = req.params.id
        const indivisual = await MensRanking.findById(_id)
        res.status(201).send(indivisual)
    } catch(e){
        res.status(400).send(e)
    }
})

app.patch('/mens/:id', async (req,res)=>{
    try {
        const _ids = req.params.id
        const indivisual = await MensRanking.findByIdAndUpdate(_ids , req.body)
        res.status(201).send(indivisual)
    } catch (error) {
        res.status(500).send(e)
    }
})

app.delete('/mens/:id', async (req,res)=>{
    try {
        const _idi = req.params.id
        const deleting = await MensRanking.findByIdAndDelete(_idi)
        res.status(201).send(deleting)
    } catch (e) {
        res.status(500).send(e)
    }
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
