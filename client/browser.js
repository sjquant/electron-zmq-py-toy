const { connectSock, getSock } = require("./sock.js");
const { startPython } = require("./python.js");

const addBtn = document.querySelector("#add-btn");
const subBtn = document.querySelector("#sub-btn");
const multBtn = document.querySelector("#mult-btn");
const divBtn = document.querySelector("#div-btn");

function startServer() {
  startPython();
  connectSock();
}

function getValueOne() {
  return parseFloat(document.querySelector("#inputOne").value);
}

function getValueTwo() {
  return parseFloat(document.querySelector("#inputTwo").value);
}

async function sendMessage(command, args) {
  const sock = getSock();
  await sock.send(
    JSON.stringify({
      command,
      args,
    })
  );
  let [result] = await sock.receive();
  result = JSON.parse(result.toString());
  return result;
}

function writeResult(ret) {
  const { result } = ret;
  const reusltInput = document.querySelector("#result");
  reusltInput.value = result;
}

addBtn.addEventListener("click", async () => {
  const one = getValueOne();
  const two = getValueTwo();

  if (!one || !two) return;

  const ret = await sendMessage("add", [one, two]);
  writeResult(ret);
});

subBtn.addEventListener("click", async () => {
  const one = getValueOne();
  const two = getValueTwo();

  if (!one || !two) return;

  const ret = await sendMessage("subtract", [one, two]);
  writeResult(ret);
});

multBtn.addEventListener("click", async () => {
  const one = getValueOne();
  const two = getValueTwo();

  if (!one || !two) return;

  const ret = await sendMessage("multiply", [one, two]);
  writeResult(ret);
});

divBtn.addEventListener("click", async () => {
  const one = getValueOne();
  const two = getValueTwo();

  if (!one || !two) return;

  const ret = await sendMessage("divide", [one, two]);
  writeResult(ret);
});

window.addEventListener("beforeunload", () => {
  const sock = getSock();
  sock.send(JSON.stringify({ command: "Exit" }));
  sock.close();
});

startServer();
