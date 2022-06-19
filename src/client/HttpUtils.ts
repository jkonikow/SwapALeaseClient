export type HttpHeaders = Record<string, string>;

const chromeHeaders: HttpHeaders = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "en-US,en;q=0.9", 
    "Upgrade-Insecure-Requests": "1", 
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
}
const safariHeaders: HttpHeaders = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", 
    "Accept-Encoding": "gzip, deflate", 
    "Accept-Language": "en-us", 
    "Upgrade-Insecure-Requests": "1", 
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Safari/605.1.15", 
}
const headers: HttpHeaders[] = [chromeHeaders, safariHeaders];

class HttpUtils {
    constructor(){};

    public getRandomHeaders() : HttpHeaders {
        const inclusiveMin: number = 0;
        const exclusiveMax: number = headers.length;
        const idx = Math.floor(Math.random() * (exclusiveMax - inclusiveMin) + inclusiveMin);
        
        return headers[idx];
    }
}

const instance = new HttpUtils();
export default instance as HttpUtils;



