import { IcardDate } from "@interfaces";
import styles from "./cardDate.module.scss";
import { formateDate } from "@utils";

const CardDate = (props:IcardDate) => {
    const {text} = props;
  return (
    
    <span className={styles.cardDate}> {formateDate(text)} </span>
    
  );
};

export default CardDate;
