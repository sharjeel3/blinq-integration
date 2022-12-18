type Mapping = {
  key: string;
  map: {source: string; target: string;}[]
}

export interface IntegrationProvider {
  name: string;
  description: string;
  imagePath: string;
  fields: string[];
  provider: Providers;
  mappings?: Mapping;
  // add connectionString, connection parameters info etc, headers
  // scopes?
}

export enum Providers {
  Salesforce,
  Hubspot,
  Zapier
}

export const supportedProviders: IntegrationProvider[] = [
  {
    provider: Providers.Salesforce,
    name: "Salesforce",
    description: "All your contacts in Salesforce CRM",
    imagePath: "/logos/salesforce.svg",
    fields: ["client_id", "client_secret"]
  },
  {
    provider: Providers.Hubspot,
    name: "Hubspot",
    description: "Hubspot is the best free CRM",
    imagePath: "/logos/hubspot.svg",
    fields: ["api_key"],
    mappings: {
      key: "field_mappings",
      map: [
        {source: "given_name", target: "first_name"},
        {source: "family_name", target: "last_name"},
        {source: "met_at_location", target: "hs_custom_field123"},
      ]
    }
  },
  {
    provider: Providers.Zapier,
    name: "Zapier",
    description: "Unleash Zapier + Blinq",
    imagePath: "/logos/zapier.svg",
    fields: ["tenant_domain", "client_id", "client_secret"]
  }
];
