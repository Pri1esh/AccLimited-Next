import { useState, useEffect } from 'react';
import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './annualReportPage.module.scss';
import { IAnnualReport } from '@interfaces';
import {Image} from '@components';
import Link from 'next/link';
export default function AnnualReports(props: IAnnualReport) {
  const { compData } = props;

  const [selectedYear, setSelectedYear] = useState(''); // Default active year
  const baseURL = process.env.NEXT_PUBLIC_STAGING_LINK;

  useEffect(() => {
    setSelectedYear(compData[0]?.heading);
  }, []);

  const handleDownload = (url: any,e:any) => {
    e.preventDefault();
    e.stopPropagation();
    if (url) {
      const pdfUrl = url; // Replace with your PDF URL
      const link = document.createElement('a');
      link.href = baseURL+pdfUrl;
      link.setAttribute('download', 'SamplePDF.pdf'); // Suggested file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section className={styles.annualReportsSection}>
      <Container className={styles.container}>
        {/* <div className={styles.header}></div> */}

        <div className={styles.yearsGrid}>
          {compData?.map((item: any, index: number) => (
            <div
              key={index} // Add a unique key for each item
              className={`${styles.yearCard} ${selectedYear === item.heading ? styles.active : ''}`}
              onClick={() => setSelectedYear(item.heading)}
            >
              <div className={styles.imageWrapper}>
                {/* <img src={item.image.imageSource} alt={item.imageAlt} /> */}
                <Image src={item.image.imageSource} alt={item.imageAlt} />
              </div>
              <div className={`${styles.year} pt-2`}>{item.heading}</div>
            </div>
          ))}
        </div>
      </Container>

      <div className={styles.reportsSection}>
        <Container>
          {selectedYear &&
            compData?.map((item: any, index: number) => {
              if (item.heading === selectedYear) {
                return (
                  <React.Fragment key={index}>
                    <h2 className={styles.reportsTitle}>{item.subheading}</h2>
                    <div className={styles.reportsList}>
                      {item.pdFs.map((itemData: any, index: number) => (
                        <Link
                          href={baseURL + itemData.pdfLink}
                          target={'_blank'}
                          key={index}
                          className={styles.reportItem}
                        >
                          <span className={styles.reportTitle}>{itemData.pdfName}</span>
                          <button
                            className={styles.downloadButton}
                            aria-label={`Download ${itemData.pdfName}`}
                            onClick={(e) => handleDownload(itemData.pdfLink,e)}
                          >
                            {/* <img src={downloadImage} alt={`Download ${itemData.pdfName}`} /> */}
                           {itemData?.downloadIcon && <Image src={itemData.downloadIcon} alt="download icom" />}
                          </button>
                        </Link>
                      ))}
                    </div>
                  </React.Fragment>
                );
              }
              return null;
            })}
        </Container>
      </div>
    </section>
  );
}
