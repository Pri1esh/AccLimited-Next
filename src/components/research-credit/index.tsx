import { Container, Row, Col, Table } from 'react-bootstrap';
import { IPresentationBRSR } from '@interfaces';
import Link from 'next/link';
import styles from './research-credit.module.scss';

export default function ResearchCredit(props: IPresentationBRSR) {
  const { compData, commonData } = props;

  return (
    <>
      <section className={`${styles.RowSection} st`}>
        <Container>
          <Row className='gx-lg-5 gx-md-4'>
            {compData && (
              <Col xl={commonData ? 8 : 12} md={commonData ? 6 : 12} className={`${styles.cols} mb-lg-0 mb-5`}>
                <div className={styles.cardHeader}>
                  {compData?.sectionTitle && <h4>{compData?.sectionTitle}</h4>}

                  <Link className={styles.viewMore} href={'/investors/investor-presentations'}>
                    View More
                  </Link>
                </div>
                <div className={styles.researchCard}>
                  {compData?.members?.length > 0 && (
                    <div className={styles.tableWrapper}>
                      <Table striped hover responsive className={styles.table}>
                        <thead>
                          <tr>
                            <th>Sr No.</th>
                            <th>Analyst Name</th>
                            <th>Firm Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {compData?.members?.slice(0, 4)?.map((item: any, index: number) => (
                            <tr className="presentationTable" key={index}>
                              <td>{index + 1}</td>
                              <td>{item?.name}</td>
                              <td>{item?.role}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </div>
              </Col>
            )}
            {commonData && (
              <Col xl={compData ? 4 : 12} md={commonData ? 6 : 12} className={`${styles.cols} mb-lg-0 mb-5`}>
                <div className={styles.cardHeader}>
                  {commonData?.heading && <h4>{commonData?.heading}</h4>}
                  {commonData?.ctaText && (
                    <Link className={styles.viewMore} href={commonData?.ctaLink}>
                      {commonData?.ctaText}
                    </Link>
                  )}
                </div>
                <div className={styles.creditCard}>
                  <div className={styles.cardBody}>
                  {commonData?.subHeading && <h5>{commonData?.subHeading}</h5>}
                    <ul>
                      {commonData?.selectedItems.length > 0 &&
                        commonData?.selectedItems?.map((rating: any, index: number) => (
                          <li key={index}>
                            <Link href={''}>
                              <span className={styles.icon}></span>
                              <div>
                                <div className={`${styles.title} max2`}>{rating?.itemName}</div>
                              </div>
                            </Link>
                          </li>
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
