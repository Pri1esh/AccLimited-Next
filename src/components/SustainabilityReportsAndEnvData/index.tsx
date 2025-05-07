'use client';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './SustainabilityReportsAndEnvData.module.scss';
import CardImg from "../../assets/temp/Group 755.png";

export default function SustainabilityReportsAndEnvData() {
  return (
    <section className={styles.sustainabilitySection}>
      <Container>
        <Row className="g-4">
          {/* Sustainability Reports Card */}
          <Col md={6}>
            <a href="/sustainability-reports" className={styles.card}>
              <div className={styles.cardInner}>
                <img
                  src={CardImg.src} // Use .src when importing images dynamically in Next.js
                  alt="Sustainability Reports"
                  className={styles.cardImage}
                />
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>Sustainability Reports</h3>
                </div>
              </div>
            </a>
          </Col>

          {/* Environment Data Card */}
          <Col md={6}>
            <a href="/environment-data" className={styles.card}>
              <div className={styles.cardInner}>
                <img
                  src={CardImg.src} // Use .src here as well
                  alt="Environment Data"
                  className={styles.cardImage}
                />
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>Environment Data</h3>
                </div>
              </div>
            </a>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
