/**
 * Created by LikeJust on 2018-09-14.
 */
const Web3 = require('web3');
const web3 = new Web3();

const fs = require('fs');
const solc = require('solc');
const SOLPATH = '../data/data.sol';

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
        }, 2000);
    })
}

async function etherInit(web3) {
    const code = await resolveCompile(SOLPATH);
    const contractCode = code['contracts'][':CC'];
    const abiDefine = JSON.parse(contractCode['interface']);
    const myContract = web3.eth.contract(abiDefine);
    const bytecode = contractCode['bytecode'];

    const contract = await myContract.new(undefined, {
        data: bytecode,
        from: web3.eth.accounts[0],
        gas: 4700000
    });

    await sleep();

    console.log(`address: ${contract.address}`);

    return contract
}

class EtherAPI {
    constructor() {
        web3.setProvider(new web3.providers.HttpProvider("http://localhost:7545"));
        etherInit(web3).then(contract => {
            this.contract = contract;
        });
    }

    async getAddress() {
        return await this.contract.getAddress.call();
    }

    async getUserBalance(userIdx) {
        return await this.contract.getUserBalance.call(undefined, {from: web3.eth.accounts[userIdx]});
    }

    async addUser(userIdx) {
        await this.contract.addUser(undefined, {from: web3.eth.accounts[userIdx]});
        return web3.eth.accounts[userIdx];
    }

    async addPlaceAddress(place, placeAddress) {
        const hexPlace = Buffer.from(place, 'utf8').toString('hex');
        await this.contract.addPlaceAddress(hexPlace, placeAddress, {from: web3.eth.accounts[0]});

        return hexPlace;
    }

    async addToken(place, money, userIdx) {
        await this.contract.addToken(place, money, {from: web3.eth.accounts[userIdx]});
    }
}

module.exports = EtherAPI;