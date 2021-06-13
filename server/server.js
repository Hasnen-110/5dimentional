import Express, { response, json } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Db from './data/models/index';
import config from './config/config';
import chalk from 'chalk';
import RouteHandler from './route/route';

var port = chalk.bold.yellow;

const app = Express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit:50000 }));
app.use(bodyParser.json({limit: "50mb"}));
app.use(json({ limit: '50mb' }))

app.use(Express.static(__dirname+"/business/images"));

app.use(cors({ allowedHeaders: ['Authorization', 'Content-Type', 'x-authorization'] }));

Db();

new RouteHandler().routeHandler(app);

app.listen(config.application.port, () => console.log(port('port started on', config.application.port)));
 