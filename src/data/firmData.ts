export interface PracticeArea {
  number: string;
  id: string;
  title: string;
  summary: string;
  details: string[];
  mattersCovered: string[];
}

export interface EngagementStage {
  step: string;
  title: string;
  description: string;
}

export interface DisclaimerBlock {
  title: string;
  body: string;
}

export const FIRM_INFO = {
  name: 'Nertren Law Associates',
  tagline: 'Independent Litigation & Advisory Practice',
  locationHeader: 'Based in Tamil Nadu, India.',
  introLead:
    'Nertren Law Associates is an independent litigation and advisory law practice based in Tamil Nadu. The firm represents individuals, entrepreneurs, businesses, companies, trusts, institutions, and rights holders before courts, tribunals, and statutory authorities.',
  approachSummary:
    'The practice combines traditional courtroom advocacy with a contemporary understanding of commercial, regulatory, and intellectual property issues.',
  geographicalPresence: [
    'Headquartered in Erode District.',
    'Active appearances before courts in Chennai.',
    'Appearances before the High Court of Judicature at Madras.',
  ],
  foundationalPrinciples: [
    'Professional integrity',
    'Legal scholarship',
    'Client confidentiality',
    'Diligent preparation',
    'Responsible advocacy',
  ],
} as const;

export const ABOUT_FIRM = {
  heading: 'About Nertren Law Associates',
  lead:
    'Nertren Law Associates is a sole proprietorship law practice founded by Advocate Kavin Kumar. The firm was established with the vision of creating a professional legal practice capable of handling both traditional litigation and modern intellectual property disputes.',
  bciAdherence:
    'The practice adheres strictly to the Bar Council of India Rules and professional standards of conduct throughout all engagements.',
  philosophyNote:
    'Every engagement is handled with individual attention, combining disciplined legal research, procedural compliance, and transparent communication suited to the specific circumstances of each matter.',
  evaluationNotice:
    'No matter is accepted without a prior evaluation based on its legal merits, available evidence, and practical considerations.',
} as const;

export interface AdvocatePhotoConfig {
  src: string;
  alt: string;
  positionLabel: string;
  isConfirmed?: boolean;
}

/**
 * Single configurable mapping between advocate profile IDs and portrait files
 * placed under public/images/advocates/. Update paths here once portrait
 * assignments are confirmed by the firm.
 */
export const ADVOCATE_PHOTO_MAPPING: Record<string, AdvocatePhotoConfig> = {
  'adv-kavin-kumar': {
    src: '/images/advocates/kavin-kumar.png',
    alt: 'Portrait of Adv. T. Kavin Kumar, Founder & Proprietor',
    positionLabel: 'Slot 01',
    isConfirmed: true,
  },
  'adv-pavithra': {
    src: '/images/advocates/v-pavithra.png',
    alt: 'Portrait of Adv. V. Pavithra, Associate Counsel',
    positionLabel: 'Slot 02',
    isConfirmed: true,
  },
  'adv-malathi': {
    src: '/images/advocates/malathi-a.png',
    alt: 'Portrait of Adv. Malathi A, Associate Counsel',
    positionLabel: 'Slot 03',
    isConfirmed: true,
  },
};

export interface AdvocateProfile {
  id: string;
  number: string;
  roleTitle: string;
  name: string;
  initials: string;
  enrolmentNumber: string;
  imageSrc: string;
  qualifications?: string[];
  shortIntro: string;
  bio: string[];
  practiceLabel: string;
  focusAreas: string[];
  photo: AdvocatePhotoConfig;
}

export const ADVOCATES: AdvocateProfile[] = [
  {
    id: 'adv-kavin-kumar',
    number: '01',
    roleTitle: 'Founder & Proprietor',
    name: 'Adv. T. Kavin Kumar',
    initials: 'TK',
    enrolmentNumber: 'M.S.3172/2021',
    imageSrc: '/images/advocates/kavin-kumar.png',
    qualifications: [
      'B.E. (Electronics & Communication Engineering)',
      'MBA',
      'LL.B. (Hons.)',
      'Registered Patent Agent (India)',
    ],
    shortIntro:
      'An advocate with a multidisciplinary academic background combining engineering, management and law, practising in constitutional, civil and intellectual property matters since 2021.',
    bio: [
      'An advocate with a multidisciplinary academic background combining engineering, management and law, practising in constitutional, civil and intellectual property matters since 2021.',
      'His academic grounding in electronics and communication engineering, together with management training and qualification as a Registered Patent Agent, enables him to examine technical specifications, complex inventions, technologies and commercial disputes with structured clarity.',
    ],
    practiceLabel: 'Areas of Practice',
    focusAreas: [
      'Writ Petitions',
      'Civil Litigation',
      'Trademark Litigation',
      'Patent Litigation',
      'Waqf Matters',
      'HR&CE Matters',
    ],
    photo: ADVOCATE_PHOTO_MAPPING['adv-kavin-kumar'],
  },
  {
    id: 'adv-pavithra',
    number: '02',
    roleTitle: 'Associate Counsel',
    name: 'Adv. V. Pavithra',
    initials: 'VP',
    enrolmentNumber: 'M.S.738/2022',
    imageSrc: '/images/advocates/v-pavithra.png',
    shortIntro:
      'Associated with the firm in litigation and court-related matters, including pleadings, procedural compliance, execution of decrees, evidence-related proceedings and court appearances.',
    bio: [
      'Associated with the firm in litigation and court-related matters, including pleadings, procedural compliance, execution of decrees, evidence-related proceedings and court appearances.',
      'Her background includes historical experience handling Section 138 cheque dishonour cases alongside civil litigation and execution proceedings.',
    ],
    practiceLabel: 'Areas of Focus',
    focusAreas: [
      'Civil Litigation',
      'Execution Proceedings',
      'Section 138 cheque dishonour cases (historical experience)',
    ],
    photo: ADVOCATE_PHOTO_MAPPING['adv-pavithra'],
  },
  {
    id: 'adv-malathi',
    number: '03',
    roleTitle: 'Associate Counsel',
    name: 'Adv. Malathi A',
    initials: 'MA',
    enrolmentNumber: 'M.S.167/2024',
    imageSrc: '/images/advocates/malathi-a.png',
    shortIntro:
      'Associated with the firm in civil and family disputes, High Court writs and appeals, and other High Court matters.',
    bio: [
      'Associated with the firm in civil and family disputes, High Court writs and appeals, and other High Court matters.',
    ],
    practiceLabel: 'Areas of Focus',
    focusAreas: [
      'Civil Disputes',
      'Family Disputes',
      'High Court Writs and Appeals',
      'Other High Court Matters',
    ],
    photo: ADVOCATE_PHOTO_MAPPING['adv-malathi'],
  },
];

export interface ApproachCardData {
  id: string;
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
}

export const APPROACH_SUBSECTION = {
  eyebrow: 'OUR PROFESSIONAL APPROACH',
  heading: 'How We Approach Every Matter',
  supportingText:
    "Every engagement is considered individually, with attention to the facts, applicable law, available evidence, procedural requirements and the client's long-term interests.",
} as const;

export const APPROACH_CARDS: ApproachCardData[] = [
  {
    id: 'approach-01',
    number: '01',
    title: 'Meticulous Preparation',
    description:
      'Approach every matter with careful preparation and attention to its legal and factual circumstances.',
    imageSrc: '/images/approach/01-meticulous-preparation.png',
    imageAlt: 'Legal agreement and documentation prepared for review',
  },
  {
    id: 'approach-02',
    number: '02',
    title: 'Comprehensive Legal Research',
    description:
      'Undertake comprehensive legal research to understand the applicable law and relevant issues.',
    imageSrc: '/images/approach/02-legal-research.png',
    imageAlt: 'Legal treatises and research documents on library desk',
  },
  {
    id: 'approach-03',
    number: '03',
    title: 'Careful Assessment of Facts',
    description:
      'Evaluate the facts, available evidence and practical considerations before accepting a matter.',
    imageSrc: '/images/approach/03-fact-assessment.png',
    imageAlt: 'Case evaluation records and legal balance on desk',
  },
  {
    id: 'approach-04',
    number: '04',
    title: 'Procedural Compliance',
    description:
      'Give careful attention to procedural requirements throughout legal proceedings.',
    imageSrc: '/images/approach/04-procedural-compliance.png',
    imageAlt: 'Procedural records and documentation for case compliance',
  },
  {
    id: 'approach-05',
    number: '05',
    title: 'Strategic Advocacy',
    description:
      'Develop a considered approach to representation based on the legal and factual circumstances.',
    imageSrc: '/images/approach/05-strategic-advocacy.png',
    imageAlt: 'Advocate reviewing procedural checklist and case files',
  },
  {
    id: 'approach-06',
    number: '06',
    title: 'Individual Attention',
    description:
      "Give every entrusted matter individual attention, tailored to the client's objectives and legal circumstances.",
    imageSrc: '/images/approach/06-individual-attention.png',
    imageAlt: 'Legal strategy diagram and individualized matter planning',
    imageClassName: 'object-[center_20%]',
  },
  {
    id: 'approach-07',
    number: '07',
    title: 'Professional Accountability',
    description:
      'Maintain professional accountability throughout every engagement.',
    imageSrc: '/images/approach/07-professional-accountability.png',
    imageAlt: 'Scales of justice and formal legal documentation on desk',
  },
  {
    id: 'approach-08',
    number: '08',
    title: 'Transparency & Timely Updates',
    description:
      'Emphasise transparent communication and timely updates regarding material developments.',
    imageSrc: '/images/approach/08-transparency-updates.png',
    imageAlt: 'Counsel and clients discussing case progress in conference',
  },
];

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    number: '01',
    id: 'writ-petitions',
    title: 'Writ Petitions and Constitutional Remedies',
    summary:
      'Representation before the High Court of Judicature at Madras under Articles 226 and 227 of the Constitution of India.',
    details: [
      'Each constitutional challenge is preceded by a careful assessment of maintainability, availability of alternative statutory remedies, jurisdictional thresholds, and overall litigation strategy.',
    ],
    mattersCovered: [
      'Judicial review of governmental and administrative actions',
      'Statutory decisions and public authority actions',
      'Service-related disputes',
      'Educational matters',
      'Regulatory actions and protection of legal rights',
    ],
  },
  {
    number: '02',
    id: 'civil-litigation',
    title: 'Civil Litigation and Dispute Resolution',
    summary:
      'Comprehensive representation across trial and appellate stages in civil courts.',
    details: [
      'The firm provides structured assistance from pre-litigation legal evaluation and drafting of pleadings through trial proceedings, evidentiary stages, final arguments, and appellate remedies.',
    ],
    mattersCovered: [
      'Property rights and partition suits',
      'Recovery proceedings and contractual disputes',
      'Injunctions and declarations',
      'Possession claims',
      'Specific performance actions',
    ],
  },
  {
    number: '03',
    id: 'trademark-litigation',
    title: 'Trademark Litigation and Brand Protection',
    summary:
      'Protection and enforcement of statutory and common-law trademark rights.',
    details: [
      'Matters are approached through legal examination of mark similarity, commercial usage, prior adoption, and appropriate enforcement remedies.',
    ],
    mattersCovered: [
      'Trademark infringement and passing-off actions',
      'Deceptive similarity disputes and misuse of trade names',
      'Unauthorized commercial exploitation of brands',
      'Legal opinions and cease-and-desist actions',
      'Brand protection strategies',
    ],
  },
  {
    number: '04',
    id: 'patent-litigation',
    title: 'Patent Litigation and Intellectual Property Disputes',
    summary:
      'Technology-focused legal representation in patent and technical intellectual property disputes.',
    details: [
      'Drawing upon the founder’s engineering degree in Electronics & Communication Engineering and qualification as a Registered Patent Agent (India), the practice addresses technical claim construction, prior art evaluation, and technology-intensive disputes.',
    ],
    mattersCovered: [
      'Patent-related disputes and ownership issues',
      'Patent infringement proceedings',
      'Validity challenges',
      'Technology-focused legal proceedings',
    ],
  },
  {
    number: '05',
    id: 'waqf-matters',
    title: 'Waqf Matters',
    summary:
      'Representation and advisory in disputes concerning Waqf properties and statutory governance.',
    details: [
      'Representation involves detailed examination of historical records, title documents, dedication instruments, and applicable statutory provisions.',
    ],
    mattersCovered: [
      'Waqf administration and management disputes',
      'Property issues concerning Waqf estates',
      'Related statutory and tribunal proceedings',
    ],
  },
  {
    number: '06',
    id: 'hrce-matters',
    title: 'Hindu Religious and Charitable Endowments (HR&CE) Matters',
    summary:
      'Legal representation in matters governed by the Hindu Religious and Charitable Endowments framework.',
    details: [
      'The firm addresses regulatory compliance, administrative proceedings, and property disputes before statutory authorities and courts.',
    ],
    mattersCovered: [
      'Temple administration and governance issues',
      'Regulatory proceedings before HR&CE authorities',
      'Property-related disputes',
      'Hindu Religious and Charitable Endowments legal concerns',
    ],
  },
  {
    number: '07',
    id: 'execution-proceedings',
    title: 'Execution Proceedings',
    summary:
      'Enforcement of civil court judgments, orders, and decrees.',
    details: [
      'The firm assists decree holders and parties in navigating procedural steps required for the lawful realization of judicial relief.',
    ],
    mattersCovered: [
      'Execution petitions and proceedings',
      'Attachment processes',
      'Lawful enforcement mechanisms',
      'Realization of judicial relief',
    ],
  },
  {
    number: '08',
    id: 'legal-opinions',
    title: 'Legal Opinions and Advisory Services',
    summary:
      'Written legal opinions and structured advisory grounded in statutory text, documentary records, and judicial precedent.',
    details: [
      'Advisory engagements focus on objective assessment of legal positions, procedural obligations, and statutory compliance prior to or independent of formal litigation.',
    ],
    mattersCovered: [
      'Title and documentary verification opinions',
      'Statutory and regulatory position assessments',
      'Pre-litigation merit evaluations',
    ],
  },
  {
    number: '09',
    id: 'ip-advisory',
    title: 'Intellectual Property Advisory and Enforcement',
    summary:
      'Advisory and enforcement support aligned with the firm’s intellectual property practice.',
    details: [
      'The firm assists rights holders and enterprises in evaluating intellectual property positions, responding to infringement notices, and structuring enforcement strategies.',
    ],
    mattersCovered: [
      'Intellectual property portfolio and rights assessment',
      'Enforcement correspondence and notices',
      'Strategic advisory on patent and trademark protection',
    ],
  },
];

export const CAREERS_INFO = {
  heading: 'Careers & Internships',
  governanceNote:
    'The firm’s recruitment and internship initiatives are administered strictly for institutional planning and resource allocation, in full conformity with applicable Bar Council of India Rules.',
  internship: {
    title: 'Internship Program',
    overview:
      'Internships are offered throughout the year to students enrolled in recognized multi-year regular LL.B. programmes. Internships are instructional in nature and designed to provide structured exposure to legal practice.',
    eligibility: [
      'Students in the 3rd year or above of a 5-year integrated law course.',
      'Students in the 2nd year or above of a 3-year law course.',
    ],
    timeline:
      'Applications must be submitted at least 45 to 60 days prior to the preferred commencement date.',
    activities: [
      'Regulatory compliance',
      'Legal research',
      'Case law analysis',
      'Drafting assistance',
    ],
  },
  lateral: {
    title: 'Lateral Hires & Retainers',
    description:
      'The firm considers applications from practicing advocates, patent specialists, and legal professionals seeking to explore professional association or retainer arrangements aligned with the firm’s practice areas.',
  },
  instructions: {
    title: 'Application Instructions',
    requirements: [
      'A comprehensive Curriculum Vitae',
      'A brief statement of interest',
      'Preferred practice areas',
    ],
    email: 'advocates@nertren.in',
    internshipSubject: 'Application for Internship — [Month, Year]',
    associateSubject: 'Application for Associate Position',
    notice:
      'Receipt of application documentation does not constitute a commitment to accept an applicant or create any form of professional relationship. Candidate review is subject strictly to institutional capacity and internal evaluation criteria.',
  },
} as const;

export const ENGAGEMENT_STAGES: EngagementStage[] = [
  {
    step: '01',
    title: 'Initial Consultation',
    description:
      'Preliminary discussion to understand the unique elements of the dispute.',
  },
  {
    step: '02',
    title: 'Document Review & Conflict Assessment',
    description:
      'Meticulous analysis of historical records and verification against professional conflict checks.',
  },
  {
    step: '03',
    title: 'Legal Assessment & Strategic Advice',
    description:
      'Evaluation of legal merits, factual realities and identification of potential risks.',
  },
  {
    step: '04',
    title: 'Drafting and Filing',
    description:
      'Procedural compliance in preparing pleadings, notices or corporate documentation.',
  },
  {
    step: '05',
    title: 'Court Representation',
    description:
      'Strategic advocacy before relevant courts, tribunals or authorities.',
  },
  {
    step: '06',
    title: 'Periodic Updates',
    description:
      'Continuous and transparent communication regarding material developments.',
  },
  {
    step: '07',
    title: 'Matter Closure',
    description:
      'Proper conclusion of the engagement and systematic record maintenance.',
  },
];

export const ENGAGEMENT_NOTICE =
  'Representation commences only after a conflict check is cleared, professional engagement is officially accepted, and applicable legal requirements are met.';

export type CourtIconKey =
  | 'landmark'
  | 'building'
  | 'scale'
  | 'gavel'
  | 'shield'
  | 'scroll';

export interface CourtJurisdictionCard {
  id: string;
  title: string;
  description: string;
  icon: CourtIconKey;
}

export const COURTS_INFO = {
  heading: 'Courts & Jurisdiction',
  supportingText:
    'The firm regularly appears before courts, tribunals and statutory authorities across Tamil Nadu, with appearances in Chennai and before the High Court of Judicature at Madras.',
  lead: 'Nertren Law Associates regularly appears before judicial, quasi-judicial, and statutory forums across Tamil Nadu:',
  forums: [
    'High Court of Judicature at Madras',
    'District and Subordinate Courts across Tamil Nadu',
    'Courts and Tribunals in Chennai',
    'Statutory Authorities and Quasi-Judicial Forums',
    'Intellectual Property Related Forums',
    'Waqf and HR&CE Authorities',
  ],
  coordinationNote:
    'Where appropriate, the firm coordinates with other professionals and local counsel to ensure effective representation across geographic regions.',
} as const;

export const COURTS_CARDS: CourtJurisdictionCard[] = [
  {
    id: 'madras-high-court',
    title: 'High Court of Judicature at Madras',
    description:
      "The firm's stated practice includes writ petitions under Articles 226 and 227 of the Constitution of India, alongside other High Court matters.",
    icon: 'landmark',
  },
  {
    id: 'district-subordinate-courts',
    title: 'District and Subordinate Courts across Tamil Nadu',
    description:
      "The firm identifies District and Subordinate Courts across Tamil Nadu among the forums before which it regularly appears. Its documented practice includes civil litigation and execution proceedings.",
    icon: 'building',
  },
  {
    id: 'chennai-courts-tribunals',
    title: 'Courts and Tribunals in Chennai',
    description:
      "The firm identifies courts and tribunals in Chennai among the forums before which it appears.",
    icon: 'scale',
  },
  {
    id: 'statutory-quasi-judicial',
    title: 'Statutory Authorities and Quasi-Judicial Forums',
    description:
      "The firm's described work includes statutory decisions, administrative actions, regulatory matters and related proceedings before competent authorities.",
    icon: 'gavel',
  },
  {
    id: 'ip-forums',
    title: 'Intellectual Property Related Forums',
    description:
      "The firm's intellectual property practice includes trademark disputes, passing-off actions, patent-related matters, ownership and infringement disputes, and associated enforcement work.",
    icon: 'shield',
  },
  {
    id: 'waqf-hrce-authorities',
    title: 'Waqf and HR&CE Authorities',
    description:
      "The firm's documented practice includes Waqf administration and property-related matters, as well as HR&CE matters involving temple administration, governance and related statutory concerns.",
    icon: 'scroll',
  },
];

export const OFFICE_CONTACT = {
  heading: 'Office Information',
  officeLabel: 'Principal Office',
  addressLines: [
    '190/3, NTK Complex, Gobi Main Road,',
    'Erode District – 638458,',
    'Tamil Nadu, India.',
  ],
  fullAddress:
    '190/3, NTK Complex, Gobi Main Road, Erode District – 638458, Tamil Nadu, India.',
  email: 'advocates@nertren.in',
  website: 'www.nertren.in',
  websiteUrl: 'https://www.nertren.in',
  mobile: '09688775599',
} as const;

export const CONFIDENTIALITY_INFO = {
  heading: 'Confidentiality',
  statement:
    'The firm recognizes that confidentiality is a foundational cornerstone of the advocate-client relationship. All client communications, data, and documentation are handled with professional care and treated as strictly confidential, subject only to applicable law and ethical obligations governing legal practitioners.',
} as const;

export const DISCLAIMER_BLOCKS: DisclaimerBlock[] = [
  {
    title: 'Bar Council of India Rules Compliance',
    body: 'Under the rules of the Bar Council of India, advocates are strictly prohibited from soliciting work or advertising, directly or indirectly.',
  },
  {
    title: 'Purpose of Information',
    body: 'This website is intended solely to provide general informational text regarding Nertren Law Associates, its professional background, and its selected areas of practice. The information contained on this website is made available exclusively at the specific request of users seeking information, and it should not be interpreted or construed as legal advice, solicitation, advertisement, invitation, or inducement of any kind.',
  },
  {
    title: 'No Advocate-Client Relationship',
    body: 'Accessing this website, sending an email, or viewing its content does not create or constitute an advocate-client relationship between the visitor and the firm or its advocates. Visitors should obtain independent legal advice from a qualified practitioner before acting upon any information obtained from this website.',
  },
  {
    title: 'No Warranties & Past Performance',
    body: 'No warranty, express or implied, is provided regarding the completeness, accuracy, or suitability of the information on this website for any particular purpose. Past results or historical outcomes do not guarantee or predict future results. Every legal matter depends entirely upon its own specific facts, evidence, legal nuances, and procedural circumstances.',
  },
  {
    title: 'User Declaration',
    body: 'By accessing this website, the visitor explicitly acknowledges that access is sought completely voluntarily for purely informational purposes. The user declares that there has been no advertisement, personal communication, solicitation, invitation, or inducement by Nertren Law Associates or any of its members to solicit work through this platform.',
  },
];

export const LEGAL_POLICIES = {
  privacyPolicy: {
    title: 'Privacy Policy',
    body: 'Information voluntarily provided through the website may be used solely for administrative and communication purposes by the firm. No information is sold, rented, or shared with third parties, except where strictly required by law or professional ethical obligations.',
  },
  termsOfUse: {
    title: 'Terms of Use',
    body: 'Use of this website constitutes acceptance of these terms. The content is purely informational and the firm reserves the right to modify, add, or amend website text at any time without prior notice.',
  },
} as const;

export interface FaqItem {
  id: string;
  question: string;
  answer: string[];
  bullets?: string[];
}

export interface FaqCategory {
  id: string;
  code: string;
  title: string;
  items: FaqItem[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'practice-jurisdiction',
    code: 'A',
    title: 'Practice & Jurisdiction',
    items: [
      {
        id: 'faq-q1',
        question: 'Q1. What areas of law does the firm handle?',
        answer: [
          'Nertren Law Associates handles litigation and advisory matters across the following documented practice areas:',
        ],
        bullets: [
          'Writ Petitions and Constitutional Remedies (under Articles 226 and 227 before the High Court of Judicature at Madras)',
          'Civil Litigation and Dispute Resolution (trial and appellate proceedings)',
          'Trademark Litigation and Brand Protection',
          'Patent Litigation and Intellectual Property Disputes',
          'Waqf Matters',
          'Hindu Religious and Charitable Endowments (HR&CE) Matters',
          'Execution Proceedings',
          'Legal Opinions and Advisory Services',
          'Intellectual Property Advisory and Enforcement',
        ],
      },
      {
        id: 'faq-q2',
        question: 'Q2. Which courts and authorities does the firm appear before?',
        answer: [
          'The firm appears before courts, tribunals, and statutory authorities across Tamil Nadu, including appearances in Chennai, across the following six categories:',
        ],
        bullets: [
          'High Court of Judicature at Madras',
          'District and Subordinate Courts across Tamil Nadu',
          'Courts and Tribunals in Chennai',
          'Statutory Authorities and Quasi-Judicial Forums',
          'Intellectual Property Related Forums',
          'Waqf and HR&CE Authorities',
        ],
      },
      {
        id: 'faq-q3',
        question: 'Q3. How does the firm assess a matter before accepting it?',
        answer: [
          'No matter is accepted without a prior evaluation based on its legal merits, available evidence, and practical considerations, alongside relevant conflict checks and procedural assessment.',
        ],
      },
      {
        id: 'faq-q4',
        question: 'Q4. When does formal representation begin?',
        answer: [
          'Representation commences only after a conflict check is cleared, professional engagement is officially accepted, and applicable legal requirements are met.',
        ],
      },
    ],
  },
  {
    id: 'internships-association',
    code: 'B',
    title: 'Internships & Professional Association',
    items: [
      {
        id: 'faq-q5',
        question: 'Q5. Who is eligible for an internship?',
        answer: [
          'Internships are offered throughout the year to students enrolled in a recognized multi-year regular LL.B. programme and are instructional in nature. Eligibility covers:',
        ],
        bullets: [
          'Students in the third year onwards of a five-year integrated LL.B. course.',
          'Students in the second year onwards of a three-year LL.B. course.',
        ],
      },
      {
        id: 'faq-q6',
        question: 'Q6. When should internship applications be submitted?',
        answer: [
          'Internship applications should be submitted at least 45 to 60 days prior to the preferred commencement date to allow administrative review and scheduling.',
        ],
      },
      {
        id: 'faq-q7',
        question: 'Q7. What should an internship application include?',
        answer: [
          'Applicants should send their documentation to advocates@nertren.in using the subject line: Application for Internship — [Month, Year]. Each submission should include:',
        ],
        bullets: [
          'A comprehensive Curriculum Vitae (CV)',
          'A brief statement of interest',
          'Preferred practice areas',
        ],
      },
      {
        id: 'faq-q8',
        question:
          'Q8. Can practicing advocates or patent specialists explore association opportunities?',
        answer: [
          'Yes. Practicing advocates, patent specialists, and legal professionals seeking to explore professional association or retainer arrangements aligned with the firm’s practice areas may submit their credentials to advocates@nertren.in with the subject line: Application for Associate Position.',
          'Candidate review is subject strictly to the firm’s administrative requirements and institutional capacity. Receipt of an application does not guarantee acceptance or create any form of professional relationship.',
        ],
      },
    ],
  },
  {
    id: 'professional-information',
    code: 'C',
    title: 'Professional Information',
    items: [
      {
        id: 'faq-q9',
        question:
          'Q9. Does sending an email establish an advocate-client relationship?',
        answer: [
          'No. Accessing this website, viewing its content, or sending an email does not create or constitute an advocate-client relationship between the visitor and Nertren Law Associates or any of its advocates. Visitors should obtain independent legal advice from a qualified practitioner before acting upon any information obtained from this website.',
        ],
      },
    ],
  },
];
