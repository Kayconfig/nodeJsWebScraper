import http, { IncomingMessage, Server, ServerResponse } from "http";
import controller  from "./controller/controller";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET") {
      controller.processUrl(req, res)
    }
  }
);
const port = 3006;
server.listen(port, ()=> console.log("Server2 working and listening on port",port));
