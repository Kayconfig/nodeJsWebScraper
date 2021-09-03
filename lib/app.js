"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const controller_1 = __importDefault(require("./controller/controller"));
const server = http_1.default.createServer((req, res) => {
    if (req.method === "GET") {
        controller_1.default.processUrl(req, res);
    }
});
const port = 3006;
server.listen(port, () => console.log("Server2 working and listening on port", port));
