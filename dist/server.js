"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const imageRoutes_1 = require("./routes/imageRoutes");
const errorHandler_1 = require("./utils/errorHandler");
const port = 3000;
const app = (0, express_1.default)();
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
app.use('/', imageRoutes_1.ImageRouter);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log('the app is running on prot' + port + ' ....');
});
exports.default = app;
