import fetch from "node-fetch";
import ListingParser from "../parser/ListingParser";
import Listing from "../model/Listing";
import GetListingsRequest from "./GetListingsRequest";
import GetListingsResponse from "./GetListingsResponse";
import HttpUtils, {HttpHeaders} from "./HttpUtils";

export default class SwapALeaseClient {
    private readonly ZIP_QUERY_PARAM: string = "zip";
    private readonly MAX_DISTANCE_QUERY_PARAM: string = "distance";
    private readonly MIN_MILES_PER_MONTH_QUERY_PARAM: string = "minmilesper";
    private readonly MAX_MONTHS_REMAINING_QUERY_PARAM: string = "maxmo";
    private readonly MAX_PRICE_PER_MONTH_QUERY_PARAM: string = "maxmopay";
    private readonly NEWEST_LISTING_SORT_MODE: string = "so=5";
    private readonly LEASE_TRANSFER_ONLY: string = "trans=1";

    private readonly parser: ListingParser;

    constructor(parser?: ListingParser) {
        // enabling constructor injection here for testing
        // but should look to see if there is a better practice
        this.parser = parser ?? new ListingParser();
    }

    public async getListings(request: GetListingsRequest): Promise<GetListingsResponse> {
        const urls: string[] = this.buildUrls(request);
        const allHtml: string[] = await Promise.all(urls.map(url => this.fetchHtml(url)));
        const listings: Listing[] = allHtml.flatMap(html => this.parser.parseListings(html));

        return new GetListingsResponse(listings);
    }

    private fetchHtml(url: string): Promise<string> {
        console.info(`Querying swap a lease url: ${url}`);
        const headers: HttpHeaders = HttpUtils.getRandomHeaders();
        return fetch(url, {
            method: "GET", 
            headers: headers
        })
        .then(html => html.text())
        .catch(e => {
            if (e instanceof Error) {
                throw new Error(`Failure connecting to swap a lease: ${e.message}`);
            }

            throw new Error(`Non-Error failure connecting to swap a lease: ${e}`);
        })
    }

    private buildUrls(request: GetListingsRequest): string[] {
        const location = this.buildQueryParamWithArg(this.ZIP_QUERY_PARAM, request.getZip());
        const maxDistance = this.buildQueryParamWithArg(this.MAX_DISTANCE_QUERY_PARAM, request.getMaxDistance());
        const minMilesPerMonth: string = this.buildQueryParamWithArg(this.MIN_MILES_PER_MONTH_QUERY_PARAM, request.getMinMilesPerMonth());
        const maxMonthRemaining: string  = this.buildQueryParamWithArg(this.MAX_MONTHS_REMAINING_QUERY_PARAM, request.getMaxMonthsRemaining());
        const maxPricePerMonth: string = this.buildQueryParamWithArg(this.MAX_PRICE_PER_MONTH_QUERY_PARAM, request.getMaxPricePerMonth());
        const preferredMakes: string[] = request.getPreferredMakes();

        const urls: string[] = [];
        if (preferredMakes.length > 0) {
            preferredMakes.forEach(make => {
                const baseUrlForMake: string = `https://www.swapalease.com/lease/${make}/search.aspx`;
                urls.push(this.buildUrl(baseUrlForMake, location, maxDistance, minMilesPerMonth, maxMonthRemaining, maxPricePerMonth));
            });
        } else {
            const makeAgnosticBaseUrl: string = "https://www.swapalease.com/lease/search.aspx"
            urls.push(this.buildUrl(makeAgnosticBaseUrl, location, maxDistance, minMilesPerMonth, maxMonthRemaining, maxPricePerMonth));
        }

        return urls;
    }

    private buildUrl(baseUrl: string, location: string,
                     maxDistance: string, minMilesPerMonth: string,
                     maxMonthRemaining: string, maxPricePerMonth: string) : string {
        return baseUrl +
            `?${location}`+
            `&${maxDistance}`+
            `&${minMilesPerMonth}`+
            `&${maxMonthRemaining}`+
            `&${maxPricePerMonth}`+
            `&${this.NEWEST_LISTING_SORT_MODE}`+
            `&${this.LEASE_TRANSFER_ONLY}`;
    }

    /**
     * if the query argument was provided build the query string otherwise return empty.
     */
    private buildQueryParamWithArg(param: string, arg: string | undefined): string {
        return arg ? `${param}=${arg}` : "";    
    }
}