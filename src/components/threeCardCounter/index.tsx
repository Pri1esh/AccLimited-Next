import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useCounter } from '@utils';
import { motion } from 'framer-motion';
import styles from './threeCardCounter.module.scss';
import { IThreeCardCounter, StatsCardProps } from '@interfaces';

function StatsCard({ title, subHeading }: StatsCardProps) {
  if (!isNaN(Number(subHeading))) {
    const value: number = subHeading;
    const [isVisible, setIsVisible] = useState(false);
    const count = useCounter({
      end: value,
      duration: 2000,
      start: 0,
    });

    useEffect(() => {
      setIsVisible(true);
    }, []);

    return (
      <motion.div
        className={styles.statsCard}
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        onViewportEnter={() => setIsVisible(true)}
      >
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.count}>{isVisible ? count : '0'}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.statsCard}
      whileInView={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.subHeading}>{subHeading}</div>
    </motion.div>
  );
}

export default function ThreeCountCards(props: IThreeCardCounter) {
  const { compData } = props;
  const { subHeadings } = compData;

  return (
    <Container>
      <div className={styles.statsContainer}>
        {subHeadings?.[0]?.nameValuePairs.length > 0 &&
          subHeadings?.[0]?.nameValuePairs?.map((item: any, index: number) => (
            <StatsCard title={item?.name} subHeading={item?.value} key={index} />
          ))}
      </div>
    </Container>
  );
}
