'use client';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './boardOfDirector.module.scss';

import { CustomImage } from '@components';
import { IBODSection } from '@interfaces';
import Link from 'next/link';


export default function BoardOfDirectors(props: IBODSection) {
  const { compData } = props;
  const { heading, boardMembers } = compData;

  const formateDirectorName = (name: string) => {
    // Replace all variations sequentially
    return name
      .replace(/ MR /g, ' M.R. ')    // " MR " → " M.R. "
      .replace(/ Mr /g, ' Mr. ')     // " Mr " → " Mr. "
      .replace(/ Ms /g, ' Ms. ')      // " Ms " → " Ms. "
      .replace(/^MR /, 'M.R. ')       // Starts with "MR " → "M.R. "
      .replace(/^Mr /, 'Mr. ')        // Starts with "Mr " → "Mr. "
      .replace(/^Ms /, 'Ms. ');       // Starts with "Ms " → "Ms. "
  };

  return (
    <section className={`${styles.boardSection} st`}>
      <Container>
        {heading && <h1 className={styles.sectionTitle}>{heading}</h1>}
        <Row className="g-5 mb-5">
          {boardMembers.map((director: any, index: number) => (
            <Col key={index} xs={12} sm={6} lg={3}>
              <Link href={"/investors/board-of-directors/"+director?.name.replace(/ /g, '-')} className={styles.directorCardBox}>
                <div className={styles.directorCard}>
                  <div className={styles.cardContent}>
                    <div className={styles.profileImage}>
                      <CustomImage compData={director} />
                    </div>
                    {director?.name && <h3 className={styles.directorName}>{formateDirectorName(director?.name)}</h3>}
                    {director?.imageTitle && (
                      <p className={styles.directorTitle}>{director?.imageTitle}</p>
                    )}
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
