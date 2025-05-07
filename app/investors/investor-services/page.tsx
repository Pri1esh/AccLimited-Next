import { ENDPOINT } from '@api-manager';
import { ErrorFallback, ImageBannerComponent, Layout, RteData, MendatoryCommittees } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.investorServices);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}

const InvestorServices = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.investorServices);
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
        {main?.RTEComponent && <RteData compData={main?.RTEComponent?.fields} />}
       
       

        {/* Committees List */}
        {main?.InvestorServices?.fields?.map((component: any, index: number) => (
          <MendatoryCommittees headingl="Name of the Stock Exchange" headingr="Stock Code" key={index} compData={component} />
        ))}
        {main?.Bottomsection && <RteData compData={main?.Bottomsection?.fields} />}

      </>
    </Layout>
  );
};

export default InvestorServices;

