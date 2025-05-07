import styles from "./whiteButton.module.scss";
import { Button } from "react-bootstrap";
import { IWhiteButton } from "@interfaces";
import Link from 'next/link';
const WhiteButton = (props:IWhiteButton) => {
    const {
        text,
        link = ""
    } = props;
  return (
    <Link href={link}>
    <Button variant="primary" className={styles.subscribeButton}>{text}</Button>
    </Link>
  );
};

export default WhiteButton;
