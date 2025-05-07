import { ENDPOINT } from '@api-manager';
import { BrandStorySection, CustomHeading, ErrorFallback, ImageBannerComponent, Layout } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.concreteJournal);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}

const ConcreteJournal = async () => {
    const apiData = await getApiData(ENDPOINT.SSR.concreteJournal);
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
        {main?.CommonPageData && <CustomHeading compData={main?.CommonPageData?.fields} />}
        {main?.RTEComponent && <BrandStorySection compData={main?.RTEComponent} />}
      </>
    </Layout>
  );
};

export default ConcreteJournal;
