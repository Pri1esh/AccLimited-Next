import { ENDPOINT } from '@api-manager';
import { ErrorFallback, ImageBannerComponent, Layout, BoardOfDirector, GradientBtn } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.committeeChartersPage);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}

const CommitteeCharters = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.committeeChartersPage);
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

        {main?.['Investors Board of Directors']?.fields && (
          <BoardOfDirector compData={main?.['Investors Board of Directors']?.fields} />
        )}
        {main?.['ExploreBoardandCommitteeCharters']?.fields && (
          <GradientBtn
            text={main?.['ExploreBoardandCommitteeCharters']?.fields?.ctas?.[0]?.ctaText}
            link={main?.['ExploreBoardandCommitteeCharters']?.fields?.ctas?.[0]?.ctaLink}
            target={main?.['ExploreBoardandCommitteeCharters']?.fields?.ctas?.[0]?.target}
          />
        )}
      </>
    </Layout>

  );
};

export default CommitteeCharters;
