import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from './twoCardSection.module.scss';
import { ItwoCardSection } from '@interfaces';
import Link from 'next/link';
import { CustomImage } from '@components';

export default function TwoCardSection(props: ItwoCardSection) {
  const { compData } = props;
  const { cards } = compData;

  return (
    <div className={`${styles.visionBrandSection} st`}>
      <Container>
        <Row className="g-4">
          {cards?.map((field: any, index: number) => (
            <Col md={6} key={index} className={styles.cardContainer}>
              <Link href={field.ctaLink}>
                <Card className={styles.card}>
                  <CustomImage
                    compData={field}
                    className={styles.cardImage}
                  />
                  <Card.ImgOverlay className={styles.cardOverlay}>
                    <Card.Title className={styles.cardTitle}>{field.imageTitle}</Card.Title>
                  </Card.ImgOverlay>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
