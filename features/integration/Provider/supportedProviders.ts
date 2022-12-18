export interface IntegrationProvider {
  name: string;
  description: string;
  imagePath: string;
}

export const supportedProviders: IntegrationProvider[] = [
  {
    name: "Salesforce",
    description: "All your contacts in Salesforce CRM",
    imagePath: "/logos/salesforce.svg"
  },
  {
    name: "Hubspot",
    description: "Hubspot is the best free CRM",
    imagePath: "/logos/hubspot.svg"
  },
  {
    name: "Zapier",
    description: "Unleash Zapier + Blinq",
    imagePath: "/logos/zapier.svg"
  }
];
