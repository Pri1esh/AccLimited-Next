import { Container, Row, Col } from "react-bootstrap";
import styles from "./dreamHomeSection.module.scss";
import { Image } from "@components";
import { useDeviceType } from '@utils';
import { GradientBtn } from "@components";
import { IHAmbujaHelp } from "@interfaces";

export default function DreamHomeSection(props:IHAmbujaHelp) {
  const {compData} = props;
  const { banners }= compData;

 
  const {deviceType} = useDeviceType();

  return (
    <section className={`${styles.dreamHomeSection}`}>
     { <Image src={banners?.[0]?.backgroundImage?.imageSource} alt="costBG" className={styles.overlayImage} />}
      <div className={styles.contentSustan}>
        <Container className={styles.container}>
          <Row className={styles.contentRow}>
            <Col md={6} className={`${styles.textContent} mb-2`}>
              <h2 className={styles.title}>
               {banners?.[0]?.heading}
              </h2>
              {banners && <p className={styles.description}>
              {banners?.[0]?.subHeading}
              </p>}
            {deviceType ==="desktop" && 
             
              <GradientBtn text={banners?.[0]?.ctaText} link={banners?.[0]?.ctaLink} />
            
            }
              
           
            {(deviceType==="mobile" || deviceType==="tabletVertical")  && 
            <GradientBtn text={"Visit Ambuja help"} link={banners?.[0]?.ctaLink} />
            }
            </Col>
            <Col md={6} className={styles.imageContent}>
              <div className={styles.imageWrapper}>
                <Image
                  src={banners?.[0]?.imageSource}
                  alt="Ambuja help logo"
                  className={styles.logo}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}
