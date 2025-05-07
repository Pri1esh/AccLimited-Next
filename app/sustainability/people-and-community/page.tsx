import { ErrorFallback, ImageBannerComponent, Layout, CustomHeading, RteData, StakeEngagementbtns, CarouselRichSection } from '@components';
import { ENDPOINT } from '@api-manager';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.corporateResponsibility);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}

const CorporateResponsibility = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.corporateResponsibility);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  const { footer, header, main } = data;
  return (
    // <Layout>

    <Layout
      footerData={footer?.Footer?.fields}
      headerData={header}
      headerAbsolute={false}
      isHomePage={true}
      seoData={main?.SEO?.fields}
      defaultActiveTab={main?.CommonKey?.fields?.defaultActiveTab}
    >
      <>
        {main?.CommonPageData && (
          <ImageBannerComponent
            breadCrumbs={main?.Breadcrumb}
            compData={main?.CommonPageData?.fields}
          />
        )}
        {main?.CommonPageData && <CustomHeading compData={main?.CommonPageData?.fields} />}

        {main?.RTEComponent && <RteData compData={main?.RTEComponent?.fields} />}

        {main?.CTA && <StakeEngagementbtns compData={main?.CTA?.fields} />}
        {main?.CorporateEnvironmentPolicy && (
          <CarouselRichSection
            rteData={`<h5 class="text-start mt-3">
          To know more about the impact made by Ambuja Cements’ CSR arm, Ambuja Foundation, visit:
          <a target='_blank' href="https://www.ambujafoundation.org">www.ambujafoundation.org</a>
        </h5>`}
            compData={main?.CorporateEnvironmentPolicy?.fields}
          />
        )}
      </>
    </Layout>

    // </Layout>
  );
};

export default CorporateResponsibility;
