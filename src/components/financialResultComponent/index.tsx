'use client';

import { useState, useEffect } from 'react';
import { Container, Form, ListGroup, Button } from 'react-bootstrap';
import styles from './financialResultComponent.module.scss';
import { IFinancialResults } from '@interfaces';
import { Image } from '@components';
import Link from 'next/link';
import { formateDate } from '@utils';

export default function FinancialResults(props: IFinancialResults) {
  const { compData, commonData, dropHead = 'Year' } = props;
  const [selectedYear, setSelectedYear] = useState('');
  const [yearData, setYearData] = useState<any>(null);

  const { heading, subHeading } = commonData;
  const baseURL = process.env.NEXT_PUBLIC_STAGING_LINK;

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

  const handleDownload = (url: any, e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (url) {
      const pdfUrl = url; // Replace with your PDF URL
      const link = document.createElement('a');
      link.href = baseURL + pdfUrl;
      link.setAttribute('download', 'SamplePDF.pdf'); // Suggested file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const findYearData = (year: string) => {
    const data = compData?.find((item: any) => item.heading === year);
    setYearData(data || null);
  };

  return (
    <>
      {compData.length > 0 && (
        <section className={`${styles.financialResultsSection} mb-4`}>
          <Container className={styles.container}>
            {heading ? (
              <>
                <div className={styles.header}>
                  {heading && <h1 className={styles.title}>{heading}</h1>}
                  <Form.Group className={styles.yearSelector}>
                    <Form.Label className="mx-2 t-bold">{dropHead}</Form.Label>
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
                {subHeading && <h4 className={styles.subTitle}>{subHeading}</h4>}
              </>
            ) : (
              <div className={`${styles.header} mb-4`}>
                {subHeading && <h4 className={`${styles.subTitle} mb-0`}>{subHeading}</h4>}

                <Form.Group className={styles.yearSelector}>
                  <Form.Label className="mx-2 t-bold">{dropHead}</Form.Label>
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
            )}

            <ListGroup variant="flush">
              {yearData?.pdFs?.length > 0 ? (
                yearData.pdFs.map((pdf: any, index: number) => (
                  <ListGroup.Item
                    as={Link}
                    href={baseURL + pdf.pdfLink}
                    target={'_blank'}
                    className={styles.listItem}
                    key={index}
                  >
                    <Image src={pdf.pdfIcon} alt="PDF Icon" />
                    <div className={styles.pdfDetails}>
                      <span className={styles.pdfName}>{pdf.pdfName}</span>
                      {pdf?.date && <p className={styles.date}>{formateDate(pdf?.date)}</p>}
                    </div>
                    <Button
                      variant="link"
                      className={styles.downloadButton}
                      onClick={(e) => handleDownload(pdf.pdfLink, e)}
                    >
                      <Image src={pdf.downloadIcon} alt="Download Icon" />
                    </Button>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item className={styles.noResults}>
                  No results found for {selectedYear}.
                </ListGroup.Item>
              )}
            </ListGroup>
          </Container>
        </section>
      )}
    </>
  );
}
