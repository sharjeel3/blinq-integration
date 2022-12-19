import { FC, useEffect, useState } from 'react';
import { IntegrationProvider, Providers, supportedProviders } from "./supportedProviders";
import Image from "next/image";
import Link from "next/link";
import Card from "../../../ui-library/Card";
import Text from "../../../ui-library/Text";
import styles from "./Provider.module.scss";
import { useLinkedIntegrations } from "../useLinkedIntegrations/useLinkedIntegrations";

export const Provider: FC = () => {
  const linkedSettings = useLinkedIntegrations();

  return (
    <>
      {supportedProviders.map((provider: IntegrationProvider) => {
        const isLinked = linkedSettings.linkedProviders.filter(x => x.provider === provider.provider).length > 0;
        return (
          <Card center key={`${provider.name}${provider.description}`}>
            {isLinked && <div className={styles.checked}>
              <Image src="/check.svg" width={25} height={25} />
            </div>}
            <Link href={`/integration/${provider.provider}`}>
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
