import { Container } from 'react-bootstrap';
import styles from './sustainabilityAWayOfLife.module.scss';
import { GradientBtn } from '@components';

export default function SustainabilityAWayOfLifeComponent() {
  return (
    <section className={styles.sustainabilitySection}>
      <Container>
        <div className={styles.content}>
          <h2 className={styles.title}>Sustainability a way of life</h2>
          <p className={styles.description}>
            ACC Cement's sustainable development initiatives cover a wide spectrum. From harnessing clean technology to
            using industrial wastes in cement production, energy conservation to deploying renewable energy and green
            energy, emissions reduction to creating institutionalised mechanisms to monitor environmental risks and
            strict adherence to the company's 'zero non-compliance' regime, Acc Cement's sustained efforts have helped
            ingrain the sustainability agenda in the company's DNA. All ACC Cements Limited plants are ISO 14001
            certified.
          </p>
          {/* <button className={styles.readMoreBtn}>
            Read More
          </button> */}

          {<GradientBtn text=" Read More" link="" />}
        </div>
      </Container>
    </section>
  );
}
