var etherDeltaAddress;
var ethUtils = ethereumjsutil;
var privateKey;
var gasPrice; // in gwei
var sent;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

function StartWatching() {
    Init();
}

function Init() {
    etherDeltaAddress = "0x8d12a197cb00d4747a1fe03395095ce2a5cc6819";
    privateKey = ethUtils.toBuffer("0x");
    $.getScript("abi-decoder.js");
    gasPrice = new web3.BigNumber(120); // in gwei
    
    sent = [];
    web3.eth.filter("pending", function (error, result) {
        if (!error) {
            web3.eth.getTransaction(result, ReadTransaction)
        }
    });
    WriteLog("Started Monitoring");
    //CheckConnection();
}

function CheckConnection() {
    if (!web3.isConnected())
        WriteLog("Disconnected :(");
    $("#currentblock").html('Current Block: ' + web3.eth.syncing.currentBlock + ', Highest Block: ' + web3.eth.syncing.highestBlock);
    setTimeout(function () { CheckConnection(); }, 3000);
}

function ReadTransaction(error, tx) {
    if (tx == null || tx.to == null) return;
    if (error) console.error(tx);
    if (tx.to == etherDeltaAddress) {
        //console.log(tx);
        abiDecoder.addABI(EtherDeltaABI);
        var abiVal = abiDecoder.decodeMethod(tx.input);
        if (abiVal == undefined) {
            WriteLog("Unable to read abi");
            return;
        }
        if (abiVal.name == "trade") {
            //console.log(abival);
            var transDetails = new TransactionDetails(abiVal.params);
            if (!transDetails.tokenGet.hasOwnProperty("name") | !transDetails.tokenGive.hasOwnProperty("name"))
                return;
            if (_.contains(sent, tx.input)) {
                WriteLog("Duplicate, already sent - " + tx.input);
                return;
            }
            CheckTransactionValue(transDetails, tx);
            //var worthBuying = CheckTransactionValue(transDetails, tx);
            //if (worthBuying)
            //{
            //    var rawTrans = CreateOwnTransaction(tx);
            //    console.log(rawTrans);
            //    web3.eth.sendRawTransaction(rawTrans);
            //    $.post('https://api.etherscan.io/api', 'module=proxy&action=eth_sendRawTransaction&hex=' + rawTrans);
            //    sent.push(tx.input);
            //}
        }
    }
}

function CheckTransactionValue(transDetails, tx) {
    var price, action;
    if (transDetails.tokenGive.name == "ETH") {
        action = "buy";
        price = transDetails.tokenGive.normalnum / transDetails.tokenGet.normalnum;
        WriteLog(action + "ing:" + transDetails.tokenGet.name + " " + transDetails.amount.normal + "/" + transDetails.tokenGet.normal + " at " + price.toString(10) + " - " + web3.fromWei(tx.gasPrice, "gwei").toString(10) + ' - ' + tx.hash);
    }
    else if (transDetails.tokenGet.name == "ETH") {
        action = "sell"
        price = transDetails.tokenGet.normalnum / transDetails.tokenGive.normalnum;
        WriteLog(action + "ing:" + transDetails.tokenGive.name + " " + transDetails.amount.normal + "/" + transDetails.tokenGet.normal + " at " + price.toString(10) + " - " + web3.fromWei(tx.gasPrice, "gwei").toString(10) + ' - ' + tx.hash);
    }
    else {
        action = "inter token"
        price = "don't care"
    }
    /*
    var txAction = false;
    if (price != "don't care" & transDetails.tokenGet.buyprice != 0) {
        if (action == "buy" & price.gte(transDetails.tokenGet.sellprice)) {
            txAction = true;
            WriteLog("buy !!!!!!!!!!!!!!!!!!!!");
        }
        else if (action == "sell" & price.lte(transDetails.tokenGive.buyprice)) {
            txAction = true;
            WriteLog("sell !!!!!!!!!!!!!!!!!!!!");
        }
    }
    */
    return txAction;
}

function TransactionDetails(abiVals) {
    this.tokenGet = new Token(abiVals[0].value, abiVals[1].value);
    this.tokenGive = new Token(abiVals[2].value, abiVals[3].value);
    this.amount = new Token(abiVals[0].value, abiVals[10].value);
}
//if(myObj.hasOwnProperty("<property name>")){
function Token(taddr, wei) {
    _token = _.where(tokens, { addr: taddr })[0];
    if (_token == null) {
        WriteLog("Unkown Addr: " + taddr);
        return null;
    }
    this.wei = new web3.BigNumber(wei);
    this.normal = wei / Math.pow(10,_token.decimals);
    this.normalnum = wei / Math.pow(10,_token.decimals);
    this.name = _token.name;
    this.buyprice = _token.buyprice;
    this.sellprice = _token.sellprice;
}

function CreateOwnTransaction(tx) {

    var currentGasPrice = web3.toWei(gasPrice, "gwei");
    if (currentGasPrice.lt(tx.gasPrice))
        currentGasPrice = tx.gasPrice.plus(10);

    WriteLog("current price: " + currentGasPrice.toString(10) + " and tx gasPrice: " + tx.gasPrice.toString(10));

    var newTX = new EthJS.Tx({
        nonce: '0x00',
        gasPrice: currentGasPrice.toString(10),
        gasLimit: 250000, //tx.gas,
        to: etherDeltaAddress,
        value: 0,
        data: tx.input,
        chainId: 1
    });
    newTX.sign(privateKey);
    //console.log(newTX);
    var rawTX = newTX.serialize();
    //console.log(rawTX);
    return rawTX.toString('hex');
}

function WriteLog(content) {
    var list = document.getElementById('translog');
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(content));
    list.appendChild(entry);
    x = 0;  //horizontal coord
    y = document.body.scrollHeight; //vertical coord
    window.scroll(x, y);
}

// sig testing
var tx = {
    r: "0x43afef4f88b58e2dd6964f87cc4bbacf28bf7eefc6397430424f48b1e1c21f3a",
    s: "0x7207515c5d88563c82d2dabde3b0f0939d924ab48cf3b1e30d0b3de85f7c3496",
    v: 27,
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "4375000000000000000",
    tokenGive: "0xd4fa1460f537bb9085d22c7bccb5dd450ef28e3a",
    amountGive: "25000000000",
    expires: "4014346",
    nonce: "1199978546",
    user: "0x585e184dc84968f83e5702659e7e4546545979c0"
}

function CheckSignature(tx) {
    var bufferToHash = ethUtils.toBuffer(etherDeltaAddress);
    console.log(ethUtils.sha256(bufferToHash));
    bufferToHash = mergeTypedArrays(bufferToHash, ethUtils.toBuffer(tx.tokenGet));
    bufferToHash = mergeTypedArrays(bufferToHash, ethUtils.toBuffer(tx.amountGet));
    bufferToHash = mergeTypedArrays(bufferToHash, ethUtils.toBuffer(tx.tokenGive));
    bufferToHash = mergeTypedArrays(bufferToHash, ethUtils.toBuffer(tx.amountGive));
    bufferToHash = mergeTypedArrays(bufferToHash, ethUtils.toBuffer(tx.expires));
    bufferToHash = mergeTypedArrays(bufferToHash, ethUtils.toBuffer(tx.nonce));
    console.log(bufferToHash);
    var hash = ethUtils.sha256(bufferToHash);
    bufferToHash = ethUtils.toBuffer("\x19Ethereum Signed Message: "); //"\x19Ethereum Signed Message:\n32");
    bufferToHash = mergeTypedArrays(bufferToHash, ethUtils.toBuffer(hash));
    console.log(bufferToHash);
    var signedMessage = ethUtils.sha3(bufferToHash);
    var pubKey = ethUtils.ecrecover(signedMessage, tx.v, tx.r, tx.s);
    var addrBuf = ethUtils.pubToAddress(pubKey);
    var addr = ethUtils.bufferToHex(addrBuf);
    console.log(addr + ' vs ' + tx.user);
}

//CheckSignature(tx);

//function scanBlock(blockHash) {
//    web3.eth.getBlock(blockHash, true, (error, block) => {
//        if (error) {
//            console.error("Error:", error);
//        } else {
//            //blocks.push(block);
//            console.log(block.number);
//            var EDTrans = _.filter(block.transactions, function (trans) { return trans.to == etherDeltaAddress; });
//            if (EDTrans.length > 0) {
//                console.log(EDTrans);
//                _.each(EDTrans, function (val) { console.log(abiDecoder.decodeMethod(val.input)); });
//            }
//        }
//    });
//}

function mergeTypedArrays(a, b) {
    // Checks for truthy values on both arrays
    if (!a && !b) throw 'Please specify valid arguments for parameters a and b.';

    // Checks for truthy values or empty arrays on each argument
    // to avoid the unnecessary construction of a new array and
    // the type comparison
    if (!b || b.length === 0) return a;
    if (!a || a.length === 0) return b;

    // Make sure that both typed arrays are of the same type
    if (Object.prototype.toString.call(a) !== Object.prototype.toString.call(b))
        throw 'The types of the two arguments passed for parameters a and b do not match.';

    var c = new a.constructor(a.length + b.length);
    c.set(a);
    c.set(b, a.length);

    return c;
}

const EtherDeltaABI = [{ "constant": false, "inputs": [{ "name": "tokenGet", "type": "address" }, { "name": "amountGet", "type": "uint256" }, { "name": "tokenGive", "type": "address" }, { "name": "amountGive", "type": "uint256" }, { "name": "expires", "type": "uint256" }, { "name": "nonce", "type": "uint256" }, { "name": "user", "type": "address" }, { "name": "v", "type": "uint8" }, { "name": "r", "type": "bytes32" }, { "name": "s", "type": "bytes32" }, { "name": "amount", "type": "uint256" }], "name": "trade", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "tokenGet", "type": "address" }, { "name": "amountGet", "type": "uint256" }, { "name": "tokenGive", "type": "address" }, { "name": "amountGive", "type": "uint256" }, { "name": "expires", "type": "uint256" }, { "name": "nonce", "type": "uint256" }], "name": "order", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "bytes32" }], "name": "orderFills", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "tokenGet", "type": "address" }, { "name": "amountGet", "type": "uint256" }, { "name": "tokenGive", "type": "address" }, { "name": "amountGive", "type": "uint256" }, { "name": "expires", "type": "uint256" }, { "name": "nonce", "type": "uint256" }, { "name": "v", "type": "uint8" }, { "name": "r", "type": "bytes32" }, { "name": "s", "type": "bytes32" }], "name": "cancelOrder", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "token", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "depositToken", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "tokenGet", "type": "address" }, { "name": "amountGet", "type": "uint256" }, { "name": "tokenGive", "type": "address" }, { "name": "amountGive", "type": "uint256" }, { "name": "expires", "type": "uint256" }, { "name": "nonce", "type": "uint256" }, { "name": "user", "type": "address" }, { "name": "v", "type": "uint8" }, { "name": "r", "type": "bytes32" }, { "name": "s", "type": "bytes32" }], "name": "amountFilled", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "tokens", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "feeMake_", "type": "uint256" }], "name": "changeFeeMake", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "feeMake", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "feeRebate_", "type": "uint256" }], "name": "changeFeeRebate", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "feeAccount", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "tokenGet", "type": "address" }, { "name": "amountGet", "type": "uint256" }, { "name": "tokenGive", "type": "address" }, { "name": "amountGive", "type": "uint256" }, { "name": "expires", "type": "uint256" }, { "name": "nonce", "type": "uint256" }, { "name": "user", "type": "address" }, { "name": "v", "type": "uint8" }, { "name": "r", "type": "bytes32" }, { "name": "s", "type": "bytes32" }, { "name": "amount", "type": "uint256" }, { "name": "sender", "type": "address" }], "name": "testTrade", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "feeAccount_", "type": "address" }], "name": "changeFeeAccount", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "feeRebate", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "feeTake_", "type": "uint256" }], "name": "changeFeeTake", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "admin_", "type": "address" }], "name": "changeAdmin", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "token", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "withdrawToken", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "bytes32" }], "name": "orders", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "feeTake", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "deposit", "outputs": [], "payable": true, "type": "function" }, { "constant": false, "inputs": [{ "name": "accountLevelsAddr_", "type": "address" }], "name": "changeAccountLevelsAddr", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "accountLevelsAddr", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "token", "type": "address" }, { "name": "user", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "tokenGet", "type": "address" }, { "name": "amountGet", "type": "uint256" }, { "name": "tokenGive", "type": "address" }, { "name": "amountGive", "type": "uint256" }, { "name": "expires", "type": "uint256" }, { "name": "nonce", "type": "uint256" }, { "name": "user", "type": "address" }, { "name": "v", "type": "uint8" }, { "name": "r", "type": "bytes32" }, { "name": "s", "type": "bytes32" }], "name": "availableVolume", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "inputs": [{ "name": "admin_", "type": "address" }, { "name": "feeAccount_", "type": "address" }, { "name": "accountLevelsAddr_", "type": "address" }, { "name": "feeMake_", "type": "uint256" }, { "name": "feeTake_", "type": "uint256" }, { "name": "feeRebate_", "type": "uint256" }], "payable": false, "type": "constructor" }, { "payable": false, "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "tokenGet", "type": "address" }, { "indexed": false, "name": "amountGet", "type": "uint256" }, { "indexed": false, "name": "tokenGive", "type": "address" }, { "indexed": false, "name": "amountGive", "type": "uint256" }, { "indexed": false, "name": "expires", "type": "uint256" }, { "indexed": false, "name": "nonce", "type": "uint256" }, { "indexed": false, "name": "user", "type": "address" }], "name": "Order", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "tokenGet", "type": "address" }, { "indexed": false, "name": "amountGet", "type": "uint256" }, { "indexed": false, "name": "tokenGive", "type": "address" }, { "indexed": false, "name": "amountGive", "type": "uint256" }, { "indexed": false, "name": "expires", "type": "uint256" }, { "indexed": false, "name": "nonce", "type": "uint256" }, { "indexed": false, "name": "user", "type": "address" }, { "indexed": false, "name": "v", "type": "uint8" }, { "indexed": false, "name": "r", "type": "bytes32" }, { "indexed": false, "name": "s", "type": "bytes32" }], "name": "Cancel", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "tokenGet", "type": "address" }, { "indexed": false, "name": "amountGet", "type": "uint256" }, { "indexed": false, "name": "tokenGive", "type": "address" }, { "indexed": false, "name": "amountGive", "type": "uint256" }, { "indexed": false, "name": "get", "type": "address" }, { "indexed": false, "name": "give", "type": "address" }], "name": "Trade", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "token", "type": "address" }, { "indexed": false, "name": "user", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "balance", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "token", "type": "address" }, { "indexed": false, "name": "user", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "balance", "type": "uint256" }], "name": "Withdraw", "type": "event" }];
