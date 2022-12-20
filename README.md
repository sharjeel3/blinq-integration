# Blinq Integration


## Solution Design

I went with a configuration-driven solution and had a good play with it. This POC shows that this approach could work in a production ready solution.

I have added a static configuration in front-end called `supportedProviders`. It contains a list of available integration providers and their field's information.

The form inputs such as `client_id` are driven by this configuration. 

The UI gets the saved integrations settings via an API request to `/api/integration`

For a production solution, I would consider putting this configuration in a single place in the back-end.

So for example, we could have JSON templates for each service provider such as.

- `hubspot.json`
- `salesforce.json`
- `zapier.json`

The template will look like this:

```json
{
    "provider": "p",
    "name": "n",
    "description": "d",
    "imagePath": "i",
    "fields": [
      { "key": "k", "name": "n" }
    ]
  }
```

The `/api/integration` endpoint should take all the configuration files and combine these in a single list. And also include the currently saved settings from the database. This way the React UI is driven by the back-end service and all the information is sent to the UI in a single request.

When we want to add a new service provider, it would require us to add a new JSON file for it.


## What's done

You can run this project locally with `yarn dev` and see it in action. This demo includes basic functionality such as:
- View integration providers
- View provider settings
- Save provider settings
- Disconnect a provider

I have taken the liberty to include the following bits to the project:
- SCSS support
- Testing support
- Prettier support


## What's for the future

- This POC does not perform much validations or error handling in a number of places.
- Tests need to be added/improved in a number of files.
- The styling is just enough to be useful.
- There are some TODO: comments in the code base which should be read in context of where they appear.
- In a large project, formik or similar might be required. However, it should be considered with pros and cons.
- `Yup` based form validations would be nice.
- Back-end mocks are super simple and aren't structured in a repository pattern.



----------------------------

# Blinq Fullstack Coding Challenge

Blinq wants to allow it's customers to integrate with third party services in order to sync their contact details with the third party service. Blinq has plans to integrate with dozens of services but for now we are going to start with three:

- Salesforce
- HubSpot
- Zapier

We need you to build out Blinq's Integration Settings page, which must meet the following requirements:

- Show the available integrations
- Support the fields listed by each integration partner
- Allow users to set up an integration by entering in the required information
- Allow users to disconnect an integration they have previously connected

An ideal solution should also be extensible so more integration partners can be added.

Each integration is different and will come with its own integration options. The following are the fields that are required for Blinq to connect to each integration partners API:

- Salesforce — `client_id` and `client_secret`
- Zapier — `api_key`
- HubSpot — `tenant_domain`, `client_id`, `client_secret` and `field_mappings`
  - HubSpot specifically requires Blinq to specify which fields the contact details should be mapped to. These may be like `first_name`, `last_name` or `hs_custom_field1234`.

## The Project Template

We have leveraged Next.js (a popular framework we love using here at Blinq) to set you up with a mock database, user interface and APIs in this project template. You should extend this codebase to complete the coding challenge.

## Getting Started

Setup by running `yarn` && `yarn dev`

## More information

- You do not need to actually sync the contacts with these external services
- You do not need to create actual database connections
