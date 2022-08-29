import axios from "axios";
import {createApi} from "unsplash-js";

const unsplashApi= createApi({
	accessKey:"K5TJcvp7ixv8q0t7H69Rqhl7VK1dTUtE9mtB39Dio6Y"
})


const getListOfPhotos=async()=>{
	const photos=await unsplashApi.search.getPhotos({
		query:"coffee shop",
		perPage:20
	})
	const unsplashResults=photos.response.results;
	const photosResponse=unsplashResults.map(result=> result.urls["small"]);
	return photosResponse
	
}


const fetchCoffeeStores=async (latLong='43.72284,-79.46351')=>{
	const photos= await getListOfPhotos();
	console.log("photos",photos)
	const options = {
						method: 'GET',
						url: 'https://api.foursquare.com/v3/places/search',
						params: {
								query: 'coffee',
								ll: latLong,
								radius: '5000',
								categories: '13034',
								limit:10
								},
						headers: {
								Accept: 'application/json',
								Authorization: 'fsq3sTs+SsEY3RyPpi4Yb8B10quK+LpUZXEcVLHpE9yBAcY='
								}
					};

	let data=await axios.request(options).then(function (response) {
	  				return response.data
				}).catch(function (error) {
	  				console.error(error);
				});

	return data.results.map((venue,index)=>{
		return {
			...venue,
			imgUrl:photos[index]
		}
	})
}
 

export default fetchCoffeeStores;
