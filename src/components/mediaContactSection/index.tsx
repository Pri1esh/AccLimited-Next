import { Container, Row, Col } from 'react-bootstrap';
import { CustomImage, Image } from '@components';
import styles from './mediaContactSection.module.scss';
import { IMediaContactSection } from '@interfaces';

export default function MediaContactSection(props: IMediaContactSection) {
  const { compData } = props;
  const { fields } = compData;
  return (
    <Container className={`${styles.mediaContactSection} st`}>
      <Row className={`${styles.contactRow} g-5 w-100`}>
        <Col md={6} className={styles.textCol}>
          <div className={styles.contactDetails}>
            <Image src={fields?.emailIcon} alt={'Imag'} className={styles.contactIcon} />
            <a href={`mailto:${fields?.email}`} className={styles.email}>
              {fields?.email}
            </a>
          </div>
        </Col>
        <Col md={6} className={styles.imageCol}>
          <CustomImage compData={fields} className={styles.contactImage} />
        </Col>
      </Row>
    </Container>
  );
}
