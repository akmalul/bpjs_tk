export declare class Config {
    private url;
    private username;
    private password;
    private merchantCode;
    private merchantNumber;
    constructor(url: string, username: string, password: string, merchantCode: string, merchantNumber: string);
    get getUsername(): string;
    get getPassword(): string;
    get getMerchantCode(): string;
    get getMerchantNumber(): string;
    postRequest(path: string, xml: string): Promise<import("axios").AxiosResponse<any>>;
}
