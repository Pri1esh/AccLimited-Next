import { ENDPOINT } from '@api-manager';
import { ErrorFallback, ImageBannerComponent, Layout } from '@components';
import { getApiData, getMetadata } from '@utils/server';
import BrsrReport from 'src/components/brsrReportPage';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.BRSR);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}

const BRSRReport = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.BRSR);
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
      {main?.CardsSection &&
          <BrsrReport compData={main?.CardsSection?.fields} />
        }
     
     </>
     </Layout>
  );
};

export default BRSRReport; 