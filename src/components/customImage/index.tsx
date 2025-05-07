import { ICustomImage } from '@interfaces';
import { useDeviceType } from '@utils';

const CustomImage = (props: ICustomImage) => {
  const { compData, className="", key="" } = props;
  const { imageSource="", imageSourceMobile="", imageSourceTablet="", imageAlt=""} = compData;
  const { deviceType } = useDeviceType();
  const baseURL = process.env.NEXT_PUBLIC_STAGING_LINK;

  return (
    <>
    {deviceType === "desktop" && <img src={baseURL+imageSource} alt={imageAlt} className={className} key={key}/>}
    {(deviceType === "tabletVertical" || deviceType === "tablet") && <img src={baseURL+(imageSourceTablet ? imageSourceTablet:imageSource)} alt={imageAlt} className={className} key={key}/>}
    {deviceType === "mobile" && <img src={baseURL+(imageSourceMobile ? imageSourceMobile:imageSource)} alt={imageAlt} className={className} key={key}/>}
    </>
  );
};

export default CustomImage;
