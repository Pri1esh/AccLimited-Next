'use client';

import { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import { GradientBtn, Image } from '@components';
import styles from './investorPresentationPage.module.scss';
import { IInvestorPresentation } from '@interfaces';
import { formateDate } from '@utils';

export default function InvestorPresentationMainPage(props: IInvestorPresentation) {
  const [showAll, setShowAll] = useState(false);
  const { compData, commonData } = props;
  const [selectedYear, setSelectedYear] = useState('');
  const [yearData, setYearData] = useState<any>(null);
  const [visiblePresentations, setVisiblePresentations] = useState<any>(null);

  const { heading, subHeading } = commonData;
  const baseURL = process.env.NEXT_PUBLIC_STAGING_LINK;
  const loadMoreItems = 6;

  const handleLoadMore = () => {
    setShowAll(true);
  };

  const handleLoadLess = () => {
    setShowAll(false);
  };

  useEffect(() => {
    if (compData && compData.length > 0) {
      setSelectedYear(compData[0]?.year);
    }
  }, [compData]);

  useEffect(() => {
    if (selectedYear) {
      findYearData(selectedYear);
    }
  }, [selectedYear]);

  useEffect(() => {
    if (yearData) {
      if (showAll) {
        setVisiblePresentations(yearData?.presentations);
      } else {
        setVisiblePresentations(yearData?.presentations?.slice(0, loadMoreItems));
      }
    }
  }, [showAll, yearData]);

  const findYearData = (year: string) => {
    const data = compData?.find((item: any) => item?.year === year);
    setYearData(data || null);
  };

  return (
    <section className={`${styles.investorSection} st`}>
      <Container>
        <div className={styles.header}>
          {heading && <h1 className={styles.title}>{heading}</h1>}
          {subHeading && <h4 className={styles.subTitle}>{subHeading}</h4>}

          <Form.Group className={styles.yearSelector}>
            <Form.Label className="mx-2 t-bold">Year</Form.Label>
            <Form.Select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
              }}
            >
              {compData.map((years: any, index: number) => (
                <option value={years?.year} key={index}>
                  {years?.year}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
      </Container>

      <div className={styles.cardContainer}>
        {yearData?.presentations && (
          <Container>
            <div className={styles.cardGrid}>
              {visiblePresentations?.map((presentation: any, index: number) => (
                <div key={index} className={styles.card}>
                  <h3 className={styles.cardTitle}>{presentation?.pdf?.pdfName}</h3>
                  {presentation?.date && (
                    <p className={styles.cardDate}>{formateDate(presentation?.date)}</p>
                  )}
                  <div className={styles.cardLinks}>
                    {presentation?.audioLink && (
                      <a href={baseURL + presentation?.audioLink} className={styles.link}>
                        <Image src={presentation?.audioIcon} alt="Audio" />
                        {presentation?.audiotext}
                      </a>
                    )}
                    {presentation?.pdf?.pdfLink && (
                      <a href={baseURL + presentation?.pdf?.pdfLink} className={styles.link}>
                        <Image src={presentation?.pdf?.pdfIcon} alt="PDF" />
                        PDF
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        )}
      </div>
      {yearData?.presentations?.length > loadMoreItems && (
        <div className={styles.buttonContainer}>
          {!showAll ? (
            <GradientBtn text={'Load More'} onClick={handleLoadMore} />
          ) : (
            <GradientBtn text={'Load Less'} onClick={handleLoadLess} />
          )}
        </div>
      )}
    </section>
  );
}
