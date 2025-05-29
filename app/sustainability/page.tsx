import { ErrorFallback, Layout, UnderConstruction } from '@components';
import { ENDPOINT } from '@api-manager';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.sustainability);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}

const SustainabilityPage = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.sustainability);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  const { footer, header, main } = data;

  return (
    <Layout
      footerData={footer?.Footer?.fields}
      headerData={header}
      footerMt={false}
      headerAbsolute={false}
      isHomePage={true}
      seoData={main?.SEO?.fields}
      defaultActiveTab={main?.CommonKey?.fields?.defaultActiveTab}
    >
      <>
        {/* {main?.CommonPageData && (
          <ImageBannerComponent
            breadCrumbs={main?.Breadcrumb}
            compData={main?.CommonPageData?.fields}
          />
        )}
        {main?.CommonPageData && <CustomReadMoreSction compData={main?.CommonPageData?.fields} />}

        {main?.['2CardsSection'] && <TwoCardSection compData={main?.['2CardsSection']?.fields} />}
        {main?.['Sustanabilitybutton'] && (
          <SustainabilityGrid compData={main?.['Sustanabilitybutton']?.fields} />
        )}
        {main?.['RTEComponent'] && main?.['SusReportsSection'] && (
          <SustainabilityDropSlider
            rteData={main?.['RTEComponent']?.fields}
            compData={main?.['SusReportsSection']?.fields}
          />
        )}
        {main?.['ESGFramework'] && <RteData compData={main?.['ESGFramework']?.fields} />}
        {main?.['ESGPolicies'] && <ScrollCards compData={main?.['ESGPolicies']?.fields} />}
        {main?.['4CardsSection'] && <MediaMenuCards compData={main?.['4CardsSection']?.fields} />} */}
        <UnderConstruction/>
      </>
    </Layout>
  );
};

export default SustainabilityPage;
