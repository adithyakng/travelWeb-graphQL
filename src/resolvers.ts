import { Resolvers } from "./types";
import { Listing } from "./types";
import { validateFullAmenities } from "./helpers";

export const resolvers: Resolvers = {
    Query : {
        featuredListings: (_: any, __: any, {dataSources}): Promise<Listing[]> => {
            return dataSources.listingAPI.getFeaturedListings()
        },
        listing: (_: any, {id}, {dataSources}): Promise<Listing> => {
            return dataSources.listingAPI.getListing(id);   
        }
    },
    Listing:{
        amenities:({ id, amenities }, _, { dataSources }, info) => {
            console.log("AMENITIES  CALLED FOR " + id)
            return dataSources.listingAPI.getAmenities(id);
        }
    },
    Mutation: {
        createListing: async(_: any, { input }, {dataSources}) => {
            try{
                const response = await dataSources.listingAPI.createListing(input);
                console.log(response);
                return {
                    code: 200,
                    success: true,
                    message: "Successfully created a listing",
                    listing: response
                }
            }
            catch(err){
                return {
                    code: 500,
                    success: false,
                    message: `Something went wrong: ${err.extensions.response.body}`,
                    listing: null
                }
            }
           
        }
    }

}