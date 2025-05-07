import { ENDPOINT } from '@api-manager';
import { CustomHeading, ErrorFallback, ImageBannerComponent, Layout, RteData } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.KeyManagerial);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}

const KeyManagerial = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.KeyManagerial);
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

        {/* {main?.CommonPageData && <ImageBannerComponent breadCrumbs={main?.Breadcrumb} compData={main?.CommonPageData?.fields} />} */}
        {main?.CommonPageData && <ImageBannerComponent breadCrumbs={main?.Breadcrumb} compData={main?.CommonPageData?.fields} />}
        {main?.CommonPageData && <CustomHeading compData={main?.CommonPageData?.fields} />}
        {main?.RTEComponent && <RteData compData={main?.RTEComponent?.fields} />}
      </>
    </Layout>
  );
};

export default KeyManagerial;

