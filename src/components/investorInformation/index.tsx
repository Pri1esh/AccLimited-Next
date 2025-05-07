import { Container, Nav } from "react-bootstrap";
import styles from "./investorInformation.module.scss";
import { ILabelList } from "@interfaces";
import Link from 'next/link';


export default function InvestorInformation(props:ILabelList) {
  const { compData, showHeading=false } = props;
  const { heading="", ctas=[] } = compData;
  return (
    <section className={`${styles.investorSection} st`}>
      <Container>
        {showHeading && heading && <h2 className={styles.sectionTitle}>{heading}</h2>}
        <div className={styles.cardGrid}>
          {ctas.length>0 && ctas.map((item:any, index:number) => (
            <Nav.Link
              key={index}
              href={item?.ctaLink}
              className={styles.card}
              as={Link}
              target={item?.target}
            >
              <h2 className={styles.cardTitle}>{item?.ctaText}</h2>
            </Nav.Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
