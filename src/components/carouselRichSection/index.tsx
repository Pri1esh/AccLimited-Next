import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';
import { X } from 'lucide-react';
import { useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import 'swiper/css';

import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './carouselRichSection.module.scss';

// import bgRect from "../../assets/temp/gradiebtRectangle.png";
import { IcarouselRich } from '@interfaces';
import { Image, RTE } from '@components';

export default function CarouselRichSection(props: IcarouselRich) {
  const { compData,rteData =''} = props;
  const { heading, subHeadings } = compData;

  const [dorpData, setDropData] = useState<any>(subHeadings?.[0]?.nameValuePairs?.[0]?.value);
  const [activatedCard, setActivatedCard] = useState<number>(0);
  const rteRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);

  const activateSlide = (value: any, cardNo: number) => {
    if (rteRef?.current) {
      window.scrollTo({
        top: rteRef.current.offsetTop - 100, // Scroll to 100px from the top of the section
        behavior: 'smooth', // Smooth scrolling effect
      });
    }
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
      setTimeout(() => {
        if (swiperRef.current) {
          swiperRef.current.swiper.autoplay.start();
        }
      }, 5000);
    }
    setActivatedCard(cardNo);
    setDropData(value);
  };

  return (
    <section className={`${styles.CarouselRichSection} st`}>
      <Container>
        {heading && (
          <h3 className={styles.swiperHeading} ref={rteRef}>
            {heading}
          </h3>
        )}
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 2000 }}
          spaceBetween={40}
          slidesPerView={4} // Default for desktop
          breakpoints={{
            1024: {
              slidesPerView: 4, // 3 tiles on tablet
            },
            768: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            },
          }}
          pagination={{ clickable: true }}
          className={styles.richhSwiper}
        >
          {subHeadings?.[0]?.nameValuePairs.length > 0 &&
            subHeadings?.[0]?.nameValuePairs?.map((card: any, index: number) => (
              <SwiperSlide key={index}>
                <div
                  className={`${styles.card} ${index == activatedCard ? styles.activCard : ''}`}
                  onClick={() => activateSlide(card.value, index)}
                >
                  {card?.icon && <Image src={card?.icon} className={styles.bgImg} />}
                  <div className={styles.cardImage}>
                    <div className={styles.cardArrowLink}>
                      {index == activatedCard ? (
                        <X className={styles.cardArrow} />
                      ) : (
                        <ArrowRight className={styles.cardArrow} />
                      )}
                    </div>
                  </div>
                  <div className={styles.cardContent}>
                    <h2 className={styles.cardTitle}>{card?.name}</h2>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        {rteData && <RTE compData={rteData}/>}

        
      </Container>
      {dorpData && (
        <div className={styles.rteContainer}>
          <Container>
            <RTE compData={dorpData} />
          </Container>
        </div>
      )}
    </section>
  );
}
