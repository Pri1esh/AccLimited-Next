import { Container } from 'react-bootstrap';
import styles from './breadCrumb.module.scss';
import { IBreadCrumb } from '@interfaces';
import Link from 'next/link';
export default function BreadCrumb(props: IBreadCrumb) {
  const { compData = { fields: [] }, className } = props;
  const { fields } = compData;

  return (
    <Container className={className}>
      <div className={styles.breadCrumbContainer}>
        {fields.length > 0 &&
          fields.map((crumb: any, index: number) => (
            <Link
              href={crumb?.url}
              key={index}
              className={index < fields?.length - 1 ? '' : styles.disallowed}
            >
              {crumb?.title}
            </Link>
          ))}
      </div>
    </Container>
  );
}
