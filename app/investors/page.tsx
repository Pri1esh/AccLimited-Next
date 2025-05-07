import { ENDPOINT } from '@api-manager';
import { BoardOfDirector, CorporateGovernance, ErrorFallback, EssentialIndicators, GradientBtn, ImageBannerComponent, Layout, MediaMenuCards, SubscribeForm, SustainabilityGrid } from '@components';
import { getApiData, getMetadata } from '@utils/server';
import SebiDisclosure from 'src/components/investorDiclosure46';

export async function generateMetadata(): Promise<unknown> {
  const apiData = await getApiData(ENDPOINT.SSR.investorPage);
  const { data } = apiData;

  return getMetadata(data?.main?.SEO?.fields);
}


const Investor = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.investorPage);
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
      footerMt={false}
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
        {/* {main?.CTA && <InvestorInformation compData={main?.CTA?.fields} showHeading={true} />} */}
        {main?.InvestorButton && <SustainabilityGrid compData={main?.InvestorButton?.fields} />}
        <SubscribeForm/>
        {main?.['Investors LODR'] && <SebiDisclosure compData={main?.['Investors LODR']?.fields}/>}
        {main?.['6 Card Section'] && (
          <CorporateGovernance compData={main?.['6 Card Section']?.fields} showHeading={true} />
        )}
        {main?.['EssentialIndicators'] && <EssentialIndicators compData={main?.['EssentialIndicators']?.fields?.subHeadings?.[0]} />}
        {main?.['4CardsSection'] && <MediaMenuCards compData={main?.['4CardsSection']?.fields} />}
      </>
    </Layout>

  );
};

export default Investor;
