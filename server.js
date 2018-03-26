var connect = require('connect');
var serveStatic = require('serve-static');

var app = connect();


var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8020});


var cons = [];
wss.on('connection', function(ws) {
    cons.push(ws);
    var closeEvent = false;
    ws.on('message', function(message) {
        wss.clients.forEach(function (item, index, array) {
            var msg = JSON.parse(message);
            msg.count = wss.clients.length;

            item.send(JSON.stringify(msg));
        });

        if (!closeEvent) {
            closeEvent = true;
            ws.on('close', function (ws) {
                wss.clients.forEach(function (item, index, array) {
                    item.send(JSON.stringify({name: JSON.parse(message).name, text: JSON.parse(message).name + '退出房间', img: JSON.parse(message).img, color: '#424242', single: true}));
                });
            });
        }


    });
});




app.use(serveStatic(__dirname + '/build', {'index': ['index.html']}));
console.log(' [*] Listening on 127.0.0.1:3001' );
app.listen(3001);


