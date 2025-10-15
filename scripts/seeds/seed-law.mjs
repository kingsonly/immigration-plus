import "dotenv/config";

const STRAPI_URL = (process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || process.env.NEXT_PUBLIC_STRAPI_TOKEN;

if (!STRAPI_TOKEN) {
  console.error("Missing STRAPI_TOKEN or NEXT_PUBLIC_STRAPI_TOKEN in environment.");
  process.exit(1);
}

function toHtmlParagraphs(lines = []) {
  return (lines || [])
    .filter(Boolean)
    .map((line) => `<p>${line}</p>`)
    .join("\n");
}

async function request(method, path, body) {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 404) {
    return { status: 404 };
  }

  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch (err) {
    /* ignore json parse errors */
  }

  if (!res.ok) {
    throw new Error(`Request ${method} ${path} failed (${res.status}): ${text}`);
  }

  return json;
}

async function getSingle(uid) {
  const res = await request("GET", `/api/${uid}`);
  return res?.data || null;
}

async function setSingle(uid, data) {
  await request("PUT", `/api/${uid}`, { data });
}
async function findCollectionEntry(uid, filterField, value) {
  const res = await request(
    "GET",
    `/api/${uid}?filters[${filterField}][$eq]=${encodeURIComponent(value)}&pagination[limit]=1`
  );
  const data = res?.data;
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }
  return null;
}

async function upsertCollection(uid, filterField, value, data) {
  const existing = await findCollectionEntry(uid, filterField, value);
  if (existing) {
    const id = existing.id;
    const res = await request("PUT", `/api/${uid}/${id}`, { data });
    return res?.data || existing;
  }
  const created = await request("POST", `/api/${uid}`, { data });
  return created?.data;
}

function makeContactPoint({ label, value, href, icon }) {
  return {
    label: label || null,
    value,
    href: href || null,
    icon: icon || null,
  };
}

function makeBullet(title, description) {
  return {
    title,
    description: description || null,
    icon: null,
  };
}

function makeValueCard({ icon, title, description }) {
  return {
    icon: icon || null,
    title,
    description: description || null,
  };
}

function makeServiceCard({ title, summary, details, icon }) {
  return {
    title,
    summary: summary || null,
    icon: icon || null,
    details: (details || [])
      .map((item) => {
        if (!item) return null;
        if (typeof item === "string") {
          return item;
        }
        if (typeof item === "object" && typeof item.text === "string") {
          return item.text;
        }
        return null;
      })
      .filter(Boolean)
      .map((text) => makeListItem(text)),
  };
}

function makeListItem(text) {
  return {
    text,
  };
}

function makeProcessStep({ stepNumber, title, description, icon }) {
  return {
    stepNumber: stepNumber || null,
    title,
    description: description || null,
    icon: icon || null,
  };
}

function makeFormField({ label, fieldType, placeholder, required, options }) {
  return {
    label,
    fieldType: fieldType || "text",
    placeholder: placeholder || null,
    required: required ?? false,
    options: (options || []).map((option) => ({
      label: option?.label,
      value: option?.value || null,
    })),
  };
}

function makeContactInfoCard({ icon, title, lines }) {
  return {
    icon: icon || null,
    title,
    lines: (lines || []).map(makeListItem),
  };
}

const practiceAreasData = [
  {
    slug: "immigration-refugee-law",
    title: "Immigration & Refugee Law",
    cardSummary: "We help individuals and families build their futures in Canada.",
    icon: "Users",
    backgroundImage: null,
    heroImage: null,
    intro:
      "Comprehensive immigration and refugee services guiding individuals, families, and businesses through Canada's complex immigration system with expertise and compassion.",
    body: toHtmlParagraphs([
      "Our team provides legal support for all aspects of Canadian immigration law � from work and study permits to appeals and refugee protection � ensuring your case is handled with diligence and care.",
    ]),
    services: [
      {
        title: "Study, Work, and Visitor Visas",
        summary:
          "Helping newcomers secure temporary resident status including study permits, work permits, and visitor visas.",
        details: [
          "Study permits for colleges and universities",
          "Co-op and post-graduation work permits",
          "Employer-specific and open work permits",
          "Visitor visas, extensions, and status restoration",
        ],
      },
      {
        title: "Family Class Sponsorship",
        summary:
          "Supporting Canadians who wish to sponsor spouses, partners, children, parents, or grandparents.",
        details: [
          "Spousal and common-law sponsorship applications",
          "Parent and grandparent sponsorship coordination",
          "Dependent child sponsorship submissions",
          "Responses to procedural fairness or additional document requests",
        ],
      },
      {
        title: "Permanent Residence Applications",
        summary:
          "Guiding clients through Express Entry, Provincial Nominee Program (PNP), and Canadian Experience Class applications.",
        details: [
          "Express Entry profile creation and monitoring",
          "Provincial Nominee Program nominations and updates",
          "Canadian Experience Class eligibility reviews",
          "Federal skilled worker and trades stream documentation",
        ],
      },
      {
        title: "Refugee Protection Claims",
        summary:
          "Representing refugee claimants before the IRB, preparing pre-removal risk assessments, and humanitarian applications.",
        details: [
          "Preparing Basis of Claim forms and evidence packages",
          "Representation before the Immigration and Refugee Board",
          "Pre-removal risk assessment applications",
          "Humanitarian and compassionate relief strategies",
        ],
      },
      {
        title: "Citizenship Applications",
        summary:
          "Assisting permanent residents with citizenship eligibility reviews, applications, and hearings.",
        details: [
          "Eligibility and physical presence assessments",
          "Application preparation and submission",
          "Citizenship test and interview preparation",
          "Hearing representation and appeal support",
        ],
      },
      {
        title: "Appeals & Judicial Reviews",
        summary:
          "Handling immigration appeals and judicial reviews for delayed or refused applications.",
        details: [
          "Immigration Appeal Division sponsorship appeals",
          "Residency obligation and removal order challenges",
          "Federal Court judicial review applications",
          "Stay motions and compliance strategies",
        ],
      },
      {
        title: "Business Immigration",
        summary:
          "Supporting entrepreneurs and investors through the Start-up Visa and self-employed programs.",
        details: [
          "Start-up Visa business plan and support letters",
          "Owner-operator LMIA strategies",
          "Self-employed and entrepreneur program guidance",
          "Intra-company transfer and CUSMA work permits",
        ],
      },
      {
        title: "Inadmissibility Issues",
        summary:
          "Advising on criminal, medical, or misrepresentation inadmissibility matters and rehabilitation options.",
        details: [
          "Criminal rehabilitation and deemed rehabilitation advice",
          "Temporary resident permit applications",
          "Medical inadmissibility mitigation plans",
          "Misrepresentation responses and remedy strategies",
        ],
      },
    ],
    order: 1,
  },
  {
    slug: "family-law",
    title: "Family Law",
    cardSummary: "Compassionate guidance for families facing change and conflict.",
    icon: "Heart",
    backgroundImage: null,
    heroImage: null,
    intro:
      "Compassionate and experienced family law representation for divorce, custody, support, and all family-related legal matters with a focus on protecting your family's future.",
    body: toHtmlParagraphs([
      "Family law matters are deeply personal and emotionally challenging. Our experienced team provides compassionate representation while protecting your rights and your family's future.",
    ]),
    services: [
      {
        title: "Divorce & Separation",
        summary:
          "Comprehensive legal guidance through divorce proceedings and separation agreements.",
        details: [
          "Uncontested and contested divorce proceedings",
          "Separation agreements and cohabitation agreements",
          "Property division and asset valuation",
          "Spousal support calculations and modifications",
          "Mediation and collaborative divorce options",
        ],
      },
      {
        title: "Child Custody & Access",
        summary: "Protecting children's best interests in custody and access arrangements.",
        details: [
          "Joint and sole custody arrangements",
          "Parenting plans and schedules",
          "Access rights for non-custodial parents",
          "Relocation and mobility issues",
          "Enforcement of custody orders",
        ],
      },
      {
        title: "Child & Spousal Support",
        summary: "Ensuring fair financial support arrangements for families.",
        details: [
          "Child support calculations using federal guidelines",
          "Special and extraordinary expenses",
          "Spousal support assessments and duration",
          "Support modification applications",
          "Enforcement of support orders",
        ],
      },
      {
        title: "Property Division",
        summary: "Equitable distribution of matrimonial property and assets.",
        details: [
          "Matrimonial home rights and division",
          "Business valuation and division",
          "Pension and RRSP division",
          "Debt allocation and responsibility",
          "Pre-nuptial and marriage contract enforcement",
        ],
      },
      {
        title: "Adoption Services",
        summary: "Legal assistance with all types of adoption proceedings.",
        details: [
          "Private and agency adoptions",
          "Step-parent and relative adoptions",
          "International adoption procedures",
          "Adult adoption processes",
          "Post-adoption legal services",
        ],
      },
      {
        title: "Domestic Violence & Protection",
        summary: "Legal protection and support for domestic violence situations.",
        details: [
          "Restraining orders and peace bonds",
          "Emergency protection applications",
          "Safety planning and legal advice",
          "Court representation in protection proceedings",
          "Coordination with support services",
        ],
      },
    ],
    order: 2,
  },
  {
    slug: "criminal-law",
    title: "Criminal Law � Family, Summary & Youth Matters",
    cardSummary: "Protecting your rights at every stage of criminal proceedings.",
    icon: "Shield",
    backgroundImage: null,
    heroImage: null,
    intro:
      "Experienced criminal defense representation specializing in family court matters, summary conviction offenses, and youth criminal justice cases.",
    body: toHtmlParagraphs([
      "Our criminal law practice offers experienced representation for family court matters, summary conviction offenses, and youth criminal justice cases.",
    ]),
    services: [
      {
        title: "Family Court Matters",
        summary:
          "Representation in domestic violence cases, child protection proceedings, and family-related criminal charges.",
        details: [
          "Domestic assault charges arising from family disputes",
          "Child protection proceedings and CAS interviews",
          "No-contact orders and bail variations",
          "Coordination with parallel family law matters",
        ],
      },
      {
        title: "Summary Conviction Offenses",
        summary:
          "Defense for summary offenses including theft under $5,000, assault, mischief, and more.",
        details: [
          "Shoplifting, fraud under, and mischief allegations",
          "Simple assault and uttering threats charges",
          "Diversion, peace bonds, and alternative measures",
          "Sentencing advocacy focused on record consequences",
        ],
      },
      {
        title: "Youth Criminal Justice",
        summary:
          "Specialized advocacy for young offenders with emphasis on rehabilitation and future opportunities.",
        details: [
          "YCJA bail hearings and release planning",
          "Extrajudicial sanctions and diversion programs",
          "School board investigations and statements",
          "Reintegration plans and record sealing advice",
        ],
      },
      {
        title: "DUI / Impaired Driving",
        summary:
          "Defending impaired driving charges, Charter challenges, and protecting driving privileges.",
        details: [
          "Immediate roadside suspension reviews",
          "Breathalyzer and Intoxilyzer evidence challenges",
          "Ignition interlock and hardship license guidance",
          "Sentencing mitigation and reinstatement strategy",
        ],
      },
      {
        title: "Assault Charges",
        summary:
          "Strategic defense for assault charges from simple to aggravated, with thorough evidence analysis.",
        details: [
          "Simple, aggravated, and domestic assault defenses",
          "Self-defense, consent, and mistaken identity arguments",
          "Witness preparation and cross-examination planning",
          "Peace bond negotiations when appropriate",
        ],
      },
      {
        title: "Appeals & Judicial Reviews",
        summary:
          "Challenging convictions, seeking sentence reductions, and pursuing judicial reviews for fairness issues.",
        details: [
          "Summary conviction appeals to Superior Court",
          "Judicial review of tribunal and parole decisions",
          "Grounds of appeal assessments and notices",
          "Factum drafting and oral advocacy",
        ],
      },
      {
        title: "Bail Hearings",
        summary:
          "Urgent representation to secure release pending trial with comprehensive bail plans.",
        details: [
          "Surety selection and supervision planning",
          "Show cause hearing preparation and advocacy",
          "Bail variations and review applications",
          "Compliance counselling for release conditions",
        ],
      },
      {
        title: "Peace Bonds & Restraining Orders",
        summary:
          "Assistance with peace bond applications and defense against restraining orders in family and criminal contexts.",
        details: [
          "Peace bond applications and contested hearings",
          "Restraining orders in criminal and family court",
          "Drafting no-contact and communication terms",
          "Aligning orders with existing family agreements",
        ],
      },
    ],
    order: 3,
  },
  {
    slug: "wills-powers-attorney",
    title: "Wills & Powers of Attorney",
    cardSummary: "Protect your future and loved ones with clear estate planning.",
    icon: "FileText",
    backgroundImage: null,
    heroImage: null,
    intro:
      "Secure your family's future with tailored estate planning � from will preparation to powers of attorney and estate administration guidance.",
    body: toHtmlParagraphs([
      "Proper estate planning ensures your wishes are respected and your loved ones are protected. Our lawyers assist in creating robust wills, managing estates, and planning for business succession.",
    ]),
    services: [
      {
        title: "Will Preparation & Estate Planning",
        summary:
          "Comprehensive will drafting and estate planning to protect your assets and loved ones.",
        details: [
          "Simple and complex will preparation",
          "Estate planning strategies and tax minimization",
          "Trust creation and administration",
          "Beneficiary designations and updates",
          "Regular will reviews and updates",
        ],
      },
      {
        title: "Powers of Attorney",
        summary:
          "Authorize trusted individuals to act on your behalf for property or personal care matters.",
        details: [
          "Power of Attorney for Property and Personal Care",
          "Continuing and non-continuing powers of attorney",
          "Revocation and amendment of existing documents",
          "Capacity assessments and documentation",
          "Healthcare and financial decision support",
        ],
      },
      {
        title: "Estate Administration",
        summary:
          "Guidance through probate procedures and estate settlement responsibilities.",
        details: [
          "Probate applications and estate trustee duties",
          "Asset identification and valuation",
          "Debt settlement and tax clearances",
          "Beneficiary distribution and reporting",
          "Dispute resolution and mediation",
        ],
      },
      {
        title: "Guardianship Applications",
        summary:
          "Legal representation for guardianship of property and personal care.",
        details: [
          "Court applications for guardianship",
          "Capacity evaluations and medical evidence",
          "Ongoing guardianship administration",
          "Dispute resolution and mediation",
          "Court representation and advocacy",
        ],
      },
      {
        title: "Estate Disputes & Litigation",
        summary:
          "Resolving estate disputes and will challenges efficiently and respectfully.",
        details: [
          "Will challenges and validity issues",
          "Beneficiary entitlement disputes",
          "Estate trustee removals and objections",
          "Court litigation and settlements",
          "Mediation and alternative resolutions",
        ],
      },
      {
        title: "Business Succession Planning",
        summary:
          "Strategic continuity planning for business owners and family enterprises.",
        details: [
          "Buy-sell agreements and ownership transitions",
          "Corporate restructuring for tax efficiency",
          "Key person and life insurance planning",
          "Trust and share transfer mechanisms",
          "Next-generation leadership planning",
        ],
      },
    ],
    order: 4,
  },
  {
    slug: "employment-human-rights",
    title: "Employment & Human Rights",
    cardSummary: "Protecting workers' rights and dignity in the workplace.",
    icon: "Briefcase",
    backgroundImage: null,
    heroImage: null,
    intro:
      "Practical legal support for employment disputes, workplace discrimination, and human rights matters.",
    body: toHtmlParagraphs([
      "We advocate for employees facing wrongful dismissal, discrimination, harassment, and workplace disputes, ensuring their rights are protected through strong negotiation and litigation.",
    ]),
    services: [
      {
        title: "Wrongful & Constructive Dismissal",
        summary:
          "Assessing termination packages, negotiating compensation, and pursuing litigation when necessary.",
        details: [
          "Reviewing severance packages for fairness",
          "Calculating ESA and common law notice entitlements",
          "Constructive dismissal strategy and evidence gathering",
          "Negotiating settlements or commencing litigation",
        ],
      },
      {
        title: "Workplace Discrimination & Harassment",
        summary:
          "Representing employees before the Human Rights Tribunal and in internal investigations.",
        details: [
          "Human Rights Tribunal applications and responses",
          "Workplace harassment investigations and findings",
          "Accommodation requests for disability or creed",
          "Retaliation and reprisal complaint strategy",
        ],
      },
      {
        title: "Severance & Employment Contracts",
        summary:
          "Reviewing and drafting employment agreements, non-compete clauses, and severance packages.",
        details: [
          "Executive and professional employment agreements",
          "Non-compete, non-solicit, and confidentiality clauses",
          "Independent contractor versus employee assessments",
          "Negotiating signing bonuses and departure terms",
        ],
      },
      {
        title: "Workplace Investigations",
        summary:
          "Advising on workplace investigations, policy development, and compliance with employment standards.",
        details: [
          "Planning and overseeing internal investigations",
          "Trauma-informed interviewing and documentation",
          "Investigation reports with remedial recommendations",
          "Policy drafting, training, and ESA compliance",
        ],
      },
      {
        title: "WSIB & Tribunal Matters",
        summary:
          "Guiding employees through WSIB claims and appeals, ensuring their rights are upheld.",
        details: [
          "Initial WSIB entitlement claims and objections",
          "Return-to-work and accommodation planning",
          "Appeals before the Workplace Safety and Insurance Appeals Tribunal",
          "Labour Relations Board and ESA enforcement proceedings",
        ],
      },
    ],
    order: 5,
  },
  {
    slug: "civil-litigation",
    title: "Civil Litigation & Tenancy",
    cardSummary: "Strategic advocacy for civil disputes and tenant rights.",
    icon: "Scale",
    backgroundImage: null,
    heroImage: null,
    intro:
      "Robust representation for civil disputes, small claims, and landlord-tenant matters across Ontario.",
    body: toHtmlParagraphs([
      "From contract disputes to Landlord & Tenant Board hearings, we deliver practical litigation strategies backed by thorough preparation and negotiation.",
    ]),
    services: [
      {
        title: "Contract & Commercial Disputes",
        summary:
          "Resolving breach of contract, service agreement, and partnership disputes.",
        details: [
          "Breach of service and supply agreements",
          "Shareholder and partnership conflicts",
          "Demand letters and strategic negotiations",
          "Mediation and arbitration advocacy",
        ],
      },
      {
        title: "Debt Recovery",
        summary:
          "Pursuing unpaid debts or loans through negotiation, litigation, and enforcement.",
        details: [
          "Demand letters and settlement discussions",
          "Issuing Small Claims or Superior Court proceedings",
          "Default judgment and summary judgment motions",
          "Garnishment, writs, and enforcement strategies",
        ],
      },
      {
        title: "Landlord & Tenant Board",
        summary:
          "Representing tenants (and select landlords) in eviction defence, rent disputes, and tenant rights matters.",
        details: [
          "Tenant-side eviction defense planning",
          "Rent abatement and maintenance applications",
          "Exceptional landlord applications when required",
          "Review requests and appeals of LTB orders",
        ],
      },
      {
        title: "Small Claims Court",
        summary:
          "Handling small claims litigation efficiently, from pleadings through to judgment and enforcement.",
        details: [
          "Drafting claims, defenses, and motions",
          "Settlement conferences and mediation advocacy",
          "Trial preparation and witness coordination",
          "Collecting on judgments and cost awards",
        ],
      },
      {
        title: "Mediation & Alternative Dispute Resolution",
        summary:
          "Exploring negotiated settlements and ADR options to resolve disputes effectively.",
        details: [
          "Private mediation strategy and representation",
          "Arbitration preparation and evidentiary briefs",
          "Negotiated settlement drafting and compliance",
          "Conflict de-escalation and risk management plans",
        ],
      },
    ],
    order: 6,
  },
];

const testimonialsData = [
  {
    name: "Sarah Johnson",
    quote:
      "Bekwyn Law helped me navigate the complex immigration process with such care and expertise. They made what seemed impossible, possible. I'm now a proud Canadian resident thanks to their dedication.",
    rating: 5,
    photo: null,
  },
  {
    name: "Onyebuchi Nmadi",
    quote:
      "During one of the most difficult times in my life, the team at Bekwyn Law provided compassionate and effective legal support. They fought for my children's best interests and achieved an outcome I never thought possible.",
    rating: 5,
    photo: null,
  },
  {
    name: "Emily Rodriguez",
    quote:
      "The estate planning services were thorough and professional. They explained everything clearly and ensured my family's future is secure. I highly recommend their services to anyone needing legal assistance.",
    rating: 5,
    photo: null,
  },
];

const homePageData = {
  hero: {
    eyebrow: "Bekwyn Law PC",
    title: "Ontario Lawyers You Can Trust To Protect What Matters Most To You.",
    description: toHtmlParagraphs([
      "At Bekwyn Law, we believe that law is about people, not just paperwork. We proudly serve individuals, families, and businesses with practical, compassionate, and results-driven legal support across Immigration, Family Law, Litigation, Employment Law, and Estate Planning.",
      "Bekwyn Law: Dedication that defends. Integrity that endures.",
    ]),
    background: null,
    primaryCta: {
        label: "Request an Appointment",
      url: "/contact#form",
      variant: "default",
      icon: null,
    },
    secondaryCta: {
        label: "Call +1 (289) 838-2982",
      url: "tel:+12898382982",
      variant: "outline",
      icon: "Phone",
    },
    phoneLabel: "Call us",
    phoneNumber: "+1 (289) 838-2982",
    phoneHref: "tel:+12898382982",
  },
  practiceHeading: "Our Core Practice Areas",
  practiceDescription: toHtmlParagraphs([
    "From immigration and family law to landlord-tenant, criminal, and other key practice areas, we offer a wide range of services tailored to your needs.",
  ]),
  notaryHighlight: {
    title: "Notary Services",
    description: toHtmlParagraphs([
      "Our experienced notary public provides reliable document authentication and certification services for personal and business needs.",
    ]),
    bullets: [
      "Affidavits and statutory declarations",
      "Document certification and authentication",
      "Witnessing signatures and oaths",
      "Travel document notarization",
      "Real estate document notarization",
      "Corporate document certification",
    ].map((text) => makeBullet(text)),
    image: null,
  },
  legalAidHighlight: {
    title: "Legal Aid Ontario (LAO)",
    description: toHtmlParagraphs([
      "We accept Legal Aid certificates in Immigration and refugee law, Family law, Criminal (summary) and youth law, and Landlord & tenant matters (tenant-side).",
      "If you are unsure whether you qualify, we can help you understand your options.",
    ]),
    bullets: [],
    image: null,
  },
  aboutBlock: {
    heading: "About Us",
    intro: toHtmlParagraphs([
      "Our mission is simple: to make the law accessible, approachable, and effective for everyone we serve.",
      "We are committed to helping clients navigate legal challenges with clarity and confidence, offering thoughtful guidance and strategic solutions tailored to their unique situations.",
    ]),
    secondaryText: null,
    image: null,
    whyTitle: "Why Choose Bekwyn Law PC?",
    whyItems: [
      "Personalized attention: you are never just a file number. We take the time to understand your story and unique circumstances.",
      "Comprehensive services: from immigration and family law to criminal defense and estate planning � all under one trusted roof.",
      "Trusted advocacy: decades of combined experience navigating Ontario's complex legal landscape with proven results.",
      "Client-centered approach: we measure success by the trust, peace of mind, and satisfaction of those we serve.",
    ].map((text) => makeBullet(text)),
    valuesTitle: "Our Values",
    values: [
      { icon: "Heart", title: "Integrity", description: "We believe in honesty, transparency, and doing what's right � even when it's not the easy road. Our clients' trust is our greatest asset." },
      { icon: "Award", title: "Excellence", description: "Every case matters, and we bring focus, diligence, and skill to everything we do." },
      { icon: "Users", title: "Compassion", description: "We never forget the human side of law. We treat our clients with empathy, respect, and genuine concern." },
      { icon: "Target", title: "Commitment", description: "Your goals are our goals. We work tirelessly to protect your interests and achieve the best possible results." },
    ].map(makeValueCard),
  },
  testimonialsHeading: "What Our Clients Say",
  testimonialsSubheading:
    "Don't just take our word for it. Here's what our satisfied clients have to say about our legal services.",
  contactCta: {
    heading: "Let's Talk",
    description: toHtmlParagraphs([
      "Your legal challenges deserve a listening ear and skilled advocacy. Contact us today to book your free 15-minute consultation.",
    ]),
    contactPoints: [
      makeContactPoint({ label: "Call for immediate assistance", value: "+1 (289) 838-2982", href: "tel:+12898382982", icon: "Phone" }),
      makeContactPoint({ label: "Email", value: "info@bekwynlaw.com", href: "mailto:info@bekwynlaw.com", icon: "Mail" }),
      makeContactPoint({ label: "Office", value: "Ontario, Canada", icon: "MapPin" }),
    ],
    whatToExpect: [
      "Initial assessment of your legal matter",
      "Overview of potential legal options",
      "Clear explanation of next steps",
      "No obligation to proceed",
    ].map((text) => makeBullet(text)),
    primaryCta: {
        label: "Schedule Your Free Consultation",
      url: "/contact#form",
      variant: "default",
      icon: null,
    },
    secondaryCta: null,
  },
};

const practiceAreasPageData = {
  hero: {
    title: "Areas of Practice",
    subtitle:
      "Comprehensive legal services across multiple practice areas to meet all your legal needs.",
    background: null,
  },
  introduction: toHtmlParagraphs([
    "We provide strategic legal support across immigration, family law, litigation, employment, estate planning, and notary services.",
  ]),
  cta: {
    title: "Need Legal Assistance?",
    description: toHtmlParagraphs([
      "Our experienced legal team is ready to help you navigate your legal challenges. Contact us today for a consultation to discuss your specific needs.",
    ]),
    primaryCta: {
        label: "Schedule Consultation",
      url: "/contact",
      variant: "default",
      icon: null,
    },
    secondaryCta: {
        label: "Call +1 (289) 838-2982",
      url: "tel:+12898382982",
      variant: "outline",
      icon: "Phone",
    },
  },
};

const aboutPageSections = [
  {
    __component: "law.hero-simple",
    title: "About Bekwyn Law PC",
    subtitle: "Dedicated to providing exceptional legal services with integrity, compassion, and expertise.",
    background: null,
  },
  {
    __component: "law.mission-section",
    heading: "Our Mission",
    body: toHtmlParagraphs([
      "At Bekwyn Law PC, we are committed to providing our clients with personalized, professional legal services.",
      "Our approach is client-focused, ensuring that each individual receives the attention and expertise they deserve.",
    ]),
    image: null,
    cta: {
      label: "Schedule Consultation",
      url: "/contact#form",
      variant: "default",
      icon: null,
    },
  },
  {
    __component: "law.feature-grid",
    heading: "Why Choose Bekwyn Law PC?",
    subheading:
      "We combine legal expertise with personalized service to deliver exceptional results for our clients.",
    items: [
      { icon: "Scale", title: "Legal Expertise", description: "Comprehensive knowledge across multiple practice areas, backed by years of courtroom and advisory experience." },
      { icon: "Users", title: "Client-Focused", description: "Personalized attention, open communication, and tailored solutions for each client's unique situation." },
      { icon: "Award", title: "Proven Results", description: "A strong record of successful outcomes and satisfied clients across Ontario's diverse legal landscape." },
      { icon: "Clock", title: "Timely Service", description: "Responsive communication and efficient handling of all legal matters - because time matters to you." },
    ].map(makeValueCard),
  },
  {
    __component: "law.team-section",
    heading: "Our Team",
    subheading: "Meet our experienced legal professionals dedicated to serving your needs.",
    members: [
      {
        name: "Sophie Ibekwe",
        role: "Partner, Litigation Lead",
        photo: null,
        details: [
          makeListItem("LL.B, B.L., LL.M., PhD"),
          makeListItem("Barrister & Solicitor"),
          makeListItem("Ontario & Nigeria"),
          makeListItem("Notary Public"),
        ],
      },
      {
        name: "Kingsley Ibekwe",
        role: "Immigration Lead",
        photo: null,
        details: [
          makeListItem("RCIC-IRB, MSc, ACIT, CPA (Ireland)"),
          makeListItem("Commissioner for Taking Affidavits"),
          makeListItem("Province of Ontario"),
        ],
      },
    ],
  },
  {
    __component: "law.simple-cta",
    title: "Legal Aid Ontario",
    description: toHtmlParagraphs([
      "We are proud to accept Legal Aid Ontario certificates, ensuring that quality legal representation is accessible to those who need it most.",
    ]),
    primaryCta: {
      label: "Learn More About Legal Aid",
      url: "/contact#form",
      variant: "outline",
      icon: null,
    },
    secondaryCta: null,
  },
];

const notaryServicesData = [
  {
    icon: "FileCheck",
    title: "Affidavits & Statutory Declarations",
    summary:
      "Professional witnessing and certification of sworn statements and declarations for legal proceedings.",
    details: [
      "Court affidavits",
      "Insurance claims",
      "Identity verification",
      "Witness statements",
    ],
  },
  {
    icon: "Shield",
    title: "Document Certification",
    summary:
      "Official authentication and certification of important documents for various personal or business purposes.",
    details: [
      "Educational transcripts",
      "Medical records",
      "Financial documents",
      "Legal contracts",
    ],
  },
  {
    icon: "Users",
    title: "Signature Witnessing",
    summary:
      "Professional witnessing of signatures on important legal and business documents with proper verification.",
    details: [
      "Contract signing",
      "Power of attorney",
      "Wills and estates",
      "Business agreements",
    ],
  },
  {
    icon: "Plane",
    title: "Travel Document Services",
    summary:
      "Specialized notarization for travel-related documents and international requirements.",
    details: [
      "Passport applications",
      "Visa documents",
      "Travel consent letters",
      "International certificates",
    ],
  },
  {
    icon: "Building",
    title: "Real Estate Documents",
    summary:
      "Expert notarization services for real estate transactions and property-related documents.",
    details: [
      "Purchase agreements",
      "Mortgage documents",
      "Property transfers",
      "Lease agreements",
    ],
  },
  {
    icon: "CheckCircle",
    title: "Corporate Services",
    summary:
      "Professional notary services for business and corporate document requirements.",
    details: [
      "Corporate resolutions",
      "Board meeting minutes",
      "Partnership agreements",
      "Business licenses",
    ],
  },
];

const notaryProcessSteps = [
  {
    stepNumber: "01",
    title: "Schedule Appointment",
    description: "Contact us to book your notary appointment at a convenient time.",
  },
  {
    stepNumber: "02",
    title: "Prepare Documents",
    description: "Gather all required documents and valid government-issued identification.",
  },
  {
    stepNumber: "03",
    title: "Meet & Verify",
    description: "Meet with our notary public for identity verification and document review.",
  },
  {
    stepNumber: "04",
    title: "Complete Service",
    description: "Sign, witness, and receive your properly notarized documents.",
  },
];

const blogPostsData = [
  {
    slug: "understanding-immigration-law-changes-2024",
    title: "Understanding Immigration Law Changes in 2024",
    excerpt:
      "Recent updates to Canadian immigration policies and what they mean for applicants looking to relocate, reunite with family, or extend their status in Canada.",
    category: "Immigration Law",
    author: "Bekwyn Law PC",
    readTime: "5 min read",
    publishedDate: "2024-03-15",
    content: `
      <p>The Canadian immigration landscape has seen significant changes in 2024, affecting various immigration programs and pathways. These updates reflect the government's commitment to addressing labour market needs while maintaining the integrity of the immigration system.</p>

      <h2>Key Changes in Express Entry System</h2>
      <p>The Express Entry system has undergone several modifications to better align with Canada's economic priorities. The most notable change is the introduction of category-based selection, which allows Immigration, Refugees and Citizenship Canada (IRCC) to invite candidates based on specific attributes such as work experience in particular occupations or French language proficiency.</p>

      <h2>Provincial Nominee Program Updates</h2>
      <p>Several provinces have updated their Provincial Nominee Program (PNP) streams to address regional labour market needs. These changes include new occupation lists, updated minimum requirements, and streamlined application processes for in-demand professions.</p>

      <h2>Impact on Applicants</h2>
      <p>These changes create both opportunities and challenges for prospective immigrants. While some pathways have become more accessible for candidates with specific skills or language abilities, others may face increased competition or modified requirements.</p>

      <h2>What This Means for You</h2>
      <p>If you're considering immigration to Canada, it's crucial to understand how these changes affect your specific situation. Our experienced immigration lawyers can help you navigate these updates and develop a strategy that maximises your chances of success.</p>

      <p>Contact Bekwyn Law PC today to discuss how the 2024 immigration changes impact your immigration goals and to explore the best pathways for your unique circumstances.</p>
    `.trim(),
  },
  {
    slug: "family-law-protecting-childrens-interests",
    title: "Family Law: Protecting Your Children's Interests",
    excerpt:
      "Key considerations when navigating custody and support arrangements during divorce, ensuring your children's emotional and financial security.",
    category: "Family Law",
    author: "Bekwyn Law PC",
    readTime: "7 min read",
    publishedDate: "2024-03-10",
    content: `
      <p>When families face separation or divorce, protecting children's interests becomes the paramount concern. The legal system recognises that children's wellbeing must be the primary consideration in all family law decisions, but navigating this complex area requires careful planning and expert guidance.</p>

      <h2>The Best Interests of the Child Standard</h2>
      <p>Canadian family law is governed by the principle that the best interests of the child must be the primary consideration in all decisions affecting children. This standard encompasses various factors including the child's physical, emotional, and psychological safety, security, and wellbeing.</p>

      <h2>Custody and Access Arrangements</h2>
      <p>Modern family law recognises various custody arrangements, from joint custody to sole custody, each designed to serve the child's best interests. The key is finding an arrangement that provides stability while maintaining meaningful relationships with both parents when appropriate.</p>

      <h2>Child Support Obligations</h2>
      <p>Child support is calculated using federal guidelines that consider both parents' incomes and the amount of time the child spends with each parent. Beyond basic support, parents may also be responsible for special or extraordinary expenses such as childcare, medical expenses, and extracurricular activities.</p>

      <h2>Creating Effective Parenting Plans</h2>
      <p>A well-crafted parenting plan addresses not only where children will live and when they'll see each parent, but also important decisions about education, healthcare, religion, and extracurricular activities. These plans should be detailed enough to prevent future conflicts while remaining flexible enough to adapt as children grow.</p>

      <h2>When to Seek Legal Help</h2>
      <p>Family law matters involving children are emotionally charged and legally complex. Having experienced legal representation ensures that your children's interests are properly protected and that you understand your rights and obligations as a parent.</p>
    `.trim(),
  },
  {
    slug: "estate-planning-why-you-need-will",
    title: "Estate Planning: Why You Need a Will",
    excerpt:
      "The importance of having a properly drafted will and powers of attorney—and how they protect your family's future and peace of mind.",
    category: "Estate Planning",
    author: "Bekwyn Law PC",
    readTime: "4 min read",
    publishedDate: "2024-03-05",
    content: `
      <p>Estate planning is one of the most important steps you can take to protect your loved ones and ensure your wishes are carried out after you're gone. Yet many Canadians delay creating a will, often with costly consequences for their families.</p>

      <h2>Why a Will Matters</h2>
      <p>A will is more than just a document—it's your voice when you can no longer speak for yourself. Without a will, provincial intestacy laws determine how your assets are distributed, which may not align with your wishes. This can lead to family disputes, unnecessary delays, and additional costs for your loved ones.</p>

      <h2>Key Components of Estate Planning</h2>
      <p>A comprehensive estate plan includes several important documents. Your will specifies how your assets should be distributed and who should care for minor children. Powers of attorney for property and personal care designate trusted individuals to make decisions on your behalf if you become incapacitated.</p>

      <h2>Protecting Your Family's Future</h2>
      <p>Estate planning isn't just about distributing assets—it's about minimising tax implications, avoiding probate complications, and ensuring your family is cared for according to your wishes. A properly structured estate plan can save your beneficiaries thousands of dollars in taxes and legal fees.</p>

      <h2>When to Update Your Will</h2>
      <p>Life changes require updates to your estate plan. Marriage, divorce, the birth of children, significant asset acquisitions, or the death of a beneficiary are all triggers for reviewing and updating your will and powers of attorney.</p>

      <p>Don't leave your family's future to chance. Contact Bekwyn Law PC today to discuss your estate planning needs and ensure your legacy is protected.</p>
    `.trim(),
  },
  {
    slug: "employment-rights-know-your-protections",
    title: "Employment Rights: Know Your Protections",
    excerpt:
      "Understanding your rights in the workplace and when to seek legal help to protect yourself from wrongful termination or unfair treatment.",
    category: "Employment Law",
    author: "Bekwyn Law PC",
    readTime: "6 min read",
    publishedDate: "2024-02-28",
    content: `
      <p>Employment law in Canada provides significant protections for workers, but many employees are unaware of their rights until facing a workplace dispute. Understanding these protections is essential for every working Canadian.</p>

      <h2>Your Rights Under Employment Standards</h2>
      <p>Employment standards legislation establishes minimum requirements for wages, working hours, overtime pay, vacation time, and statutory holidays. These are baseline protections that every employer must provide, regardless of what your employment contract says.</p>

      <h2>Wrongful Dismissal Protection</h2>
      <p>If you're terminated without cause, you're generally entitled to reasonable notice or pay in lieu of notice. The amount depends on various factors including length of service, age, position, and availability of similar employment. Common law notice often exceeds minimum statutory requirements.</p>

      <h2>Discrimination and Harassment</h2>
      <p>Human rights legislation prohibits discrimination based on protected grounds such as race, gender, age, disability, and religion. Workplace harassment, whether from supervisors or colleagues, violates these protections and can result in significant liability for employers.</p>

      <h2>Constructive Dismissal</h2>
      <p>You don't have to be formally fired to have a legal claim. Constructive dismissal occurs when your employer makes fundamental changes to your employment terms without your agreement, such as significant salary reductions, demotions, or hostile work environments.</p>

      <h2>When to Seek Legal Advice</h2>
      <p>If you're facing termination, have been dismissed, or are experiencing workplace harassment or discrimination, consulting an employment lawyer early can significantly impact your outcome. Many situations are time-sensitive, with limitation periods that can bar your claim if you wait too long.</p>

      <p>Bekwyn Law PC has extensive experience protecting employee rights. Contact us for a confidential consultation about your workplace situation.</p>
    `.trim(),
  },
  {
    slug: "criminal-defense-rights-during-arrest",
    title: "Criminal Defense: Your Rights During Arrest",
    excerpt:
      "What you need to know about your rights when facing criminal charges, and how early legal representation can protect your future.",
    category: "Criminal Law",
    author: "Bekwyn Law PC",
    readTime: "8 min read",
    publishedDate: "2024-02-20",
    content: `
      <p>Being arrested or charged with a criminal offence is one of the most stressful experiences a person can face. Understanding your rights and taking appropriate action immediately can significantly impact the outcome of your case.</p>

      <h2>Your Charter Rights</h2>
      <p>The Canadian Charter of Rights and Freedoms guarantees important protections when you're detained or arrested. You have the right to remain silent, the right to be informed of the reasons for your arrest, and the right to retain and instruct counsel without delay. Police must inform you of these rights immediately upon arrest.</p>

      <h2>The Right to Silence</h2>
      <p>You are not required to answer police questions beyond providing basic identification information. Anything you say can be used as evidence against you. Even seemingly innocent statements can be misinterpreted or taken out of context. Exercise your right to silence until you've consulted with a lawyer.</p>

      <h2>Right to Legal Counsel</h2>
      <p>Upon arrest, police must provide you with a reasonable opportunity to contact a lawyer. This includes access to duty counsel if you cannot afford a private lawyer. Do not waive this right—legal advice at this critical stage can make the difference between conviction and acquittal.</p>

      <h2>The Importance of Early Legal Representation</h2>
      <p>The earlier you involve a criminal defence lawyer, the better your chances of a favourable outcome. Early intervention allows your lawyer to preserve evidence, interview witnesses while memories are fresh, identify Charter violations, and develop a strong defence strategy.</p>

      <h2>Common Mistakes to Avoid</h2>
      <p>Many people inadvertently damage their case by speaking to police without counsel, consenting to searches, or failing to document their arrest circumstances. Others miss important deadlines or fail to comply with bail conditions, creating additional legal problems.</p>

      <h2>Bail Hearings and Release Conditions</h2>
      <p>After arrest, you may be held for a bail hearing. Having experienced legal representation at your bail hearing is crucial for securing your release and establishing reasonable conditions. Overly restrictive bail conditions can significantly impact your life and your ability to prepare your defence.</p>

      <p>If you've been arrested or charged with a criminal offence, time is of the essence. Contact Bekwyn Law PC immediately for experienced criminal defence representation that protects your rights and your future.</p>
    `.trim(),
  },
  {
    slug: "civil-litigation-when-to-consider-legal-action",
    title: "Civil Litigation: When to Consider Legal Action",
    excerpt:
      "Understanding when civil litigation might be the right path for your dispute and how Bekwyn Law can help you achieve justice.",
    category: "Civil Litigation",
    author: "Bekwyn Law PC",
    readTime: "5 min read",
    publishedDate: "2024-02-15",
    content: `
      <p>Civil litigation can be a powerful tool for resolving disputes and obtaining justice, but it's not always the best solution for every conflict. Understanding when litigation is appropriate—and when alternative approaches might be more effective—is crucial for making informed decisions about your legal matters.</p>

      <h2>What Is Civil Litigation?</h2>
      <p>Civil litigation is the process of resolving disputes between individuals, businesses, or organisations through the court system. Unlike criminal cases, civil litigation typically involves seeking monetary compensation or specific performance rather than criminal penalties.</p>

      <h2>Common Types of Civil Disputes</h2>
      <p>Civil litigation encompasses a wide range of disputes including breach of contract, personal injury claims, property disputes, professional negligence, defamation, and business conflicts. Each type of case has unique considerations regarding evidence, applicable law, and potential remedies.</p>

      <h2>Factors to Consider Before Litigating</h2>
      <p>Before pursuing litigation, consider the strength of your case, the amount at stake, the cost of litigation versus potential recovery, and the time commitment required. Litigation can be expensive and time-consuming, so it's essential to have realistic expectations about costs, timelines, and likely outcomes.</p>

      <h2>Alternative Dispute Resolution</h2>
      <p>Negotiation, mediation, and arbitration can often resolve disputes more quickly and cost-effectively than traditional litigation. These approaches allow parties to maintain greater control over the outcome and can preserve business or personal relationships that litigation might damage.</p>

      <h2>When Litigation Makes Sense</h2>
      <p>Litigation may be your best option when negotiation has failed, the other party is uncooperative or acting in bad faith, you need court orders for enforcement, or the legal principles at stake have broader implications beyond your specific case.</p>

      <h2>The Litigation Process</h2>
      <p>Civil litigation typically involves several stages: initial pleadings, discovery of evidence, pre-trial motions, and potentially trial. Most cases settle before trial, but being prepared to go to trial often strengthens your negotiating position.</p>

      <p>If you're involved in a dispute and considering legal action, Bekwyn Law PC can help you evaluate your options and develop a strategic approach that protects your interests while managing costs effectively.</p>
    `.trim(),
  },
];

const blogPageHero = {
  title: "Legal Insights & Updates",
  subtitle: "Stay informed with the latest legal news, insights, and updates from our experienced legal team.",
  description: toHtmlParagraphs([
    "Stay informed with the latest legal news, insights, and updates from our experienced legal team.",
  ]),
  background: null,
  eyebrow: null,
  primaryCta: null,
  secondaryCta: null,
  phoneLabel: null,
  phoneNumber: null,
  phoneHref: null,
};

const blogNewsletterSection = {
  title: "Stay Updated",
  description:
    "Subscribe to our newsletter to receive the latest legal insights, updates, and news directly in your inbox.",
  emailPlaceholder: "Enter your email address",
  buttonLabel: "Subscribe",
  disclaimer: "We respect your privacy. Unsubscribe at any time.",
};

const contactInfoCards = [
  {
    icon: "Phone",
    title: "Phone Numbers",
    lines: [
      "+1 (289) 838 2982",
      "+1 (289) 838 2982",
    ],
  },
  {
    icon: "Mail",
    title: "Email",
    lines: ["info@bekwynlaw.com"],
  },
  {
    icon: "MapPin",
    title: "Location",
    lines: [
      "Serving clients across Ontario",
      "Toronto, Ontario, Canada",
    ],
  },
  {
    icon: "Clock",
    title: "Office Hours",
    lines: [
      "Monday - Friday: 9:00 AM - 5:00 PM",
      "Saturday: By appointment",
      "Sunday: Closed",
    ],
  },
];

const contactPageSections = [
  {
    __component: "law.hero-simple",
    title: "Contact Us",
    subtitle: "Get in touch with our legal team for a consultation about your legal needs.",
    background: null,
  },
  {
    __component: "law.contact-info-section",
    heading: "Get In Touch",
    description: toHtmlParagraphs([
      "We're here to help you with your legal needs. Contact us today to schedule a consultation and discuss how we can assist you.",
    ]),
    cards: contactInfoCards.map(makeContactInfoCard),
  },
  {
    __component: "law.contact-cta",
    heading: "Schedule a Consultation",
    description: toHtmlParagraphs([
      "Fill out the form below and we'll get back to you within 24 hours.",
    ]),
    contactPoints: [
      makeContactPoint({ label: "Phone", value: "+1 (289) 838 2982", href: "tel:+12898382982", icon: "Phone" }),
      makeContactPoint({ label: "Email", value: "info@bekwynlaw.com", href: "mailto:info@bekwynlaw.com", icon: "Mail" }),
    ],
    whatToExpect: [],
    primaryCta: null,
    secondaryCta: null,
    formTitle: "Schedule a Consultation",
    formDescription: "Fill out the form below and we'll get back to you within 24 hours.",
    formSubmitLabel: "Send Message",
    formFields: [
      makeFormField({
        label: "First Name",
        fieldType: "text",
        placeholder: "Your first name",
        required: true,
      }),
      makeFormField({
        label: "Last Name",
        fieldType: "text",
        placeholder: "Your last name",
        required: true,
      }),
      makeFormField({
        label: "Email Address",
        fieldType: "email",
        placeholder: "your.email@example.com",
        required: true,
      }),
      makeFormField({
        label: "Phone Number",
        fieldType: "tel",
        placeholder: "(416) 123-4567",
      }),
      makeFormField({
        label: "Legal Matter Type",
        fieldType: "select",
        placeholder: "Select a practice area",
        options: [
          { label: "Immigration & Refugee Law", value: "immigration" },
          { label: "Family Law", value: "family" },
          { label: "Criminal Law", value: "criminal" },
          { label: "Wills & Powers of Attorney", value: "wills" },
          { label: "Employment & Human Rights", value: "employment" },
          { label: "Civil Litigation", value: "civil" },
          { label: "Other", value: "other" },
        ],
      }),
      makeFormField({
        label: "Message",
        fieldType: "textarea",
        placeholder: "Please describe your legal matter and how we can help you...",
        required: true,
      }),
    ],
  },
  {
    __component: "law.simple-cta",
    title: "Legal Aid Ontario",
    description: toHtmlParagraphs([
      "We accept Legal Aid Ontario certificates. If you qualify for legal aid, please mention this when you contact us to schedule your consultation.",
    ]),
    primaryCta: {
      label: "Learn About Legal Aid Eligibility",
      url: "/legal-aid",
      variant: "outline",
      icon: null,
    },
    secondaryCta: null,
  },
];

const notaryPageSections = [
  {
    __component: "law.hero-block",
    title: "Professional Notary Services",
    subtitle: "Reliable, efficient, and professional notary public services for all your document authentication needs.",
    description: toHtmlParagraphs([
      "Fast turnaround with attention to detail you can trust.",
    ]),
    background: null,
    primaryCta: {
      label: "Book Appointment",
      url: "#contact",
      variant: "default",
      icon: null,
    },
    secondaryCta: {
      label: "View Services",
      url: "#services",
      variant: "outline",
      icon: null,
    },
  },
  {
    __component: "law.service-grid",
    title: "Comprehensive Notary Services",
    description:
      "From document certification to signature witnessing, we provide a full range of notary services to meet your personal and business needs.",
    services: notaryServicesData.map(makeServiceCard),
  },
  {
    __component: "blocks.process-steps-block",
    title: "Simple 4-Step Process",
    description: "Getting your documents notarized is quick and straightforward with our streamlined process.",
    steps: notaryProcessSteps.map(makeProcessStep),
  },
  {
    __component: "law.contact-cta",
    heading: "Ready to Get Started?",
    description: toHtmlParagraphs([
      "Contact us today to schedule your notary appointment. We offer flexible scheduling and competitive rates for all notary services.",
    ]),
    contactPoints: [
      makeContactPoint({ label: "Phone", value: "+1 (289) 838-2982", href: "tel:+12898382982", icon: "Phone" }),
      makeContactPoint({ label: "Email", value: "info@bekwynlaw.com", href: "mailto:info@bekwynlaw.com", icon: "Mail" }),
      makeContactPoint({ label: "Office", value: "Bekwyn Law Head Office, Ontario, Canada", icon: "MapPin" }),
    ],
    whatToExpect: [
      makeBullet("Flexible scheduling and appointments"),
      makeBullet("Fast 24-hour turnaround on most services"),
      makeBullet("Professional support from experienced notaries"),
    ],
    primaryCta: {
      label: "Book Appointment",
      url: "#contact",
      variant: "default",
      icon: null,
    },
    secondaryCta: {
      label: "Call +1 (289) 838-2982",
      url: "tel:+12898382982",
      variant: "outline",
      icon: "Phone",
    },
    formTitle: "Schedule Your Appointment",
    formDescription:
      "Fill out the form below and we'll get back to you within 24 hours.",
    formSubmitLabel: "Schedule Appointment",
    formFields: [
      makeFormField({
        label: "Full Name",
        fieldType: "text",
        placeholder: "Enter your full name",
        required: true,
      }),
      makeFormField({
        label: "Email Address",
        fieldType: "email",
        placeholder: "Enter your email",
        required: true,
      }),
      makeFormField({
        label: "Service Needed",
        fieldType: "select",
        placeholder: "Select a service",
        options: [
          { label: "Document Certification", value: "document-certification" },
          { label: "Affidavit Witnessing", value: "affidavit-witnessing" },
          { label: "Signature Witnessing", value: "signature-witnessing" },
          { label: "Travel Documents", value: "travel-documents" },
          { label: "Real Estate Documents", value: "real-estate-documents" },
          { label: "Other", value: "other" },
        ],
      }),
      makeFormField({
        label: "Message",
        fieldType: "textarea",
        placeholder: "Tell us about your notary needs",
      }),
    ],
  },
];

const siteSettingData = {
  brandName: "Bekwyn Law PC",
  tagline: "Dedication that defends. Integrity that endures.",
  logo: null,
  topContacts: [
    makeContactPoint({ label: "Main", value: "+1 (289) 838-2982", href: "tel:+12898382982", icon: "Phone" }),
    makeContactPoint({ label: "Email", value: "info@bekwynlaw.com", href: "mailto:info@bekwynlaw.com", icon: "Mail" }),
    makeContactPoint({ label: "Ottawa", value: "+1 (613) 371-6611", href: "tel:+16133716611", icon: "Phone" }),
  ],
  socialLinks: [
    { platform: "facebook", url: "https://facebook.com", icon: "Facebook" },
    { platform: "twitter", url: "https://twitter.com", icon: "Twitter" },
    { platform: "linkedin", url: "https://linkedin.com", icon: "Linkedin" },
  ].map((link) => ({
    platform: link.platform,
    url: link.url,
    icon: link.icon,
  })),
  navigation: [
    {
      label: "Home",
      url: "/",
      icon: null,
      dropdown: [],
      image: null,
    },
    {
      label: "About",
      url: "/about",
      icon: null,
      dropdown: [],
      image: null,
    },
    {
      label: "Areas of Practice",
      url: "/practice-areas",
      icon: null,
      image: null,
      dropdown: [
        { label: "Immigration & Refugee Law", url: "/practice-areas/immigration-refugee-law", icon: null },
        { label: "Family Law", url: "/practice-areas/family-law", icon: null },
        { label: "Criminal Law", url: "/practice-areas/criminal-law", icon: null },
        { label: "Wills & Powers of Attorney", url: "/practice-areas/wills-powers-attorney", icon: null },
        { label: "Employment & Human Rights", url: "/practice-areas/employment-human-rights", icon: null },
        { label: "Civil Litigation & Tenancy", url: "/practice-areas/civil-litigation", icon: null },
      ],
    },
    {
      label: "Notary Service",
      url: "/notary",
      icon: null,
      dropdown: [],
      image: null,
    },
    {
      label: "Blog",
      url: "/blog",
      icon: null,
      dropdown: [],
      image: null,
    },
    {
      label: "Contact Us",
      url: "/contact",
      icon: null,
      dropdown: [],
      image: null,
    },
  ],
  footer: {
    logo: null,
    logoAlt: "Bekwyn Law PC logo",
    companyName: "Bekwyn Law PC",
    companyTagline: "Your trusted legal partners across Ontario.",
    FooterLinks: [
      { label: "Immigration & Refugee Law", url: "/practice-areas/immigration-refugee-law", icon: null, dropdown: [], image: null },
      { label: "Family Law", url: "/practice-areas/family-law", icon: null, dropdown: [], image: null },
      { label: "Criminal Law", url: "/practice-areas/criminal-law", icon: null, dropdown: [], image: null },
      { label: "Wills & Powers of Attorney", url: "/practice-areas/wills-powers-attorney", icon: null, dropdown: [], image: null },
      { label: "Employment & Human Rights", url: "/practice-areas/employment-human-rights", icon: null, dropdown: [], image: null },
      { label: "Civil Litigation & Tenancy", url: "/practice-areas/civil-litigation", icon: null, dropdown: [], image: null },
      { label: "Notary Services", url: "/notary", icon: null, dropdown: [], image: null },
      { label: "Legal Aid Ontario", url: "/legal-aid", icon: null, dropdown: [], image: null },
      { label: "About Bekwyn Law PC", url: "/about", icon: null, dropdown: [], image: null },
      { label: "Testimonials", url: "/testimonials", icon: null, dropdown: [], image: null },
      { label: "Blog", url: "/blog", icon: null, dropdown: [], image: null },
      { label: "Contact", url: "/contact", icon: null, dropdown: [], image: null },
    ],
    ContactDetails: [
      {
        label: "Main Office",
        value: "+1 (289) 838-2982",
        type: "phone",
        href: "tel:+12898382982",
      },
      {
        label: "Ottawa",
        value: "+1 (613) 371-6611",
        type: "phone",
        href: "tel:+16133716611",
      },
      {
        label: "Email",
        value: "info@bekwynlaw.com",
        type: "email",
        href: "mailto:info@bekwynlaw.com",
      },
      {
        label: "Location",
        value: "Ontario, Canada",
        type: "location",
        href: null,
      },
    ],
    FooterCopyright:
      "(c) 2025 Bekwyn Law PC. All rights reserved. | Professional legal services in Ontario",
  },
  footerNote:
    "(c) 2025 Bekwyn Law PC. All rights reserved. | Professional legal services in Ontario",
  seo: null,
};



async function main() {
  console.log("Seeding law practice areas...");
  const practiceAreaIdBySlug = {};
  for (const area of practiceAreasData) {
    const payload = {
      title: area.title,
      slug: area.slug,
      cardSummary: area.cardSummary,
      icon: area.icon,
      backgroundImage: area.backgroundImage,
      heroImage: area.heroImage,
      intro: area.intro,
      body: area.body,
      order: area.order,
      services: area.services.map(makeServiceCard),
    };
    const entry = await upsertCollection(
      'law-practice-areas',
      'slug',
      area.slug,
      payload
    );
    practiceAreaIdBySlug[area.slug] = entry?.id;
  }

  console.log("Seeding testimonials...");
  const testimonialIdByName = {};
  for (const testimonial of testimonialsData) {
    const payload = {
      name: testimonial.name,
      quote: toHtmlParagraphs([testimonial.quote]),
      rating: testimonial.rating,
      role: testimonial.role || null,
      photo: testimonial.photo,
      order: testimonial.order || null,
    };
    const entry = await upsertCollection(
      'law-testimonials',
      'name',
      testimonial.name,
      payload
    );
    testimonialIdByName[testimonial.name] = entry?.id;
  }

  console.log("Seeding blog posts...");
  const blogPostIdBySlug = {};
  for (const post of blogPostsData) {
    const payload = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      publishedDate: post.publishedDate,
      author: post.author,
      category: post.category,
      readTime: post.readTime,
      content: post.content,
      heroImage: null,
    };
    const entry = await upsertCollection(
      'law-blog-posts',
      'slug',
      post.slug,
      payload
    );
    blogPostIdBySlug[post.slug] = entry?.id;
  }

  console.log("Seeding blog page...");
  await setSingle('law-blog-page', {
    hero: blogPageHero,
    posts: blogPostsData.map((post) => blogPostIdBySlug[post.slug]).filter(Boolean),
    newsletter: blogNewsletterSection,
  });

  console.log("Seeding site settings...");
  await setSingle('law-site-setting', siteSettingData);

  console.log("Seeding home page...");
  const practiceAreaIds = practiceAreasData.map((area) => practiceAreaIdBySlug[area.slug]).filter(Boolean);
  const testimonialIds = testimonialsData.map((item) => testimonialIdByName[item.name]).filter(Boolean);

  const homePageSections = [];

  if (homePageData.hero) {
    const hero = homePageData.hero;
    homePageSections.push({
      __component: "law.hero-block",
      eyebrow: hero.eyebrow || null,
      title: hero.title,
      subtitle: hero.subtitle || null,
      description: hero.description || null,
      background: hero.background || null,
      primaryCta: hero.primaryCta || null,
      secondaryCta: hero.secondaryCta || null,
      phoneLabel: hero.phoneLabel || null,
      phoneNumber: hero.phoneNumber || null,
      phoneHref: hero.phoneHref || null,
    });
  }

  if (homePageData.practiceHeading) {
    homePageSections.push({
      __component: "law.practice-section",
      heading: homePageData.practiceHeading,
      description: homePageData.practiceDescription || null,
      practiceAreas: practiceAreaIds,
    });
  }

  if (homePageData.notaryHighlight) {
    const section = homePageData.notaryHighlight;
    homePageSections.push({
      __component: "law.content-highlight",
      title: section.title,
      description: section.description || null,
      bullets: section.bullets || [],
      image: section.image || null,
    });
  }

  if (homePageData.legalAidHighlight) {
    const section = homePageData.legalAidHighlight;
    homePageSections.push({
      __component: "law.content-highlight",
      title: section.title,
      description: section.description || null,
      bullets: section.bullets || [],
      image: section.image || null,
    });
  }

  if (homePageData.aboutBlock) {
    const about = homePageData.aboutBlock;
    homePageSections.push({
      __component: "law.about-block",
      heading: about.heading,
      intro: about.intro || null,
      secondaryText: about.secondaryText || null,
      image: about.image || null,
      whyTitle: about.whyTitle || null,
      whyItems: about.whyItems || [],
      valuesTitle: about.valuesTitle || null,
      values: about.values || [],
    });
  }

  if (homePageData.testimonialsHeading) {
    homePageSections.push({
      __component: "law.testimonials-section",
      heading: homePageData.testimonialsHeading,
      subheading: homePageData.testimonialsSubheading || null,
      testimonials: testimonialIds,
    });
  }

  if (homePageData.contactCta) {
    const contact = homePageData.contactCta;
    homePageSections.push({
      __component: "law.contact-cta",
      heading: contact.heading,
      description: contact.description || null,
      contactPoints: contact.contactPoints || [],
      whatToExpect: contact.whatToExpect || [],
      primaryCta: contact.primaryCta || null,
      secondaryCta: contact.secondaryCta || null,
      formTitle: contact.formTitle || null,
      formDescription: contact.formDescription || null,
      formSubmitLabel: contact.formSubmitLabel || null,
      formFields: contact.formFields || [],
    });
  }

  await setSingle("law-home-page", {
    sections: homePageSections,
    seo: null,
  });

  console.log("Seeding practice areas page...");
  await setSingle('law-practice-areas-page', {
    ...practiceAreasPageData,
    practiceAreas: practiceAreasData.map((area) => practiceAreaIdBySlug[area.slug]).filter(Boolean),
  });

  console.log("Seeding about page...");
  await setSingle('law-about-page', {
    sections: aboutPageSections,
  });

  console.log("Seeding notary page...");
  await setSingle('law-notary-page', {
    sections: notaryPageSections,
  });

  console.log("Seeding contact page...");
  await setSingle('law-contact-page', {
    sections: contactPageSections,
  });

  console.log("Law site seed completed successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


