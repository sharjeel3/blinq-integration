// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
  if (_req.method === "DELETE") {
    Database.removeIntegration(id);
    res.status(200).end();
  } else {
    const integration = Database.getIntegrationById(id);
    if (integration) {
      return res.status(200).json(integration);
    }
    return res.status(404).end();
  }
}
