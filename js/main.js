const table = document.querySelector(".table");

let PrintWithTime = function (aText) {
    let currentDate = '[' + new Date().toUTCString() + '] ';
    console.log(currentDate, aText);
};

function addStatus(evt) {
    const url = evt.currentTarget.url;
    const value = JSON.parse(evt.data).ProtoVersion;
    const row = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.appendChild(document.createTextNode(url));
    const td2 = document.createElement("td");
    td2.appendChild (document.createTextNode(value));
    row.appendChild(td1);
    row.appendChild(td2);
    table.appendChild(row);

}

function getProtocolVersion(url) {
    let websocket = new WebSocket(url);
    websocket.onopen = function (evt) {
        PrintWithTime('WebSocket: is opened!');

    };

    websocket.onmessage = function (evt) {
        PrintWithTime('WebSocket.OnMessage: ' + evt.data);
        addStatus(evt);
        websocket.close();
    };

    websocket.onclose = function (event) {
        PrintWithTime("WebSocket.OnClose: wasClean=" + event.wasClean);
        PrintWithTime("WebSocket.OnClose: code=" + event.code + ", reason=" + event.reason);
    };

    websocket.onerror = function (error) {
        PrintWithTime("WebSocket.OnError: message=" + error.message);
    };

}

getProtocolVersion("wss://10.148.60.15:11012");
getProtocolVersion("wss://msk-dev-gate.ntprog.com:11012");
getProtocolVersion("wss://msk-test-gate.ntprog.com:11012");
