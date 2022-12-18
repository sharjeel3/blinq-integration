import { FC } from 'react';
import { IntegrationProvider, supportedProviders } from "./supportedProviders";
import Image from "next/image";
import styles from '../../../styles/Home.module.css';
import Link from "next/link";
import Card from "../../../ui-library/Card";
import Text from "../../../ui-library/Text";

export const Provider: FC = () => {
  return (
    <>
      {supportedProviders.map((provider: IntegrationProvider) => {
        return (
          <Card center key={`${provider.name}${provider.description}`}>
            <Link href="/">
              <a style={{display: "block"}}>
                <Image src={provider.imagePath} width={150} height={100} />
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
