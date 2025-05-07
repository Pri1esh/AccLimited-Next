import { Accordion, Container } from 'react-bootstrap';
import styles from './accordionSection.module.scss';
import { IEmails } from '@interfaces';
import { RTE } from '@components';

export default function AccordionSection(props: IEmails) {
  const { compData } = props;
  const {  nameValuePairs } = compData;
  

  
  return (
    <section className={`${styles.aboutUs} st`}>
      <Container className={styles.contactSection}>
      <div className={styles.accordionWrapper}>
      {nameValuePairs.length>0 && <Accordion defaultActiveKey="0">
        {nameValuePairs.map((section:any,index:number) => (
          <Accordion.Item key={`${index}`} eventKey={`${index}`}>
            <Accordion.Header>{section?.name}</Accordion.Header>
            <Accordion.Body>
              <div className={`${styles.content} ${section.id === "registered" ? styles.addressContent : ""}`}>
                {<RTE compData={section?.value} className={styles.rte}/>}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>}
    </div>
      </Container>
    </section>
  );
}
