/**
 * Created by LikeJust on 2018-09-14.
 */
const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
const SOLPATH = '../data/hello.sol';

function resolveCompile(solPath) {
    return new Promise(resolve => {
        fs.readFile(solPath, (err, data) => {
            if (err) {
                return console.log(err);
            }

            const compiledCode = solc.compile(data.toString());
            return resolve(compiledCode);
        });
    })
}

function sleep() {
    return new Promise(resolve => {
        setTimeout(() => {
            return resolve();
        }, 4000);
    })
}

async function etherInit(web3) {
    const code = await resolveCompile(SOLPATH);
    const contractCode = code['contracts'][':SimpleStorage'];
    const abiDefine = JSON.parse(contractCode['interface']);
    const myContract = web3.eth.contract(abiDefine);
    const bytecode = contractCode['bytecode'];

    const contract = await myContract.new(null, {
        data: bytecode,
        from: web3.eth.accounts[0],
        gas: 4700000
    });

    await sleep();

    console.log(`address: ${contract.address}`);
    console.log(`cnt: ${contract.getCounter.call()}`);

    return contract
}

class EtherAPI {
    constructor() {
        const web3 = new Web3();
        web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

        etherInit(web3).then(contract => {
            this.contract = contract;
        });
    }

    async getCounter() {
        return await this.contract.getCounter.call();
    }
}

module.exports = EtherAPI;