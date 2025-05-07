import { useState, useEffect } from 'react';
import { Nav, Dropdown, Container } from 'react-bootstrap';
import styles from './contactUsNavTab.module.scss';
import { ChevronDown } from 'lucide-react';
import { IContactNavTab } from '@interfaces';
import { RTE } from '@components';

const ContactUsNavTab = (props: IContactNavTab) => {
  const { compData } = props;
  const { fields } = compData;
  const [activeTab, setActiveTab] = useState(fields?.[0]?.id);
  const [details, setDetails] = useState<any>();
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    const details = fields?.find((type: any) => type?.id === activeTab)?.details;
    setDetails(details);
    setSelectedDepartment(details?.[0]?.loc);
  }, [activeTab]);

  return (
    <section className="st">
      <Container className="p-0">
        <div className={styles.navContainer}>
          <Nav variant="tabs" className={styles.navTabs}>
            {fields.length > 0 &&
              fields.map((region: any, reginonIndex: number) => (
                <Nav.Item className={styles.navItem} key={reginonIndex}>
                  <Nav.Link
                    className={styles.navLink}
                    active={activeTab === region?.id}
                    onClick={() => setActiveTab(region?.id)}
                  >
                    {region?.id}
                  </Nav.Link>
                </Nav.Item>
              ))}
          </Nav>

          {details && (
            <div className={styles.dropdownSection}>
              <Dropdown onSelect={(key) => setSelectedDepartment(key || '')}>
                <Dropdown.Toggle
                  className={styles.dropDown}
                  variant="light"
                  id="department-dropdown"
                >
                  <ChevronDown className={styles.downArr} />

                  {selectedDepartment || 'Select Department'}
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.dropDownMenu}>
                  {details.map((dept: any) => (
                    <Dropdown.Item
                      className={styles.dripDownItem}
                      key={dept?.loc}
                      eventKey={dept?.loc}
                    >
                      {dept?.loc}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              {selectedDepartment &&
                details?.find((locations: any) => locations?.loc == selectedDepartment) && (
                  <div className={styles.contactList}>
                    {details
                      ?.find((locations: any) => locations?.loc == selectedDepartment)
                      ?.contacts.map((contact: any, index: number) => (
                        <div key={index} className={styles.contactCard}>
                          {contact?.name && <RTE className={styles.cardHead} compData={contact?.name}/>}
                          <a href={`tel:${contact.phone}`} className={styles.phone}>{contact.phone}</a>
                          <a href={`mailto:${contact.email}`} className={styles.mail}>{contact.email}</a>
                        </div>
                      ))}
                  </div>
                )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default ContactUsNavTab;
