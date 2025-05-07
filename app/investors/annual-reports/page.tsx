import { ENDPOINT } from '@api-manager';
import { CustomHeading, ErrorFallback, ImageBannerComponent, AnnualReports, Layout } from '@components';
import { getApiData, getMetadata } from '@utils/server';
import styles from './annualReport.module.scss';
import { Container } from 'react-bootstrap';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.annualReport);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}

const AnnualReportsPage = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.annualReport);
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
        {main?.CommonPageData && (
         <Container className={`pb-2`}>
          <p className={`${styles.description} mb-4`}>
            {/* {main?.CommonPageData?.fields?.subHeading} */}
          </p>
         </Container>
        )}
  
       {main?.AnnualReports && <AnnualReports compData={main?.AnnualReports?.fields}/>}

      </>
      
     </Layout>
  );
};

export default AnnualReportsPage;