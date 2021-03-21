import express from 'express';
import { createServer, Server } from 'http';
import bodyParser from 'body-parser';

import controller from './controller';
import { initWebSocket } from './middleware/socket';

const app = express();

app.use(bodyParser.json());
app.use(controller);    //모든 요청을 controller에게 보낼거임

const server = createServer(app);
initWebSocket(server);
server.listen(process.env.PORT || 5000, () => {
    console.log('server initialized');
});   
