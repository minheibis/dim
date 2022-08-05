import { ensureDirSync, ky } from "../deps.ts";
import { DEFAULT_DATAFILES_PATH } from "./consts.ts";

export class Downloader {
  async download(
    url: URL,
    name: string,
    headers?: Record<string, string>,
  ): Promise<string> {
    const splitedURLPath = url.pathname.split("/");
    const dir = `${DEFAULT_DATAFILES_PATH}/${name}`;
    const fileName = splitedURLPath[splitedURLPath.length - 1];
    ensureDirSync(dir);
    const response = await ky.get(url, { headers: headers });
    const path = dir + "/" + fileName;
    Deno.writeFileSync(path, new Uint8Array(await response.arrayBuffer()));
    return path;
  }
}
