import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import React from 'react';

import styles from './index.module.scss';

const Home = (): React.ReactElement => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.tagline}>
      <div className={styles.header}>
        <div className={styles['header--wrap']}>
          <img
            className={styles['header--imageLogo']}
            src={useBaseUrl('/img/logo.png')}
            alt="Verdaccio Logo"
          />
          <div className={styles['header--mt-2']}>
            <h1 className={styles['header--title']}>TuiHub</h1>
            <p className={styles['header--subtitle']}>
              高效率颓废，高质量颓废
            </p>
            <iframe
              src={
                'https://ghbtns.com/github-btn.html?user=tuihub&type=follow&size=large'
              }
              frameBorder="0"
              scrolling="0"
              width="160px"
              height="30px"
              style={{ marginTop: '8px' }}
            />
            <div className={styles['header--links']}>
              <a href="/docs/user" className="button button--primary button--lg">
                用户手册
              </a>
              <a href="/docs/developer" className="button button--secondary button--lg">
                开发文档
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
