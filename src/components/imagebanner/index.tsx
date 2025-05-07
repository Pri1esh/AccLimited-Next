import styles from './imagebanner.module.scss';
import {Image} from '@components';
import { IImageBanner } from '@interfaces';
import { BreadCrumb } from '@components';

const ImageBannerComponent = (props: IImageBanner) => {
  const { compData , breadCrumbs } = props;
  const { imageTitle, imageSource, imageAlt } = compData || {};


  return (
    <>
      <section className={styles.BannerInvestorSection}>
        <BreadCrumb compData={breadCrumbs} className={styles.breadCrumbs}/>
        {imageSource && <Image src={imageSource} alt={imageAlt} className={styles.InvestorImage} />}
        {imageTitle && <div className={`${styles.InvestorOverlayText} container`}>{imageTitle}</div>}
      </section>
    </>
  );
};

export default ImageBannerComponent;
