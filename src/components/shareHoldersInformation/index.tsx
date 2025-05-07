'use client';

import { Container, ListGroup, Button } from 'react-bootstrap';
import styles from './shareHoldersInformation.module.scss';
import { IAnnualReport } from '@interfaces';
import {Image} from '@components';
import Link from 'next/link';
import { formateDate } from '@utils';

export default function ShareHolderInfo(props: IAnnualReport) {
  const { compData } = props;
  const baseURL = process.env.NEXT_PUBLIC_STAGING_LINK;

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

  return (
    <section className={`${styles.ShareHolderInfoSection}`}>
      <Container className={styles.container}>
        {compData.map((item: any, index: number) => (
          <ListGroup variant="flush" key={index}>
            {item.heading && (
              <div className={styles.headerSection}>
                <div>
                  <h2 className={styles.subTitle}>{item.heading}</h2>
                </div>
              </div>
            )}

            {item.pdFs.map((pdf: any, pdfIndex: number) => (
              <ListGroup.Item
                className={styles.listItem}
                key={pdfIndex}
                as={Link}
                href={pdf?.pdfLink}
                target={'_blank'}
              >
                <Image src={pdf.pdfIcon} alt="PDF Icon" />

                <div className={styles.pdfDetails}>
                  <span className={styles.pdfName}>{pdf.pdfName}</span>
                  {pdf?.date && <p className={styles.date}>{formateDate(pdf?.date)}</p>}
                </div>
                <Button
                  variant="link"
                  className={styles.downloadButton}
                  onClick={(e) => handleDownload(pdf?.pdfLink, e)}
                >
                  <Image src={pdf.downloadIcon} alt="Download Icon" />
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ))}
      </Container>
    </section>
  );
}
