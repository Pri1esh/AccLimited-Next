import { ENDPOINT } from '@api-manager';
import { ErrorFallback, FinancialResults, ImageBannerComponent, Layout, MediaMenuCards } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.corporateGovernance);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}

const CorporateGovernance = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.corporateGovernance);
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
        {/* {main?.CommonPageData && <CustomHeading compData={main?.CommonPageData?.fields} />} */}
        {main?.['Corporate Governance'] && (
          <FinancialResults
            commonData={main?.CommonPageData?.fields}
            compData={main?.['Corporate Governance']?.fields}
          />
        )}
        {main?.['4CardsSection'] && <MediaMenuCards compData={main?.['4CardsSection']?.fields} />}
      </>
    </Layout>
  );
};

export default CorporateGovernance;
