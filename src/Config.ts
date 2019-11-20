import axios from "axios";
import https from "https";

export class Config {
	private url: string;
	private username: string;
	private password: string;
	private merchantCode: string;
	private merchantNumber: string;

	constructor(url: string, username: string, password: string, merchantCode: string, merchantNumber: string) {
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

	postRequest(path: string, xml: string) {
		const requestInstance = axios.post(`${this.url}${path}`, xml, {
			headers: {
				"Content-Type": "text/xml"
			},
			httpsAgent: new https.Agent({ ecdhCurve: "auto" })
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
