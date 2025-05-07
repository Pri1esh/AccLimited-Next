import { IDualBtns } from '@interfaces';
import styles from './stakeEngagementbtns.module.scss';
import { GradientBtn } from "@components";

export default function StakeEngagementbtns(props: IDualBtns) {
  const { compData } = props;
  const { ctas } = compData;

  return (
    <section className={styles.stakeEngagementbtns}>
      {ctas?.length > 0 && 
         <div className={styles.btnBox}>
          { ctas?.map((cta: any, index: number) => (
            <GradientBtn key={index} text={cta?.ctaText} link={cta?.ctaLink} target={cta?.target} className={styles.btns}/>
          ))}
         </div>
        }
    </section>
  );
}
