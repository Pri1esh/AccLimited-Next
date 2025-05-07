import { ENDPOINT } from '@api-manager';
import { CustomHeading, ErrorFallback, ImageBannerComponent, Layout, SubscribeForm, AnnualFinancial } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.corporateGovernanceStatuory);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}

const CorporateGovernanceStatuory = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.corporateGovernanceStatuory);
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
        {main?.CorporateGovernance && main?.Policies && <AnnualFinancial bg={false} compData={main?.CorporateGovernance?.fields} commonData={main?.Policies?.fields} date1={true} date2={true}/>}
        {main?.SchemeofArrangements && main?.SchemeofArrangements && <AnnualFinancial  commonData={main?.SchemeofArrangements?.fields} />}
        {main?.CommonPageData && <SubscribeForm />}
      </>
    </Layout>
  );
};

export default CorporateGovernanceStatuory;
