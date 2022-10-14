const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("calc.proto", {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const calcPackage = grpcObject.calcPackage

const server = new grpc.Server();
server.addService(calcPackage.CalculadoraService.service,
    {
        "readTodosStream": readTodosStream,
        "Calcular": calcular
    });

server.bind("127.0.0.1:40000", grpc.ServerCredentials.createInsecure());
console.log("server running");
server.start();

function readTodosStream(call, callback) {
    callback(null, {"items": "teste"})   
}

function calcular(call, callback) {

    let resp = '';

    if (call.request.operacao == 0) {
        resp = (call.request.val1 + call.request.val2).toString();
    }

    if (call.request.operacao == 1) {
        resp = (call.request.val1 - call.request.val2).toString();
    }

    if (call.request.operacao == 2) {
        resp = (call.request.val1 / call.request.val2).toString();
    }

    if (call.request.operacao == 3) {
        resp = (call.request.val1 * call.request.val2).toString();
    }
    callback(null, {"resultado": resp})   
}