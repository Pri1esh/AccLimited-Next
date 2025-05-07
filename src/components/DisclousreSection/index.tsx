'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from './DisclousreSection.module.scss';
import { Image } from '@components';
import Link from 'next/link';
import { IDisclousreSection } from '@interfaces';

export default function DisclousreSection(props: IDisclousreSection) {
  const { compData } = props;
  const { pdFs, heading } = compData;

  return (
    <section className={`${styles.reportContainer} st`}>
      <Container>
        <h2 className={styles.heading}>{heading}</h2>
        <Row>
          {pdFs.length > 0 &&
            pdFs.map((card: any, index: number) => (
              <Col md={3} className={styles.sectionCard} key={index}>
                <Card
                  as={Link}
                  href={card?.pdfLink}
                  target={"_blank"}
                  className="text-decoration-none"
                >
                  <div className={styles.cardImageContainer}>
                    <Image src={card?.pdfIcon} alt="Icon" className={styles.cardIconImage} />
                  </div>
                  <Card.Body>
                    <Card.Title className={styles.cardTitle}>{card?.pdfName}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </section>
  );
}
