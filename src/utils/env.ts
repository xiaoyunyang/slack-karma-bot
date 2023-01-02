// for details see https://github.com/motdotla/dotenv/blob/master/examples/typescript/
import { config } from "dotenv";
import { resolve } from "path";

const pathToConfig = "../../.env";
config({ path: resolve(__dirname, pathToConfig) });
