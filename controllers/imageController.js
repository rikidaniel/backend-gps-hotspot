import imageModel from "../models/imageModel.js";
import * as path from "path";
import {uuid} from "uuidv4";
import * as fs from "fs";
import multer from "multer";
import {address, port} from "../config/address.js";


// Create multer storage
const storage = multer.diskStorage({
    destination: './public/images', // Set destination folder for storing uploaded files
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, uuid() + ext); // Use UUID to generate unique filename
    }
});

export const getImages = async (req, res) => {
    try {
        const response = await imageModel.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
};


export const getImageById = async(req, res)=>{
    try {
        const response = await imageModel.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}



const upload = multer({ storage });


export const saveImage = (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ msg: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ msg: 'No File Uploaded' });
        }

        const fileName = req.file.filename;
        const fileSize = req.file.size;
        const ext = path.extname(fileName);
        const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
        const allowedTypes = ['.png', '.jpg', '.jpeg', '.webp'];

        if (!allowedTypes.includes(ext.toLowerCase())) {
            return res.status(422).json({ msg: 'Invalid Image' });
        }
        if (fileSize > 10000000) {
            return res.status(422).json({ msg: 'Image must be less than 10 MB' });
        }

        try {
            await imageModel.create({ id: uuid(), image: fileName, url: url });
            res.status(201).json({ msg: 'Image Created Successfully' });
        } catch (error) {
            console.log(error.message);
        }
    });
};


export const deleteImage = async (req, res) => {
    const image = await imageModel.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!image) {
        return res.status(404).json({ msg: "No Data Found" });
    }
    try {
        const filepath = `./public/images/${image.image}`;
        fs.unlinkSync(filepath);
        await imageModel.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Image Deleted Successfully" });
    } catch (error) {
        console.log(error.message);
    }
};

