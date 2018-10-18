import Properties = GoogleAppsScript.Properties.Properties

export interface iUserPropertyService {
  get: (key: string) => string,
  set: (key: string, value: string) => Properties,
  getConfigFromProperty: (propertyService: iUserPropertyService) => iConfig,
  storeConfig: (config: iConfig, propertyService: iUserPropertyService) => void
}

export const UserPropertyServiceImpl = (): iUserPropertyService => ({
  get: (key: string): string =>
    PropertiesService.getUserProperties().getProperty(key),
  set: (key: string, value: string): Properties =>
    PropertiesService.getUserProperties().setProperty(key, value),
    
getConfigFromProperty: (propertyService: iUserPropertyService): iConfig =>
Config(
   propertyService.get('url'),
   propertyService.get('space'),
   propertyService.get('domain'),
   propertyService.get('apiKey'),
   propertyService.get('projectKey'),
   propertyService.get('mailaddress'),
   propertyService.get('cksendmail')
),
    
storeConfig: (config: iConfig, propertyService: iUserPropertyService): void =>
void(
    propertyService.set('url', config.url),
    propertyService.set('space', config.space),
    propertyService.set('domain', config.domain),
    propertyService.set('apiKey', config.apiKey),
    propertyService.set('projectKey', config.projectKey),
    propertyService.set('mailaddress', config.mailaddress),
    propertyService.set('cksendmail', config.cksendmail)
)
})

  export interface iConfig {
    readonly url: string
    readonly space: string
    readonly domain: string
    readonly apiKey: string
    readonly projectKey: string
    readonly mailaddress: string
    readonly cksendmail: string
  }

  const Config = (
      url: string, 
      space: string, 
      domain: string, 
      apiKey: string, 
      projectKey: string, 
      mailaddress: string, 
      cksendmail: string) => 
  ({url, space, domain, apiKey, projectKey, mailaddress, cksendmail})