import { ErrorFallback, ImageBannerComponent, Layout, FinancialResults } from '@components';
import { ENDPOINT } from '@api-manager';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.EnvironmentData);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}

const EnvironmentData = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.EnvironmentData);
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
    >

      <>
        {main?.CommonPageData && <ImageBannerComponent breadCrumbs={main?.Breadcrumb} compData={main?.CommonPageData?.fields} />}
        {main?.ESGReports &&
          <FinancialResults commonData={main?.CommonPageData?.fields} compData={main?.ESGReports?.fields} />
        }
      </>
    </Layout>
  );
};

export default EnvironmentData;