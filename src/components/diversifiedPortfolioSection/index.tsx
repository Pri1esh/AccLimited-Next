import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Container } from "react-bootstrap"; // Importing Container from react-bootstrap
import styles from "./diversifiedPortfolioSection.module.scss";
import {Image} from "@components";
import { IPortfolio } from "@interfaces";



export default function DiversifiedPortfolioSection(props:IPortfolio) {
  const {compData}=props;
  const { heading, groupOfWebsites } = compData;

  return (
    <section className={styles.diversifiedPortfolioSection}>
      <Container>
        {" "}
        {/* Wrapping content in a responsive Container */}
        <div className={styles.diversifiedPortfolio}>
         {heading && <h2 className={styles.title}>{heading}</h2>}
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            
            navigation={{
              nextEl: `.${styles.swiperButtonNext}`,
              prevEl: `.${styles.swiperButtonPrev}`,
            }}
            breakpoints={{
              100: {
                slidesPerView: 2,
               
              },
              640: {
                slidesPerView: 2,
               
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 5,
              },
              1200: {
                slidesPerView: 6, 
              },
            }}
            className={styles.swiper}
          >
            {groupOfWebsites && groupOfWebsites.map((item, index:number) => (
              <SwiperSlide key={index} className={styles.swiperSlide}>
                <a href={item?.link} target={item?.target} className={styles.portfolioItem}>
                  <Image
                    src={item.imageSource}
                    alt={item.imageAlt}
                    className={styles.portfolioImage}
                  />

                  <p className={styles.portfolioName}>{item.linkText}</p>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={`${styles.swiperButtonPrev} ${styles.swiperButton}`}>
            <span className={styles.arrowLeft}></span>
          </div>
          <div className={`${styles.swiperButtonNext} ${styles.swiperButton}`}>
            <span className={styles.arrowRight}></span>
          </div>
        </div>
      </Container>{" "}
      {/* Closing the Container */}
    </section>
  );
}
