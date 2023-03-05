import clinics from '../schemas/clinicsSchema';

import {drizzle, BetterSQLite3Database} from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

import {Selectors, Location} from "./types/clinicsTypes";
import {like, and, or, eq} from "drizzle-orm/expressions";

const contains = (value: string | undefined) => {
    return `%${value || ''}%`;
}

const fullStateToAbbreviation = {
    'New South Wales': 'NSW',
    'Victoria': 'VIC',
    'Queensland': 'QLD',
    'South Australia': 'SA',
    'Western Australia': 'WA',
    'Tasmania': 'TAS',
    'Northern Territory': 'NT',
    'Australian Capital Territory': 'ACT',
};

const getStateLikeFullNameFilters = (value: string | undefined) => {
    if (!value) return [];

    let filters: any[] = [];

    for (const [fullName, abbreviation] of Object.entries(fullStateToAbbreviation)) {
        if (fullName.toLowerCase().includes(value.toLowerCase())) {
            filters.push(like(clinics.state, contains(abbreviation)));
        }
    }

    return filters;
}

export default class ClinicsRepository {
    private db: BetterSQLite3Database;

    constructor() {
        const sqlite = new Database("./database.db3");
        this.db = drizzle(sqlite);
    }

    public getClinics(selectors: Selectors/*, noLimit: boolean = false*/) {
        const {city, suburb, clinicName, zip, state} = selectors;
        return this.db.select().from(clinics)
            .where(and(
                like(clinics.city, contains(city)),
                like(clinics.suburb, contains(suburb)),
                like(clinics.name, contains(clinicName)),
                like(clinics.postcode, contains(zip)),
                or(like(clinics.state, contains(state)), ...getStateLikeFullNameFilters(state)),
            ))
            // .limit(noLimit ? 1000: 200)
            .all();
    }

    public updateLocation(location: Location, fullAddress: string) {
        return this.db.update(clinics).set({
            lat: location.lat,
            lng: location.lng,
        }).where(eq(clinics.fullAddress, fullAddress)).run();
    }
}
