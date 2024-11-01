const fs = require('fs');
const Tour = require('./../models/tourModels');
const { query, json } = require('express');



 exports.getAllTours = async(req,res) => {
try{
    console.log(req.query);
// Build QUERY
// 1 A) filtering
    const queryObj = {...req.query};
    const excludedFields = ['pag','sort','limit','fields'];
    excludedFields.forEach(el => queryObj[el]);

// 1B) Advanced Filtering

let queryStr = JSON.stringify(queryObj);
queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);
console.log(JSON.parse(queryStr)); // Corrected typo and used global JSON

const query = Tour.find(json.parse(queryStr));


// 2) sorting

if(req.query.sort){
    const SortBy = req.query.sort.split(',').join('');
    query = query.Sort(SortBy);
}else{
    query = query.sort("-CreateAT");
}


// 3  Limiting Fields
if (req.query.fields) {
    const fields= req.query.fields.split(",").join(" ");
    query = query.select(fields);
    } else {
        query = query.select("-__v");
        }


// 4) Pagination
const page = req.query.page * 1 || 10;
const limit = req.query.limit * 1 || 100;
const skip = (page-1) * limit;
// page=3&limit=10 1-10 , page1 , 11-20 n
query = query.skip(skip).limit(limit);

if(req.query.page){
    const numTours = await Tour.countDocuments();
    if(skip > numTours) throw new error ('this page dose not exist')
}

const Tours = await query;



// Execute QUERY
const tours = await query;

// SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data:{
            tours 
            }
     
    });
}catch (err){
    console.log(err);
    res.status(404).json({
        status:'fail',
        message: err
        })
}
 };

exports.getTour =async (req,res) => {
try{
    const tour= await Tour.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data:{
            tour
            }
     
    });
}
catch(err){
    res.status(500).json({message: err})
    }

};
exports.CreateTour = async (req, res) => {
    try {
        // Assuming Tour is a Mongoose model and req.body contains the tour data
        const newTour = new Tour(req.body);
        await newTour.save();

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.updateTour = async (req, res) => {
    try {
        // Assuming 'Tour' is your Mongoose model
        const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // return updated document instead of original
            runValidators: true
        });

        if (!updatedTour) {
            return res.status(404).json({
                status: 'fail',
                message: 'No tour found with that ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                tour: updatedTour
            }
        });

    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent'
        });
    }
};
exports.DeleteTour = async(req,res) => {
 try{
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status:'success',
        data: null
    })

 }catch (err) {
    return res.status(400).json({
        status: 'fail',
        message: 'Invalid data sent'
    });
 }
};
