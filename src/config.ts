import * as dotenv from "dotenv";

interface IConfig {
  environment: string;
  port: string;
  somethingUrl: string;
}

export const loadConfig = () => {
  const loadConfig: any = dotenv.config().parsed;
  const config: IConfig = {
    environment: loadConfig.NODE_ENV,
    port: loadConfig.PORT || 9000,
    somethingUrl: loadConfig.SOMETHING_URL
  };
  return config;
};
