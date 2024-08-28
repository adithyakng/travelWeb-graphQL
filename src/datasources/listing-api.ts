import {RESTDataSource} from '@apollo/datasource-rest';
import { Listing, Amenity, CreateListingInput } from "../types";

export class ListingAPI extends RESTDataSource {
    baseURL = "https://rt-airlock-services-listing.herokuapp.com/";
    getFeaturedListings(): Promise<Listing[]> {
       return this.get<Listing[]>('featured-listings')
    }

    getListing(listingID: string): Promise<Listing> {
        return this.get<Listing>(`listings/${listingID}`)
    }

    getAmenities(listingID: string): Promise<Amenity[]> {
        console.log("Hello here also called")
        return this.get<[Amenity]>(`listings/${listingID}/amenities`);
    }

    createListing(listing: CreateListingInput): Promise<Listing> {
        return this.post<Listing>("listings",{
            body: {listing}
        })
    }
}