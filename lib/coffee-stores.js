import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});





const getUrlForCoffeeStores = (latLong, query, limit) => {
    //return 'https://api.foursquare.com/v3/places/search?query=coffee&ll=19.41177325322429%2C-99.16912362715881&limit=6'
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`

}

const getListOfCoffeeStorePhotos = async () => {
    const photos = await unsplash.search.getPhotos(
        {
            query: 'coffee shop',
            page: 40,
        }
    )

    const unsplashResults = photos.response.results.map(result => {
        return result.urls["small"]
    })
    return unsplashResults
}



export const fetchCoffeeStores = async (latLong = "19.41177325322429%2C-99.16912362715881", limit = 6) => {
    const photos = await getListOfCoffeeStorePhotos()

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
      }
    };
    
    const response = await fetch(getUrlForCoffeeStores(latLong, "coffee", limit), options)
    const data = await response.json()
    return data.results.map((result, idx) => {
        return {
            id: result.fsq_id,
            name: result.name,
            address: result.location.address,
            locality: result.location.locality,
            postcode: result.location.postcode,
            imgUrl: photos.length > 0 ? photos[idx] : null
        }
    })
}



  