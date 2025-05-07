import { Container } from "react-bootstrap";
import styles from "./rteData.module.scss";
import { RTE } from "@components";

export default function RteData(props: any) {
  const { compData } = props;
  const {rteComponentData} = compData;
  return (
    <section className={'st'}>
      <Container>
        <RTE compData={rteComponentData} className={styles.rteContainer}/>
      </Container>
    </section>
  );
}
