import { BikeLocation } from "../../../models/bikeLocation";
import { HttpClientService } from "../http.client.service";
import { BikeDetailsResponse } from "../../../models/responseModels/bike/bikeDetailsResponseModel";

const httpClientService = new HttpClientService();
const CONTROLLER = "ride";

export const getCloseBikeByGeoLocation = async (location: BikeLocation): Promise<Array<BikeDetailsResponse>> => {
    const queryString = `lat=${location.lat}&long=${location.long}`;
    const promiseData: any = await httpClientService.get({
        controller: CONTROLLER,
        action: "getCloseBikesByGeoLocation",
        queryString: queryString,
        isAuth: true
    });
    return promiseData.data;
}
