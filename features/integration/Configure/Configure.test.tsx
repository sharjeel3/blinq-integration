import { render, waitFor } from "@testing-library/react";

import { ConfigureIntegration } from "./Configure";
import { IntegrationProvider, Providers } from "../Provider/supportedProviders";
import userEvent from "@testing-library/user-event";

describe("ConfigureIntegration", () => {
  let supportedProviders: IntegrationProvider[];

  beforeEach(() => {
    supportedProviders = [
      {
        provider: Providers.Salesforce,
        name: "Test Salesforce",
        description: "Test All your contacts in Salesforce CRM",
        imagePath: "/logos/salesforce.svg",
        fields: [
          { key: "client_id", name: "Client id" },
          { key: "client_secret", name: "Client secret" }
        ]
      },
      {
        provider: Providers.Hubspot,
        name: "Test Hubspot",
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

  describe("when service is linked", () => {
    it("should show disconnect button", async () => {
      // Arrange
      const screen = render(
        <ConfigureIntegration
          supportedProviders={supportedProviders}
          provider={Providers.Salesforce}
        />
      );

      // Assert
      await waitFor(() =>
        expect(screen.getByRole("button", { name: "Disconnect" })).toBeVisible()
      );
    });

    it("should show client id input and value", async () => {
      // Arrange
      const screen = render(
        <ConfigureIntegration
          supportedProviders={supportedProviders}
          provider={Providers.Salesforce}
        />
      );

      // Assert
      expect(await screen.findByLabelText("Client id")).toBeVisible();
      expect(
        await screen.findByDisplayValue("SALESFORCE_CLIENT_ID")
      ).toBeVisible();
    });

    it("should show client secret input and value", async () => {
      // Arrange
      const screen = render(
        <ConfigureIntegration
          supportedProviders={supportedProviders}
          provider={Providers.Salesforce}
        />
      );

      // Assert
      expect(await screen.findByLabelText("Client secret")).toBeVisible();
      expect(
        await screen.findByDisplayValue("SALESFORCE_CLIENT_SECRET")
      ).toBeVisible();
    });

    describe("when disconnect button is clicked", () => {
      it("should disconnect integration", async () => {
        // Arrange
        const screen = render(
          <ConfigureIntegration
            supportedProviders={supportedProviders}
            provider={Providers.Salesforce}
          />
        );
        const user = userEvent.setup();

        // Act
        await user.click(
          await screen.findByRole("button", { name: "Disconnect" })
        );

        // Assert
        expect(fetch).toHaveBeenCalledWith("/api/integrations/123", {
          method: "DELETE"
        });
      });
    });
  });

  describe("when service is not linked", () => {
    it("should show save button", async () => {
      // Arrange
      const screen = render(
        <ConfigureIntegration
          supportedProviders={supportedProviders}
          provider={Providers.Hubspot}
        />
      );

      // Assert
      await waitFor(() =>
        expect(screen.getByRole("button", { name: "Save" })).toBeVisible()
      );
    });

    describe("when save button is clicked", () => {
      it("should save integration", async () => {
        // Arrange
        const screen = render(
          <ConfigureIntegration
            supportedProviders={supportedProviders}
            provider={Providers.Hubspot}
          />
        );
        const user = userEvent.setup();

        // Act
        await user.click(await screen.findByRole("button", { name: "Save" }));

        // Assert
        expect(fetch).toHaveBeenCalledWith(
          "/api/integrations",
          expect.objectContaining({
            method: "POST",
            body: '{"provider":"hubspot","fields":{"api_key":""}}'
          })
        );
      });
    });
  });
});
