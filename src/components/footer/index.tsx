import { Container, Row, Col, Nav, Accordion } from 'react-bootstrap';
import styles from './footer.module.scss';
import { Image } from '@components';
import { IFooter } from '@interfaces';
import { CustomImage } from '@components';

export default function Footer(props: IFooter) {
  const { compData, mt=true } = props;
  const { footerData = {} } = compData;

  const { background, footerMainNavigations, socialLinks, logo, buCopyright } = footerData;


  return (
    <>
      {footerData && (
        <footer className={`${styles.footer} ${mt ? styles.mt : ''}`}>
          <section className={styles.footerWebView}>
            {/* <Image src={footerBg} alt="" className={styles.overlayImage} /> */}
           
            <CustomImage compData={background} className={styles.overlayImage}/>
            <div className={styles.contentFooter}>
              <Container>
                <Row className={styles.footerMenuRow}>
                  {footerMainNavigations?.[0] && (
                    <Col xs={5} md={6} lg={3} className={`mb-4`}>
                      {/* Parent Navigation Link */}
                      <Nav className={`flex-column`}>
                        <Nav.Link
                          href="#"
                          className={`p-0 mb-2 ${styles.navLink} fw-bold-footer`}
                        >
                          {footerMainNavigations?.[0]?.heading}
                        </Nav.Link>
                        {/* Sub-Navigation Links */}
                        <Nav.Item className={``}>
                          {footerMainNavigations?.[0]?.footerLinks.map(
                            (item: any, index: number) => (
                              <Nav.Link
                                key={index}
                                href={item?.link}
                                className={`p-0 mb-2 ${styles.navLink}`}
                                target={item?.target}
                              >
                                {item?.linkText}
                              </Nav.Link>
                            )
                          )}
                        </Nav.Item>
                      </Nav>
                    </Col>
                  )}

                  <Col xs={7} md={6} lg={3} className={`mb-4`}>
                    <Nav className={`flex-column`}>
                      {footerMainNavigations
                        ?.slice(1, footerMainNavigations.length - 1)
                        .map((menu: any, index: number) => (
                          <Nav.Link
                            key={index}
                            href={menu?.link}
                            className={`p-0 fw-bold-footer mb-3 ${styles.navLink}`}
                          >
                            {menu?.heading}
                          </Nav.Link>
                        ))}
                    </Nav>
                  </Col>

                  {footerMainNavigations?.[footerMainNavigations.length - 1] && (
                    <Col xs={5} md={6} lg={3} className={`mb-4`}>
                      {/* Parent Navigation Link */}
                      <Nav className={`flex-column`}>
                        <Nav.Link
                          href="#"
                          className={`p-0 mb-2 ${styles.navLink} fw-bold-footer`}
                        >
                          {footerMainNavigations?.[footerMainNavigations.length - 1]?.heading}
                        </Nav.Link>
                        {/* Sub-Navigation Links */}
                        <Nav.Item className={``}>
                          {footerMainNavigations?.[
                            footerMainNavigations.length - 1
                          ]?.footerLinks.map((item: any, index: number) => (
                            <Nav.Link
                              key={index}
                              href={item?.link}
                              className={`p-0 mb-2 ${styles.navLink}`}
                              target={item?.target}
                            >
                              {item?.linkText}
                            </Nav.Link>
                          ))}
                        </Nav.Item>
                      </Nav>
                    </Col>
                  )}

                  <Col xs={8} md={6} lg={3} className={`mb-4`}>
                    <div className={`mb-3 d-flex justify-content-center`}>
                      {socialLinks?.[0] &&
                        socialLinks[0]?.socialLinksLogos?.map((socialMenu: any, index: number) => (
                          <Nav.Link
                            key={index}
                            href={socialMenu.link}
                            target={socialMenu.target}
                            className={`p-2`}
                          >
                            <Image
                              src={socialMenu.iconImg}
                              alt={socialMenu.linkText}
                              className={styles.FooterSocialMediaLogo}
                            />
                          </Nav.Link>
                        ))}
                    </div>

                    {logo && (
                      <div className={`${styles.webFooterCementLogo} text-center`}>
                        <Image
                          src={logo?.imageSource}
                          alt={logo?.imageAlt}
                          className={`img-fluid ${styles.webFooterAmbujaLogo}`}
                        />
                      </div>
                    )}
                  </Col>
                </Row>
                {buCopyright && (
                  <Row className={`align-items-center ${styles.copyrightDiv}`}>
                    <Col xs={12} md={4} className={`text-center text-md-start mb-3 mb-md-0`}>
                      <small className={styles.small}>{buCopyright.subHeading}</small>
                    </Col>
                    <Col xs={12} md={8}>
                      <Nav
                        className={`justify-content-center justify-content-md-end ${styles.nav}`}
                      >
                        {buCopyright?.linkModels?.map((sitemapmenu: any, index: number) => (
                          <Nav.Link
                            key={index}
                            href="#"
                            className={`px-2 ${styles.navLink}`}
                          >
                            {sitemapmenu.linkText}
                          </Nav.Link>
                        ))}
                      </Nav>
                    </Col>
                  </Row>
                )}
              </Container>
            </div>
          </section>

          <section className={styles.footerMobileView}>
            <CustomImage
              compData={background}
              className={styles.overlayImage}
            />
            <div className={styles.contentMobileFooter}>
              <Container>
                <Accordion className={styles.mobileAccordion}>
                  {footerMainNavigations?.map((menu: any, index: number) => (
                    <Accordion.Item
                      eventKey={`${index}`}
                      key={index}
                    >
                      <Accordion.Header 
                      className={menu?.footerLinks && menu.footerLinks.length > 0
                        ? ""
                        : "nolist"}>
                        {menu?.link ? (
                          <Nav.Link
                            href={menu.link}
                            target={menu.target || '_self'}
                            rel={menu.target === '_blank' ? 'noopener noreferrer' : undefined}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {menu.heading}
                          </Nav.Link>
                        ) : (
                          menu.heading
                        )}
                      </Accordion.Header>

                      {menu?.footerLinks && menu.footerLinks.length > 0 && (
                        <Accordion.Body>
                          <Nav className="flex-column">
                            {menu.footerLinks.map((linkItem: any, linkIndex: number) => (
                              <Nav.Link
                                key={linkIndex}
                                href={linkItem.link || '#'}
                                target={linkItem.target || '_self'}
                                rel={
                                  linkItem.target === '_blank' ? 'noopener noreferrer' : undefined
                                }
                                className={`p-0 mb-2 ${styles.navLink}`}
                              >
                                {linkItem.linkText}
                              </Nav.Link>
                            ))}
                          </Nav>
                        </Accordion.Body>
                      )}
                    </Accordion.Item>
                  ))}
                </Accordion>

                <div className={`${styles.mobileSocialLinks} mb-4 mt-4`}>
                  <Nav className={`justify-content-center`}>
                    {socialLinks?.[0]?.socialLinksLogos?.map(
                      (socialMenuMobile: any, index: number) => (
                        <Nav.Link
                          key={index}
                          href={socialMenuMobile.link}
                          target={socialMenuMobile.target}
                          className="p-3"
                        >
                          <Image
                            src={socialMenuMobile.iconImg}
                            alt={socialMenuMobile.linkText || 'Social Link'}
                            className={styles.FooterSocialMediaLogo}
                          />
                        </Nav.Link>
                      )
                    )}
                  </Nav>
                </div>
                <div className={`${styles.mobileCopyright} mb-4`}>
                  {buCopyright && <p> {buCopyright.subHeading}</p>}
                  <Nav className={styles.bottomSitemap}>
                    {buCopyright?.linkModels?.map((sitemapmenu: any, index: number) => (
                      <Nav.Link
                        key={index}
                        href="#"
                        className={`px-2 ${styles.navLinkFooter}`}
                      >
                        {sitemapmenu.linkText}
                      </Nav.Link>
                    ))}
                  </Nav>
                </div>

                <div className={`${styles.footerCementLogo} mb-4`}>
                  {logo && (
                    <Image
                      src={logo?.imageSource}
                      alt={logo?.imageAlt}
                      className={`img-fluid ${styles.footerAmbujalogo}`}
                    />
                  )}
                </div>
              </Container>
            </div>
          </section>
        </footer>
      )}
    </>
  );
}
