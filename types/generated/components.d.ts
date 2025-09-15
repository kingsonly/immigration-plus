import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksCardGrid extends Struct.ComponentSchema {
  collectionName: 'components_blocks_card_grids';
  info: {
    displayName: 'Card Grid';
  };
  attributes: {
    Cards: Schema.Attribute.Component<'shared.card', true>;
    description: Schema.Attribute.Text;
    Heading: Schema.Attribute.String;
    link: Schema.Attribute.Component<'shared.button', false>;
  };
}

export interface BlocksHeadingSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heading_sections';
  info: {
    displayName: 'Heading Section';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.button', false>;
    description: Schema.Attribute.Text;
    Heading: Schema.Attribute.String;
    icon: Schema.Attribute.String;
  };
}

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

export interface BlocksProcessStepsBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_process_steps_blocks';
  info: {
    displayName: 'Process Steps Block';
    icon: 'bold';
  };
  attributes: {
    description: Schema.Attribute.Text;
    steps: Schema.Attribute.Component<'shared.process-step', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksServices extends Struct.ComponentSchema {
  collectionName: 'components_blocks_services';
  info: {
    displayName: 'Services';
  };
  attributes: {
    color: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    details: Schema.Attribute.RichText;
    icon: Schema.Attribute.String;
    isReverse: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.Component<'shared.button', false>;
    listItem: Schema.Attribute.Component<'shared.list-item', true>;
    title: Schema.Attribute.String;
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

export interface SharedCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_cards';
  info: {
    displayName: 'Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    link: Schema.Attribute.Component<'shared.button', false>;
    lists: Schema.Attribute.Component<'shared.list-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedListItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_list_items';
  info: {
    displayName: 'List Item';
  };
  attributes: {
    icon: Schema.Attribute.String;
    listItem: Schema.Attribute.Text;
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
    url: Schema.Attribute.String;
  };
}

export interface SharedProcessStep extends Struct.ComponentSchema {
  collectionName: 'components_shared_process_steps';
  info: {
    displayName: 'Process Step';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files'>;
    stepNumber: Schema.Attribute.String;
    title: Schema.Attribute.String;
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
      'blocks.card-grid': BlocksCardGrid;
      'blocks.heading-section': BlocksHeadingSection;
      'blocks.hero': BlocksHero;
      'blocks.process-steps-block': BlocksProcessStepsBlock;
      'blocks.services': BlocksServices;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'shared.button': SharedButton;
      'shared.card': SharedCard;
      'shared.list-item': SharedListItem;
      'shared.nav-dropdown-link': SharedNavDropdownLink;
      'shared.nav-link': SharedNavLink;
      'shared.process-step': SharedProcessStep;
      'shared.social-link': SharedSocialLink;
    }
  }
}
