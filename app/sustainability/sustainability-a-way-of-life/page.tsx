import { ErrorFallback, ImageBannerComponent, Layout, CustomHeading, RteData, Banner, BRSRDirector } from '@components';
import { ENDPOINT } from '@api-manager';
import { getApiData, getMetadata } from '@utils/server';
import { Container, Row, Col } from 'react-bootstrap';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.sustainabilityLife);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}

const WayofLife = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.ambujaAtAGlance);
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
        {main?.CommonPageData && (
          <ImageBannerComponent breadCrumbs={main?.Breadcrumb} compData={main?.CommonPageData?.fields} />
        )}
        {main?.CommonPageData && <CustomHeading compData={main?.CommonPageData?.fields} />}

        {main?.SustainabilityAWayofLife && <BRSRDirector compData={main?.SustainabilityAWayofLife} />}

        {main?.RTEComponent && <RteData compData={main?.RTEComponent?.fields} />}

        <Container>
          <Row className="justify-content-center">
            <Col md={10}>{main?.Banner && <Banner middle={true} compData={main?.Banner?.fields} />}</Col>
          </Row>
        </Container>
        {main?.ESGFramework && <RteData compData={main?.ESGFramework?.fields} />}
      </>
    </Layout>
  );
};

export default WayofLife;
