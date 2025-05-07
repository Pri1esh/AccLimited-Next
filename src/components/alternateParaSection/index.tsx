import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from './alternateParaSection.module.scss';
import { IAlternateCardsSection } from '@interfaces';
import { CustomImage, GradientBtn } from '@components';

export default function AlternateParaSection(props: IAlternateCardsSection) {
  const { compData } = props;
  const { fields } = compData;


  return (
    <section className={styles.alternateCardsSection}>
      <Container>
        {fields.map((field: any, index: number) => (
          <Row
            className={`g-5 ${styles.tile} ${index % 2 !== 0 ? styles.reverse : ''}`}
            key={index}
          >
            <Col md={6} className={styles.tileImage}>
              <Card className={styles.card}>
                <CustomImage compData={field} className={styles.cardImage} />
              </Card>
            </Col>
            <Col md={6} className={styles.tileContent}>
              <h3 className={styles.tileHead}>{field?.heading}</h3>
              <p className={styles.tileDesc}>{field?.subheading}</p>
              {field?.ctaText && <GradientBtn
                middle={false}
                text={field?.ctaText}
                target={field?.target}
                link={field?.ctaLink}
              />}
            </Col>
          </Row>
        ))}
      </Container>
    </section>
  );
}
