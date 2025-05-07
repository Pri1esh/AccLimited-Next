import { Container } from 'react-bootstrap';
import styles from './boardOfDirectorPage.module.scss';
import { IBoardOfDirectorPage } from '@interfaces';
import { CustomImage, RTE } from '@components';
export default function BoardOfDirectorPage(props: IBoardOfDirectorPage) {
  const { compData } = props;
  const { BODLogo,RTEComponent } = compData;
  const LogoDetail = BODLogo?.fields;
  const RTEData = RTEComponent?.fields?.rteComponentData;

  return (
    <section className={styles.sustainabilitySection}>
      <Container className={styles.container}>
       {LogoDetail?.heading && <h1 className={styles.title}>{LogoDetail?.heading}</h1>}
        
        <div className={styles.quoteSection}>
          {LogoDetail?.imageSource && <CustomImage 
            compData={LogoDetail}
            className={styles.profileImage}
          />}
          
          <div className={styles.quoteContent}>
            <blockquote className={styles.quote}>
              {LogoDetail?.logoDescription}
            </blockquote>
            
            {/* <div className={styles.author}>
             {LogoDetail?.heading && <div className={styles.name}>Ajay Kapur</div>}
              {LogoDetail?.subHeading && <div className={styles.designation}>Whole Time Director and CEO</div>}
            </div> */}
          </div>
        </div>

        <RTE compData={RTEData} className={styles.description}/>
      </Container>
    </section>
  );
}

