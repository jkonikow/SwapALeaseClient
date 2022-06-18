import cheerio from "cheerio";
import fetch from "node-fetch";
import SwapALeaseClient from "./client/SwapALeaseClient";
import GetListingsRequest from "./client/GetListingsRequest";
import ListingParser from "./parser/ListingParser";
import Listing from "./model/Listing";

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
.then(response => printListings(response.getListings()))
.catch(e => {
    console.log("something went wrong: " + e);
})


const printListings = (listings: Listing[]) : void => {
    console.log("listings: ");
    console.log(listings);
}
//console.log("expected:");
//console.log(url);
// const obj: {prop1: string, prop2: string} = {
//     prop1:"nope",
//     prop2: "nope"
// };

// const populate = async () => {
//     const promise: Promise<void> = new Promise(resolve => {
//         setTimeout(() => {
//             obj["prop1"] = "value1";
//             resolve();
//         }, 2000);
//     });
    
//     const complete: Promise<void> = new Promise(resolve => {
//         setTimeout(() => { 
//             obj["prop2"] = "value2";
//             console.log(obj);
//             resolve()
//         }, 2000);
//     });
    
//     await promise;
//     await complete;
// }


// any brand car, 100 miles max from 07675, 1000 miles per month minimum, sort orde 5 (newest listings first), tansfers only (no sales)
// https://www.swapalease.com/lease/search.aspx?zip=07675&distance=100&minmilesper=1000&maxmo=24&trans=1&so=5&maxmopay=650

// #item-wrap > div:nth-child(3)
// <div itemscope="" itemtype="http://schema.org/Product">

// async function getHtml() {
//     const html: string = await fetch(url).then(resp => resp.text());
//     const $ = cheerio.load(html);
//     const listings = $("div[itemtype='http://schema.org/Product']");
    
// }


