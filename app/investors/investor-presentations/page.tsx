import { ENDPOINT } from '@api-manager';
import { ErrorFallback, ImageBannerComponent, Layout, InvestorPresentationPage, InvestorPresentationResearchCoverageSection } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.investorPresentationPdf);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}

const InvestorPresentations = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.investorPresentationPdf);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  const { footer, header, main } = data;
  // console.log("invest", main);
  return (
    <Layout
      footerData={footer?.Footer?.fields}
      headerData={header}
      headerAbsolute={false}
      isHomePage={true}
      seoData={main?.SEO?.fields}
      defaultActiveTab={main?.CommonKey?.fields?.defaultActiveTab}
    >
      <>
        {main?.CommonPageData && <ImageBannerComponent breadCrumbs={main?.Breadcrumb} compData={main?.CommonPageData?.fields} />}
        {main?.ResearchCoverage && (
          <InvestorPresentationPage
          compData={main?.Investorpresentation?.fields}
          />
        )}
        {/* {main?.InvestorPresentationPdf && (
          <InvestorPresentationMainPage
            commonData={main?.CommonPageData?.fields}
            compData={main?.InvestorPresentationPdf?.fields}
          />
        )} */}
        {main?.ResearchCoverage && (
          <InvestorPresentationResearchCoverageSection
            compData={main?.ResearchCoverage?.fields?.[0]}
          />
        )}
      </>
    </Layout>
  );
};

export default InvestorPresentations;
