import { sqliteTable, text, real} from 'drizzle-orm/sqlite-core';

const clinics = sqliteTable('clinics', {
    longName: text("Long Name Version"),
    registerLink: text("Typeform registration link"),
    pms: text("PMS"),
    metaTitle: text("Meta-Title"),
    metaDescription: text("Meta-Description"),
    slug: text("slug"),
    website: text("Website"),
    name: text("Clinic Name"),
    displayWeb: text("Display_on_Web"),
    suburbLink: text("link to clinic suburb page"),
    fullAddress: text("Full Address"),
    city: text("City"),
    suburb: text("Suburb"),
    state: text("State"),
    postcode: text("Postcode"),
    phone: text("Phone"),
    email: text("Email"),
    about: text("About Clinic"),
    lat: real("lat"),
    lng: real("lng"),
});

export default clinics;
