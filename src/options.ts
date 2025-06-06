export type PluginOptions = {
  websiteID: string;
  analyticsDomain: string;
  scriptName?: string;
  dataHostURL?: string;
  dataAutoTrack?: boolean;
  dataBeforeSend?: string;
  dataDoNotTrack?: boolean;
  dataCache?: boolean;
  dataDomains?: string;
  dataExcludeSearch?: boolean;
  dataExcludeHash?: boolean;
  dataTag?: string;
};

export type Options = Partial<PluginOptions>;
