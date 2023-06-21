class GetListingsRequestBuilder {
    private  zip?: string;
    private  maxDistanceFromZip?: string;
    private  minMilesPerMonth?: string;
    private  maxMonthsRemaining?: string;
    private  maxPricePerMonth?: string;
    private preferredMakes?: string[];

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

    withPreferredMakes(prefferredMakes: string[]): GetListingsRequestBuilder {
        this.preferredMakes = prefferredMakes;
        return this;
    }

    build(): GetListingsRequest {
        if (!this.zip) {
            throw new Error("zipcode is required for fetching lease listings");
        }
        
        return new GetListingsRequest(this.zip, this.maxDistanceFromZip, this.minMilesPerMonth, 
            this.maxMonthsRemaining, this.maxPricePerMonth, this.preferredMakes);
    }
}

export default class GetListingsRequest {
    private readonly zip: string;
    private readonly maxDistanceFromZip?: string;
    private readonly minMilesPerMonth?: string;
    private readonly maxMonthsRemaining?: string;
    private readonly maxPricePerMonth?: string;
    private readonly preferredMakes?: string[];

    //TODO: should be a way to use fluent builder patern without making 
    // the product constructor public
    public constructor(zip: string, maxDistanceFromZip?: string, minMilesPerMonth?: string, 
        maxMonthsRemaining?: string, maxPricePerMonth?: string, preferredMakes?: string[]) {
            this.zip = zip;
            this.maxDistanceFromZip = maxDistanceFromZip;
            this.minMilesPerMonth = minMilesPerMonth;
            this.maxMonthsRemaining = maxMonthsRemaining;
            this.maxPricePerMonth = maxPricePerMonth;
            this.preferredMakes = preferredMakes;
    }

    public getZip(): string {
        return this.zip;
    }

    public getMaxDistance(): string|undefined {
        return this.maxDistanceFromZip;
    }

    public getMinMilesPerMonth(): string|undefined {
        return this.minMilesPerMonth;
    }

    public getMaxMonthsRemaining(): string|undefined {
        return this.maxMonthsRemaining;
    }

    public getMaxPricePerMonth(): string|undefined {
        return this.maxPricePerMonth;
    }

    public getPreferredMakes(): string[] {
        return this.preferredMakes ?? [];
    }
    
    public static builder() {
        return new GetListingsRequestBuilder();
    }
}