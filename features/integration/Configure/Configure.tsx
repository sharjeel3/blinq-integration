import type { FC } from "react";
import { useEffect } from "react";
import Button from "../../../ui-library/Button";
import { useRouter } from "next/router";
import TextInput from "../../../ui-library/TextInput";
import { useState } from "react";
import { useLinkedIntegrations } from "../useLinkedIntegrations/useLinkedIntegrations";
import { Field, supportedProviders } from "../Provider/supportedProviders";
import styles from "./Configure.module.scss";

export const ConfigureIntegration: FC = () => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [isLinked, setIsLinked] = useState<boolean>(false);
  const linkedSettings = useLinkedIntegrations();
  const router = useRouter();
  const { provider } = router.query;
  const providerConfig = supportedProviders.find(x => x.provider === provider);
  const linkedValues = linkedSettings.linkedProviders.find(x => x.provider === provider);

  useEffect(() => {
    const v = providerConfig ?
      Object.assign({},
        ...providerConfig.fields.map(field => {
          const currentSettings = linkedValues?.settings.find(x => x.key === field.key);
          setIsLinked(!!currentSettings);
          const currentVal = currentSettings ? currentSettings.value : "";
          return {[field.key]: currentVal || ""};
        })) : {};
    setValues(v);
  }, [providerConfig, linkedValues]);

  const handleChange = (key: string, val: string) => {
    setValues(values => ({
      ...values,
      [key]: val
    }));
  };

  const disconnectLink = async () => {
    await fetch(`/api/integrations/${linkedValues?.id}`, {
      method: "DELETE"
    })
      .catch();
    if (linkedSettings.refresh) {
      linkedSettings.refresh();
    };
  };

  const saveLink = () => {

  };

  if (!providerConfig) {
    // Something went wrong.
    return <>Get me out of here!</>;
  }

  return (
    <div className={styles.root}>
      {providerConfig.fields.map((field: Field) => {
        return (
          <TextInput key={`${provider}${field.key}`} id={`${provider}${field.key}`} label={field.name} value={values[field.key] || ""} onChange={(val: string) => handleChange(field.key, val)} />
        );
      })}
      <Button primary onClick={() => {isLinked ? disconnectLink() : saveLink()}}>{isLinked ? "Disconnect" : "Save"}</Button>
    </div>
  );
};
