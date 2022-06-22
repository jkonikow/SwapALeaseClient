import SwapALeaseClient from "./client/SwapALeaseClient";
import GetListingsRequest from "./client/GetListingsRequest";
import ListingParser from "./parser/ListingParser";
import Listing from "./model/Listing";
import GetListingsResponse from "./client/GetListingsResponse";

const url: string = "https://www.swapalease.com/lease/Audi/search.aspx?zip=07675&distance=100&minmilesper=1000&maxmo=24&trans=1&so=5&maxmopay=650";
const client: SwapALeaseClient = new SwapALeaseClient(new ListingParser());
const request: GetListingsRequest = GetListingsRequest.builder()
                                        .withMaxDistanceFromZip('100')
                                        .withMinMilesPerMonth('1000')
                                        .withMaxMonthsRemaining('24')
                                        .withMaxPricePerMonth('650')
                                        .withZip('07675')
                                        .build();
client.getListings(request)
.then((response: GetListingsResponse) => printListings(response.getListings()))
.catch(e => {
    console.log("something went wrong: " + e);
})

const printListings = (listings: Listing[]) : void => {
    console.log("listings: ");
    console.log(listings);
}

export const sayHello =  (name: string): void => console.log(name);
