import { ErrorFallback, Layout, UnderConstruction } from '@components';
import { ENDPOINT } from '@api-manager';
import { getApiData } from '@utils/server';

const UnderConstructionPage = async () => {
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
      footerMt={false}
      headerAbsolute={false}
      isHomePage={true}
      seoData={main?.SEO?.fields}
      defaultActiveTab={main?.CommonKey?.fields?.defaultActiveTab}
    >
        <UnderConstruction/>
    </Layout>
  );
};

export default UnderConstructionPage;
