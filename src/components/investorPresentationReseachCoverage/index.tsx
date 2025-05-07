'use client';

import { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import styles from './investorPresentationReseachCoverage.module.scss';
import { GradientBtn } from '@components';
import { IResearchCoverage } from '@interfaces';

export default function InvestorPresentationResearchCoverageSection(props: IResearchCoverage) {
  const { compData } = props;
  const [showAll, setShowAll] = useState(false);
  const [displayData, setDisplayData] = useState<any>(null);

  const loadMoreItems = 9;

  const handleLoadMore = () => {
    setShowAll(true);
  };

  const handleLoadLess = () => {
    setShowAll(false);
  };

  useEffect(() => {
    if (compData?.members?.length) {
      setDisplayData(compData?.members?.slice(0, loadMoreItems));
    }
  }, [compData]);

  useEffect(() => {
    if (showAll) {
      setDisplayData(compData?.members);
    } else {
      setDisplayData(compData?.members?.slice(0, loadMoreItems));
    }
  }, [showAll]);

  return (
    <section className={`${styles.ResearchCoverageSection} st`}>
      <Container className={styles.committeeContainer}>
        <h2 className={styles.title}>{compData?.sectionTitle}</h2>

        {displayData && (
          <div className={styles.tableWrapper}>
            <Table striped hover responsive className={styles.table}>
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Analyst Name</th>
                  <th>Firm Name</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((item: any, index: number) => (
                  <tr className="presentationTable" key={item.id}>
                    <td>{index}</td>
                    <td>{item.name}</td>
                    <td>{item.role}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {compData?.members?.length > loadMoreItems && (
          <div className={styles.buttonContainer}>
            {!showAll ? (
              <GradientBtn text={'Load More'} onClick={handleLoadMore} />
            ) : (
              <GradientBtn text={'Load Less'} onClick={handleLoadLess} />
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
