import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import { Module } from 'module';
import customerRoutes from './Routes/customer';
const NAMESPACE = 'Server';
const router = express();

/**Logging the request with middleware */
router.use((req,res,next) => {
    logging.info(NAMESPACE, 'METHOD - [${req.method}], URL - [${req.url}], IP -[${req.socket.remoteAddress}]');

    res.on('finish', () =>{
        logging.info(NAMESPACE, 'METHOD - [${req.method}], URL - [${req.url}], IP -[${req.socket.remoteAddress}], STATUS -[${res.statusCode}]');
    });

    next();
});

/**Parse the request */
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


/**API RULES */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*', );  /**If this were production code the '*' or all urls would be replaced with api source url */
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    /**Not necessary but allows for future control of allowed methods on api call */
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

/**Routes */
router.use('/customers', customerRoutes);

/**Error Handling */


router.use((req,res,next) => {
    const error = new Error ('not found');
    
    return res.status(404).json({
        message: error.message
    });
});

/**Create server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, ()=> logging.info(NAMESPACE, 'Server is running on ${config.server.hostname}:#{config.server.port}'));

