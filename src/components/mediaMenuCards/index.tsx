import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from './mediaMenuCards.module.scss';
import { IMediaMenuCards } from '@interfaces';
import { CustomImage } from '@components';
import Link from 'next/link';

export default function MediaMenuCards(props: IMediaMenuCards) {
  const { compData } = props;
  const { cards } = compData;
  return (
    <section className={styles.mediaCardSection}>
      <Container className={`${styles.mediaSection}`}>
      <Row className="g-4 justify-content-center">
        {cards.map((card: any, index: number) => (
          <Col key={index} xs={12} sm={6} lg={4} >
            <Link href={card?.ctaLink}>
              <Card className={`${styles.mediaCard}`}>
                <div className={styles.imageWrapper}>
                  <CustomImage compData={card} className={styles.cardImage} />
                  <div className={styles.overlay} />
                  <Card.ImgOverlay className={styles.contentWrapper}>
                    <Card.Title className={styles.title}>{card?.ctaText}</Card.Title>
                  </Card.ImgOverlay>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  
    </section>
    );
}
