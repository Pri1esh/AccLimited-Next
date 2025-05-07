import { Container, Card, Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import styles from './aboutus.module.scss';
import { CustomImage, GradientBtn } from '@components';
import { IHAboutus } from '@interfaces';
import 'swiper/css';

import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function AboutUs(props: IHAboutus) {
  const { compData } = props;
  const { ctaLink, ctaText, description1, description2, heading, thumbnail } = compData;

  return (
    <section className={styles.aboutUs}>
      <Container>
        <Row className={styles.flexContainer}>
          <Col md={6}>
            <div className={styles.content}>
              <Card className={styles.aboutUsCard}>
                <Card.Body>
                  {heading && (
                    <Card.Title as="h2" className={styles.title}>
                      {heading}
                    </Card.Title>
                  )}
                  <Card.Text className={styles.description}>
                    {description1 && <p>{description1}</p>}
                    {description2 && <p>{description2}</p>}
                  </Card.Text>
                  {<GradientBtn text={ctaText} link={ctaLink} />}
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col md={6}>
            <div className={styles.mediaSection}>
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                spaceBetween={0}
                slidesPerView={1}
                navigation={false}
                className={styles.swiper}
              >
                {thumbnail.length > 0 &&
                  thumbnail.map((banner: any, index: number) => (
                    <SwiperSlide className={styles.swiperSlide} key={index}>
                      <CustomImage compData={banner} className={styles.carouselImage} />
                      <div className={styles.carouselCaption}>
                        {/* {banner?.imageAlt && <h3 className={styles.BannerTitle}>{banner?.imageAlt}</h3>} */}
                        {banner?.imageAlt && <p>{banner?.imageAlt}</p>}
                      </div>
                      <div className={styles.gradient}></div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
