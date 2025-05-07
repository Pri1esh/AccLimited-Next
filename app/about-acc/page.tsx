import { ErrorFallback, ImageBannerComponent, TwoCardSection, Layout, CustomHeading, ReadMoreContent, CorporateGovernance } from '@components';
import { ENDPOINT } from '@api-manager';
import { getApiData, getMetadata } from '@utils/server';
import { Container } from 'react-bootstrap';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.aboutAmbuja);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}


const AboutAmbuja = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.aboutAmbuja);
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
        <Container className="text-start">
        {main?.RTEComponent && <ReadMoreContent maxLines={4} description={main?.RTEComponent?.fields?.rteComponentData}/>}
        </Container>
        {main?.["2 Card Items"] && <TwoCardSection compData={main?.["2 Card Items"]?.fields}/>}
        {main?.["3 Card Section"] && <CorporateGovernance compData={main?.["3 Card Section"]?.fields} />}

      </>
    </Layout>
  );
};

export default AboutAmbuja;
