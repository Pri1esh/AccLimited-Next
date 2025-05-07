import { BoardOfDirectorPage, CustomHeading, ErrorFallback, ImageBannerComponent, Layout } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ director: string}>;
}): Promise<any> {
  const directorLinking = [
    { name: 'Mr-Gautam-Adani', id: '{CDECCE03-5691-44D9-B88F-55C9A4993618}' },
    { name: 'Mr-Ameet-Desai', id: '{CCD6A1C0-33C8-4E78-850B-2B4F1FAE22E4}' },
    { name: 'Mr-Karan-Adani', id: '{2000E4C4-24D9-4092-9E66-D5D46511F254}' },
    { name: 'Mr-Rajnish-Kumar', id: '{B6E44534-FB54-428D-94A6-D2E529E920A4}' },
    { name: 'Mr-Maheswar-Sahu', id: '{9AD30CD3-F6C8-4BDB-9656-124059F040A3}' },
    { name: 'Ms-Purvi-Sheth', id: '{D4DCA0C3-4BFE-494E-840B-43D11587A3E5}' },
    { name: 'Mr-Ajay-Kapur', id: '{B0230A70-5537-4F83-A111-E29919DC1AC0}' },
    { name: 'Mr-MR-Kumar', id: '{22EF8B12-4232-4E86-9CA5-5E242479BC30}' },
    { name: 'Mr-Praveen-Garg', id: '{349DF5E5-3557-4C76-B951-F64001EEB92F}' },
    { name: 'Mr-Vinod-Bahety', id: '{0DEB5C7B-B43B-4224-881F-D52E91D5DF32}' },
  ];
  const { director } = await params;
  const apiData = await getApiData(
    '/sitecore/api/layout/render/jss?sc_apikey={968366F0-94BD-4A32-84E0-32E052FE2391}&item=' +
      directorLinking.find((dir: any) => dir?.name?.toLowerCase() == director)?.id,
  );
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}

const BoardOfDirector = async ({ params }:  {
  params: Promise<{ director: string}>;
}) => {
  const directorLinking = [
    { name: 'Mr-Gautam-Adani', id: '{CDECCE03-5691-44D9-B88F-55C9A4993618}' },
    { name: 'Mr-Ameet-Desai', id: '{CCD6A1C0-33C8-4E78-850B-2B4F1FAE22E4}' },
    { name: 'Mr-Karan-Adani', id: '{2000E4C4-24D9-4092-9E66-D5D46511F254}' },
    { name: 'Mr-Rajnish-Kumar', id: '{B6E44534-FB54-428D-94A6-D2E529E920A4}' },
    { name: 'Mr-Maheswar-Sahu', id: '{9AD30CD3-F6C8-4BDB-9656-124059F040A3}' },
    { name: 'Ms-Purvi-Sheth', id: '{D4DCA0C3-4BFE-494E-840B-43D11587A3E5}' },
    { name: 'Mr-Ajay-Kapur', id: '{B0230A70-5537-4F83-A111-E29919DC1AC0}' },
    { name: 'Mr-MR-Kumar', id: '{22EF8B12-4232-4E86-9CA5-5E242479BC30}' },
    { name: 'Mr-Praveen-Garg', id: '{349DF5E5-3557-4C76-B951-F64001EEB92F}' },
    { name: 'Mr-Vinod-Bahety', id: '{0DEB5C7B-B43B-4224-881F-D52E91D5DF32}' },
  ];

  const { director } = await params;
  const apiData = await getApiData(
    '/sitecore/api/layout/render/jss?sc_apikey={968366F0-94BD-4A32-84E0-32E052FE2391}&item=' +
      directorLinking.find((dir: any) => dir?.name?.toLowerCase() == director)?.id,
  );
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
        {main?.CommonPageData && (
          <ImageBannerComponent breadCrumbs={main?.Breadcrumb} compData={main?.CommonPageData?.fields} />
        )}
        {main?.CommonPageData && <CustomHeading compData={main?.CommonPageData?.fields} />}

        {main && <BoardOfDirectorPage compData={main} />}
      </>
    </Layout>
  );
};

export default BoardOfDirector;
