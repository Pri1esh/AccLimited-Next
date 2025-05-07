import { Container, Row, Col } from 'react-bootstrap';
import { ArrowRight } from 'lucide-react';
import styles from './investorCorporateGovernance.module.scss';
import Link from 'next/link';

// Importing unique images for each card

import { ICorporateGovernance } from '@interfaces';
import { CustomImage } from '@components';

export default function CorporateGovernance(props: ICorporateGovernance) {
  const { compData,showHeading=false } = props;
  const { heading="",cards } = compData;
  return (
    <section className={`${styles.governanceSection} st`}>
      <Container>
        {showHeading && heading && <h1 className={styles.sectionTitle}>{heading}</h1>}
        {cards.length>0 && (
          <Row className="g-4">
            {cards.map((card, index) => (
              <Col xs={12} sm={6} lg={4} key={index}>
                <Link className={styles.cardBox} href={card?.ctaLink}>
                  <div className={styles.card}>
                    <div className={styles.cardImage}>
                      <div className={styles.cardArrowLink}>
                        <ArrowRight className={styles.cardArrow} />
                      </div>
                      <CustomImage compData={card} />
                    </div>
                    <div className={styles.cardContent}>
                      <h2 className={styles.cardTitle}>{card.imageTitle}</h2>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
}
