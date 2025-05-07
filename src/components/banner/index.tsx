import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Link from 'next/link';
import 'swiper/css';

import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './banner.module.scss';

// import bgRect from "../../assets/temp/gradiebtRectangle.png";
import { CustomImage, CustomVideo } from '@components';
import { IHBanner } from '@interfaces';

export default function Banner(props: IHBanner) {
  const { compData, middle = false } = props;
  const { banners } = compData;
  return (
    <section className={`${styles.BannerCarouselSection} BannerSwiper ${middle ? 'middle' : ''}`}>
      <Swiper
        modules={[Autoplay, Pagination]}
        // autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        className={styles.mySwiper}
      >
        {banners &&
          banners.map((banner: any, index: number) => (
            <SwiperSlide key={index}>
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
              <Link href={banner?.ctaLink}>

                <div className={styles.carouselCaption}>
                  <h3 className={styles.BannerTitle}>{banner?.heading}</h3>
                  <p>{banner?.subHeading}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}
