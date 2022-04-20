const express = require('express');

const app = express();
app.use(express.json())
const PORT = 5000;

const userDB = [
    {id:1,name:"bassam"},
    {id:2,name:"slh"}
]


app.get("/users",(req,res)=>{
    try {
        res.status(200).send({
            msg:"get users with success",
            users : userDB
        })
    } catch (error) {
        res.status(500).send({msg:"can not get users "})
    }
})

// add user 
app.post("/newuser",(req,res)=>{
    userDB.push(req.body)
    .then(res.status(200).send(
        {
            msg:"add user with success",
            user:userDB
        }
    ))
    .catch((err)=>console.log(err))
})

// Edit user
app.put("/users/", async(req,res)=>{
    
    const {newID} = req.query
    
    try {
        const userIndex = await userDB.findIndex((user)=>user.id === newID)
        if(!userIndex){
            return res.status(400).send({msg:"there is no user with this ID"})
        }
        const xUser= userDB[userIndex] = req.body
        res.status(200).send({msg:"user",userDB:userDB[userIndex]})
    } catch (error) {
        res.status(500).send({msg:"can not update user"})
    }
})

app.put("/users/:id", async(req,res)=>{
    const ID = req.params.id;

    try {
        const userIndex = await userDB.findIndex((user)=>user.id === ID)
        if(!userIndex){
            return res.status(400).send({msg:"there is no user with this ID"})
        }
        const xUser= userDB[userIndex] = req.body
        res.status(200).send({msg:"user updated",userDB:xUser})
    } catch (error) {
        res.status(500).send({msg:"can not update user"})
    }
})

app.delete("/users/:id",async(req,res)=>{
    const {id} =req.params;
    try {
        const userIndex = await userDB.findIndex((user)=>user.id === id)
        if(!userIndex){
            return res.status(400).send({msg:"there is no user with this ID"})
        }
        userDB.splice(userIndex,1)
        res.send(userDB)
    } catch (error) {
        console.log(error)
        
    }
})

app.listen(PORT,(err)=>err? console.log(err) : console.log(`server is running on port ${PORT}`))