import { ENDPOINT } from '@api-manager';
import { AnnualFinancial, CustomHeading, ErrorFallback, ImageBannerComponent, Layout, ResearchCredit, SubscribeForm } from '@components';
import { getApiData, getMetadata } from '@utils/server';
import PresentationBRSR from 'src/components/presentation-brsr';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.investorDownload);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}

const InvestroDownloads = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.investorDownload);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  const { footer, header, main } = data;

  return (
    <Layout
      footerData={footer?.Footer?.fields}
      headerData={header}
      headerAbsolute={false}
      isHomePage={true}
      seoData={main?.SEO?.fields}
      defaultActiveTab={main?.CommonKey?.fields?.defaultActiveTab}
      footerMt={false}
    >
      <>
        {main?.CommonPageData && (
          <ImageBannerComponent
            breadCrumbs={main?.Breadcrumb}
            compData={main?.CommonPageData?.fields}
          />
        )}
        {main?.CommonPageData && <CustomHeading compData={main?.CommonPageData?.fields} />}
        {main?.InvestorPresentation && main?.BRSR && <PresentationBRSR compData={main?.InvestorPresentation?.fields} commonData={main?.BRSR?.fields}/>}
        {main?.AnnualReports && main?.FinancialReport && <AnnualFinancial compData={main?.AnnualReports?.fields} commonData={main?.FinancialReport?.fields} />}
        {main?.ResearchCoverage && main?.CreditRating && <ResearchCredit compData={main?.ResearchCoverage?.fields?.[0]} commonData={main?.CreditRating?.fields} />}
        {main?.CommonPageData && <SubscribeForm />}
      </>
    </Layout>
  );
};

export default InvestroDownloads;
