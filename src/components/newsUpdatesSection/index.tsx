import { useState } from 'react';
import { Container, Tab, Nav } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Image } from '@components';
import styles from './newsUpdatesSection.module.scss';
import { GradientBtn } from '@components';
import { CardDate } from '@components';
import { IHNewsUpdates } from '@interfaces';
import "@styles/styles.scss";


export default function NewsUpdatesSection(props: IHNewsUpdates) {
  const { compData } = props;
  const { newsList = [], updatesList=[] } = compData; // Default to an empty array if undefined

  const [activeTab, setActiveTab] = useState('news');

  return (
    <section className={`${styles.newsUpdatesSection} NewsMediaSection`}>
      <Container>
        {/* Tab Navigation */}
        <Nav variant="tabs" className={styles.tabNav}>
          {newsList.length>0 && <Nav.Item>
            <Nav.Link
              className={activeTab === 'news' ? styles.activeTab : ''}
              onClick={() => setActiveTab('news')}
            >
              News
            </Nav.Link>
          </Nav.Item>}
          {updatesList.length>0 && <Nav.Item>
            <Nav.Link
              className={activeTab === 'updates' ? styles.activeTab : ''}
              onClick={() => setActiveTab('updates')}
            >
              Updates
            </Nav.Link>
          </Nav.Item>}
        </Nav>

        {/* Tab Content */}
        <Tab.Content>
          {/* News Tab */}
          {newsList.length>0 && <Tab.Pane eventKey="news" active={activeTab === 'news'}>
            {newsList.length > 0 && (
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={false}
                pagination={{ clickable: true }}
                breakpoints={{
                  100: { slidesPerView: 1.2 },
                  640: { slidesPerView: 2 },
                  992: { slidesPerView: 3 },
                }}
                className={styles.swiper}
              >
                {newsList.map((news: any, index: number) => (
                  <SwiperSlide key={index} className={styles.swiperSlideCSS}>
                    <div className={styles.card}>
                      {/* Image */}
                      <Image
                        src={news.imageSource}
                        alt={news.imageAlt || 'News image'} // Fallback alt text
                        className={styles.cardImage}
                      />
                      {/* Card Content */}
                      <div className={styles.cardContent}>
                        <CardDate text={news.date} />
                        <h3 className={`${styles.cardTitle} mt-2`}>
                          {news.imageTitle}
                        </h3>
                        <div className="pt-2">
                          <GradientBtn text={news.ctaText} link={news?.ctaLink} target={news?.target}/>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </Tab.Pane>}

          {/* Updates Tab */}
          {updatesList.length>0 && <Tab.Pane eventKey="updates" active={activeTab === 'updates'}>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={false}
              pagination={{ clickable: true }}
              breakpoints={{
                100: { slidesPerView: 1.2 },
                640: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
              }}
              className={styles.swiper}
            >
              {/* Hardcoded Data for Updates */}
            
              

              {updatesList.map((updates: any, index: number) => (
                  <SwiperSlide key={index} className={styles.swiperSlideCSS}>
                    <div className={styles.card}>
                      {/* Image */}
                      <Image
                        src={updates.imageSource}
                        alt={updates.imageAlt} // Fallback alt text
                        className={styles.cardImage}
                      />
                      {/* Card Content */}
                      <div className={styles.cardContent}>
                        <CardDate text={updates.date} />
                        <h3 className={`${styles.cardTitle} mt-2`}>
                          {updates.ctaText}
                        </h3>
                        <div className="pt-2">
                          <GradientBtn text={updates.ctaText} />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </Tab.Pane>}
        </Tab.Content>
      </Container>
    </section>
  );
}
