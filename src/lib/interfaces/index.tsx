import { ReactNode } from 'react';

export interface IGradientBtn {
  text: string;
  link?: string;
  target?: string;
  middle?: boolean;
  className?: string;
  onClick?: () => void;
}
export interface IWhiteButton {
  text: string;
  link?: string;
}

export interface IImageBanner {
  compData: any;
  breadCrumbs?: any;
}
export interface IBreadCrumbSection {
  breadCrumbs?: any;
}

export interface ICustomHeading {
  compData: any;
  h?:number;
}
export interface Ireadmore {
  description: any;
  maxLines: number;
  className?: string;
}
export interface ICustomImage {
  compData: {
    imageTitle?: null;
    imageSource: string;
    imageSourceMobile: string;
    imageSourceTablet: string;
    imageAlt: string;
  };
  className?: string;
  key?: any;
}

export interface ICustomVideo {
  compData: {
    src: string;
    ref?: string;
    type?: any;
    className?: string;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    controls?: boolean;
  };
}

export interface IcardDate {
  text: string;
}

export interface LayoutProps {
  children?: ReactNode;
  footerData?: any;
  headerData?: any;
  seoData?: ISeoData;
  className?: string;
  isHomePage?: boolean;
  mainBannerData?: string;
  headerAbsolute?: boolean;
  navBarType?: string;
  defaultActiveTab?: string;
  showHeader?: boolean;
  footerMt? :boolean;
}

export interface ISeoData {
  pageTitle?: string;
  metaTitle?: string;
  author?: string;
  metaDescription: string;
  metaKeywords: string;
  browserTitle: string;
  ogDescription: string;
  ogTitle: string;
  ogImage: string;
  robotsTags: any;
  ogKeyword: string;
  canonicalUrl: string;
  googleSiteVerification: string;
  msValidate: string;
  orgSchema: IOrgSchema;
}

export interface IOrgSchema {
  name: string;
  url: string;
  logo: string;
  streetAddress: string;
  addressRegion: string;
  postalCode: string;
  telephone: string;
  contactType: string;
  areaServed: string;
  sameAs: any[];
}

export interface IHeader {
  compData: any;
}

export interface IFooter {
  compData: any;
  mt: boolean;
}

export interface IHBanner {
  compData: {
    banners: {
      ctaLink: string;
      ctaText: string;
      heading: string;
      imageAlt: string;
      imageSource: string;
      imageSourceMobile: string;
      imageSourceTablet: string;
      imageTitle: string;
      subHeading: string;
      target: string;
    }[];
    title: string;
  };
  middle?: boolean;
}

export interface ICustomSlider {
  compData: {
    banners: {
      ctaLink: string;
      ctaText: string;
      heading: string;
      imageAlt: string;
      imageSource: string;
      imageSourceMobile: string;
      imageSourceTablet: string;
      imageTitle: string;
      subHeading: string;
      target: string;
    }[];
    title: string;
  };
  auto?: boolean;
  slides?: number;
}

export interface IcarouselRich {
  compData: {
    subHeadings: any;
    heading: string;
  };
  rteData?:any;
}

export interface IHAboutus {
  compData: {
    ctaLink: string;
    ctaText: string;
    description1: string;
    description2: string;
    heading: string;
    target: string;
    videolink: string;
    thumbnail: {
      imageAlt: string;
      imageSource: string;
      imageSourceMobile: string;
      imageSourceTablet: string;
    }[];
  };
}

export interface IHSustainiblity {
  compData: {
    ctaLink: string;
    ctaText: string;
    heading: string;
    subHeading: string;
    backgroundImage: any;
    sustainabilityCards: {
      imageAlt: string;
      imageSource: string;
      imageSourceMobile: string;
      imageSourceTablet: string;
      imageTitle: string;
    }[];
  };
}

export interface IHNewsUpdates {
  compData: {
    newsList: {
      date: string;
      imageTitle: string;
      imageSource: string;
      imageSourceMobile: string;
      imageSourceTablet: string;
      imageAlt: string;
      ctaText: string;
      ctaLink: string;
      target: string;
    }[];
    updatesList: {
      date: string;
      imageTitle: string;
      imageSource: string;
      imageSourceMobile: string;
      imageSourceTablet: string;
      imageAlt: string;
      ctaText: string;
      ctaLink: string;
      target: string;
    }[];
  };
}

export interface IPortfolio {
  compData: {
    heading: string;
    groupOfWebsites: {
      imageAlt: string;
      imageSource: string;
      imageSourceMobile: string;
      imageSourceTablet: string;
      imageTitle: string;
      link: string;
      linkText: string;
      target: string;
    }[];
  };
}

export interface IHAmbujaHelp {
  compData: {
    title: string;
    banners: {
      ctaLink: string;
      ctaText: string;
      heading: string;
      imageAlt: string;
      imageSource: string;
      imageSourceMobile: string;
      imageSourceTablet: string;
      imageTitle: string;
      subHeading: string;
      target: string;
      backgroundImage?: any;
    }[];
  };
}

export interface IHPlant {
  compData: {
    ourPlants: any;
    ourPlantFeatureList: any;
    map: any;
  };
}

export interface ICommitteeMembers {
  compData: {
    members: {
      name: string;
      role: string;
    }[];
    pdfDownload: string;
    sectionTitle: string;
    buttontext?: string;
  };
  headingl?: string;
  headingr?: string;
}

export interface IAnnualReport {
  compData: any;
}
export interface IShareHolderInformation {
  compData: {
    heading?: string;
    cards: any;
  };
}
export interface IArchiveSection {
  compData: {
    fields: any;
  };
  aspect?:string;
}

export interface IFinancialResults {
  compData: any;
  commonData: any;
  dropHead?: string;
}

export interface IAboutAmbujaHead {
  ctaLink: string;
  ctaText: string;
  description: string;
}

export interface ICorporateGovernance {
  compData: {
    heading?: string;
    cards: any[];
  };
  showHeading?: boolean;
}

export interface ItwoCardSection {
  compData: {
    cards: any[];
  };
}

export interface IAlternateCardsSection {
  compData: {
    params?: string;
    fields: any[];
  };
}

export interface IVisionSection {
  compData: {
    heading?: string;
    cards: any[];
  };
}

export interface IBrandStorySection {
  compData: {
    params?: string;
    fields: any;
  };
}

export interface IRTE {
  compData: any;
  className?: any;
}

export interface IMediaMenuCards {
  compData: {
    cards: any;
    heading: string;
  };
}

export interface IMediaContactSection {
  compData: {
    params?: string;
    fields: any;
  };
}

export interface IInvestorPresentation {
  compData: any;
  commonData?: any;
}
export interface IInvestorPresentationAllYear {
  compData: any;
  // commonData: any;
}
export interface IResearchCoverage {
  compData: any;
}

export interface IVideoModalProps {
  show: boolean;
  videoURL: string | null;
  onClose: () => void;
}

export interface IBoardOfDirectorPage {
  compData: {
    BODLogo: any;
    RTEComponent: any;
  };
}

export interface IBRSRDirector {
  compData: {
    fields: any;
  };
}

export interface ILabelList {
  compData: {
    ctas: any;
    heading: string;
  };
  showHeading?: boolean;
}

export interface IBODSection {
  compData: {
    boardMembers: any;
    heading: string;
  };
}

export interface IEmails {
  compData: {
    nameValuePairs: any;
    subHeading?: string;
  };
  rteData?: any;
}

export interface IDualBtns {
  compData: {
    ctas: any;
    heading?: string;
  };
}

export interface IBRSRReport {
  compData: {
    cards: any;
    heading?: string;
  };
}

export interface StatsCardProps {
  title: string;
  subHeading: any;
  format?: (value: number) => string;
}

export interface IThreeCardCounter {
  compData: {
    subHeadings: any;
    heading?: string;
  };
}

export interface IDisclousreSection {
  compData: {
    heading: string;
    pdFs: any;
  };
}

export interface IBreadCrumb {
  compData: {
    fields: any;
  };
  className?: string;
}

export interface ISusGrid {
  compData: {
    heading?: string;
    cards: any[];
  };
  className?: string;
}
export interface ISusDropSLider {
  compData: {
    title: string;
    reports: any[];
  };
  rteData: any;
  className?: string;
}

export interface IContactNavTab {
  compData: {
    fields: any;
  };
  className?: string;
}

export interface IScrillCards {
  compData: {
    thrustAreas: any;
    heading:string;
  };
  className?: string;
}

export interface ITabCards {
  compData: {
    subHeadings: any;
    heading:string;
  };
  className?: string;
}

export interface IPresentationBRSR {
  compData?: any;
  commonData?: any;
  className?: string;
  bg?: boolean;
  date1?: boolean;
  date2?: boolean;
}

export interface IErrorPage {
  error?: string;
  buttonTitle?: string;
  title?: string;
  description?: string;
  imageAlt?: string;
  showButton?: boolean;
  heading?: string;
  backToHome?: boolean;
  errorMessage?: string;
}

export interface IPageType {
  params: {
    category: string;
    director: string;
    section: string;
  };
}
