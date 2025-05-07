import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Container, Form } from 'react-bootstrap';
import styles from './plantMapSection.module.scss';
import {Image} from '@components';
import { IHPlant } from '@interfaces';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CustomHeading } from '@components';

export default function PlantMapSection(props: IHPlant) {
  const { compData } = props;
  const { map, ourPlantFeatureList, ourPlants } = compData;
  const { filters, mapLocationFilterData } = map?.data;
  const [hoveredShape, setHoveredShape] = useState<number | null>(null);
  const [selectedPlantType, setSelectedPlantType] = useState('All');
  const [filteredShapes, setFilteredShapes] = useState([]);
  const [shapeData, setshapeData] = useState([]);

  const getShape = (filter: string) => {
    let shape = '';
    filters.find((item: any) => {
      item?.name === filter ? (shape = item?.icon) : '';
    });
    return shape;
  };

  useEffect(() => {
    let shapeLocalData: any = [];
    mapLocationFilterData.map((item: any) => {
      item?.coordinatListsData.map((locs: any) => {
        shapeLocalData.push({
          type: locs?.type,
          class: `${styles.shape} ${styles[getShape(locs?.type)]} ${styles[item?.id]}`,
          tooltip: locs?.state,
          label: locs?.area,
          offset: { x: locs?.offsets?.x, y: locs?.offsets?.y },
        });
      });
    });
    setshapeData(shapeLocalData);
    setFilteredShapes(shapeData);
  }, []);

  // Filter shape data based on the selected plant type
  useEffect(() => {
    if (shapeData) {
      if (selectedPlantType === 'All') {
        setFilteredShapes(shapeData);
      } else {
        const filteredShapes = shapeData.filter((shape: any) => shape.type === selectedPlantType);
        setFilteredShapes(filteredShapes);
      }
    }
  }, [selectedPlantType, shapeData]);
  return (
    <>
      <section className={`${styles.plantAreaSection}`}>
        <Container className="pt-1 pb-3">
          <CustomHeading compData={{ heading: ourPlantFeatureList?.[0]?.title, center: true }} />
          {ourPlantFeatureList?.[0]?.subtitle && (
            <p className={styles.carouselSubtitle}>{ourPlantFeatureList?.[0]?.subtitle}</p>
          )}
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            spaceBetween={20}
            navigation={{
              nextEl: `.${styles.swiperButtonNext}`,
              prevEl: `.${styles.swiperButtonPrev}`,
            }}
            breakpoints={{
              100: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
            className={styles.swiper}
          >
            {ourPlantFeatureList?.[0]?.data.map((item: any, index: number) => (
              <SwiperSlide className={styles.swiperSlide} key={index}>
                <div className={styles.OurPlantRight}>
                  <div className={`${styles.plantCard}`}>
                    <h5 className={`${styles.plantTitle}`}>{item.subHeading}</h5>
                    <p className={styles.plantDescription}>{item.heading}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </section>
      <section className={`${styles.plantHomeSection}`}>
        <div className={styles.contentPlant}>
          <Container className={''}>
            {map && (
              <Image
                src={map.mapImage.imageSource}
                className={styles.overlayImage}
                alt={map.mapImage.imageAlt}
              />
            )}
            {filteredShapes.map((shape: any, index: number) => (
              <div key={index}>
                <div
                  className={styles.pointerShape}
                  style={{
                    transform: `translate(calc(-50% + (${shape?.offset?.x}px)), calc(-50% + (${shape?.offset?.y}px)))`,
                  }}
                >
                  <div
                    className={shape.class}
                    onMouseEnter={() => setHoveredShape(index)}
                    onMouseLeave={() => {
                      setHoveredShape(null);
                    }}
                  ></div>
                </div>
                {hoveredShape === index && (
                  <div
                    className={styles.customTooltip}
                    style={{
                      transform: `translate(calc(-50% + (${shape?.offset?.x}px)), calc(-50% - 35px + (${shape?.offset?.y}px)))`,
                    }}
                  >
                    <span className={styles.blueLabel}>{shape.label}</span>
                    <span className={styles.tooltipText}>{shape.tooltip}</span>
                  </div>
                )}
              </div>
            ))}

            <div className={styles.contentRow}>
              <div className={styles.textContent}>
                {ourPlants && <h4 className={styles.title}>{ourPlants.heading}</h4>}
                {ourPlants && <p className={styles.description}>{ourPlants.subHeading}</p>}
              </div>

              <div className={`${styles.selectboxwithButton} mb-1`}>
                <a href="#" className={styles.viewLink}>
                  Click to View
                </a>
                <Form.Select
                  defaultValue="All"
                  className={`${styles.selectList} mt-3`}
                  aria-label="Select Plant Type"
                  value={selectedPlantType}
                  onChange={(e) => setSelectedPlantType(e.target.value)}
                >
                  <option value="All">All</option>
                  {map?.data?.filters.map((item: any, index: number) => (
                    <option value={item.name} key={index}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </div>

              <div className={`${styles.listContainer} mb-3`}>
                <div className={`${styles.listColumn} me-3`}>
                  <ul className={styles.plantList}>
                    {map?.data?.mapLocationFilterData.map((item: any, index: number) => (
                      <li className={`${styles[item.id]}`} key={index}>
                        {item.id}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.listColumn}>
                  {
                    <ul className={styles.plantList1}>
                      {map?.data?.filters.map((item: any, index: number) => (
                        <li className={styles.BlendingUnit} key={index}>
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  }
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}
