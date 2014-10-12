wartownik
=========

#Initial setup Wierzba

```
npm install
sudo npm install -g supervisor
```

#RUN Wierzba

```
npm start 
```

# ToDo List
- [x] nodejs app
- [x] packages.json
- [x] service /time [time](https://www.npmjs.org/package/ntp-client)
- [x] service /current-weather [api](http://api.openweathermap.org/data/2.5/weather)
- [x] service /calendar [google calendar](https://www.npmjs.org/package/google-calendar)
- [x] service /next-weather [api](http://api.openweathermap.org/data/2.5/weather)
- [x] service /news [meneame](http://meneame.feedsportal.com/rss)
- [x] _index of commands available_
- [x] UI
- [x] weather icons
- [x] downloads icons
- [x] weather of multiple cities
- [x] configuration page:
  * [x] define locale of app
  * [x] define list of cities to get weather
  * [x] persist configuration
  * [x] view to configure this parameters
  * [x] reload app when configuration file changes
  * [x] reload web ui when configuration file changes
  * [ ] wait few seconds until wierzba.app restart

##### Nomenclature ToDo List
- [ ] normal text: to do mandatory functionality
- [x] normal text: done mandatory functionality
- [ ] _italic text_: to do optional functionality
- [x] _italic text_: done optional functionality
