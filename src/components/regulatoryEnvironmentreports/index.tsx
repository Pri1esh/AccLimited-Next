// RegulatoryReports.js
import { Form, Container, Row, Col } from 'react-bootstrap';
import styles from './regulatoryEnvironmentreports.module.scss';
import { GradientBtn } from "@components";

export default function RegulatoryReports() {
  return (
    <section className={styles.RegulatoryReportsSection}>
      <Container>
        <h2 className={styles.Title}>Regulatory Environment Reports</h2>
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={3} className="mb-3">
            <Form.Select className={styles.Select} aria-label="Select a State">
              <option>Select a State</option>
              <option value="1">State 1</option>
              <option value="2">State 2</option>
            </Form.Select>
          </Col>
          <Col xs={12} md={3} className="mb-3">
            <Form.Select className={styles.Select} aria-label="Select a Plant">
              <option>Select a Plant</option>
              <option value="1">Plant 1</option>
              <option value="2">Plant 2</option>
            </Form.Select>
          </Col>
          <Col xs={12} md={3} className="mb-3">
            <Form.Select className={styles.Select} aria-label="Select Document Type">
              <option>Select Document Type</option>
              <option value="1">Type 1</option>
              <option value="2">Type 2</option>
            </Form.Select>
          </Col>
          <Col xs={12} md={3} className="mb-3">
            <Form.Select className={styles.Select} aria-label="Select a Document">
              <option>Select a Document</option>
              <option value="1">Document 1</option>
              <option value="2">Document 2</option>
            </Form.Select>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3 mb-3">
        <Col xs={12} md={3} className="mb-3">
        {/* <Button className={styles.DownloadButton}>Download</Button> */}
        <GradientBtn text={"Download"} link={""} />
          </Col>
         
        </Row>
      </Container>
    </section>
  );
}
