import { Providers } from "../features/integration/Provider/supportedProviders";

export interface User {
  id: string;
  given_name: string;
  family_name: string;
  email: string;
}

export interface Contact {
  id: string;
  given_name: string;
  family_name: string;
  email: string;
  met_at_location: string;
  notes?: string;
}

type KeyValue = {
  key: string;
  value: string;
}

export interface Integration {
  id: string;
  provider: Providers;
  settings: KeyValue[];
}

export class Database {
  public static getUser(): User {
    return {
      id: "12345",
      given_name: "Jane",
      family_name: "Rose",
      email: "jane@blinq.me",
    };
  }

  public static getContacts(): Contact[] {
    return [
      {
        id: "1234",
        given_name: "Terry",
        family_name: "Walker",
        email: "terry@waffles.co",
        met_at_location: "Melbourne, Australia",
        notes: "Terry has a big blue beard.",
      },
      {
        id: "1235",
        given_name: "Santa",
        family_name: "Saint",
        email: "santa@dreams.co",
        met_at_location: "Melbourne, Australia",
        notes: "Santa gave me candy.",
      },
    ];
  }

  // Data store for Integrations
  static integrations: Integration[] = [
    {
      id: "123",
      provider: Providers.Salesforce,
      settings: [
        {key: "client_id", value: "SALESFORCE_CLIENT_ID"},
        {key: "client_secret", value: "SALESFORCE_CLIENT_SECRET"},
      ]
    }
  ];

  public static getIntegrations(): Integration[] {
    return Database.integrations;
  }

  public static getIntegrationById(id: string): Integration | undefined {
    return Database.integrations.find(i => i.id === id);
  }

  public static addIntegration(integration: Integration) {
    Database.integrations.push(integration);
  }

  public static removeIntegration(id: string) {
    const start = Database.integrations.map(i => i.id).indexOf(id);
    Database.integrations.splice(start, 1);
  }
}
