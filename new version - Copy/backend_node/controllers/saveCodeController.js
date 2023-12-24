// const Codes = require('../models/saveCodeModel');
// const mongoose = require('mongoose');

// exports.addCode = async (req, res) => {
//     try{
//         let {codefile, codeData} = req.body;
//         if(!req.body){
//             return res.status(400).json({msg: 'Please fill all the fields'})
//         }
//         const newCode = new Codes({
//             codefile,
//             codeData
//         })
//         newCode
//             .save()
//             .then(() => res.json('Code Added'))
//             .catch(err => res.status(400).json('Error: ' + err));
//     }catch(err){
//         res.status(500).json({error: err.message});
//     }
// };


const codeModel = require("../models/saveCodeModel");
const mongoose = require('mongoose')


const addCode = async(req, res) => {
    try{
        const newCode = new codeModel(req.body);
        await newCode.save();
        res.status(201).json({
            success: true,
            newCode,
        });
    }catch(error){
        res.status(400).json({
            success: false,
            error,
        });
    }
};

const getAllCodes = async (req, res) => {
    const codes = await codeModel.find({});
    res.status(200).json({
        success: true,
        codes,
    });
}

const getSingleCode = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: "Sorry"})
    }
    const code = await codeModel.findById(id);
    if(!code){
        return res.status(404).json({error: 'there is no code'})
    }
    res.status(200).json(code)
}

const deleteCode = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: "Sorry"})
    }

    const code = await codeModel.findByIdAndDelete({_id: id})
    if(!code){
        return res.status(404).json({error: 'there is no code'})
    }

    res.status(200).json(code)
}

module.exports = { addCode, getAllCodes, getSingleCode, deleteCode };