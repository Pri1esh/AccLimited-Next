'use client';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './header.module.scss';
import { Menu } from 'lucide-react';
import { Container, Row, Col, Navbar, Nav, Offcanvas, Accordion } from 'react-bootstrap';
import { useDeviceType } from '@utils';
import { IHeader } from '@interfaces';
import { CustomImage } from '@components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = (props: IHeader) => {
  const { compData } = props;
  const { logos = [], headerLinks = [] } = compData?.Header?.fields;
  const topHeaderLinks = compData?.HeaderTopList?.fields?.headerLinks;
  const bottomHeaderLinks = compData?.HeaderBottomList?.fields?.headerLinks;

  const { deviceType } = useDeviceType();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleOffcanvasClose = () => setShowOffcanvas(false);
  const handleOffcanvasShow = () => setShowOffcanvas(true);

  const isMobileOrTablet = deviceType === 'mobile' || deviceType === 'tabletVertical';

  const chunkArray = (array: any[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  return (
    <header className={`${styles.HeaderWrapper} FixedHeaderTop`}>
      <Navbar expand="lg" className={`${styles.NavTopClass} pb-2`}>
        <Container>
          <Row className={`align-items-center header-ambuja-cement ${styles.headerContainer}`}>
            <Col lg={2} className={`col-6 d-flex`}>
              {isMobileOrTablet && (
                <Menu
                  size={50}
                  className={`${styles.logoImgHamburger} p-2`}
                  onClick={handleOffcanvasShow}
                />
              )}
              <Navbar.Brand className={styles.leftLogo}>
                <Link href="/" className={styles.logoImg}>
                  {logos?.[0] && <CustomImage compData={logos?.[0]} className={styles.logoImg} />}
                </Link>
              </Navbar.Brand>
            </Col>

            <Col lg={8} className={`${styles.Menusection} text-center`}>
              <Row className={styles.HeaderMenu}>
                <Col xs={12}>
                  <Nav
                    className={`${styles.topMenu} justify-content-center TopMenuOnScroll ${
                      isScrolled ? styles.hiddenTopMenu : ''
                    }`}
                  >
                    {topHeaderLinks?.map((item: any, index: number) => {
                      const chunkedSubLinks = chunkArray(item?.headerSubLinks || [], 4);
                      return (
                        <Nav.Link
                          as="div"
                          className={styles.menuItem}
                          data-heading={item.headerLinkText}
                          key={index}
                        >
                          <Link
                            className={styles.menuItem}
                            href={item?.headerLink}
                            target={item?.target}
                          >
                            {item?.headerLinkText}
                          </Link>

                          {item.headerSubLinks?.length > 0 && (
                            <div className={styles.submenu}>
                              <Link href={item?.headerLink}>
                                <h4 className={styles.submenuHeading}>
                                  Explore {item.headerLinkText}
                                </h4>
                              </Link>
                              <hr className={styles.submenuDivider} />
                              <div className={styles.submenuColumns}>
                                {chunkedSubLinks.map((chunk, chunkIndex) => (
                                  <div key={chunkIndex} className={styles.submenuColumnGroup}>
                                    {chunk.map((subLink: any, subIndex: number) => (
                                      <div className={styles.submenuColumn} key={subIndex}>
                                        <Link
                                          href={subLink?.headerSubLink}
                                          target={subLink?.target}
                                        >
                                          {subLink?.headerSubLinkText}
                                        </Link>
                                      </div>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </Nav.Link>
                      );
                    })}
                  </Nav>
                </Col>

                <Col xs={12}>
                  <Nav className={`${styles.bottoMenu} justify-content-center`}>
                    {bottomHeaderLinks?.map((bottomItem: any, index: number) => {
                      const chunkedSubLinks = chunkArray(bottomItem?.headerSubLinks || [], 4);
                      return (
                        <Nav.Link className={styles.menuItem} key={index} as="div">
                          <Link
                            className={styles.menuItem}
                            href={bottomItem?.headerLink}
                            target={bottomItem?.target}
                          >
                            {bottomItem.headerLinkText}
                          </Link>

                          {bottomItem.headerSubLinks?.length > 0 && (
                            <div className={styles.submenu}>
                              <Link href={bottomItem?.headerLink}>
                                <h4 className={styles.submenuHeading}>
                                  Explore {bottomItem.headerLinkText}
                                </h4>
                              </Link>
                              <hr className={styles.submenuDivider} />
                              <div className={styles.submenuColumns}>
                                {chunkedSubLinks.map((chunk, chunkIndex) => (
                                  <div key={chunkIndex} className={styles.submenuColumnGroup}>
                                    {chunk.map((subLink: any, subIndex: number) => (
                                      <div className={styles.submenuColumn} key={subIndex}>
                                        <Link
                                          href={subLink?.headerSubLink}
                                          target={subLink?.target}
                                        >
                                          {subLink?.headerSubLinkText}
                                        </Link>
                                      </div>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </Nav.Link>
                      );
                    })}
                  </Nav>
                </Col>
              </Row>
            </Col>

            <Col lg={2} className={`${styles.RightLogoHeader} text-right col-6`}>
              <Navbar.Brand href="#" className={styles.rightLogo}>
                {logos?.[1] && (
                  <CustomImage compData={logos?.[1]} className={styles.logoImgAdaniCement} />
                )}
              </Navbar.Brand>
            </Col>
          </Row>
        </Container>
      </Navbar>

      <Offcanvas
        show={showOffcanvas}
        onHide={handleOffcanvasClose}
        placement="start"
        className={styles.mobileSideBar}
      >
        <Offcanvas.Header closeButton>
          {logos?.[0] && <CustomImage compData={logos?.[0]} className={styles.logoImgSidebar} />}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Accordion className={styles.offcanvasAccordion}>
            {headerLinks.map((item: any, index: number) => (
              <Accordion.Item
                eventKey={index.toString()}
                className={styles.accordionItem}
                key={index}
              >
                {!item?.headerSubLinks?.length ? (
                  <h2 className={`${styles.noDropHead} accordion-header`}>
                    <Link href={item?.headerLink}>
                      <button
                        type="button"
                        className={`${styles.noDropBtn} ${
                          pathname?.includes(item?.headerLink) && item?.headerLink
                            ? styles.on
                            : ''
                        }`}
                      >
                        {item.headerLinkText}
                      </button>
                    </Link>
                  </h2>
                ) : (
                  <>
                    <Accordion.Header>
                      <Link
                        className={`${styles.nodecoration} ${
                          pathname?.includes(item?.headerLink) && item?.headerLink
                            ? styles.on
                            : ''
                        }`}
                        href={item?.headerLink}
                      >
                        {item.headerLinkText}
                      </Link>
                    </Accordion.Header>
                    <Accordion.Body>
                      {item?.headerSubLinks.map((subLink: any, subIndex: number) => (
                        <Nav.Link
                          as={Link}
                          href={subLink?.headerSubLink}
                          target={subLink?.target}
                          className={`${styles.submenuLink} ${
                            subLink?.headerSubLink === pathname ? styles.on : ''
                          }`}
                          key={subIndex}
                        >
                          {subLink?.headerSubLinkText}
                        </Nav.Link>
                      ))}
                    </Accordion.Body>
                  </>
                )}
              </Accordion.Item>
            ))}
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
};

export default Header;
