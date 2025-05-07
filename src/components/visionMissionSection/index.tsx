import { Container, Row, Col } from 'react-bootstrap';
import styles from './visionMissionSection.module.scss';
import { IVisionSection } from '@interfaces';
import Link from 'next/link';
import { CustomImage, GradientBtn } from '@components';

export default function VisionMissionSection(props: IVisionSection) {
  const { compData } = props;
  const { cards } = compData;

  return (
    <div className={styles.visionBrandSection}>
      <Container>
        <Row className={`g-4 ${styles.visionMissionTile}`}>
          {cards.map((field: any, index: number) => (
            <Col md={6} key={index}>
              <Link href={field.ctaLink}>
                <div className={styles.card}>
                  <CustomImage
                    compData={field}
                    className={styles.cardImage}
                  />
                  {field?.ctaText && <GradientBtn text={field?.ctaText} link={field?.ctaLink} target={field?.target} />}
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
