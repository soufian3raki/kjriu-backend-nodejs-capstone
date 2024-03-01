const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const connectToDatabase = require('../models/db');
const logger = require('../logger');

// Define the upload directory path
const directoryPath = 'public/images';

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, directoryPath); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage: storage });


// Get all prelovedgoods
router.get('/', async (req, res, next) => {
    logger.info('/ called');
    try {
        //Step 2: task 1 - insert code here
        //Step 2: task 2 - insert code here
        //Step 2: task 3 - insert code here
        //Step 2: task 4 - insert code here

        const collection = db.collection("prelovedgoods");
        const prelovedgoods = await collection.find({}).toArray();
        res.json(prelovedgoods);
    } catch (e) {
        logger.console.error('oops something went wrong', e)
        next(e);
    }
});

// Add a new item
router.post('/', {Step 3: Task 4 insert code here}, async(req, res,next) => {
    try {

        //Step 3: task 1 - insert code here
        //Step 3: task 2 - insert code here
        //Step 3: task 3 - insert code here
        res.status(201).json(prelovedgood.ops[0]);
    } catch (e) {
        next(e);
    }
});

// Get a single prelovedgood by ID
router.get('/:id', async (req, res, next) => {
    try {
        //Step 4: task 1 - insert code here
        //Step 4: task 2 - insert code here
        //Step 4: task 3 - insert code here
        //Step 4: task 4 - insert code here
    } catch (e) {
        next(e);
    }
});

// Update and existing item
router.put('/:id', async(req, res,next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("prelovedgoods");
        const id = req.params.id;
        const prelovedGood = await collection.findOne({ id });

        if (!prelovedGood) {
            logger.error('prelovedGood not found');
            return res.status(404).json({ error: "prelovedGood not found" });
        }

        prelovedGood.category = req.body.category;
        prelovedGood.condition = req.body.condition;
        prelovedGood.age_days = req.body.age_days;
        prelovedGood.description = req.body.description;
        prelovedGood.age_years = Number((prelovedGood.age_days/365).toFixed(1));
        prelovedGood.updatedAt = new Date();

        const updatepreloveGood = await collection.findOneAndUpdate(
            { id },
            { $set: prelovedGood },
            { returnDocument: 'after' }
        );


        if(updatepreloveGood) {
            res.json({"uploaded":"success"});
        } else {
            res.json({"uploaded":"failed"});
        }

    } catch (e) {
        next(e);
    }
});

// Delete an existing item
router.delete('/:id', async(req, res,next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("prelovedgoods");
        const id = req.params.id;
        const prelovedGood = await collection.findOne({ id });

        if (!prelovedGood) {
            logger.error('prelovedGood not found');
            return res.status(404).json({ error: "prelovedGood not found" });
        }
        const updatepreloveGood = await collection.deleteOne({ id });

        res.json({"deleted":"success"});
    } catch (e) {
        next(e);
    }
});

module.exports = router;
