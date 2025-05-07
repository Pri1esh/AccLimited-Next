'use client';

// RegulatoryReports.js
import { Container, Row, Col } from 'react-bootstrap';
import styles from './tabCards.module.scss';
import { CustomHeading, Image, RTE } from '@components';
import { ITabCards } from '@interfaces';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TabCards(props: ITabCards) {
  const { compData } = props;
  const { heading, subHeadings } = compData;
  const [activeTab, setActiveTab] = useState<number>(0);
  const [tabContent, setTabContent] = useState<any>(subHeadings[0]?.nameValuePairs?.[0]?.value);
  return (
    <section className={styles.ScrollCards}>
      <Container>
        <CustomHeading h={2} compData={{ heading }} />
        <Row className="mb-4">
          {subHeadings[0]?.nameValuePairs?.length > 0 &&
            subHeadings[0]?.nameValuePairs?.map((card: any, index: number) => (
              <Col xl={3} md={12} className={`${styles.cols} mb-3 mt-3 mt-xl-0`} key={index}>
                <div
                  className={`${styles.ESGCard} ${activeTab === index ? styles.active : ''}`}
                  onClick={() => {
                    setTabContent(card?.value);
                    setActiveTab(index);
                  }}
                >
                  <div className={styles.ESGHead}>
                    <div className={styles.ESGdetail}>
                      <p className={styles.ESGInit}>{card?.name?.[0]}</p>
                      <p className={styles.ESGdetxt}>{card?.name}</p>
                    </div>
                    <div className={styles.ESGImg}>
                      <Image src={card?.icon} alt=""/>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </Container>

      <Container>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab} // Key ensures re-render on tab change
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <RTE compData={tabContent} />
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
