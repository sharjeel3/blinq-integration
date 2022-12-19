export type Mapping = {
  key: string;
  map: {source: string; target: string;}[]
}

export type Field = {
  key: string;
  name: string;
}

export interface IntegrationProvider {
  name: string;
  description: string;
  imagePath: string;
  fields: Field[];
  provider: Providers;
  mappings?: Mapping;
  // add connectionString, connection parameters info etc, headers
  // ?scopes?
}

export enum Providers {
  Salesforce = "salesforce",
  Hubspot = "hubspot",
  Zapier = "zapier"
}

export const supportedProviders: IntegrationProvider[] = [
  {
    provider: Providers.Salesforce,
    name: "Salesforce",
    description: "All your contacts in Salesforce CRM",
    imagePath: "/logos/salesforce.svg",
    fields: [
      {key: "client_id", name: "Client id"},
      {key: "client_secret", name: "Client secret"}
    ]
  },
  {
    provider: Providers.Hubspot,
    name: "Hubspot",
    description: "Hubspot is the best free CRM",
    imagePath: "/logos/hubspot.svg",
    fields: [
      {key: "api_key", name: "API key"}
    ],
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
    fields: [
      {key: "tenant_domain", name: "Tenant domain"},
      {key: "client_id", name: "Client id"},
      {key: "client_secret", name: "Client secret"}
    ]
  }
];
