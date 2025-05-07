import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import Link from 'next/link';
import styles from './investor-presentation.module.scss';
import { Image } from '@components';
import { IInvestorPresentation } from '@interfaces';
import { formateDate } from '@utils';

export default function InvestorPresentationPage(props: IInvestorPresentation) {
  const { compData } = props;
  const [selectedYear, setSelectedYear] = useState<string>('All');

  // Helper function to filter data based on year and report type
  const filterData = (reportType: string) => {
    return compData
      ?.filter((item: any) => selectedYear === 'All' || item.heading === selectedYear)
      .flatMap((item: any) => item.pdFs)
      .filter((pdf: any) => pdf.reportType.trim() === reportType);
  };

  function sortByDate(data: { date: string }[]): { date: string }[] {
    return [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  

  return (
    <section className={`${styles.RowSection} st`}>
      <Container>
        {/* Year Filter Dropdown */}
        <div className={`mb-4 ${styles.selectBox} d-flex justify-content-end`}>
          <select
            className={`form-select ${styles.yearSelect}`}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            aria-label="Year selection"
          >
            {/* <option value="all">All</option> */}
            <option value="All">All</option>
            {compData?.map((item: any, index: number) => (
              <option key={`year-${index}`} value={item.heading}>
                {item.heading}
              </option>
            ))}
          </select>
        </div>

        <Row className="gx-lg-5 gx-md-4">
          {/* Audio Recordings Column */}
          <Col md={4} className={`${styles.cols} mb-md-0 mb-4`}>
            <div className={styles.annualSection}>
              <div className={styles.cardBody}>
                <h5>Audio Recordings of Investor Calls</h5>
                <ul>
                  {filterData('Audio').length === 0 ? (
                    <li className={styles.noData}>Data not found for {selectedYear}</li>
                  ) : (
                    sortByDate(filterData('Audio')).map((item: any, index: number) => (
                      <li key={index}>
                        <Link target="_blank" href={item.pdfLink}>
                          <Image
                            className={styles.icon}
                            src={item.pdfIcon}
                            alt={item.pdfName || 'PDF Icon'}
                          />
                          <div className={`${styles.title} max2`}>{item.pdfName}</div>
                        </Link>
                        <div className={`${styles.dateDiv} `}>
                          <span className={styles.DateforCards}>{formateDate(item?.date)}</span>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </Col>

          {/* Transcripts Column */}
          <Col md={4} className={`${styles.cols} mb-md-0 mb-4`}>
            <div className={styles.financialSection}>
              <div className={styles.cardBody}>
                <h5>Transcripts of Investor Calls</h5>
                <ul>
                  {filterData('Transcript').length === 0 ? (
                    <li className={styles.noData}>Data not found for {selectedYear}</li>
                  ) : (
                    sortByDate(filterData('Transcript')).map((item: any, index: number) => (
                      <li key={index}>
                        <Link target="_blank" href={item.pdfLink}>
                          <Image
                            className={styles.icon}
                            src={item.pdfIcon}
                            alt={item.pdfName || 'PDF Icon'}
                          />
                          <div className={`${styles.title} max2`}>{item.pdfName}</div>
                        </Link>
                        <div className={`${styles.dateDiv} `}>
                          <span className={styles.DateforCards}>{formateDate(item?.date)}</span>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </Col>

          {/* Presentations Column */}
          <Col md={4} className={`${styles.cols} mb-md-0 mb-4`}>
            <div className={styles.financialSection}>
              <div className={styles.cardBody}>
                <h5>Presentations</h5>
                <ul>
                  {filterData('Presentations').length === 0 ? (
                    <li className={styles.noData}>Data not found for {selectedYear}</li>
                  ) : (
                    sortByDate(filterData('Presentations')).map((item: any, index: number) => (
                      <li key={index}>
                        <Link target="_blank" href={item.pdfLink}>
                          <Image
                            className={styles.icon}
                            src={item.pdfIcon}
                            alt={item.pdfName || 'PDF Icon'}
                          />
                          <div className={`${styles.title} max2`}>{item.pdfName}</div>
                        </Link>
                        <div className={`${styles.dateDiv} `}>
                          <span className={styles.DateforCards}>{formateDate(item?.date)}</span>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
