"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const imageController_1 = require("../controllers/imageController");
const router = express_1.default.Router();
exports.ImageRouter = router;
const sotrage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage: sotrage });
router.post('/upload', upload.single('image'), imageController_1.UploadImage);
router.post('/resize/:imageName', imageController_1.ResizeImage);
router.post('/crop/:imageName', imageController_1.CropImage);
router.post('/blur/:imageName', imageController_1.BlurImage);
router.post('/greyscale/:imageName', imageController_1.GreyscaleImage);
router.post('/watermark/:imageName', imageController_1.WatermarkImage);
router.get('/download/:imageName', imageController_1.DownloadImage);
