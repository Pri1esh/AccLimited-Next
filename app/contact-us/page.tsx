import { ErrorFallback, ImageBannerComponent, Layout, CustomHeading, MailsSection, ContactUsNavTab } from '@components';
import { ENDPOINT } from '@api-manager';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.contactUs);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}


const ContactUs = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.contactUs);
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
          <ImageBannerComponent
            breadCrumbs={main?.Breadcrumb}
            compData={main?.CommonPageData?.fields}
          />
        )}
        {main?.CommonPageData && <CustomHeading compData={main?.CommonPageData?.fields} />}
        {main?.Emails && (
          <MailsSection
            rteData={main?.RTEComponent?.fields}
            compData={main?.Emails?.fields?.subHeadings?.[0]}
          />
        )}
        {main?.ContactUs && <ContactUsNavTab compData={main?.ContactUs} />}
      </>
    </Layout>
  );
};

export default ContactUs;
