import { FC, useEffect, useState } from 'react';
import { IntegrationProvider, Providers, supportedProviders } from "./supportedProviders";
import Image from "next/image";
import Link from "next/link";
import Card from "../../../ui-library/Card";
import Text from "../../../ui-library/Text";
import styles from "./Provider.module.scss";
import { Integration } from "../../../database";

export const Provider: FC = () => {
  const [linkedProviders, setLinkedProviders] = useState<Integration[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetch("/api/integrations")
        .then(res => res.json())
        .catch(); // TODO: Do something with the error

      setLinkedProviders(data);
    }
    load();
  }, [setLinkedProviders]);

  return (
    <>
      {supportedProviders.map((provider: IntegrationProvider) => {
        const isLinked = linkedProviders.filter(x => x.provider === provider.provider).length > 0;
        return (
          <Card center key={`${provider.name}${provider.description}`}>
            {isLinked && <div className={styles.checked}>
              <Image src="/check.svg" width={25} height={25} />
            </div>}
            <Link href="/">
              <a>
                <Image src={provider.imagePath} width={150} height={100} alt={provider.name} />
                <Text heading>{provider.name}</Text>
                <Text>{provider.description}</Text>
              </a>
            </Link>
          </Card>
        );
      })}
    </>
  );
};
