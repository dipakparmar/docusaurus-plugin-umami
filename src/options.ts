export type PluginOptions = {
  websiteID: string;
  analyticsDomain: string;
  scriptName: string;
  dataHostURL: string;
  dataAutoTrack: boolean;
  dataDoNotTrack: boolean;
  dataCache: boolean;
  dataDomains: string;
};

export type Options = Partial<PluginOptions>;