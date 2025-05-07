import { IBrandStorySection } from '@interfaces';
import { Container } from 'react-bootstrap';
import { RTE } from '@components';
import styles from './brandStorySection.module.scss';

export default function BrandStorySection(props: IBrandStorySection) {
  const { compData } = props;
  const { fields } = compData;

  return (
    <Container>
      <RTE compData={fields?.rteComponentData} className={styles.rteSection}/>
    </Container>
  );
}
