import styles from './customReadMoreSction.module.scss';
import { Container } from 'react-bootstrap';
import { ICustomHeading } from '@interfaces';
import { ReadMoreContent } from '@components';
import { useEffect } from 'react';

const CustomReadMoreSction = (props: ICustomHeading) => {
  const { compData } = props;
  const { subHeading = '', heading } = compData || {};

  useEffect(() => {
    if(subHeading){

    }
  },[]);

  return (
    <>
      <section>
        <Container>
          <h1 className={`${styles.mainTitle} mb-3`}>{heading}</h1>
          <div className={styles.headerSection}>
            <div>{subHeading && <ReadMoreContent maxLines={4} description={subHeading} className={styles.subTitle}/>}</div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default CustomReadMoreSction;
