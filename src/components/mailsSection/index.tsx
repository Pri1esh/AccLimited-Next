import { Container, Row, Col } from 'react-bootstrap';
import styles from './mailsSection.module.scss';
import { IEmails } from '@interfaces';
import { RTE } from '@components';

export default function MailsSection(props: IEmails) {
  const { compData, rteData} = props;
  const { nameValuePairs } = compData;

  return (
    <section className={`${styles.aboutUs} st`}>
      <Container className={styles.contactSection}>
        <Row>
          <Col md={6} className='mb-4'>
            <RTE compData={rteData?.rteComponentData}/>
          </Col>
          <Col md={6}>
            <div className='ps-sm-5'>
            {nameValuePairs?.map((contact: any, index: number) => (
              <div key={index} className={styles.contactItem}>
                <h2 className={styles.title}>{contact?.name}</h2>
                <div className={styles.emailLink}>
                  <RTE className={styles.mailRef} compData={contact?.value} />
                </div>
              </div>
            ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
