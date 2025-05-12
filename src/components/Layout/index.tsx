import { Footer, Header } from "@components";
import { LayoutProps } from "@interfaces";

const Layout = (props: LayoutProps) => {
  const {
    children,
    headerData,
    footerData,
    seoData,
    className = "",
    // defaultActiveTab,
    showHeader = true,
    footerMt = true,
  } = props;

  return (
    <>
      <script
        id="schemaData"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Organization",
            name: seoData?.orgSchema?.name ?? "ACC Limited",
            url: seoData?.orgSchema?.url ?? "https://www.acclimited.com/",
            logo: seoData?.orgSchema?.logo ?? "",
            address: {
              "@type": "PostalAddress",
              streetAddress: seoData?.orgSchema?.streetAddress ?? "",
              addressRegion: seoData?.orgSchema?.addressRegion ?? "IN",
              postalCode: seoData?.orgSchema?.postalCode ?? "",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: seoData?.orgSchema?.telephone ?? "",
              contactType: seoData?.orgSchema?.contactType ?? "customer service",
              areaServed: seoData?.orgSchema?.areaServed ?? "India",
            },
            sameAs: seoData?.orgSchema?.sameAs ?? [""],
          }),
        }}
      />
      {showHeader && <Header compData={headerData} />}
      <main className={"main"}>{children}</main>
      <Footer mt={footerMt} compData={footerData} />
    </>
  );
};

export default Layout;
