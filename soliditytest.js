pragma solidity ^0.4.0;
contract Ballot {

    address chairperson;
    bytes32 something;
    address something2;
    bytes32 hash;
    bytes32 hash2;
    address resp;
    address user = 0x585e184dc84968f83e5702659e7e4546545979c0;

    function Trade() {
        address tokenGet = 0x0000000000000000000000000000000000000000; 
        uint amountGet = 4375000000000000000; 
        address tokenGive = 0xd4fa1460f537bb9085d22c7bccb5dd450ef28e3a;
        uint amountGive = 25000000000;
        uint expires = 4014346;
        uint nonce = 1199978546;
        uint8 v = 27;
        bytes32 r = 0x43afef4f88b58e2dd6964f87cc4bbacf28bf7eefc6397430424f48b1e1c21f3a;
        bytes32 s = 0x7207515c5d88563c82d2dabde3b0f0939d924ab48cf3b1e30d0b3de85f7c3496; 
        uint amount = 20;
        something = sha3(this);
        something2 = this;
        chairperson = msg.sender;
        address thisaddr = 0x8d12a197cb00d4747a1fe03395095ce2a5cc6819;
        hash = sha256(thisaddr, tokenGet, amountGet, tokenGive, amountGive, expires, nonce);
        hash2 = sha3("\x19Ethereum Signed Message:\n32", hash);
        resp = ecrecover(hash2,v,r,s);
        int test;
    }
}


chairperson: 0xCA35B7D915458EF540ADE6068DFE2F44E8FA733Caddress
something: 0x1432E9A15C6CA542A98DBE9500C03FA317414DA58E84389BEB3DCA25F42C9B56bytes32
something2: 0x9DD1E8169E76A9226B07AB9F85CC20A5E1ED44DDaddress
hash: 0x762F28F0533FE6BD47BB02BBBF94DA7DA046797590F992BE2B016FC1B40BB85Bbytes32
hash2: 0x996FD25EBE9A677DD8F3E77D1C6E2774DDAD2E049D36C788F209E3B87B75D09Ebytes32
resp: 0x585E184DC84968F83E5702659E7E4546545979C0address
user: 0x585E184DC84968F83E5702659E7E4546545979C0address