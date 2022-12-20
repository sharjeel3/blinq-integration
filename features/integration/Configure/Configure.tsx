import type { FC } from "react";
import { useEffect } from "react";
import Button from "../../../ui-library/Button";
import TextInput from "../../../ui-library/TextInput";
import { useState } from "react";
import { useLinkedIntegrations } from "../useLinkedIntegrations/useLinkedIntegrations";
import {
  Field,
  IntegrationProvider,
  Providers
} from "../Provider/supportedProviders";
import styles from "./Configure.module.scss";

export type IntegrationRequest = {
  provider: Providers;
  fields: Record<string, string>;
};

type Props = {
  provider: Providers;
  supportedProviders: IntegrationProvider[];
};

export const ConfigureIntegration: FC<Props> = ({
  provider,
  supportedProviders
}) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [isLinked, setIsLinked] = useState<boolean>(false);
  const linkedSettings = useLinkedIntegrations();
  const providerConfig = supportedProviders.find(
    (x) => x.provider === provider
  );
  const linkedValues = linkedSettings.linkedProviders.find(
    (x) => x.provider === provider
  );

  useEffect(() => {
    setIsLinked(!!linkedValues);
    const v = providerConfig
      ? Object.assign(
          {},
          ...providerConfig.fields.map((field) => {
            const currentSettings = linkedValues?.settings.find(
              (x) => x.key === field.key
            );
            const currentVal = currentSettings ? currentSettings.value : "";
            return { [field.key]: currentVal || "" };
          })
        )
      : {};
    setValues(v);
  }, [providerConfig, linkedValues]);

  const handleChange = (key: string, val: string) => {
    setValues((values) => ({
      ...values,
      [key]: val
    }));
  };

  const disconnectLink = async () => {
    await fetch(`/api/integrations/${linkedValues?.id}`, {
      method: "DELETE"
    }).catch();
    if (linkedSettings.refresh) {
      linkedSettings.refresh();
    }
  };

  const saveLink = async () => {
    if (!providerConfig) return;

    const payload: IntegrationRequest = {
      provider: providerConfig?.provider,
      fields: values
    };
    await fetch(`/api/integrations`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).catch();
    if (linkedSettings.refresh) {
      linkedSettings.refresh();
    }
  };

  if (!providerConfig) {
    // Something went wrong.
    return <>Get me out of here!</>;
  }

  return (
    <div className={styles.root}>
      {providerConfig.fields.map((field: Field) => {
        return (
          <TextInput
            key={`${provider}${field.key}`}
            id={`${provider}${field.key}`}
            label={field.name}
            value={values[field.key] || ""}
            onChange={(val: string) => handleChange(field.key, val)}
          />
        );
      })}
      <Button
        primary
        onClick={() => {
          isLinked ? disconnectLink() : saveLink();
        }}
      >
        {isLinked ? "Disconnect" : "Save"}
      </Button>
    </div>
  );
};
