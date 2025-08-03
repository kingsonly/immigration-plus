import { createClient } from 'contentful';

const contentfulClient = createClient({
    space: "i23ztf1zj519",//process.env.CONTENTFUL_SPACE_ID!,
    accessToken: "8rJUQYs92WSFPGza0YfxfPWhf0LACTFnxIQOsHpQSjY",//process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export default contentfulClient;