import styles from './gradientBtn.module.scss';
import { Button } from 'react-bootstrap';
import { IGradientBtn } from '@interfaces';
import Link from 'next/link';
const GradientBtn = (props: IGradientBtn) => {
  const { text,className , link = '', target = '', middle = true,onClick } = props;
  return (
    <>
      {link ? (
        <Link href={link} target={target} className={`${className} ${middle ? '' : styles.notmiddle}`}>
          <Button variant="primary" className={`rounded-pill ${styles.knowMoreBtn}`}>
            {text}
          </Button>
        </Link>
      ) : (
        <div className={`${className} ${middle ? '' : styles.notmiddle}`}>
          <Button variant="primary" className={`rounded-pill ${styles.knowMoreBtn}`} onClick={onClick}>
            {text}
          </Button>
        </div>
      )}
    </>
  );
};

export default GradientBtn;
