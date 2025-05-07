import { ErrorFallback, ImageBannerComponent, Layout, CustomHeading } from '@components';
import { ENDPOINT } from '@api-manager';
import { getApiData, getMetadata } from '@utils/server';
import TabCards from 'src/components/tabCards';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.ambition);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}


const Ambiton = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.ambition);
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

        {/* {main?.RTEComponent && <RteData compData={main?.RTEComponent?.fields} />} */}
        {main?.CorporateEnvironmentPolicy && <TabCards compData={main?.CorporateEnvironmentPolicy?.fields} />}


      </>
    </Layout>

  );
};

export default Ambiton;
