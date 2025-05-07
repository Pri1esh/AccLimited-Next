import { Container, Row, Col, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import styles from './archiveSection.module.scss';
import { IArchiveSection } from '@interfaces';
import Link from 'next/link';
import ResponsivePagination from 'react-responsive-pagination';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';
import { CustomImage, Image } from '@components';
import { formateDate } from '@utils';

export default function ArchiveSection(props: IArchiveSection) {
  const { compData,aspect="" } = props;
  const { fields } = compData;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const baseURL = process.env.NEXT_PUBLIC_STAGING_LINK;
  const itemsPerPage = 8; // Number of items to display per page

  const [pdfData, setPdfData] = useState<any[]>();
  const [pageCount, setPageCount] = useState<number>(0);

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

  useEffect(() => {
    if (fields && fields.length > 0) {
      setPageCount(Math.ceil(fields?.length / itemsPerPage));
      const currentData = fields?.slice(0, itemsPerPage);
      setPdfData(currentData);
    }
  }, [compData]);

  const handlePageChange = (selectedPage: any) => {
    const pageIndex = selectedPage - 1;
    setCurrentPage(selectedPage);

    // Calculate the index range for the current page
    const startIndex = pageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Display data within the range
    const currentData = fields?.slice(startIndex, endIndex);

    setPdfData(currentData);
  };

  return (
    <section className={`${styles.archivesSection} st`}>
      <Container className={styles.container}>
        <Row className={`g-5 ${styles.listItem}`}>
          {pdfData?.length &&
            pdfData.map((pdf: any, index: number) => (
              <Col md={3} className={styles.tileImage} key={index}>
                <Link
                  href={baseURL + pdf?.ctaLink}
                  target={'_blank'}
                  key={index}
                  className={styles.cardBox}
                >
                  <Card className={styles.cardContainer}>
                    <CustomImage compData={pdf} className={`${aspect ? styles[aspect]: ''} ${styles.cardImg}`} />
                    <Card.Body className={styles.cardBody}>
                      <Card.Title className={`${styles.cardContent} ${styles.max3}`}>
                        {pdf?.ctaText && pdf?.ctaText}
                      </Card.Title>
                      <Image
                        src={pdf?.icon}
                        className={styles.downloadButton}
                        alt="Download Icon"
                        onClick={(e: any) => handleDownload(pdf?.ctaLink, e)}
                      />
                    </Card.Body>
                    <Card.Body className={styles.date}>
                      {pdf?.date && <p> {formateDate(pdf?.date)}</p>}
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
        </Row>
        <div className={styles.paginationResponsive}>
          {pageCount > 1 && (
            <ResponsivePagination
              total={pageCount}
              current={currentPage}
              nextLabel={
                <div className={styles.rightShevIco}>
                  <FaChevronRight color="#000" />
                </div>
              }
              previousLabel={
                <div className={styles.leftShevIco}>
                  <FaChevronLeft color="#000" />
                </div>
              }
              onPageChange={(page) => handlePageChange(page)}
            />
          )}
        </div>
      </Container>
    </section>
  );
}
