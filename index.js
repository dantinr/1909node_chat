const WebSocket = require('ws');
const moment = require('moment')

const wss = new WebSocket.Server({ port: 3456 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('收到消息: %s', message);
        var data = JSON.parse(message);     //将接收到的JOSN文本转为 JSON对象
        //向客户端发送数据
        var send_msg = {
            nick_name   : data.nick_name,
            msg         : data.msg,
        }

        //向所有客户端发送消息 （广播）
        wss.clients.forEach(function each(client) {
            send_msg.time = moment().utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(send_msg));      // 发送
            }
        });

    });

    //ws.send('欢迎来到 1906 聊天室');
});