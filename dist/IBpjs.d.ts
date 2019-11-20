export interface IBpjs {
    bill_number: string;
    payment_period: string;
    product_code: number | 34;
    transaction_type: string;
}
export interface IBpjsKesInquiry {
    productCode: string;
    billNumber: string;
    bit61: string;
}
export interface IBpjsInquiryResponse {
    code: string;
    resultCode: string;
    resultDesc: string;
    productCode: string;
    merchantCode: string;
    terminal: string;
    merchantNumber: string;
    amount: string;
    feeAmount: string;
    transactionType: string;
    billNumber: string;
    bit61: string;
    bit48: string;
    bit39: string;
    traxId: string;
    timeStamp: string;
    timeStampServer: string;
}
export interface IBpjsPayment {
    productCode: string;
    billNumber: string;
    bit61: string;
    amount: string;
    feeAmount: string;
}
export interface IBpjsPaymentResponse {
    code: string;
    resultCode: string;
    resultDesc: string;
    productCode: string;
    merchantCode: string;
    terminal: string;
    merchantNumber: string;
    amount: string;
    feeAmount: string;
    transactionType: string;
    billNumber: string;
    bit61: string;
    bit48: string;
    bit39: string;
    traxId: string;
    timeStamp: string;
    timeStampServer: string;
}
