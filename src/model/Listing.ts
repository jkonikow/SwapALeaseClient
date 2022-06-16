export default class Listing {
    private make: string;
    private model: string;
    private imageUrl: string;
    private costPerMonth: string;
    private monthsRemaining: string;
    private downPayment: string;
    private location: string;
    private listingUrl: string;

    constructor(make: string, model: string, imageUrl: string, costPerMonth: string, 
        monthisRemaining: string, downPayment: string, location: string, listingUrl: string) {
            this.make = make;
            this.model = model;
            this.imageUrl = imageUrl;
            this.costPerMonth = costPerMonth;
            this.monthsRemaining = monthisRemaining;
            this.downPayment = downPayment;
            this.location = location;
            this.listingUrl = listingUrl;
    }

    public getMake(): string {
        return this.make;
    }

    public getModel(): string {
        return this.model;
    }

    public getImageUrl(): string {
        return this.imageUrl;
    }

    public getCostPerMonth(): string {
        return this.costPerMonth;
    }

    public getMonthsRemaining(): string {
        return this.monthsRemaining;
    }

    public getDownPayment(): string {
        return this.downPayment;
    }

    public getLocation(): string {
        return this.location;
    }

    public getListingUrl(): string {
        return this.listingUrl;
    }

}