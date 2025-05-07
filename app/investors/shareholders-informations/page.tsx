import { ENDPOINT } from '@api-manager';
import { AnnualFinancial, CustomHeading, ErrorFallback, ImageBannerComponent, Layout, SubscribeForm } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.shareholdersInformation);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}


const ShareholdersInformation = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.shareholdersInformation);
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
        {main?.ShareholderInformation && main?.ShareholdingPattern && <AnnualFinancial bg={false} compData={main?.ShareholderInformation?.fields} commonData={main?.ShareholdingPattern?.fields} date2={true}/>}
        {main?.Transferofunpaid && main?.DisputeResolutionMechanism && <AnnualFinancial compData={main?.Transferofunpaid?.fields} commonData={main?.DisputeResolutionMechanism?.fields} />}
        {main?.CommonPageData && <SubscribeForm />}
      </>
    </Layout>
  );
};

export default ShareholdersInformation;
