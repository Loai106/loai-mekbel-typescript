"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadImage = exports.WatermarkImage = exports.GreyscaleImage = exports.BlurImage = exports.CropImage = exports.ResizeImage = exports.UploadImage = void 0;
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const ValidationError_1 = __importDefault(require("../errors/ValidationError"));
//handle upload image
const UploadImage = (req, res) => {
    res.send('image uploaded successfully');
};
exports.UploadImage = UploadImage;
//handle resizing the image
const ResizeImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageName = req.params.imageName;
        const height = parseInt(req.body.height);
        const width = parseInt(req.body.width);
        console.log(`imageName:${imageName}
         height:${height}
         width":${width}`);
        if (!height) {
            throw new ValidationError_1.default("Height is missing", "height");
        }
        if (!width) {
            throw new ValidationError_1.default("width is missing", "width");
        }
        yield (0, sharp_1.default)(`images/${imageName}`).resize(height, width, { fit: "contain" }).toFile(`images/new-${imageName}`);
        const imagePath = path_1.default.join(__dirname, "../../images", `new-${imageName}`);
        console.log('image Paht:', imagePath);
        res.sendFile(imagePath, (err) => {
            if (err) {
                throw new Error('Error sending the image');
            }
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.ResizeImage = ResizeImage;
//Crop image
const CropImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageName = req.params.imageName;
        const { x, y, width, height } = {
            x: parseInt(req.body.x, 10),
            y: parseInt(req.body.y, 10),
            width: parseInt(req.body.width, 10),
            height: parseInt(req.body.height, 10),
        };
        if (!x) {
            throw new ValidationError_1.default("x is missing", "x");
        }
        if (!y) {
            throw new ValidationError_1.default("y is missing", "y");
        }
        if (!height) {
            throw new ValidationError_1.default("Height is missing", "height");
        }
        if (!width) {
            throw new ValidationError_1.default("width is missing", "width");
        }
        const imageNamePath = path_1.default.join(__dirname, '../../images', imageName);
        const croppedImagePath = path_1.default.join(__dirname, '../../images', `new-cropped-${imageName}`);
        yield (0, sharp_1.default)(imageNamePath).extract({ left: x, top: y, width: width, height: height }).toFile(croppedImagePath);
        //send it as res
        res.sendFile(croppedImagePath, (error) => {
            if (error) {
                throw new Error('Error sending the image');
            }
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.CropImage = CropImage;
//blur image
const BlurImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageName = req.params.imageName;
        const imagePath = path_1.default.join(__dirname, '../../images', imageName);
        const bluredImagePath = path_1.default.join(__dirname, '../../images', `new-blured-${imageName}`);
        const sigma = parseFloat(req.body.sigma);
        console.log('sigma:', sigma);
        if (sigma > 1000 || sigma < 0.3) {
            //error
            throw new ValidationError_1.default('sigam must be between 0.3 and 1000', 'sigma');
        }
        yield (0, sharp_1.default)(imagePath).blur(sigma).toFile(bluredImagePath);
        console.log('image blured');
        res.sendFile(bluredImagePath, (error) => {
            if (error) {
                throw new Error('Error sending the image');
            }
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.BlurImage = BlurImage;
//greyscale filter
const GreyscaleImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageName = req.params.imageName;
        const imagePath = path_1.default.join(__dirname, '../../images', imageName);
        const grayImagePath = path_1.default.join(__dirname, '../../images', `new-grey-${imageName}`);
        yield (0, sharp_1.default)(imagePath).grayscale().toFile(grayImagePath);
        res.sendFile(grayImagePath, (error) => {
            if (error) {
                throw new Error('Error sending the image');
            }
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.GreyscaleImage = GreyscaleImage;
//image watermark
const WatermarkImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const watermarkImagePath = path_1.default.join(__dirname, '../../images', "watermark.png");
        const imageName = req.params.imageName;
        const imagePath = path_1.default.join(__dirname, '../../images', imageName);
        const waterMarkedImagePath = path_1.default.join(__dirname, '../../images', `watermark-${imageName}`);
        yield (0, sharp_1.default)(imagePath).composite([{
                input: watermarkImagePath,
                blend: 'over',
                left: 50,
                top: 50,
            }]).toFile(waterMarkedImagePath);
        res.sendFile(waterMarkedImagePath, (error) => {
            if (error) {
                throw new Error('Error sending the image');
            }
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.WatermarkImage = WatermarkImage;
//download image
const DownloadImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageName = req.params.imageName;
        const imagePath = path_1.default.join(__dirname, '../../images/', imageName);
        res.download(imagePath, (error) => {
            if (error) {
                throw new Error('Error sending the image');
            }
            console.log('image downloaded...');
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.DownloadImage = DownloadImage;
