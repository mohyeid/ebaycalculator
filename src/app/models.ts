
export class Settings {
    public taxesIncluded: boolean = false;
    public taxes: number = 10;
    taxesOnFinallPrice: boolean = true;
}

export class Item extends Settings {
    public price: number = null;
    public discountedPrice: number = null;
    public shipping: number = null;
    public listingPrice: number = null;
}

export class Calculations {
    taxes: number;
    finalPrice: number;
    finalWithShiping: number;
    ebayFees: number;
    paypalFees: number;
    suggestedPrice: number;
    lossGain: number;
}