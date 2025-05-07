import styles from "./investorServices.module.scss";
import CardImage1 from "../../assets/temp/Group 682.png";
import CardImage2 from "../../assets/temp/Group 683.png";
import CardImage3 from "../../assets/temp/Group 684.png";
import CardImage4 from "../../assets/temp/Group 685.png";
import { Container } from "react-bootstrap";

export default function InvestorServices() {
  return (
    <section className={styles.investorServicesSection}>
      <Container>
        <div className={styles.cardWrapper}>
          {/* Card 1 */}
          <div className={styles.card}>
            <div
              className={styles.imageWrapper}
              style={{ backgroundImage: `url(${CardImage1})` }}
            >
              <h3 className={styles.cardTitle}>Investor Services</h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className={styles.card}>
            <div
              className={styles.imageWrapper}
              style={{ backgroundImage: `url(${CardImage2})` }}
            >
              <h3 className={styles.cardTitle}>
                Transfer of unpaid and unclaimed dividends and shares to IEPF
              </h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className={styles.card}>
            <div
              className={styles.imageWrapper}
              style={{ backgroundImage: `url(${CardImage3})` }}
            >
              <h3 className={styles.cardTitle}>Dispute Resolution Mechanism</h3>
            </div>
          </div>

          {/* Card 4 */}
          <div className={styles.card}>
            <div
              className={styles.imageWrapper}
              style={{ backgroundImage: `url(${CardImage4})` }}
            >
              <h3 className={styles.cardTitle}>Investor Services</h3>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
