import { Container, Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './newsAwardSection.module.scss';
import { IHNewsUpdates } from '@interfaces';
import { CustomImage, GradientBtn } from '@components';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules';
import { formateDate } from '@utils';

export default function NewsUpdatesSection(props: IHNewsUpdates) {
  const { compData } = props;
  const { newsList = [], updatesList = [] } = compData;

  return (
    <section className={`${styles.newsAwardSection} st`}>
      <Container>
        <Row className={'position-relative'}>
          <Col lg={6} className={`text-start pe-lg-5 mb-lg-0 mb-5 ${styles.newsContainer}`}>
            <h3 className={styles.sectionHead}>News</h3>
            <div className={styles.newsList}>
              {newsList.length > 0 &&
                newsList.map((news: any, index: number) => (
                  <div className={styles.newsTile} key={index}>
                    <CustomImage compData={news} className={styles.newsIcon} />
                    <div className={styles.details}>
                      <p className={styles.date}>{formateDate(news?.date)}</p>
                      <p className={`${styles.description} max2`}>{news?.imageTitle}</p>
                    </div>
                  </div>
                ))}
            </div>
            <GradientBtn link={'/newsroom/media-releases'} text="View More" middle={false} className={styles.moreBtn}/>
          </Col>
          <Col lg={6} className={styles.awardList}>
            <h3 className={styles.sectionHead}>Awards & Recognition</h3>
            <Swiper
              modules={[Autoplay, Pagination]}
              // autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              spaceBetween={5}
              slidesPerView={1}
              navigation={{
                nextEl: `.${styles.swiperButtonNext}`,
                prevEl: `.${styles.swiperButtonPrev}`,
              }}
              className={styles.swiper}
            >
              {updatesList.length > 0 &&
                updatesList.map((award: any, index: number) => (
                  <SwiperSlide key={index} className={styles.swiperSlide}>
                    <a href={award?.ctaLink} target={award?.target} className={styles.awardSlide}>
                      <div className={styles.slideBox}>
                        {award?.imageTitle && (
                          <div className={styles.awardInfo}>{award?.imageTitle}</div>
                        )}
                        <CustomImage className={styles.awardImg} compData={award} />
                      </div>
                      {/* <Row className="h-100">
                        <Col xl={6}>
                          {award?.imageTitle && (
                            <div className={styles.awardInfo}>{award?.imageTitle}</div>
                          )}
                        </Col>
                        <Col xl={6}>
                          <CustomImage compData={award} />
                        </Col>
                      </Row> */}
                    </a>
                  </SwiperSlide>
                ))}
            </Swiper>

            <GradientBtn
              link={'/about-ambuja/awards-and-recognition'}
              className={styles.moreBtn}
              text="View More"
              middle={false}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
