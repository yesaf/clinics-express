import { sqliteTable, text} from 'drizzle-orm/sqlite-core';

export const cities = sqliteTable('cities', {
    slug: text("city_slug"),
    name: text("city_name"),
    state: text("state"),
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
});

export default cities;
