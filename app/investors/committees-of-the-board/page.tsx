import { ENDPOINT } from '@api-manager';
import { MendatoryCommittees, ErrorFallback, ImageBannerComponent, Layout } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.boardAndCommitteeCharters);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}

const BoardAndCommitteeCharters = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.boardAndCommitteeCharters);
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
        
        {/* {main?.CommonPageData && <ImageBannerComponent breadCrumbs={main?.Breadcrumb} compData={main?.CommonPageData?.fields} />} */}
        {main?.CommonPageData && <ImageBannerComponent breadCrumbs={main?.Breadcrumb} compData={main?.CommonPageData?.fields} />}
       
       

        {/* Committees List */}
        {main?.CommitteList?.fields?.map((component: any, index: number) => (
          <MendatoryCommittees headingl="Name of Member" headingr="Composition of Committee" key={index} compData={component} />
        ))}
      </>
    </Layout>
  );
};

export default BoardAndCommitteeCharters;

