import { Container } from 'react-bootstrap';
import Link from 'next/link';
import styles from './investorDiclosure46.module.scss';

import { GradientBtn, Image } from '@components';

import bgImg from '../../assets/temp/investor-png.png';

// Type for the Swiper instance


export default function SebiDisclosure(props: any) {
  const { compData } = props;
  const { heading, regulationList } = compData;

  return (
    <section className={styles.disclosureSection}>
      {/* <Image src={bgImg} className={styles.bgImg} /> */}
      <img src={bgImg.src} className={styles.bgImg} />
      <Container className={styles.Disclousercontainer}>
        {/* Header with Title and Navigation Buttons */}
        <div className={styles.headerWrapper}>
          <div className={styles.titleGroup}>
            {heading && <h1 className={styles.title}>{heading}</h1>}
          </div>
        </div>

        {/* Swiper Container */}
        <div className={styles.swiperContainer}>
          <div className={styles.cardGroup}>
            {regulationList.length > 0  &&
              regulationList.map((card: any, index: number) => (
                <Link href={card?.pdfLink} key={index} target='_blank' className={styles.card}>
                  <div className={styles.iconContainer}>
                    <Image src={card?.pdfIcon} className={styles.icon} />
                  </div>
                 {card?.pdfName &&  <p className={styles.cardTitle}>{card?.pdfName}</p>}
                </Link>
              ))}
            {/* <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                updateNavState();
              }}
              modules={[Navigation]}
              slidesPerView={5}
              spaceBetween={0}
              loop={false}
              breakpoints={{
                100: { slidesPerView: 1.5 },
                640: { slidesPerView: 2 },
                992: { slidesPerView: 5 },
              }}
              className={styles.swiper}
            >
              {disclosureItems.map((item, index) => (
                <SwiperSlide key={index}>
                  <a href={item.link} className={styles.card}>
                    <item.icon className={styles.icon} />
                    <h2 className={styles.cardTitle}>{item.title}</h2>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper> */}
          </div>
        </div>
        <div className={`text-center mt-5` }>
           <Link href="/investors/disclosure-46-of-SEBI-LODR-regulations">
           <GradientBtn text="View More"/>
           </Link>
          </div>
      </Container>
    </section>
  );
}
