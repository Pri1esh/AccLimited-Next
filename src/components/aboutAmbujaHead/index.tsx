import { Container } from 'react-bootstrap';
import { GradientBtn } from "@components";
import { IAboutAmbujaHead } from '@interfaces';
import styles from './aboutAmbujaHead.module.scss';


const AboutAmbujaHead = (props:IAboutAmbujaHead) => {
    const {  ctaLink="", ctaText, description } = props;
  return (
    <Container className={`pb-2 mb-5`}>
      <p className={`${styles.description} mb-4`}>{description}</p>
      <div className={'text-start'}>
        <GradientBtn text={ctaText} link={ctaLink}></GradientBtn>
      </div>
    </Container>
  );
};

export default AboutAmbujaHead;
