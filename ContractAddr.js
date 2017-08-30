var tokens = [
    {
        name: "VERI",
        addr: "0x8f3470a7388c05ee4e7af3d01d8c722b0ff52374",
        scale: "ether",
        scalem: 1,
        buyprice: 0.4,
        sellprice: 1.5
    },
    {
        name: "PPT",
        addr: "0xd4fa1460f537bb9085d22c7bccb5dd450ef28e3a",
        scale: "shannon",
        scalem: 10,
        buyprice: 0.005,
        sellprice: 0.06
    },
    {
        name: "ROL",
        fullname: "DICE - Etheroll",
        addr: "0x2e071d2966aa7d8decb1005885ba1977d6038a65",
        scale: "ether",
        scalem: 100,
        buyprice: 0.01,
        sellprice: 0.5
    },
    {
        name: "PAY",
        fullname: "TenX",
        addr: "0xb97048628db6b661d4c2aa833e95dbe1a905b280",
        scale: "ether",
        scalem: 1,
        buyprice: 0,
        sellprice: 0
    },
    {
        name: "PLU",
        addr: "0xd8912c10681d8b21fd3742244f44658dba12264e",
        scale: "ether",
        scalem: 1,
        buyprice: 0,
        sellprice: 0
    },
    {
        name: "ADX",
        fullname: "AdEx",
        addr: "0x4470bb87d77b963a013db939be332f927f2b992e",
        scale: "babbage",
        scalem: 100,
        buyprice: 0, // scale is wrong
        sellprice: 0
    },
    {
        name: "SNT",
        addr: "0x744d70fdbe2ba4cf95131626614a1763df805b9e",
        scale: "ether",
        scalem: 1,
        buyprice: 0,
        sellprice: 0
    },
    {
        name: "ICE",
        fullname: "iDice",
        addr: "0x5a84969bb663fb64f6d015dcf9f622aedc796750",
        scale: "ether",
        scalem: 1,
        buyprice: 0,
        sellprice: 0
    },
    {
        name: "Num",
        fullname: "Numerai",
        addr: "0x1776e1f26f98b1a5df9cd347953a26dd3cb46671",
        scale: "ether",
        scalem: 1,
        buyprice: 0,
        sellprice: 0
    },
    {
        name: "ETH",
        addr: "0x0000000000000000000000000000000000000000",
        scale: "ether",
        scalem: 1,
        buyprice: 0,
        sellprice: 0
    },
    {
        name: "âˆž - GoodKarma",
        addr: "0xae616e72d3d89e847f74e8ace41ca68bbf56af79",
        scale: "babbage",
        scalem: 1,
        buyprice: 0,
        sellprice: 0
    },
    {
        name: "OMG",
        addr: "0xd26114cd6ee289accf82350c8d8487fedb8a0c07",
        scale: "ether",
        scalem: 1,
        buyprice: 0,
        sellprice: 0
    },
    {
        name: "FUN",
        addr: "0xbbb1bd2d741f05e144e6c4517676a15554fd4b8d",
        scale: "shannon",
        scalem: 10,
        buyprice: 0,
        sellprice: 0
    },
    {
        name: "FUN2",
        addr: "0x419d0d8bdd9af5e606ae2232ed285aff190e711b",
        scale: "shannon",
        scalem: 10,
        buyprice: 0,
        sellprice: 0
    },
    {
        name: "FUN3",
        addr: "0x419d0d8bdd9af5e606ae2232ed285aff190e711b",
        scale: "shannon",
        scalem: 10,
        buyprice: 0.00001,
        sellprice: 0.00016
    },
    {
        name: "Rialto",
        addr: "0xb24754be79281553dc1adc160ddf5cd9b74361a4",
        scale: "shannon",
        scalem: 1,
        buyprice: 0,
        sellprice: 0
    },
    {
        name: "SAN",
        addr: "0x7c5a0ce9267ed19b22f8cae653f198e3e8daf098",
        scale: "ether",
        scalem: 1,
        buyprice: 0,
        sellprice: 0
    },
    {
        name: "Embermine",
        addr: "0x386467f1f3ddbe832448650418311a479eecfc57",
        scale: "kwei",
        scalem: 100,
        buyprice: 0,
        sellprice: 0
    },
    {
        name: "tokencard",
        addr: "0xaaaf91d9b90df800df4f55c205fd6989c977e73a",
        scale: "ether",
        scalem: 1,
        buyprice: 0,
        sellprice: 0
    },
    {
        name: "LNK",
        addr: "0xe2e6d4be086c6938b53b22144855eef674281639",
        scale: "ether",
        scalem: 1,
        buyprice: 0,
        sellprice: 0
    },
    {
        name: "wings",
        addr: "0x667088b212ce3d06a1b553a7221e1fd19000d9af",
        scale: "ether",
        scalem: 1,
        buyprice: 0,
        buyprice: 0
    },
    {
        name: "unkn1",
        addr: "0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0",
        scale: "ether",
        scalem: 1,
        buyprice: 0,
        sellprice: 0
    },
    {
        name: "MACP",
        addr: "0x93e682107d1e9defb0b5ee701c71707a4b2e46bc",
        scale: "ether",
        scalem: 1,
        buyprice: 0,
        sellprice: 0
    },
    {
        name: "FUCK",
        addr: "0xc63e7b1dece63a77ed7e4aeef5efb3b05c81438d",
        scale: "kwei",
        scalem: 1,
        buyprice: 0,
        sellprice: 0
    },
    {
        name: "BitCAD",
        addr: "0x660b612ec57754d949ac1a09d0c2937a010dee05",
        scale: "ether",
        scalem: 0,
        buyprice: 0,
        sellprice: 0
    },
    {
        name: "Pillar",
        addr: "0xe3818504c1b32bf1557b16c238b2e01fd3149c17",
        scale: "ether",
        scalem: 0,
        buyprice: 0,
        sellprice: 0
    },
    {
        name: "NET",
        addr: "0xcfb98637bcae43c13323eaa1731ced2b716962fd",
        scale: "ether",
        scalem: 0,
        buyprice: 0,
        sellprice: 0
    }
];