import { createBrowserHistory } from "src/utils/history";
import { AppConfig } from "../configs";
const appConfig = new AppConfig();
export const history = createBrowserHistory({ basename: appConfig.basePath });
