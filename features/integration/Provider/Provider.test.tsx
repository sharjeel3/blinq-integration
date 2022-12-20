import { Provider } from "./Provider";
import { IntegrationProvider, Providers } from "./supportedProviders";
import { act, render, waitFor } from "@testing-library/react";

describe("Provider", () => {
  let supportedProviders: IntegrationProvider[];
  const salesForce = "Test Salesforce";
  const hubspot = "Test Hubspot";

  beforeEach(() => {
    supportedProviders = [
      {
        provider: Providers.Salesforce,
        name: salesForce,
        description: "Test All your contacts in Salesforce CRM",
        imagePath: "/logos/salesforce.svg",
        fields: [
          { key: "client_id", name: "Client id" },
          { key: "client_secret", name: "Client secret" }
        ]
      },
      {
        provider: Providers.Hubspot,
        name: hubspot,
        description: "Test Hubspot is the best free CRM",
        imagePath: "/logos/hubspot.svg",
        fields: [{ key: "api_key", name: "API key" }]
      }
    ];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: "123",
              provider: Providers.Salesforce,
              settings: [
                { key: "client_id", value: "SALESFORCE_CLIENT_ID" },
                { key: "client_secret", value: "SALESFORCE_CLIENT_SECRET" }
              ]
            }
          ])
      })
    ) as jest.Mock;
  });

  it("should show image", async () => {
    const screen = render(<Provider supportedProviders={supportedProviders} />);
    expect(await screen.findByAltText(salesForce)).toBeVisible();
  });

  it("should show hyperlink", async () => {
    const screen = render(<Provider supportedProviders={supportedProviders} />);
    expect(
      await screen.findByRole("link", { name: new RegExp(salesForce) })
    ).toBeVisible();
  });

  describe("when service is linked", () => {
    it("should show checked icon", async () => {
      const screen = render(
        <Provider supportedProviders={supportedProviders} />
      );
      expect(await screen.findByAltText(`linked ${salesForce}`)).toBeVisible();
    });
  });

  describe("when service is not linked", () => {
    it("should not show checked icon", async () => {
      const screen = render(
        <Provider supportedProviders={supportedProviders} />
      );
      await waitFor(() =>
        expect(screen.queryByAltText(`linked ${hubspot}`)).toBeNull()
      );
    });
  });
});
