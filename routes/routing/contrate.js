const { Router } = require('express');

module.exports.Router = class Routes extends Router {
	constructor() {
		super();

		this.get('/', function (req, res) {
			return res.render('Contratado.ejs', {
        title: "CrédiPublio",
      })
		});
	}
};

module.exports.page = '/contrate';