import { ENDPOINT } from '@api-manager';
import {
  AccordionSection,
  BRSRDirector,
  CustomSectionHeading,
  ErrorFallback,
  Layout,
  RteData,
  ThreeCountCards,
} from '@components';
import { getApiData, getMetadata } from '@utils/server';
import BrsrReport from 'src/components/brsrReportPage';

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<any> {
  const { section } = await params;
  const apiData = await getApiData(ENDPOINT.SSR.BRSRsections + section);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}

const BRSRSections = async ({ params }: { params: Promise<{ section: string }> }) => {
  const { section } = await params;
  const apiData = await getApiData(ENDPOINT.SSR.BRSRsections + section);
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
        {main?.BRSRChildTopData && <CustomSectionHeading compData={main?.BRSRChildTopData?.fields} />}
        {main?.RTEComponent && <RteData compData={main?.RTEComponent?.fields} />}
        {main?.DirectorData && <BRSRDirector compData={main?.DirectorData} />}
        {main?.CardsSection && <BrsrReport compData={main?.CardsSection?.fields} />}
        {main?.['3ImageSection'] && <ThreeCountCards compData={main?.['3ImageSection']?.fields} />}
        {main?.EssentialIndicators && (
          <AccordionSection compData={main?.EssentialIndicators?.fields?.subHeadings?.[0]} />
        )}
      </>
    </Layout>
  );
};

export default BRSRSections;
