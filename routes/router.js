const fs = require('fs');
const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const logger = require('morgan');

const config = require('./v1/config.json')

class App {
  constructor() {
    this.app = express()
    this.config = config

    this.setup()
    this.routes()

    console.log(`HPD | App Online`)
  }

  setup() {
    this.app.use(express.json())
    this.app.set('view engine', 'ejs');
    this.app.set('views', "/home/runner/HYPED-or-Credipublio/public/views/");
    this.app.use(express.static("/home/runner/HYPED-or-Credipublio/public/images/"));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(expressLayouts);

    if(this.config.debug === true) {
      this.app.use(logger('dev'));
    }

    this.app.listen(1337);
  }

  routes() {
    const files = fs.readdirSync(__dirname + '/routing/').filter(file => file.endsWith('.js'));
    for(const file of files) {
      const route = require(__dirname + `/routing/${file}`)

      this.app.use(route.page, new route.Router());
    }
  }
}

module.exports = App;