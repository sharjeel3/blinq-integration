import { useEffect, useRef, useState } from "react";
import { Integration } from "../../../database";

const fetchIntegrations = async () => {
  const data = await fetch("/api/integrations")
    .then((res) => res.json())
    .catch(); // TODO: Do something with the error
  return data;
};

type Linked = {
  linkedProviders: Integration[];
  refresh: (() => Promise<void>) | undefined;
};

export const useLinkedIntegrations = (): Linked => {
  const [linkedProviders, setLinkedProviders] = useState<Integration[]>([]);
  const refresh = useRef<() => Promise<void>>();

  useEffect(() => {
    const load = async () => {
      const data = await fetchIntegrations();
      setLinkedProviders(data);
    };
    refresh.current = load;
    load();
  }, [setLinkedProviders]);

  return { refresh: refresh.current, linkedProviders };
};
