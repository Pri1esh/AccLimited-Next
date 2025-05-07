import styles from './customHeading.module.scss';
import { Container } from 'react-bootstrap';
import { ICustomHeading } from '@interfaces';
import { RTE } from '@components';

const CustomHeading = (props: ICustomHeading) => {
  const { compData,h=1 } = props;
  const { subHeading="", heading, center=false } = compData || {};

  return (
    <>
      <section>
        <Container>
          {h==1 && <h1 className={`${styles.mainTitle} ${center ? 'text-center' : ''} mb-3`}>{heading}</h1>}
          {h==2 && <h2 className={`${styles.mainTitle} ${center ? 'text-center' : ''} mb-3`}>{heading}</h2>}
          {h==3 && <h3 className={`${styles.mainTitle} ${center ? 'text-center' : ''} mb-3`}>{heading}</h3>}
          
          {subHeading && <div className={styles.headerSection}>
            <div>{subHeading && <h2 className={styles.subTitle}>{<RTE compData={subHeading}/>}</h2>}</div>
           
          </div>}
        </Container>
      </section>
    </>
  );
};

export default CustomHeading;
