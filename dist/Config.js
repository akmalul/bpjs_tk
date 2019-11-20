"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
class Config {
    constructor(url, username, password, merchantCode, merchantNumber) {
        this.url = url;
        this.username = username;
        this.password = password;
        this.merchantCode = merchantCode;
        this.merchantNumber = merchantNumber;
    }
    get getUsername() {
        return this.username;
    }
    get getPassword() {
        return this.password;
    }
    get getMerchantCode() {
        return this.merchantCode;
    }
    get getMerchantNumber() {
        return this.merchantNumber;
    }
    postRequest(path, xml) {
        const requestInstance = axios_1.default.post(`${this.url}${path}`, xml, {
            headers: {
                "Content-Type": "text/xml"
            },
            httpsAgent: new https_1.default.Agent({ ecdhCurve: "auto" })
        });
        return requestInstance
            .then((result) => {
            console.log(result);
            return result;
        })
            .catch((e) => {
            console.error(e);
            throw e;
        });
    }
}
exports.Config = Config;
