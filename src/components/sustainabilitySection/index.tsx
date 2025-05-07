import { Container, Row, Col } from 'react-bootstrap';
import styles from './sustainabilitySection.module.scss';
import { CustomImage, Image } from '@components';
import { GradientBtn } from '@components';
import { IHSustainiblity } from '@interfaces';
import Link from 'next/link';

export default function SustainabilitySection(props: IHSustainiblity) {
  const { compData } = props;

  const { ctaLink, ctaText, heading, subHeading, sustainabilityCards, backgroundImage } = compData;

  return (
    <section className={styles.sustainabilitySection}>
      {backgroundImage && (
        <CustomImage
          compData={backgroundImage}
          className={styles.overlayImage}
        />
      )}

      <div className={styles.contentSustan}>
        <Container>
          {heading && <h2 className={styles.title}>{heading}</h2>}
          {subHeading && <p className={styles.description}>{subHeading}</p>}
          <Row className={styles.cardContainer}>
            {sustainabilityCards &&
              sustainabilityCards.map((sustainability: any, index: number) => (
                <Col md={3} sm={6} className={styles.cardColumn} key={index}>
                  <Link href={sustainability?.cta?.ctaLink}>
                    <div className={styles.card}>
                      <Image
                        src={sustainability.commonImageModel.imageSource}
                        alt={sustainability.commonImageModel.imageAlt}
                        className={styles.cardImage}
                      />

                      <div className={styles.cardOverlay}>
                        <h3 className={styles.cardTitle}>
                          {sustainability.commonImageModel.imageTitle}
                        </h3>
                        <div className={styles.ArrowDiv}>
                          <Image
                            src={sustainability.arrowImage}
                            className={styles.rightArrow}
                            alt="Arrow"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </Col>
              ))}
          </Row>

          <div className={styles.buttonContainer}>
            {/* <Button variant="primary" className={styles.viewReportsButton}>
            View Sustainability Reports
          </Button> */}
            <GradientBtn text={ctaText} link={ctaLink} target={ctaLink} />
          </div>
        </Container>
      </div>
    </section>
  );
}
