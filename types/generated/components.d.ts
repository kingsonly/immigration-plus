import type { Schema, Struct } from '@strapi/strapi';

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: 'A social media or external link for the site';
    displayName: 'Social Link';
    icon: 'link';
  };
  attributes: {
    icon: Schema.Attribute.String;
    platform: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.social-link': SharedSocialLink;
    }
  }
}
