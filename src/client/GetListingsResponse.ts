import Listing from "../model/Listing";

export default class GetListingsResponse {
    private readonly listings: Listing[]; 

    public constructor(listings: Listing[]) {
        this.listings = listings;
    }

    public getListings(): Listing[] {
        return this.listings;
    }
}