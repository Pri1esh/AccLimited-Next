// RegulatoryReports.js
import { Container, Row, Col } from 'react-bootstrap';
import styles from './scrollCards.module.scss';
import { CustomHeading, Image } from '@components';
import { Play } from 'lucide-react';
import { IScrillCards } from '@interfaces';
import Link from 'next/link';

export default function ScrollCards(props: IScrillCards) {
  const { compData } = props;
  const { heading, thrustAreas } = compData;
  const baseURL = process.env.NEXT_PUBLIC_STAGING_LINK;
  
  return (
    <section className={styles.ScrollCards}>
      <Container>
        <CustomHeading compData={{ heading }} />
        <Row className="justify-content-center mb-4">
          {thrustAreas?.length > 0 &&
            thrustAreas?.map((card: any, index: number) => (
              <Col xs={12} lg={4} className={`${styles.cols} mb-3`} key={index}>
                <div className={styles.ESGCard}>
                  <div className={styles.ESGHead}>
                    <div className={styles.ESGdetail}>
                      <p className={styles.ESGInit}>{card?.title?.[0]}</p>
                      <p className={styles.ESGdetxt}>{card?.title}</p>
                    </div>
                    <div className={styles.ESGImg}>
                      <Image src={card?.iconUrl} />
                    </div>
                  </div>
                  <div className={styles.ESGMiddle}>
                    <ul className={styles.ESGlist}>
                      {card?.ctAs.length > 0 &&
                        card?.ctAs.map((item: any, index: number) => (
                          <li key={index}>
                            <Link href={baseURL+item?.link} target='_blank' className={item?.link ? '' : styles.disallowed} >
                              <Play
                                size={10}
                                color="black"
                                fill="black"
                                className={`${styles.play} me-2 mt-2`}
                              />
                              {item?.title}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    </section>
  );
}
