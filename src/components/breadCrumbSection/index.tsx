import styles from './breadCrumbSection.module.scss';
import { IBreadCrumbSection } from '@interfaces';
import { BreadCrumb } from '@components';

const BreadCrumbSection = (props: IBreadCrumbSection) => {
  const {  breadCrumbs } = props;

  return (
    <>
      <section className={styles.BannerInvestorSection}>
        <BreadCrumb compData={breadCrumbs} className={styles.breadCrumbs} />
      </section>
    </>
  );
};

export default BreadCrumbSection;
