import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Provider from "../features/integration";
import { supportedProviders } from "../features/integration/Provider/supportedProviders";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blinq • Integrations</title>
        <meta name="description" content="Get Blinq to sync your contacts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Blinq</h1>
        <p className={styles.description}>Manage your integrations here</p>
        <div className={styles.grid}>
          <Provider supportedProviders={supportedProviders} />
        </div>
      </main>
    </div>
  );
};

export default Home;
