'use client';

import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import styles from './presentation-brsr.module.scss';
import { IPresentationBRSR } from '@interfaces';
import { formateDate } from '@utils';

export default function PresentationBRSR(props: IPresentationBRSR) {
  const { compData, commonData } = props;
  const baseURL = process.env.NEXT_PUBLIC_STAGING_LINK;
  const brsrTitles = commonData?.subHeading.split('\\n');

  return (
    <>
      <section className={`${styles.RowSection}`}>
        <Container>
          <Row className='gx-lg-5 gx-md-4'>
            {compData && (
              <Col lg={commonData ? 8 : 12} md={commonData ? 6 : 12} className="mb-md-0 mb-4">
                <div className={styles.presentationCard}>
                  <div className={styles.cardHeader}>
                    {compData?.heading && <h4>{compData?.heading}</h4>}
                    {compData?.ctaText && (
                      <Link className={styles.viewMore} href={compData?.ctaLink}>
                        {compData?.ctaText}
                      </Link>
                    )}
                  </div>
                  <div className={styles.cardBody}>
                    <ul>
                      {compData?.selectedItems.length > 0 &&
                        compData?.selectedItems.map((presentation: any, index: number) => (
                          <li key={index}>
                            <Link href={baseURL+presentation?.fields?.AudioLink} target='_blank'>
                              <span className={styles.icon}></span>
                              <div>
                                {presentation?.fields?.PDFName && (
                                  <div className={`${styles.title} max2`}>
                                    {presentation?.fields?.PDFName}
                                  </div>
                                )}
                                {presentation?.fields?.Date && (
                                  <div className={styles.subTitle}>
                                    {formateDate(presentation?.fields?.Date)}
                                  </div>
                                )}
                              </div>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </Col>
            )}
            {commonData && (
              <Col lg={compData ? 4 : 12} md={commonData ? 6 : 12}>
                <div className={styles.BRSRCard}>
                  <div className={styles.cardHeader}>
                    {commonData?.heading && <h4>{commonData?.heading}</h4>}
                    {commonData?.ctaText && (
                      <Link className={styles.viewMore} href={commonData?.ctaLink}>
                        {commonData?.ctaText}
                      </Link>
                    )}
                  </div>
                  <div className={styles.cardBody}>
                    <ul>
                      {commonData?.selectedItems.length > 0 &&
                        commonData?.selectedItems?.map((brsr: any, index: number) => (
                          <>
                            {brsr?.itemName && (
                              <li key={index}>
                                <Link href={'/investors/BRSR-(general-&-digital)/' + brsr?.itemName?.toLowerCase().replace(/ /g, '-')}>
                                  <span className={styles.icon}></span>
                                  <div>
                                    <div className={`${styles.title} max2`}>{brsrTitles[index]}</div>
                                  </div>
                                </Link>
                              </li>
                            )}
                          </>
                        ))}
                    </ul>
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
}
