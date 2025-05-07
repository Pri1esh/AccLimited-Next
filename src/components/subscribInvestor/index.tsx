import { Container } from "react-bootstrap";
import styles from "./subscribInvestor.module.scss";
import { WhiteButton } from "@components";

export default function SubscribeInvestor() {
  return (
    <section className={styles.subscribeSection}>
      <Container className={styles.container}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.sectionTitle}>Subscribe to our Investor Updates</h2>
          {/* <button className={styles.subscribeButton}>Subscribe Now</button> */}
          <WhiteButton text={"Subscribe Now"} />
        </div>
      </Container>
    </section>
  );
}
