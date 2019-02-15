#Yucca

## Yucca is a Internet of Things and Big data Platform with some interesting features:

- multi tenant/organization/ecosystem solution
- support for public/open-data/private dataset and stream API achieved with oAuth2  
- self-service smart-object management (source of events) 
- self-service stream management (channel between smart-objects and platform)
- support for Twitter source as smart-object
- support for complex event processing in self-service (using WSO2 Siddhi language)
- support for generic dataset management (with or without binary attachment)
- Realtime input in MQTT and HTTP protocols
- Realtime output (pub-sub paradigma) with Web-socket (STOMP) and MQTT protocols
- Automatic exposition with REST Api (OData v2) for time-series (from streams) and generic dataset
- Special aggregation api (extension of OData) for time-series (from streams) 
- dataset metadata are available as CKAN v2 or DCAT-AP_IT format 
- all data are stored also in a big data storage(hadoop):
..- for analytics task (with apache zeppelin for example)
..- with file system structure easy to read (for organization, domain, subdomain and dataset)
..- with file system structure secured in a selective way (with ranger)


## Yucca is already deployed for Region Piedmont in Italy as SmartData Platform, together with apache zeppelin.  

- You can try (using social account) the platform from here: https://userportal.smartdatanet.it/userportal/
- You can see an example of dashboard here: http://www.smartdatanet.it/yuccadashboard/dashboard.html
- You can find italian technical documentation here: http://developer.smartdatanet.it/
- You can find an amazing video about Yucca SmartData Platform here: https://www.youtube.com/watch?v=HkuLf0WAToo
- You can find a presentation here: https://www.youtube.com/watch?v=VNZbU99UDAQ

##Yucca is on github in different repositories:

- Realtime subsystem: https://github.com/csipiemonte/yucca-realtime  
- Dataservice subsystem: https://github.com/csipiemonte/yucca-dataservice
- Storage services and tools system: https://github.com/csipiemonte/yucca-storage 
- Fabriccontroller subsystem: https://github.com/csipiemonte/yucca-fabriccontroller
- User interface (front and backoffice) system: https://github.com/csipiemonte/yucca-userportal

Here a high level component diagram:

![Image of high level component diagram](img/component_diagram.png)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcsipiemonte%2Fyucca.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcsipiemonte%2Fyucca?ref=badge_shield)

###Auxiliary repositories:

- Angular Widgets ready-to-use integrated with yucca API (oData and websocket): https://github.com/csipiemonte/yucca-angular-widgets
- Stand-alone Gateway with guaranteed delivery feature betweem smart-object and yucca platform: https://github.com/csipiemonte/yucca-light

##Next step:

- Migration from MongoDB as speed layer (serving oData API) to Phoenix+Solr 
- Integration with Zeppelin to create a complete self-service experience (from sensor to reporting)
- Integration with Apache Ranger for security also at speed layer level



## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcsipiemonte%2Fyucca.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcsipiemonte%2Fyucca?ref=badge_large)