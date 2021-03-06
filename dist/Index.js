"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const random_number_1 = __importDefault(require("random-number"));
const crypto_1 = __importDefault(require("crypto"));
const xml_js_1 = __importDefault(require("xml-js"));
class Index {
    constructor(config) {
        this.cfg = config;
    }
    inquiry(inquiryData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const traxId = random_number_1.default({
                    min: 10000000,
                    max: 99999999,
                    integer: true
                });
                const terminal = "Telin_HASH";
                const md5Pass = crypto_1.default.createHash("md5").update(this.cfg.getPassword).digest("hex");
                const transactionType = "38";
                const timestamp = `${moment_1.default().format("DD-MM-YYYY HH:mm:ss:SSS")}${Math.floor(100 + Math.random() * 999)}`;
                const stringSignature = this.cfg.getUsername +
                    md5Pass +
                    inquiryData.productCode +
                    this.cfg.getMerchantCode +
                    terminal +
                    this.cfg.getMerchantNumber +
                    transactionType +
                    inquiryData.billNumber +
                    inquiryData.bit61 +
                    traxId +
                    timestamp;
                const signature = crypto_1.default.createHash("sha1").update(stringSignature).digest("hex");
                const xml = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:routeDx2">
							<soapenv:Header/>
							<soapenv:Body>
							<urn:billpayment soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"> 
								<inputBillPayment xsi:type="urn:inputBillPayment"> 
									<userName xsi:type="xsd:string">${this.cfg.getUsername}</userName> 
									<signature xsi:type="xsd:string">${signature}</signature> 
									<productCode xsi:type="xsd:string">${inquiryData.productCode}</productCode> 
									<merchantCode xsi:type="xsd:string">${this.cfg.getMerchantCode}</merchantCode> 
									<terminal xsi:type="xsd:string">${terminal}</terminal> 
									<merchantNumber xsi:type="xsd:string">${this.cfg.getMerchantNumber}</merchantNumber> 
									<transactionType xsi:type="xsd:string">${transactionType}</transactionType> 
									<billNumber xsi:type="xsd:string">${inquiryData.billNumber}</billNumber> 
									<bit61 xsi:type="xsd:string">${inquiryData.bit61}</bit61> 
									<traxId xsi:type="xsd:string">${traxId}</traxId> 
									<timeStamp xsi:type="xsd:string">${timestamp}</timeStamp> 
								</inputBillPayment> 
							</urn:billpayment>
							</soapenv:Body>
						</soapenv:Envelope>`;
                const response = yield this.cfg.postRequest("", xml);
                let responseInJSON = JSON.parse(xml_js_1.default.xml2json(response.data, {
                    compact: true,
                    ignoreDeclaration: true,
                    ignoreAttributes: true,
                    spaces: 4
                }));
                responseInJSON =
                    responseInJSON["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["ns1:billpaymentResponse"]["outputTransaction"];
                let responseData = {};
                for (var attr in responseInJSON)
                    responseData[attr] = responseInJSON[attr]["_text"];
                return responseData;
            }
            catch (e) {
                return {
                    error: e.message || e
                };
            }
        });
    }
    createTransaction(purchaseData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const traxId = random_number_1.default({
                    min: 10000000,
                    max: 99999999,
                    integer: true
                });
                const terminal = "Telin_HASH";
                const md5Pass = crypto_1.default.createHash("md5").update(this.cfg.getPassword).digest("hex");
                const transactionType = "50";
                const timestamp = `${moment_1.default().format("DD-MM-YYYY HH:mm:ss:SSS")}${Math.floor(100 + Math.random() * 999)}`;
                const stringSignature = this.cfg.getUsername +
                    md5Pass +
                    purchaseData.productCode +
                    this.cfg.getMerchantCode +
                    terminal +
                    this.cfg.getMerchantNumber +
                    transactionType +
                    purchaseData.billNumber +
                    purchaseData.amount +
                    purchaseData.feeAmount +
                    purchaseData.bit61 +
                    traxId +
                    timestamp;
                const signature = crypto_1.default.createHash("sha1").update(stringSignature).digest("hex");
                const xml = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:routeDx2">
							<soapenv:Header/>
							<soapenv:Body>
							<urn:billpayment soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"> 
								<inputBillPayment xsi:type="urn:inputBillPayment"> 
									<userName xsi:type="xsd:string">${this.cfg.getUsername}</userName> 
									<signature xsi:type="xsd:string">${signature}</signature> 
									<productCode xsi:type="xsd:string">${purchaseData.productCode}</productCode> 
									<merchantCode xsi:type="xsd:string">${this.cfg.getMerchantCode}</merchantCode> 
									<terminal xsi:type="xsd:string">${terminal}</terminal> 
									<merchantNumber xsi:type="xsd:string">${this.cfg.getMerchantNumber}</merchantNumber> 
									<transactionType xsi:type="xsd:string">${transactionType}</transactionType> 
									<billNumber xsi:type="xsd:string">${purchaseData.billNumber}</billNumber> 
									<amount xsi:type="xsd:string">${purchaseData.amount}</amount> 
									<feeAmount xsi:type="xsd:string">${purchaseData.feeAmount}</feeAmount> 
									<bit61 xsi:type="xsd:string">${purchaseData.bit61}</bit61> 
									<traxId xsi:type="xsd:string">${traxId}</traxId> 
									<timeStamp xsi:type="xsd:string">${timestamp}</timeStamp> 
								</inputBillPayment> 
							</urn:billpayment>
							</soapenv:Body>
						</soapenv:Envelope>`;
                const response = yield this.cfg.postRequest("", xml);
                let responseInJSON = JSON.parse(xml_js_1.default.xml2json(response.data, {
                    compact: true,
                    ignoreDeclaration: true,
                    ignoreAttributes: true,
                    spaces: 4
                }));
                responseInJSON =
                    responseInJSON["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["ns1:billpaymentResponse"]["outputTransaction"];
                let responseData = {};
                for (var attr in responseInJSON)
                    responseData[attr] = responseInJSON[attr]["_text"];
                return responseData;
            }
            catch (e) {
                return {
                    error: e.message || e
                };
            }
        });
    }
}
exports.Index = Index;
