import { NextRequest } from "next/server";

const OPENAI_URL = "api.openai.com";
const DEFAULT_PROTOCOL = "https";
const PORT = 80;
const PROTOCOL = process.env.PROTOCOL ?? DEFAULT_PROTOCOL;
const BASE_URL = process.env.BASE_URL ?? OPENAI_URL;
const BASE_PORT = process.env.BASE_PORT ?? PORT;

export async function requestOpenai(req: NextRequest) {
  const apiKey = req.headers.get("token");
  const openaiPath = req.headers.get("path");

  console.log("[Proxy] ", openaiPath);
  console.log(222);
  console.log(
    "Real url:",
    PROTOCOL + "://" + BASE_URL + ":" + BASE_PORT + "/" + openaiPath,
  );
  console.log("Real method:", req.method);
  //console.log('Real body:',req.body)

  return fetch(`${PROTOCOL}://${BASE_URL}:${BASE_PORT}/${openaiPath}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    method: req.method,
    body: req.body,
  });
}
