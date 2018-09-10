const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

function resolveCompile(solPath) {
    return new Promise(resolve => {
        fs.readFile(solPath, (err, data) => {
            if (err) {
                return console.log(err);
            }

            const compiledCode = solc.compile(data.toString());
            resolve(compiledCode);
        });
    })
}

async function compileSolc(solPath) {
    // const compiledCode = await resolveCompile(solPath);
    const compiledCode = await resolveCompile(solPath);
    return compiledCode;
}

function sleep() {
    return new Promise(resolve => {
        setTimeout(x => {
            return resolve();
        }, 4000);
    })
}

compileSolc('hello.sol').then(code => {
    const contractCode = code['contracts'][':SimpleStorage'];
    const abiDefine = JSON.parse(contractCode['interface']);
    const myContract = web3.eth.contract(abiDefine);
    const bytecode = contractCode['bytecode'];

    return myContract.new(null, {
        data: bytecode,
        from: web3.eth.accounts[0],
        gas: 4700000
    });
}).then(async contract => {
    const t = await sleep();
    return contract;
}).then(async contract => {
    console.log(`address: ${contract.address}`);
    console.log(`cnt: ${contract.getCounter.call()}`);
    
    const t = await contract.setCounter(123,
        {from: web3.eth.accounts[0]});

    return contract
}).then(async contract => {
    const t = await contract.pp.call();
    const tt = await sleep();
    
    return contract
}).then(async contract => {
    console.log(contract.getCounter.call());
});

