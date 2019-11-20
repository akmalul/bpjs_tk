import { Config } from "./Config";
import { IBpjsKesInquiry, IBpjsInquiryResponse, IBpjsPayment, IBpjsPaymentResponse } from "./IBpjs";
import moment from "moment";
import rn from "random-number";
import crypto from "crypto";
import convert from "xml-js";

export class Index {
	cfg: Config;

	constructor(config: Config) {
		this.cfg = config;
	}

	async inquiry(inquiryData: IBpjsKesInquiry): Promise<IBpjsInquiryResponse> {
		try {
			const traxId = rn({
				min: 10000000,
				max: 99999999,
				integer: true
			});
			const terminal = "Telin_HASH";
			const md5Pass = crypto.createHash("md5").update(this.cfg.getPassword).digest("hex");
			const transactionType = "38";
			const timestamp = `${moment().format("DD-MM-YYYY HH:mm:ss:SSS")}${Math.floor(100 + Math.random() * 999)}`;
			const stringSignature =
				this.cfg.getUsername +
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
			const signature = crypto.createHash("sha1").update(stringSignature).digest("hex");

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
			const response = await this.cfg.postRequest("", xml);
			let responseInJSON = JSON.parse(
				convert.xml2json(response.data, {
					compact: true,
					ignoreDeclaration: true,
					ignoreAttributes: true,
					spaces: 4
				})
			);

			responseInJSON =
				responseInJSON["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["ns1:billpaymentResponse"]["outputTransaction"];
			let responseData: any = {};
			for (var attr in responseInJSON) responseData[attr] = responseInJSON[attr]["_text"];

			return <IBpjsInquiryResponse | any>responseData;
		} catch (e) {
			return {
				error: e.message || e
			} as any;
		}
	}

	async createTransaction(purchaseData: IBpjsPayment) {
		try {
			const traxId = rn({
				min: 10000000,
				max: 99999999,
				integer: true
			});
			const terminal = "Telin_HASH";
			const md5Pass = crypto.createHash("md5").update(this.cfg.getPassword).digest("hex");
			const transactionType = "50";
			const timestamp = `${moment().format("DD-MM-YYYY HH:mm:ss:SSS")}${Math.floor(100 + Math.random() * 999)}`;
			const stringSignature =
				this.cfg.getUsername +
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
			const signature = crypto.createHash("sha1").update(stringSignature).digest("hex");

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
			const response = await this.cfg.postRequest("", xml);
			let responseInJSON = JSON.parse(
				convert.xml2json(response.data, {
					compact: true,
					ignoreDeclaration: true,
					ignoreAttributes: true,
					spaces: 4
				})
			);

			responseInJSON =
				responseInJSON["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["ns1:billpaymentResponse"]["outputTransaction"];
			let responseData: any = {};
			for (var attr in responseInJSON) responseData[attr] = responseInJSON[attr]["_text"];

			return <IBpjsPaymentResponse | any>responseData;
		} catch (e) {
			return <any>{
				error: e.message || e
			};
		}
	}
}
