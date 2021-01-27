# README #

## What is this repository for? ##

This repo is solely for the interview purpose to give candidates a well established task for their expertise and ability evaluation.

It is a fork of a original repository which contains a coding exercise explained later. You have writing permissions to it, so you can push to it whatever you like regarding this task, and we would be happy if you did.

## The task ##

We want you to create a simple, but functional interface in React that displays the stocks, currencies or cryptocurrencies exchange rates (pick one category, entirely up to you which one you would be more interested in). It should be created from â€œscratchâ€ (tho can use React UI frameworks and such), potentially using some bootstrap functionality you are comfortable with.

In this interface it should be possible to:

- view a set of 10 or more symbols (items from a chosen category, can be predefined or dynamically chosen by you based on some criteria f.e. popularity, rate increase etc.) with addtional info:
    - current rate,
    - a change compared to the previous market day,
    - current recommendation for buy or sell based on your own prediction model,
- set any symbol to favorite,
- symbols should appear in the following order:
    - favorited,
    - rest.
- when any item is clicked you are presented with a detailed view with the prediction chart or slider in it.

The prediction algorithm you create should be based on any data available to you (f.e. historical records, external influences etc.) and support estimations for the next 12 months.

Feel free to improvise wherever you feel like the task is unclear, we are primarily interested in the way you approach a problem. Keep it simple when possible.

## Technology ##

- TypeScript (preferable) or JavaScript
- React
- Redux
- Unit and/or UI tests covering at least some part of the logic or interface created during the assignment
- Electron (optional)

## Nice to have ##

- Linting rules.
- Usage of a distributed system for version control (preferably this one).
- Multiple commits showing the process of solving the task.

## Resources ##

- Stock, Currencies and Crypto API: <https://finnhub.io> (available for free after signup with 60 API calls/minute)

## Who do I talk to? ##

Please, do not hessitate to reach out to your point of contact or pio@futureuniverse.com if in a need of assistastance or would like a clarification on anything related to what is written here.

## Install and Run

Project is monorepo created with Nx tools.

### Install

Project was installed with `yarn` there can be maybe some issues if run and install with `npm`. `node version v14.15.4` `npm version 6.14.10`

Clone the project to local. Navigate into `root` directory of monorepo and run:

```sh
  # cd to workspace root not apps
  $ yarn

  # to run the project
  $ yarn nx run stock:serve

  ##
  # or usage with npm
  ##
  $ npm install
  $ npm run nx run stock:serve
```


