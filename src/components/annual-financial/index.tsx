import { Container, Row, Col } from 'react-bootstrap';
import { IPresentationBRSR } from '@interfaces';
import Link from 'next/link';
import styles from './annual-financial.module.scss';
import { Image } from '@components';
import { formateDate } from '@utils';

export default function AnnualFinancial(props: IPresentationBRSR) {
  const { compData, commonData,bg=true , date1=false,date2=false } = props;
  const baseURL = process.env.NEXT_PUBLIC_STAGING_LINK;

  return (
    <>
      <section className={`${styles.RowSection} ${bg ? styles.bg : ''} st`}>
        <Container>
          <Row className='gx-lg-5 gx-md-4'>
            {compData && <Col md={commonData ?  6: 12} className={`${styles.cols} mb-md-0 mb-4`}>
              <div className={styles.cardHeader}>
                {compData?.heading && <h4>{compData?.heading}</h4>}

                {compData?.ctaText && (
                  <Link className={styles.viewMore} href={compData?.ctaLink}>
                    {compData?.ctaText}
                  </Link>
                )}
              </div>
              <div className={styles.annualSection}>
                <div className={styles.cardBody}>
                  {compData?.subHeading && <h5>{compData?.subHeading}</h5>}
                  <ul>
                    {compData?.selectedItems?.length > 0 &&
                      compData?.selectedItems.map((report: any, index: number) => (
                        <li key={index}>
                          <Link target="_blank" href={baseURL + report?.fields?.PDFLink}>
                            <Image
                              className={styles.icon}
                              src={'/-/media/Project/AmbujaLimited/Common/icons/pdf'}
                            />
                            <div>
                              {report?.fields?.PDFName && (
                                <div className={`${styles.title} max2`}>
                                  {report?.fields?.PDFName}
                                </div>
                              )}
                            </div>
                          </Link>
                          {(report?.fields?.Date && date1) && <p className={styles.Date}>{formateDate(report?.fields?.Date)}</p>}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </Col>}
            {commonData && <Col md={compData ? 6 : 12} className={`${styles.cols} mb-md-0 mb-4`}>
              <div className={styles.cardHeader}>
                {commonData?.heading && <h4>{commonData?.heading}</h4>}
                {commonData?.ctaText && (
                  <Link className={styles.viewMore} href={commonData?.ctaLink}>
                    {commonData?.ctaText}
                  </Link>
                )}
              </div>
              <div className={styles.financialSection}>
                <div className={styles.cardBody}>
                  <ul>
                    {commonData?.selectedItems.length > 0 &&
                      commonData?.selectedItems?.map((report: any, index: number) => (
                        <li key={index}>
                          <Link target="_blank" href={baseURL + report?.fields?.PDFLink}>
                            <Image
                              className={styles.icon}
                              src={'/-/media/Project/AmbujaLimited/Common/icons/pdf'}
                            />
                            <div>
                              {report?.fields?.PDFName && (
                                <div className={`${styles.title} max2`}>
                                  {report?.fields?.PDFName}
                                </div>
                              )}
                            </div>
                          </Link>
                          {(report?.fields?.Date && date2) && <p className={styles.Date}>{formateDate(report?.fields?.Date)}</p>}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </Col>}
          </Row>
        </Container>
      </section>
    </>
  );
}
