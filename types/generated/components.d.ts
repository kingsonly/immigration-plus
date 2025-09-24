import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksApplicationProcess extends Struct.ComponentSchema {
  collectionName: 'components_blocks_application_process';
  info: {
    displayName: 'Application Process';
  };
  attributes: {
    icon: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.list-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksBusinessImmigration extends Struct.ComponentSchema {
  collectionName: 'components_blocks_business_immigration';
  info: {
    description: 'Full business-immigration page block to be used inside Service.blocks dynamic zone';
    displayName: 'Business Immigration Block';
  };
  attributes: {
    c11Benefits: Schema.Attribute.Component<'business.benefit', true>;
    fees: Schema.Attribute.Component<'business.fee', true>;
    govFees: Schema.Attribute.Component<'business.gov-fee', true>;
    hero: Schema.Attribute.Component<'business.hero', false>;
    howItWorks: Schema.Attribute.Component<'business.step', true>;
    pnpOverview: Schema.Attribute.Component<'business.kv', true>;
    postInvestmentCards: Schema.Attribute.Component<'business.card', true>;
    programs: Schema.Attribute.Component<'business.program', true>;
    quoteCTA: Schema.Attribute.Component<'business.cta-button', false>;
    seServices: Schema.Attribute.Component<'business.service', true>;
    streams: Schema.Attribute.Component<'business.stream', true>;
  };
}

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

export interface BlocksComparisonGrid extends Struct.ComponentSchema {
  collectionName: 'components_blocks_comparison_grids';
  info: {
    displayName: 'Comparison Grid';
  };
  attributes: {
    columns: Schema.Attribute.Component<'shared.list-item', true>;
    description: Schema.Attribute.Text;
    Heading: Schema.Attribute.String;
    rows: Schema.Attribute.Component<'shared.comparison-row', true>;
  };
}

export interface BlocksFeeCards extends Struct.ComponentSchema {
  collectionName: 'components_blocks_fee_cards';
  info: {
    displayName: 'Fee Cards';
  };
  attributes: {
    description: Schema.Attribute.Text;
    Heading: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.price-item', true> &
      Schema.Attribute.Required;
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

export interface BlocksServiceVariantCards extends Struct.ComponentSchema {
  collectionName: 'components_blocks_service_variant_cards';
  info: {
    description: 'Heading + a list of service variant cards';
    displayName: 'Service Variant Cards';
    icon: 'grid';
  };
  attributes: {
    Heading: Schema.Attribute.String;
    services: Schema.Attribute.Component<'shared.service-variant', true> &
      Schema.Attribute.Required;
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

export interface BlocksSplitFeature extends Struct.ComponentSchema {
  collectionName: 'components_blocks_split_feature';
  info: {
    displayName: 'Split Feature';
  };
  attributes: {
    cardIcon: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    items: Schema.Attribute.Component<'shared.list-item', true>;
    reverse: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BusinessBenefit extends Struct.ComponentSchema {
  collectionName: 'components_business_benefit';
  info: {
    displayName: 'Benefit';
  };
  attributes: {
    description: Schema.Attribute.Text;
    iconName: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BusinessCard extends Struct.ComponentSchema {
  collectionName: 'components_business_card';
  info: {
    displayName: 'Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    iconName: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BusinessCtaButton extends Struct.ComponentSchema {
  collectionName: 'components_business_cta_button';
  info: {
    displayName: 'CTA Button';
  };
  attributes: {
    emailSubject: Schema.Attribute.String;
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface BusinessFee extends Struct.ComponentSchema {
  collectionName: 'components_business_fee';
  info: {
    displayName: 'Fee';
  };
  attributes: {
    category: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    details: Schema.Attribute.JSON;
    note: Schema.Attribute.String;
    range: Schema.Attribute.String;
  };
}

export interface BusinessGovFee extends Struct.ComponentSchema {
  collectionName: 'components_business_gov_fee';
  info: {
    displayName: 'Government Fee';
  };
  attributes: {
    amount: Schema.Attribute.String;
    category: Schema.Attribute.String;
  };
}

export interface BusinessHero extends Struct.ComponentSchema {
  collectionName: 'components_business_hero';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    body: Schema.Attribute.Text;
    iconName: Schema.Attribute.String;
    primaryCTA: Schema.Attribute.Component<'business.cta-button', false>;
    secondaryCTA: Schema.Attribute.Component<'business.cta-button', false>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BusinessKv extends Struct.ComponentSchema {
  collectionName: 'components_business_kv';
  info: {
    displayName: 'Key Value';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface BusinessProgram extends Struct.ComponentSchema {
  collectionName: 'components_business_program';
  info: {
    displayName: 'Program';
  };
  attributes: {
    color: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    href: Schema.Attribute.String;
    iconName: Schema.Attribute.String;
    requirements: Schema.Attribute.Component<'shared.list-item', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BusinessService extends Struct.ComponentSchema {
  collectionName: 'components_business_service';
  info: {
    displayName: 'Service List Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    iconName: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BusinessStep extends Struct.ComponentSchema {
  collectionName: 'components_business_step';
  info: {
    displayName: 'How Step';
  };
  attributes: {
    heading: Schema.Attribute.String;
    stepNumber: Schema.Attribute.Integer;
    text: Schema.Attribute.Text;
  };
}

export interface BusinessStream extends Struct.ComponentSchema {
  collectionName: 'components_business_stream';
  info: {
    displayName: 'Stream';
  };
  attributes: {
    color: Schema.Attribute.String;
    investment: Schema.Attribute.String;
    jobs: Schema.Attribute.String;
    netWorth: Schema.Attribute.String;
    program: Schema.Attribute.String;
    province: Schema.Attribute.String;
    streams: Schema.Attribute.JSON;
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

export interface ServiceCta extends Struct.ComponentSchema {
  collectionName: 'components_service_ctas';
  info: {
    description: 'Call to action block';
    displayName: 'CTA';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String & Schema.Attribute.Required;
    buttonLink: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ServiceHero extends Struct.ComponentSchema {
  collectionName: 'components_service_heroes';
  info: {
    description: 'Hero section for a service';
    displayName: 'Hero';
  };
  attributes: {
    image: Schema.Attribute.Media & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ServiceSection extends Struct.ComponentSchema {
  collectionName: 'components_service_sections';
  info: {
    description: 'A section with title and description';
    displayName: 'Section';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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
    emailSubject: Schema.Attribute.String;
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String;
    newTab: Schema.Attribute.Boolean;
    url: Schema.Attribute.String;
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
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'shared.button', false>;
    lists: Schema.Attribute.Component<'shared.list-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedComparisonRow extends Struct.ComponentSchema {
  collectionName: 'components_shared_comparison_rows';
  info: {
    displayName: 'Comparison Row';
  };
  attributes: {
    bestFor: Schema.Attribute.String;
    color: Schema.Attribute.String;
    duration: Schema.Attribute.String;
    icon: Schema.Attribute.String;
    lmiaRequired: Schema.Attribute.String;
    permitType: Schema.Attribute.String;
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

export interface SharedPriceItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_price_items';
  info: {
    displayName: 'Price Item';
  };
  attributes: {
    amount: Schema.Attribute.String & Schema.Attribute.Required;
    note: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedProcessStep extends Struct.ComponentSchema {
  collectionName: 'components_shared_process_steps';
  info: {
    displayName: 'Process Step';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    stepNumber: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedServiceVariant extends Struct.ComponentSchema {
  collectionName: 'components_blocks_service_variants';
  info: {
    description: 'Single service option (e.g., Inland / Outland)';
    displayName: 'Service Variant';
    icon: 'layout';
  };
  attributes: {
    color: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    extra: Schema.Attribute.Text;
    features: Schema.Attribute.Component<'shared.list-item', true>;
    href: Schema.Attribute.String;
    icon: Schema.Attribute.String;
    processingTime: Schema.Attribute.String;
    startingPrice: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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
      'blocks.application-process': BlocksApplicationProcess;
      'blocks.business-immigration': BlocksBusinessImmigration;
      'blocks.card-grid': BlocksCardGrid;
      'blocks.comparison-grid': BlocksComparisonGrid;
      'blocks.fee-cards': BlocksFeeCards;
      'blocks.heading-section': BlocksHeadingSection;
      'blocks.hero': BlocksHero;
      'blocks.process-steps-block': BlocksProcessStepsBlock;
      'blocks.service-variant-cards': BlocksServiceVariantCards;
      'blocks.services': BlocksServices;
      'blocks.split-feature': BlocksSplitFeature;
      'business.benefit': BusinessBenefit;
      'business.card': BusinessCard;
      'business.cta-button': BusinessCtaButton;
      'business.fee': BusinessFee;
      'business.gov-fee': BusinessGovFee;
      'business.hero': BusinessHero;
      'business.kv': BusinessKv;
      'business.program': BusinessProgram;
      'business.service': BusinessService;
      'business.step': BusinessStep;
      'business.stream': BusinessStream;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'service.cta': ServiceCta;
      'service.hero': ServiceHero;
      'service.section': ServiceSection;
      'shared.button': SharedButton;
      'shared.card': SharedCard;
      'shared.comparison-row': SharedComparisonRow;
      'shared.list-item': SharedListItem;
      'shared.nav-dropdown-link': SharedNavDropdownLink;
      'shared.nav-link': SharedNavLink;
      'shared.price-item': SharedPriceItem;
      'shared.process-step': SharedProcessStep;
      'shared.service-variant': SharedServiceVariant;
      'shared.social-link': SharedSocialLink;
    }
  }
}
