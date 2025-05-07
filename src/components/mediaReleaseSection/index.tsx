import { useState, useEffect } from 'react';
import { Container, Form, Card, ListGroup } from 'react-bootstrap';
import styles from './mediaReleaseSection.module.scss';
import { IFinancialResults } from '@interfaces';
import Link from 'next/link';
import ResponsivePagination from 'react-responsive-pagination';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';
import { formateDate } from '@utils';

export default function MediaReleaseSection(props: IFinancialResults) {
  const { compData, commonData } = props;
  const [selectedYear, setSelectedYear] = useState('');
  const [yearData, setYearData] = useState<any>(null);
  const [tilesData, setTilesData] = useState<any>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { heading, subHeading } = commonData;
  const baseURL = process.env.NEXT_PUBLIC_STAGING_LINK;
  const itemsPerPage = 5; // Number of items to display per page

  const handlePageChange = (selectedPage: any) => {
    const pageIndex = selectedPage - 1;
    setCurrentPage(selectedPage);

    // Calculate the index range for the current page
    const startIndex = pageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Display data within the range

    const currentData = yearData?.pdFs?.slice(startIndex, endIndex);
    setTilesData(currentData);
  };

  // Example usage:

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
    setPageCount(Math.ceil(data?.pdFs?.length / itemsPerPage));
    const currentData = data?.pdFs?.slice(0, itemsPerPage);
    setTilesData(currentData);
    setYearData(data || null);
  };

  return (
    <>
      {compData.length > 0 && (
        <section className={`${styles.mediaReleaseSection} st`}>
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
            <ListGroup className={`g-5 ${styles.listItem}`} variant="flush">
              {yearData?.pdFs?.length > 0 ? (
                tilesData?.map((pdf: any, index: number) => (
                  <ListGroup.Item className={styles.listTile} key={index}>
                    <Link
                      href={baseURL + pdf.pdfLink}
                      target={'_blank'}
                      key={index}
                      className={styles.cardBox}
                    >
                      <Card className={styles.cardCointainer}>
                        <Card.Body className={styles.cardBody}>
                          <Card.Title className={`${styles.cardContent} ${styles.max3}`}>
                            {pdf.pdfName}
                          </Card.Title>
                          {pdf?.date && (
                            <Card.Text className={styles.cardText}>
                              {formateDate(pdf?.date)}
                            </Card.Text>
                          )}
                        </Card.Body>
                      </Card>
                    </Link>
                  </ListGroup.Item>
                ))
              ) : (
                <h3 className={styles.noResults}>No results found for {selectedYear}.</h3>
              )}
            </ListGroup>
            <div className={styles.paginationResponsive}>
              {pageCount > 1 && <ResponsivePagination
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
              />}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
