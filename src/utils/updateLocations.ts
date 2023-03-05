import ClinicsRepository from "../repositories/clinics";
import {Client} from "@googlemaps/google-maps-services-js";

const clinicsRepository = new ClinicsRepository();
const client = new Client({});

const updateAddress = (address: string) => {
    client.geocode({
        params: {
            address,
            key: process.env.GOOGLE_MAPS_API_KEY || '',
        }
    }).then((response) => {
        const location = response.data.results[0].geometry.location;
        console.log("Updating address", address)
        console.log("New location", location)
        console.log(clinicsRepository.updateLocation(location, address));
    }).catch((error) => {
        console.log("Error updating address", error);
    });
}

const updateLocations = () => {
    console.log("Updating locations")
    const clinics = clinicsRepository.getClinics({});

    for (const clinic of clinics) {
        if (!clinic.lat && !clinic.lng && clinic.fullAddress) {
            updateAddress(clinic.fullAddress);
        }
    }
}

export default updateLocations;
