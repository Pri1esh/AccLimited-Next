import styles from './susTainabilityGrid.module.scss';
import { Container } from 'react-bootstrap';
import { CustomHeading, CustomImage } from '@components';
import { ISusGrid } from '@interfaces';
import Link from 'next/link';

const SustainabilityGrid = (props: ISusGrid) => {
  const { compData } = props;
  const { heading='', cards } = compData;


  return (
    <section className={`${styles.susSection}`}>
      <Container>
        {heading && <CustomHeading compData={{ heading }} />}
        <div className={styles.grid}>
          {cards.map((card:any, index:number) => (
            <div className={`${styles.card}`} key={index}>
              <Link href={card?.ctaLink}>
                <div className={styles.cardOverlay}>
                  <h2>{card?.ctaText}</h2>
                </div>
                <CustomImage compData={card} />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default SustainabilityGrid;
