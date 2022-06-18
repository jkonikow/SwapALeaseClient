/*
 *                              
    <div class="listing-info grid_3">
        <span itemprop="name" class="header3"><a href="/lease/details/2021-Audi-A4.aspx?salid=1594341">2021 Audi A4</a></span><br><br>
                                    
                                
                                   
        Style: <b>40 TFSI Premium</b><br>
        Location: <b>Briarcliff Manor,NY</b><br>
        Exterior Color: <b>White</b><br>
        Interior Color: <b>Black</b><br>
        Miles per month: <b>1008</b><br>
                                    
    </div>
 * 
 */

export class ListingInfoHTML{
    private constructor(){}
    public static readonly LISTING_INFO_SELECTOR: string = ".listing-info > b";
    public static readonly LISTING_TITLE_SELECTOR: string = ".listing-info > span > a";
    public static readonly LOCATION_INDEX: number = 1;
    public static readonly EXTERIOR_COLOR_INDEX: number = 2;
    public static readonly MILES_PER_MONTH_INDEX: number  = 4;
}
export type ListingInfo = {
    title: string
    location: string,
    color: string, 
    milesPerMonth: string,
    listingPath: string
}


/*
    <div class="listing-details grid_2">
        <div class="terms" itemprop="priceSpecification" itemscope="" itemtype="http://schema.org/UnitPriceSpecification"> 
            <ul class="list">                                
                <li class="payment" itemprop="price">
                    $486
                </li>
                <li class="label"><meta itemprop="unitCode" content="MON">Monthly Payment</li>
                <li class="months">
                    23
                </li>
                <li class="label">Months Left</li>          
            </ul>                           
        </div>
    </div>
*/
export class ListingDetailsHTML {
    private constructor(){}
    public static readonly LISTING_DETAILS_SELECTOR: string = ".listing-details > div > ul";
    public static readonly MONTHS_REMAINING_SELECTOR: string  = "li.months";
    public static readonly COST_PER_MONTH_SELECTOR: string  = "li.payment";
}
export type ListingDetails = {
    monthsRemaining: string,
    costPerMonth: string
}

/*
<div class="listing-image grid_4">
    <div class="image-inner">
        <a href="/lease/details/2021-Audi-A4.aspx?salid=1594341" title="2021 Audi A4 lease in Briarcliff Manor,NY">
          <img style="height: 270px; width:360px;" itemprop="image" src="https://www.swapalease.com/vehiclephotos/1594341/large/90e05ea9-b914-40ed-9db7-205d47c83c44.jpg" alt="2021 Audi A4 lease in Briarcliff Manor,NY - Swapalease.com">
          <div class="overlay-photos">12 photos</div>
        </a>
                                    
    </div>
</div>
*/
export class ListingImageHTML {
    private constructor(){}
    public static readonly LISTING_IMAGE_SELECTOR: string = "div.image-inner > a > img";
}
export type ListingImage = {
    url: string;
}
