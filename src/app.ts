import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import {routes} from './routes';

const app: Koa = new Koa();
app.use(bodyParser());
app.use(routes);
const server = app.listen(1945);
