import { IRTE } from '@interfaces';
import parse from 'html-react-parser';

const RTE = (props: IRTE) => {
  const { compData, className } = props;

  if (className) {
    return <div className={className}>{parse(compData)}</div>;
  }
  return <>{parse(compData)}</>;
};

export default RTE;
