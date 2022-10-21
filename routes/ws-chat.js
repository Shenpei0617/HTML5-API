//聊天室後端

const WebSocket = require('ws');
const createEchoServer = server => {
    const wsServer = new WebSocket.Server({ server });
    const map = new Map();
    wsServer.on('connection', (ws, req) => {
        // ws.send('----連線數字' + wsServer.clients.size);
        map.set(ws, { name: '' });
        ws.on('message', message => {
            let sendMsg = '';//廣播內容
            const obj = map.get(ws);
            if (!obj.name) {
                obj.name = message.toString();//第一次輸入的訊息設為名稱
                sendMsg = obj.name + '上線了;目前人數:' + wsServer.clients.size;
            } else {
                sendMsg = `${obj.name}:${message.toString()}`;
            }
            wsServer.clients.forEach(c => {
                if (c.readyState === WebSocket.OPEN) {
                    c.send(sendMsg);
                }
            })
        })

    })
}
module.exports = createEchoServer;
//(ws,req)ws，針對連到的websocket服務