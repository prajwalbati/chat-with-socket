import express from 'express';
import { ServerOptions } from 'ws';
import { WsHandler } from './app/ws-handler';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

function main() {
  const options: ServerOptions = {port: Number(process.env.SOCKET_PORT)};
  const handler = new WsHandler();
  handler.initialize(options);
};

main();