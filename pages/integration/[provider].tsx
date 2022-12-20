import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import { ConfigureIntegration } from "../../features/integration";
import TextLink from "../../ui-library/TextLink";
import {
  Providers,
  supportedProviders
} from "../../features/integration/Provider/supportedProviders";

const Provider: NextPage = () => {
  const router = useRouter();
  const { provider } = router.query;

  return (
    <div className={styles.container}>
      <Head>
        <title>Blinq • Integrations</title>
        <meta
          name="description"
          content={`Configure ${provider} integration`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <TextLink href={"/"}>{"< Go home"}</TextLink>
        <h1 className={styles.title}>{provider}</h1>
        <p className={styles.description}>Manage {provider} integration here</p>
        <div className={styles.grid}>
          <ConfigureIntegration
            provider={provider as unknown as Providers}
            supportedProviders={supportedProviders}
          />
        </div>
      </main>
    </div>
  );
};

export default Provider;
