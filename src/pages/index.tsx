import { useEffect, useState } from 'react';
import styles from '../styles/index.module.css';
import { fetchLaunches, LaunchWithPayload } from '../utils/spacex';

const IndexPage: React.FC = () => {
  const [launches, setLaunches] = useState<LaunchWithPayload[]>([]);

  useEffect(() => {

    fetchLaunches().then((data)=>setLaunches(data))
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Latest SpaceX Launches</h1>
      <div className={styles.launches}>
        {launches.map((launch) => (
          <div key={launch.id} className={styles.launchCard} data-testid="launch-card">
            <div className={styles.launchImageContainer}>
              <img src={launch.links.patch.small} alt="Patch" className={styles.launchImage} />
            </div>
            <div className={styles.launchDetails}>
              <h2 className={styles.launchName}>{launch.name}</h2>
              <p className={styles.launchDate}>Date: {launch.date_utc}</p>
              <p className={styles.launchCore}>First Core Serial: {launch.cores[0]?.core}</p>
              <p className={styles.launchPayload}>Payload ID: {launch.payloads[0]}</p>
              <p className={styles.launchPayload}>Payload Type: {launch.payloadType}</p>
              <p className={styles.launchSuccess}>Success: {launch.success ? 'Yes' : 'No'}</p>
              {launch.success === false && <p className={styles.failureReason}>Failure Reason: {launch.failures?.[0]?.reason}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
