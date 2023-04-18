import express from "express";
import {
    getImages,
    getImageById,
    saveImage,
    deleteImage
} from "../controllers/imageController.js";

const imageRouter = express.Router();

imageRouter.get('/images', getImages);
imageRouter.get('/images/:id', getImageById);
imageRouter.post('/images', saveImage);
imageRouter.delete('/images/:id', deleteImage);

export default imageRouter;