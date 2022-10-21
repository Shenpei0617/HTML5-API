const WebSocket = require('ws');
const createEchoServer = server=>{
    const wsServer = new WebSocket.Server({server});
    wsServer.on('connection',(ws,req)=>{
        ws.send('----連線數字'+wsServer.clients.size);
        ws.on('message',message=>{
            ws.send(message.toString());
        })
    })
}
module.exports = createEchoServer;
//(ws,req)ws，針對連到的websocket服務