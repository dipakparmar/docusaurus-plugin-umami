export type PluginOptions = {
  websiteID: string;
  analyticsDomain: string;
  scriptName: string;
  dataHostURL: string;
  dataAutoTrack: boolean;
  dataDoNotTrack: boolean;
  dataCache: boolean;
  dataDomains: string;
  dataExcludeSearch: boolean;
};

export type Options = Partial<PluginOptions>;
