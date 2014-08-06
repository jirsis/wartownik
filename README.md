wartownik
=========

#RUN Wierzba

```
DEBUG=wierzba bin/www
```

# ToDo List
- [x] nodejs app
- [x] packages.json
- [x] service /time [time](https://www.npmjs.org/package/ntp-client)
- [x] service /current-weather [api](http://api.openweathermap.org/data/2.5/weather)
- [ ] service /calendar [google calendar](https://www.npmjs.org/package/google-calendar)
- [x] service /next-weather [api](http://api.openweathermap.org/data/2.5/weather)
- [x] service /news [meneame](http://meneame.feedsportal.com/rss)
- [ ] _status server_ [exec command](http://nodejs.org/api/child_process.html)
- [x] _index of commands available_
- [x] UI
- [x] weather icons
- [x] downloads icons
- [ ] weather of multiple cities
- [ ] configuration page:
  * [ ] define locale of app
  * [ ] define list of cities to get weather
  * [ ] persist configuration
  * [ ] update time.js and weather.js api to take locale from config file

#### Nomenclature ToDo List
- [ ] normal text: to do mandatory functionality
- [x] normal text: done mandatory functionality
- [ ] _italic text_: to do optional functionality
- [x] _italic text_: done optional functionality
