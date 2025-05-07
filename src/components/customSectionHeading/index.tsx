import styles from './customSectionHeading.module.scss';
import { Container } from 'react-bootstrap';
import { ICustomHeading } from '@interfaces';
import { GradientBtn } from '@components';

const CustomSectionHeading = (props: ICustomHeading) => {
  const { compData } = props;
  const { subheading="", heading,ctaText,target,ctaLink } = compData || {};


  return (
    <>
      <section className={styles.section}>
        <Container>
          <div className={styles.headerSection}>
          <h1 className={`${styles.mainTitle}`}>{heading}</h1>
          {ctaText && <GradientBtn text={ctaText} target={target} link={ctaLink}/>}
          </div>
          {subheading && <div className={styles.headerSection}>
            <div>{subheading && <h2 className={styles.subTitle}>{subheading}</h2>}</div>
           
          </div>}
        </Container>
      </section>
    </>
  );
};

export default CustomSectionHeading;
