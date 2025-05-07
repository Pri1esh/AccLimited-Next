import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import styles from "./advertisementsSection.module.scss";
import { IShareHolderInformation } from "@interfaces";
import ResponsivePagination from "react-responsive-pagination";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { CustomImage, VideoModal } from "@components";
import ytICO from "@assets/icons/youtube_Icon.svg";

export default function AdvertisementsSection(props: IShareHolderInformation) {
  const { compData } = props;
  const { cards } = compData;
  const itemsPerPage = 8; // Number of items to display per page

  const [pdfData, setPdfData] = useState<any[]>();
  const [pageCount, setPageCount] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleVideoClick = (youtubeId: string) => {
    setSelectedVideo(youtubeId);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  useEffect(() => {
    if (cards && cards.length > 0) {
      setPageCount(Math.ceil(cards?.length / itemsPerPage));
      const currentData = cards?.slice(0, itemsPerPage);
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

    const currentData = cards?.slice(startIndex, endIndex);

    setPdfData(currentData);
  };

  return (
    <section className={`${styles.archivesSection} st`}>
      <Container className={styles.container}>
        <Row className={`g-5 ${styles.listItem}`}>
          {pdfData?.length &&
            pdfData.map((pdf: any, index: number) => (
              <Col md={4} lg={3} className={styles.tileImage} key={index}>
                <div
                  onClick={() => handleVideoClick(pdf?.ctaLink)}
                  key={index}
                  className={styles.cardBox}
                >
                  <Card className={styles.cardContainer}>
                    <div className={styles.cardImgBox}>
                      <img className={styles.ytIco} src={ytICO.src} />
                      <CustomImage compData={pdf} className={styles.cardImg} />
                    </div>
                    {pdf?.ctaText && <Card.Body className={styles.cardBody}>
                      <Card.Title className={`${styles.cardContent} ${styles.max3}`}>
                        {pdf?.ctaText}
                      </Card.Title>
                    </Card.Body>}
                  </Card>
                </div>
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
      <VideoModal show={showModal} videoURL={selectedVideo} onClose={handleClose} />
    </section>
  );
}
