import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

import 'swiper/css';

import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './customSlider.module.scss';

// import bgRect from "../../assets/temp/gradiebtRectangle.png";
import { CustomImage, CustomVideo } from '@components';
import { ICustomSlider } from '@interfaces';

export default function CustomSlider(props: ICustomSlider) {
  const { compData ,auto=false,slides=1} = props;
  const { banners } = compData;
  return (
    <section className={`${styles.BannerCarouselSection} CustomSwiper st`}>
      <Container>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={auto ? { delay: 3000 } : false}
        pagination={{ clickable: true }}
        className={styles.mySwiper}
        spaceBetween={40}
        slidesPerView={slides}
        navigation={false}
        breakpoints={slides !== 1 ? {
          1024: {
            slidesPerView: slides, // 3 tiles on tablet
          },
          768: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 1,
          },
        }: {}}
      >
        {banners &&
          banners.map((banner: any, index: number) => (
            <SwiperSlide key={index}>
              <Link href={banner?.ctaLink}>
                {banner?.ctaLink ? (
                  <CustomVideo
                    compData={{
                      src: banner?.ctaLink,
                      className: styles.carouselImage,
                      type: 'video/mp4',
                      autoPlay: true,
                      muted: true,
                      loop: true,
                      controls: false, // Hide controls if autoplaying muted
                    }}
                  />
                ) : (
                  <CustomImage compData={banner} className={styles.carouselImage} />
                )}

                <div className={styles.carouselCaption}>
                  <h3 className={styles.BannerTitle}>{banner?.heading}</h3>
                  <p>{banner?.subHeading}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
      </Container>
    </section>
  );
}
