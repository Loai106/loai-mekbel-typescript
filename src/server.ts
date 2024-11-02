import express ,{ Express} from "express";
import bodyParser from "body-parser";
import { ImageRouter } from "./routes/imageRoutes";
import {errorHandler} from "./utils/errorHandler";




const port = 3000;

const app:Express = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/',ImageRouter);

app.use(errorHandler)

app.listen(port,()=>{
    console.log('the app is running on prot'+port+' ....');
})


export default app;