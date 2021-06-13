const { signin, signup } = require("../controller/user");
import jwt from 'jsonwebtoken';
import { secret } from '../config/config';
import { addMoment, getMoments } from '../controller/moment';

function health(req, res) {
    res.send("Up and Working!");
}

const ROUTES = [
    {method: 'get',     route: '/health',               action: health},
    {method: 'post',    route: '/signin',               action: signin},
    {method: 'post',    route: '/signup',               action: signup},
    {method: 'get',     route: '/moments/:userid',      action: getMoments},
    {method: 'post',    route: '/moments',              action: addMoment},
]

class RouteHandler {
    constructor() {
        
    }

    authorize(token) {
        if (token == "") false;
        try {
            var decoded = token ? jwt.verify(token, secret) : false;
            console.log(decoded);
            return decoded;
        } catch(err) {
            console.log(err,  "errorr");
            return false;
        }
    }

    routeHandler(app) {
        app.use((req, res, next) => {
            req.isAuthorized = this.authorize(
                req.header('x-authorization') !== undefined ? 
                req.header('x-authorization').replace('Bearer ', '') : ""
            ) 
            next();
        })
        for (var i = 0; i < ROUTES.length; i++) {
            app[ROUTES[i].method](ROUTES[i].route, ROUTES[i].action);
        }
    }
}

export default RouteHandler;