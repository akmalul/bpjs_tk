import { Config } from "./Config";
import { IBpjsKesInquiry, IBpjsInquiryResponse, IBpjsPayment } from "./IBpjs";
export declare class Index {
    cfg: Config;
    constructor(config: Config);
    inquiry(inquiryData: IBpjsKesInquiry): Promise<IBpjsInquiryResponse>;
    createTransaction(purchaseData: IBpjsPayment): Promise<any>;
}
