import { Container, Table } from 'react-bootstrap';
import styles from './mendatoryCommittees.module.scss';
import { GradientBtn } from "@components";
import { ICommitteeMembers } from '@interfaces';

export default function MendatoryCommittees(props:ICommitteeMembers) {
  const {compData,headingl="Rating Agency",headingr="CRISIL Ratings"} = props;
  const {
    members,
    pdfDownload,
    buttontext="",
    sectionTitle,
  } = compData;
  const baseUrl = process.env.NEXT_PUBLIC_STAGING_LINK;
  
  return (
    <section className={styles.committeeSection}>
      
      <Container className={styles.committeeContainer}>
        {/* Header Section */}
        
        <div className={styles.headerSection}>
          <div>
           {sectionTitle && ( <h2 className={styles.subTitle}>{sectionTitle}</h2>)}
          </div>
          {buttontext && <GradientBtn text={buttontext} link={baseUrl + pdfDownload}/>}
        </div>

        {/* Table Section */}
        <div className={styles.tableWrapper}>
          <Table responsive bordered className={styles.committeeTable}>
            <thead>
              <tr>
                <th>{headingl}</th>
                <th>{headingr}</th>
              </tr>
            </thead>
            <tbody>
              {members && members?.map((member:any,index:number)=>(
                <tr key={index}>
                <td>{member?.name}</td>
                <td>{member?.role}</td>
              </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </section>
  );
}
