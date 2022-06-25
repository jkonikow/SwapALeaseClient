export default class Listing {
    private title: string;
    private vehicleInfo: VehicleInfo;
    private leaseInfo: LeaseInfo;
    private imageUrl: string;
    private location: string;
    private listingUrl: string;

    constructor(title: string, vehicleInfo: VehicleInfo, leaseInfo: LeaseInfo, 
        imageUrl: string,  location: string, listingUrl: string) {
        this.title = title;
        this.vehicleInfo = vehicleInfo;
        this.leaseInfo = leaseInfo;    
        this.imageUrl = imageUrl;
        this.location = location;
        this.listingUrl = listingUrl;
    }

    public getTitle(): string {
        return this.title;
    }

    public getMake(): string {
        return this.vehicleInfo.make;
    }

    public getModel(): string {
        return this.vehicleInfo.model;
    }

    public getYear(): string {
        return this.vehicleInfo.year;
    }

    public getColor(): string {
        return this.vehicleInfo.color;
    }

    public getImageUrl(): string {
        return this.imageUrl;
    }

    public getCostPerMonth(): string {
        return this.leaseInfo.costPerMonth;
    }

    public getMonthsRemaining(): string {
        return this.leaseInfo.monthsRemaining;
    }

    public getMilesPerMonth(): string {
        return this.leaseInfo.milesPerMonth;
    }

    public getLocation(): string {
        return this.location;
    }

    public getListingUrl(): string {
        return this.listingUrl;
    }

    public equals(other: Listing): boolean {
        return this == other || 
        (this.getTitle() === other.getTitle() &&
        this.getColor() === other.getColor() &&
        this.getLocation() === other.getLocation() &&
        this.getMake() === other.getMake() &&
        this.getModel() === other.getModel() &&
        this.getYear() === other.getYear() &&
        this.getCostPerMonth() === other.getCostPerMonth() &&
        this.getMilesPerMonth() === other.getMilesPerMonth() &&
        this.getMonthsRemaining() === other.getMonthsRemaining());
    }
}

export type VehicleInfo = {
    year: string,
    make: string, 
    model: string,
    color: string
}

export type LeaseInfo = {
    costPerMonth: string,
    monthsRemaining: string,
    milesPerMonth: string
}
