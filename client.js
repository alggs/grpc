const grpc = require("grpc");
const readLine = require("readline");
const rl = readLine.createInterface({ input: process.stdin, output: process.stdout })
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("calc.proto", {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const calcPackage = grpcObject.calcPackage

const client = new calcPackage.CalculadoraService("127.0.0.1:40000",
    grpc.credentials.createInsecure());

console.log("Olá! Utilize nossa calculadora avançada. Passe dois numeros inteiros separados por virgula, e uma operação: 0 - Adição, 1 - Substração, 2 - Divisão, 3 - Multiplicação");
console.log("Exemplo: Para somar 1+1 mandamos: 1,1,0");

rl.addListener('line', message => {
    let test = message.split(",");
    let val1 = parseInt(test[0]);
    let val2 = parseInt(test[1]);
    let operacao = parseInt(test[2]);
    client.Calcular({
        "val1": val1,
        "val2": val2,
        "operacao": operacao
    }, (err, response) => {
        console.log("O resultado é: " + JSON.stringify(parseInt(response.resultado)))
    })
})