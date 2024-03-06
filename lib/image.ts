import fs from "fs";
import { getPlaiceholder } from "plaiceholder";

export const getBase64Placeholder = async (path: string): Promise<string> => {
  const buffer = fs.readFileSync(path);
  const { base64 } = await getPlaiceholder(buffer);

  return base64;
};
