import { ENDPOINT } from '@api-manager';
import {
  AboutUs,
  DreamHomeSection, PlantMapSection,
  Banner,
  DiversifiedPortfolioSection,
  SustainabilitySection,
  NewsAwardSection,
  ErrorFallback
} from '@components';
import { getApiData, getMetadata } from '@utils/server';
import Layout from 'src/components/Layout';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.homePage);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}

const HomePage = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.homePage);
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
      seoData={main?.seoData?.fields}
      defaultActiveTab={main?.CommonKey?.fields?.defaultActiveTab}
    >
      {main?.Banner && <Banner compData={main?.Banner?.fields} />}
        {main?.HomeAboutUs && <AboutUs compData={main?.HomeAboutUs?.fields} />}
        {main?.HomeSustainability && (
          <SustainabilitySection compData={main?.HomeSustainability?.fields} />
        )}
        {main?.AboutAmbujaHelp && <DreamHomeSection compData={main?.AboutAmbujaHelp?.fields} />}
        {/* {main?.HomeNewsUpdates && <NewsUpdatesSection compData={main?.HomeNewsUpdates?.fields}/>} */}
        {main?.HomeNewsUpdates && <NewsAwardSection compData={main?.HomeNewsUpdates?.fields}/>}
        {main?.OurPlants && <PlantMapSection compData={main?.OurPlants?.fields} />}
        {main?.PortfolioWebsites && (
          <DiversifiedPortfolioSection compData={main?.PortfolioWebsites?.fields} />
        )}
    </Layout>
  );
};

export default HomePage;
