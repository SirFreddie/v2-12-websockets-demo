import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", function connection(ws) {
  console.log("Client connected");

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    const payload = JSON.stringify({
      type: "custom-message",
      data: data.toString().toUpperCase(),
    });
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false });
      }
    });

    // ws.send(JSON.stringify(payload));
  });

  ws.on("close", function close() {
    console.log("Client disconnected");
  });
});

console.log("Server started on port 3000");
