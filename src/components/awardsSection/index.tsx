import { useState, useEffect } from 'react';
import { Row, Col, Container, Form, Card } from 'react-bootstrap';
import styles from './awardsSection.module.scss';
import { IFinancialResults } from '@interfaces';
import { Image } from '@components';

export default function AwardsSection(props: IFinancialResults) {
  const { compData, commonData } = props;
  const [selectedYear, setSelectedYear] = useState('2024');
  const [yearData, setYearData] = useState<any>(null);

  const { heading, subHeading } = commonData;

  useEffect(() => {
    if (compData && compData.length > 0) {
      setSelectedYear(compData[0]?.heading);
    }
  }, [compData]);
  
  useEffect(() => {
    if (selectedYear) {
      findYearData(selectedYear);
    }
  }, [selectedYear]);

  const findYearData = (year: string) => {
    const data = compData?.find((item: any) => item.heading === year);
    setYearData(data || null);
  };

  return (
    <>
      {compData.length > 0 && (
        <section className={`${styles.financialResultsSection} mb-4`}>
          <Container className={styles.container}>
            <div className={styles.header}>
              {heading && <h1 className={styles.title}>{heading}</h1>}
              <Form.Group className={styles.yearSelector}>
                <Form.Label className="mx-2 t-bold">Year</Form.Label>
                <Form.Select
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                  }}
                >
                  {compData.map((years: any, index: number) => (
                    <option value={years.heading} key={index}>
                      {years.heading}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>

            {subHeading && <h1 className={styles.subTitle}>{subHeading}</h1>}
            <h2 className={styles.yearHead}>{selectedYear}</h2>
            <Row className={`g-5 ${styles.listItem}`} >
            {yearData?.pdFs?.length > 0 ? (
              yearData.pdFs.map((pdf: any, index: number) => (
               
                  <Col xl={3} lg={4} md={6} className={styles.tileImage} key={index}>
                    <a className={styles.cardBox}>
                      <Card className={styles.cardCointainer}>
                        <Image src={pdf?.pdfIcon} className={styles.cardImg}/>
                        <Card.Body className={styles.cardBody}>
                          <Card.Title className={`${styles.cardContent} ${styles.max3}`}>{pdf.pdfName}</Card.Title>
                        </Card.Body>
                      </Card>
                    </a>
                  </Col>
              ))
            ) : (
              <h3 className={styles.noResults}>No results found for {selectedYear}.</h3>
            )}
                </Row>

          </Container>
        </section>
      )}
    </>
  );
}
