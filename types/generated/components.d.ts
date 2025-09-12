import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    ctas: Schema.Attribute.Component<'shared.button', true>;
    description: Schema.Attribute.RichText;
    icon: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Subtitle: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    FooterCopyright: Schema.Attribute.String;
    FooterLinks: Schema.Attribute.Component<'shared.nav-link', true>;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    Logo: Schema.Attribute.Component<'shared.nav-link', false>;
    NavLink: Schema.Attribute.Component<'shared.nav-link', true>;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    description: 'Reusable button with type, label, and link';
    displayName: 'Button';
    icon: 'external-link';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    newTab: Schema.Attribute.Boolean;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ['default', 'secondary', 'destructive', 'link', 'outline']
    > &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface SharedNavDropdownLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_dropdown_links';
  info: {
    description: 'Dropdown item for navigation link';
    displayName: 'Nav Dropdown Link';
    icon: 'link';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface SharedNavLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_links';
  info: {
    description: 'Navigation link with optional dropdown';
    displayName: 'Nav Link';
    icon: 'link';
  };
  attributes: {
    dropdown: Schema.Attribute.Component<'shared.nav-dropdown-link', true>;
    icon: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

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
      'blocks.hero': BlocksHero;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'shared.button': SharedButton;
      'shared.nav-dropdown-link': SharedNavDropdownLink;
      'shared.nav-link': SharedNavLink;
      'shared.social-link': SharedSocialLink;
    }
  }
}
