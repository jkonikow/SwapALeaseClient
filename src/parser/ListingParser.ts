import cheerio from "cheerio";
import Listing, {VehicleInfo, LeaseInfo} from "../model/Listing";
import { BASE_URL } from "../Constants";
import { 
    ListingDetails, ListingDetailsHTML, 
    ListingInfo, ListingInfoHTML, 
    ListingImage, ListingImageHTML
} from "../model/Html";

const HTML_PARSING_EXCEPTION = "HtmlParsingException";

export default class ListingParser {
    public parseListings(html: string): Listing[] { 
        const listings: Listing[] = [];
        
        const $ = cheerio.load(html);
        const listingHtml = $("div[itemtype='http://schema.org/Product']");
        
        try {
            listingHtml.each((idx: number, element: cheerio.Element) => {
                const listingInfo: ListingInfo = this.parseListingInfo($, element);
                const listingDetails: ListingDetails = this.parseListingDetails($, element);
                const listingImage: ListingImage = this.parseListingImage($, element);
    
                const vehicleInfo: VehicleInfo = this.buildVehicleInfo(listingInfo);
                const leaseInfo: LeaseInfo = this.buildLeaseInfo(listingInfo, listingDetails);
                const {title, location} = listingInfo;
                const listingUrl = this.buildListingUrl(listingInfo);
                
                listings.push(new Listing(title, vehicleInfo, leaseInfo, listingImage.url, location, listingUrl));
            })
            return listings;
        } catch(e) {
            if(e instanceof Error && e.name === HTML_PARSING_EXCEPTION) {
                console.warn(`${e.message}. Proceeding with next listing....`);
            }

            throw e;
        }
    }


    private parseListingInfo($: cheerio.Root, contextRoot: cheerio.Element): ListingInfo {
        try {
            const infoHtml = $(ListingInfoHTML.LISTING_INFO_SELECTOR, contextRoot);
            const info: string[] = infoHtml
                .map((idx, element) => $(element).text().trim())
                .get();
            const location: string = info[ListingInfoHTML.LOCATION_INDEX];
            const color: string = info[ListingInfoHTML.EXTERIOR_COLOR_INDEX];
            const milesPerMonth = info[ListingInfoHTML.MILES_PER_MONTH_INDEX];
            
            const titleHtml = $(ListingInfoHTML.LISTING_TITLE_SELECTOR, contextRoot);
            const title = titleHtml.text().trim();
            // TODO: better way to handle this
            const listingPath: string = titleHtml.attr("href") ?? "";
    
            return {
                title,
                location,
                color,
                milesPerMonth,
                listingPath
            };
        } catch(e) {
            const msg: string =   e instanceof Error 
                ?  `Failure parsing ListingInfo HTML: ${e.message}`
                : `Non Error failure parsing ListingInfo HTML: ${e}`;
            const exception: Error = new Error(msg);
            exception.name = HTML_PARSING_EXCEPTION;
            
            throw exception;
        }
    }

    private parseListingDetails($: cheerio.Root, contextRoot: cheerio.Element): ListingDetails {
        try {
            const detailsRoot = $(ListingDetailsHTML.LISTING_DETAILS_SELECTOR, contextRoot);
            const monthsRemaining: string = $(ListingDetailsHTML.MONTHS_REMAINING_SELECTOR, detailsRoot).text().trim();
            const pricePerMonth: string = $(ListingDetailsHTML.COST_PER_MONTH_SELECTOR, detailsRoot).text().trim();
    
            return {
                monthsRemaining,
                costPerMonth: pricePerMonth
            };
        } catch(e) {
            const msg: string =   e instanceof Error 
                ?  `Failure parsing ListingDetails HTML: ${e.message}`
                : `Non Error failure parsing ListingDetails HTML: ${e}`;
            const exception: Error = new Error(msg);
            exception.name = HTML_PARSING_EXCEPTION;
            
            throw exception;
        }
    }

    private parseListingImage($: cheerio.Root, contextRoot: cheerio.Element): ListingImage {
        try {
            // TODO: better way to handlie this
            const url: string = $(ListingImageHTML.LISTING_IMAGE_SELECTOR, contextRoot).attr("src") ?? "";
            
            return { url };
        } catch(e) {
            const msg: string =   e instanceof Error 
                ?  `Failure parsing ListingImage HTML: ${e.message}`
                : `Non Error failure parsing ListingImage HTML: ${e}`;
            const exception: Error = new Error(msg);
            exception.name = HTML_PARSING_EXCEPTION;
            
            throw exception;
        }
    }

    private buildVehicleInfo(info: ListingInfo): VehicleInfo {
        const {title, color} = info;

        // Listing titles follow the format "year make model"
        const yearIndex: number = 0;
        const makeIndex: number  = 1;
        const modelIndex: number = 2;
        const splitTitle: string[] = title.split(" ");

        return {
            year: splitTitle[yearIndex],
            make: splitTitle[makeIndex],
            model: splitTitle[modelIndex],
            color
        };
    }

    private buildLeaseInfo(info: ListingInfo, details: ListingDetails): LeaseInfo {
        const {milesPerMonth} = info;
        const {monthsRemaining, costPerMonth} = details;

        return {
            costPerMonth,
            monthsRemaining, 
            milesPerMonth
        };
    }

    private buildListingUrl(info: ListingInfo) {
        const {listingPath} = info;
        if (!listingPath) {
            console.warn(`no path was parsed for listing: ${info.title}`);
            return "none";
        }

        return `${BASE_URL}${listingPath}`;
    }
}