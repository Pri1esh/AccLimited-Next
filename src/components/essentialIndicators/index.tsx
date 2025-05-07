import { Col, Row, Container } from 'react-bootstrap';

import styles from './essentialIndicators.module.scss';
import { RTE } from '@components';


export default function EssentialIndicators(props: any) {
  const { compData } = props;
  const {nameValuePairs} = compData || {};
  return (
    <section className={`${styles.essentialIndicators} st`}>
      <Container>
      <Row>
        {nameValuePairs?.map((item: any, index: number) => {
          const { name, value } = item || {};
          return (
            <Col key={index} md={6} lg={4} xl={3} className={`${styles.cardCol}`}>
              <div className={styles.cards}>
                <h4 className={styles.heading}>{name}</h4>
                <RTE compData={value} className={styles.desc} />
              </div>
            </Col>
          );
        })}
      </Row>
      </Container>
    </section>
  );
}
