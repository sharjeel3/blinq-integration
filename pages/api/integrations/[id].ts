import type { NextApiRequest, NextApiResponse } from "next";
import { Database, Integration } from "../../../database";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Integration | null>
) {
  const { id } = _req.query;
  if (!id || typeof id !== "string") {
    return res.status(400).end();
  }
  const integration = Database.getIntegrationById(id);

  if (typeof integration === "undefined")
    return res.status(404).end();

  if (_req.method === "DELETE") {
    Database.removeIntegration(id);
    return res.status(200).end();
  }

  return res.status(200).json(integration);
}
