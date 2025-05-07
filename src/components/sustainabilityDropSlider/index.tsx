import { useRef } from 'react';
import styles from './sustainabilityDropSlider.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { ISusDropSLider } from '@interfaces';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { CustomImage, RTE } from '@components';
import { Accordion } from 'react-bootstrap';

interface ReportItem {
  title: string;
  downloadUrl: string;
}

interface FinancialYearData {
  year: string;
  reports: ReportItem[];
}

const SustainabilityDropSlider = (props: ISusDropSLider) => {
  const baseURL = process.env.NEXT_PUBLIC_STAGING_LINK;

  const { compData, rteData } = props;
  const { title, reports } = compData;
  const swiperRef = useRef<any>(null);

  const financialData: FinancialYearData[] = [
    {
      year: title,
      reports: reports,
    },
  ];

  const handleTabClick = (index: number) => {
    swiperRef.current?.slideTo(index); // Navigate to the clicked tab slide
  };

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
    <section className={`${styles.susSection} st`}>
      <Container>
        <Row>
          <Col lg={8}>
            {rteData && <RTE compData={rteData?.rteComponentData} />}
            <div className={styles.accordionWrapper}>
              <Accordion defaultActiveKey="0">
                {financialData.map((yearData, index) => (
                  <Accordion.Item key={index} eventKey={index.toString()}>
                    <Accordion.Header className={styles.accordionHeader}>
                      <span>{yearData.year}</span>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className={styles.reportsContainer}>
                        {yearData.reports.map((report: any, reportIndex: number) => (
                          <div
                            key={reportIndex}
                            className={styles.reportItem}
                            onClick={() => {
                              handleTabClick(reportIndex);
                            }}
                          >
                            <span className={styles.reportTitle}>{report?.imageTitle}</span>
                            <a
                              href={report.ctaLink}
                              className={styles.downloadLink}
                              onClick={(e) => {
                                handleDownload(report.ctaLink, e);
                              }}
                            >
                              {report?.ctaText}
                            </a>
                          </div>
                        ))}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </Col>

          <Col lg={4} className='align-content-center'>
            <Swiper
              modules={[Autoplay, Pagination]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              spaceBetween={5}
              slidesPerView={1}
              className={styles.swiper}
              onSwiper={(swiper) => (swiperRef.current = swiper)} 
            >
              {financialData.length > 0 &&
                financialData?.[0]?.reports?.map((award: any, index: number) => (
                  <SwiperSlide key={index} className={styles.swiperSlide}>
                    <div className={styles.ImgContainer}>
                      <CustomImage className={styles.overlayImg} compData={award} />
                      {award?.ctaText && <p className={styles?.overlayTxt}>{award?.imageTitle}</p>}
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SustainabilityDropSlider;
