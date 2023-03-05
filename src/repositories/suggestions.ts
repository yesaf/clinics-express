import clinics from '../schemas/clinicsSchema';
import cities from '../schemas/citiesSchema';
import suburbs from '../schemas/suburbsSchema';

import {BetterSQLite3Database, drizzle} from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

import {like} from "drizzle-orm/expressions";

export type Suggestion = {
    suggestion: string;
}

export default class SuggestionsRepository {
    private db: BetterSQLite3Database;

    constructor() {
        const sqlite = new Database("./database.db3");
        this.db = drizzle(sqlite);
    }

    public suggestCity(city: string): Suggestion[] {
        return this.db.select({
            suggestion: cities.name,
        })
            .from(cities)
            .where(like(cities.name, `%${city}%`))
            .all() as Suggestion[];
    }

    public suggestSuburb(suburb: string): Suggestion[] {
        return this.db.select({
            suggestion: suburbs.name,
        }).from(suburbs)
            .where(like(suburbs.name, `%${suburb}%`))
            .all() as Suggestion[];
    }

    public suggestClinic(clinic: string): Suggestion[] {
        return this.db.select({
            suggestion: clinics.name,
        }).from(clinics)
            .where(like(clinics.name, `%${clinic}%`))
            .all() as Suggestion[];
    }

    public suggestState(state: string): Suggestion[] {
        return this.db.select({
            suggestion: cities.state,
        }).from(cities)
            .where(like(cities.state, `%${state}%`))
            .all() as Suggestion[];
    }
}
