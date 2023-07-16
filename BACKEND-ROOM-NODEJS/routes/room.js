const express = require('express');
const connection = require('../connection');
const router = express.Router();

var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    let room = req.body;
    var query = "insert into room (name,categoryId,description,price,status) values(?,?,?,?,'true')";
    connection.query(query,[room.name,room.categoryId,room.description,room.price],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"Room added successfully"});
        }else{
            return res.status(500).json(err);
        }
    })
});

router.get('/get',auth.authenticateToken,(req,res,next)=>{
    var query = "select r.id,r.name,r.description,r.price,r.status,c.id as categoryId, c.name as categoryName from room as r INNER JOIN category as c where r.categoryId = c.id";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else{
            return res.status(500).json(err);
        }
    })
})

router.get('/getByCategory/:id',auth.authenticateToken,(req,res,next)=>{
    const id = req.params.id;
    var query = "select id,name from room where categoryId= ? and status = 'true'";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else{
            return res.status(500).json(err);
        }
    })
})

router.get('/getById/:id',auth.authenticateToken,(req,res,next)=>{
    const id = req.params.id;
    var query = "select id,name,description,price from room where id = ?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            return res.status(200).json(results[0]);
        }else{
            return res.status(500).json(err);
        }
    })
})

router.patch('/update',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let room = req.body;
    var query = "update room set name=?, categoryId=?, description=?, price=? where id=?";
    connection.query(query,[room.name,room.categoryId,room.description,room.price,room.id],(err,results)=>{
        if(!err){
            if(results.affectedRow == 0){
                return res.status(404).json({message:"room id is not found"});
            }else{
                return res.status(200).json({message:"Room updated successfully"});
            }
        }else{
            return res.status(500).json(err);
        }
    })
})

router.delete('/delete/:id',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    const id = req.params.id;
    var query = "delete from room where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedrow == 0){
                return res.status(404).json({message:"Room id is not found"});
            }
            else{
                return res.status(200).json({message:"Room deleted successfully"})
            }
        }else{
            return res.status(500).json(err);
        }
    })
})

router.patch('/updateStatus',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let user = req.body;
    var query = "update room set status=? where id=?";
    connection.query(query,[user.status,user.id],(err,results)=>{
        if(!err){
            if(results.affectedRow == 0){
                return res.status(404).json({message:"Room id is not found"});
            }
            return res.status(200).json({message:"Room status updated successfully"});
            
        }
        else{
            res.status(500).json(err);
        }
    })
    
})

module.exports = router;