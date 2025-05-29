import { Col, Container, Row } from 'react-bootstrap';
import styles from './underConstruction.module.scss';

const UnderConstruction = () => {
  return (
    <div className={styles.underConstruction}>
      <Container>
      <Row className="justify-content-center">
        <Col md={4} xl={3} xxl={4}>
          <img src={'/assets/images/under-construction.gif'} alt={'Page Under Construction'} className={styles.constructionImg} />
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default UnderConstruction;
