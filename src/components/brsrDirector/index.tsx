import { Container } from 'react-bootstrap';
import styles from './brsrDirector.module.scss';
import { IBRSRDirector } from '@interfaces';
import { CustomImage } from '@components';
export default function BRSRDirector(props: IBRSRDirector) {
  const { compData } = props;
  const { fields } = compData;


  return (
    <section className={`${styles.sustainabilitySection} st`}>
      <Container className={styles.container}>
       {fields?.heading && <h1 className={styles.title}>{fields?.heading}</h1>}
        
        <div className={styles.quoteSection}>
          {fields?.imageSource && <CustomImage 
            compData={fields}
            className={styles.profileImage}
          />}
          
          <div className={styles.quoteContent}>
            <blockquote className={styles.quote}>
              {fields?.subHeading}
            </blockquote>
            {fields?.imageTitle && <p className={styles.author}>{fields?.imageTitle.split(':')[0]}</p>}
            {fields?.imageTitle && <p className={styles.designation}>{fields?.imageTitle.split(':')[1]}</p>}
          </div>
        </div>

      </Container>
    </section>
  );
}

