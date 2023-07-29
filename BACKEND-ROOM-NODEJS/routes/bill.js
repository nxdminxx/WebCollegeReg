const express = require('express');
const connection = require('../connection');
const router = express.Router();
let ejs = require('ejs');
let pdf = require('html-pdf');
let path = require('path');
var fs = require('fs');
var uuid = require('uuid');
var auth = require('../services/authentication');

router.post('/generateReport',auth.authenticateToken,(req,res)=>{
    console.log('Generating report...');
    const generatedUuid = uuid.v1();
    const bookingDetails = req.body;
    console.log('Room details:', bookingDetails.roomDetails);
    var roomDetailsReport = JSON.parse(bookingDetails.roomDetails);
    var query = "insert into bill (name,uuid,email,contactNumber,paymentMethod,total,roomDetails,createdBy) values(?,?,?,?,?,?,?,?)";
    connection.query(query,[bookingDetails.name, generatedUuid, bookingDetails.email, bookingDetails.contactNumber, bookingDetails.paymentMethod, bookingDetails.totalAmount, bookingDetails.roomDetails, res.locals.email],(err,results)=>{
        if(!err){
            ejs.renderFile(path.join(__dirname,'',"report.ejs"),{ roomDetails: roomDetailsReport, name: bookingDetails.name ,email: bookingDetails.email, contactNumber: bookingDetails.contactNumber, paymentMethod: bookingDetails.paymentMethod, totalAmount: bookingDetails.totalAmount},(err,results)=>{
                if(err){
                    return res.status(500).json(err);
                }else{
                    pdf.create(results).toFile('./generated_pdf/'+generatedUuid+".pdf",function(err,data){
                        if(err){
                            console.log(err);
                            return res.status(500).json(err);
                        }else{
                            return res.status(200).json({ uuid: generatedUuid });
                        }
                    })
                }
            })
            console.log('Report generation successful.');
        }else{
            return res.status(500).json(err);
        }
    })
})

router.post('/getPdf',auth.authenticateToken,function(req,res){
    const bookingDetails = req.body;
    const pdfPath = './generated_pdf/'+bookingDetails.uuid+'.pdf';
    if(fs.existsSync(pdfPath)){
        res.contentType("application/pdf");
        fs.createReadStream(pdfPath).pipe(res);
    }else{
        var roomDetailsReport = JSON.parse(bookingDetails.roomDetails);
        ejs.renderFile(path.join(__dirname,'',"report.ejs"),{ roomDetails: roomDetailsReport, name: bookingDetails.name ,email: bookingDetails.email, contactNumber: bookingDetails.contactNumber, paymentMethod: bookingDetails.paymentMethod, totalAmount: bookingDetails.totalAmount},(err,results)=>{
            if(err){
                return res.status(500).json(err);
            }else{
                pdf.create(results).toFile('./generated_pdf/'+bookingDetails.uuid+".pdf",function(err,data){
                    if(err){
                        console.log(err);
                        return res.status(500).json(err);
                    }else{
                        res.contentType("application/pdf");
                        fs.createReadStream(pdfPath).pipe(res);
                    }
                })
            }
        })
    }
})

router.get('/getBills',auth.authenticateToken,(req,res,next)=>{
    var query = "select *from bill order by id DESC";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else{
            return res.status(500).json(err);
        }
    })
})

router.delete('/delete/:id',auth.authenticateToken,(req,res,next)=>{
    const id = req.params.id;
    var query = "delete from bill where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRow == 0){
                return res.status(404).json({message:"Bill id is not found"});
            }else{
                return res.status(200).json({message:"Bill deleted successfully"});
            }
        }else{
            return res.status(500).json(err);
        }
    })

})

module.exports = router;