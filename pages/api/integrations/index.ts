import type { NextApiRequest, NextApiResponse } from "next";
import { Database, Integration, KeyValue } from "../../../database";
import { IntegrationRequest } from "../../../features/integration";

interface IntegrationApiRequest extends NextApiRequest {
  body: IntegrationRequest;
}

export default function handler(
  _req: IntegrationApiRequest,
  res: NextApiResponse<Integration[]>
) {
  if (_req.method === "POST") {
    const { provider, fields } = _req.body;
    const id = Math.round(Math.random() * 1000 + 100).toString();
    // TODO: Add validation on what fields are sent and what values are being
    const settings = Object.keys(fields).map((key): KeyValue => {
      return { key, value: fields[key] };
    });
    Database.addIntegration({
      id,
      provider,
      settings
    });
    return res.status(200).end();
  }
  return res.status(200).json(Database.getIntegrations());
}
