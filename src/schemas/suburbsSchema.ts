import { sqliteTable, text} from 'drizzle-orm/sqlite-core';

export const suburbs = sqliteTable('suburbs', {
    slug: text("suburb-slug"),
    name: text("suburb_name"),
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
});

export default suburbs;
