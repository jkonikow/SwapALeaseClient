class GetListingsRequestBuilder {
    private  zip?: string;
    private  maxDistanceFromZip?: string;
    private  minMilesPerMonth?: string;
    private  maxMonthsRemaining?: string;
    private  maxPricePerMonth?: string;

    withZip(zip: string): GetListingsRequestBuilder {
        this.zip = zip;
        return this;
    }

    withMaxDistanceFromZip(distance: string): GetListingsRequestBuilder {
        this.maxDistanceFromZip = distance;
        return this;
    }

    withMinMilesPerMonth(miles: string): GetListingsRequestBuilder {
        this.minMilesPerMonth = miles;
        return this;
    }

    withMaxMonthsRemaining(months: string): GetListingsRequestBuilder {
        this.maxMonthsRemaining = months;
        return this;
    }

    withMaxPricePerMonth(price: string): GetListingsRequestBuilder {
        this.maxPricePerMonth = price;
        return this;
    }

    build(): GetListingsRequest {
        if (!this.zip) {
            throw new Error("zipcode is required for fetching lease listings");
        }
        
        return new GetListingsRequest(this.zip, this.maxDistanceFromZip, this.minMilesPerMonth, 
            this.maxMonthsRemaining, this.maxPricePerMonth);
    }
}

export default class GetListingsRequest {
    private readonly zip: string;
    private readonly maxDistanceFromZip?: string;
    private readonly minMilesPerMonth?: string;
    private readonly maxMonthsRemaining?: string;
    private readonly maxPricePerMonth?: string;

    //TODO: should be a way to use fluent builder patern without making 
    // the product constructor public
    public constructor(zip: string, maxDistanceFromZip?: string, minMilesPerMonth?: string, 
        maxMonthsRemaining?: string, maxPricePerMonth?: string) {
            this.zip = zip;
            this.maxDistanceFromZip = maxDistanceFromZip;
            this.minMilesPerMonth = minMilesPerMonth;
            this.maxMonthsRemaining = maxMonthsRemaining;
            this.maxPricePerMonth = maxPricePerMonth;
    }

    public getZip(): string {
        return this.zip;
    }

    public hasMaxDistance(): boolean {
        return this.maxDistanceFromZip === undefined;
    }

    public getMaxDistance(): string|undefined {
        return this.maxDistanceFromZip;
    }

    public hasMinMilesPerMonth(): boolean {
        return this.minMilesPerMonth === undefined;
    }

    public getMinMilesPerMonth(): string|undefined {
        return this.minMilesPerMonth;
    }

    public hasMaxMonthsRemaining(): boolean {
        return this.maxMonthsRemaining == undefined;
    }

    public getMaxMonthsRemaining(): string|undefined {
        return this.maxMonthsRemaining;
    }

    public hasMaxPricePerMonth(): boolean {
        return this.maxPricePerMonth == undefined;
    }

    public getMaxPricePerMonth(): string|undefined {
        return this.maxPricePerMonth;
    }
    
    public static builder() {
        return new GetListingsRequestBuilder();
    }
}