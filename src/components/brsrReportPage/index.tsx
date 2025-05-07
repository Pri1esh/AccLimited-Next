'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from './brsrReportPage.module.scss';
import iconImage from '../../assets/icons/Group 655.png';
import { IBRSRReport } from '@interfaces';
import { CustomImage } from '@components';
import Link from 'next/link';

export default function BrsrReport(props: IBRSRReport) {
  const { compData } = props;
  const { cards } = compData;

  return (
    <section className={`${styles.reportContainer} st`}>
      <Container>
        <Row>
          {cards.length > 0 &&
            cards.map((card: any, index: number) => (
              <Col lg={4} md={6} className={styles.sectionCard} key={index}>
                <Card as={Link} href={card?.ctaLink} target={card?.target} className="text-decoration-none">
                  <div className={styles.cardImageContainer}>
                    <CustomImage compData={card} className={styles.cardImgTop}/>
                    <img src={iconImage.src} alt="Icon" className={styles.cardIconImage} />
                  </div>
                  <Card.Body>
                    <Card.Title className={styles.cardTitle}>{card?.imageTitle}</Card.Title>
                    <Card.Text className={styles.cardText}>{card?.ctaText}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </section>
  );
}
