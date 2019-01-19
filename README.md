# Hacker News Challenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Demo

[Click here to see a running demo of this project](http://52.62.237.183/)

## Requirements

Develop a single page app in Angular that will allow a user to type in a topic, which will then hit the hacker news API and return articles related to the search term. The articles will need to be paginated, with pagination happening on the server side.

## Code Features

A behaviour subject is used to subscribe to the text input. A minimum of 3 characters must be entered before triggering the API call. A debounce time of 500ms is used to the user has time to finish typing before triggering the API call (the app shouldn't call the API on every keystroke, unless the user is a slow typer!). 

The input also makes use of the **distinctUntilChanged()** function which will prevent the API call from triggering unless the input has changed after the debounce time (e.g. entering 'E' then 'Backspace' then 'E' will *not* trigger the API call).

A custom date filter is used to change the article time from ZULU format to a human-readable format.

For style points, Bootstrap is used and the articles are given a different colour depending on their popularity.
