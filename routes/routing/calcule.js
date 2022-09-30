const { Router } = require('express');

module.exports.Router = class Routes extends Router {
	constructor() {
		super();

		this.get('/', function (req, res) {
      if(req.query.type === 1) {
        return res.render('Calc2.ejs', {
          title: "CrédiPublio",
          type: "Pessoal",
        })
      }
      if(req.query.type === 2) {
        return res.render('Calc2.ejs', {
          title: "CrédiPublio",
          type: "Imóveis",
        })
      }
      if(req.query.type === 3) {
        return res.render('Calc2.ejs', {
          title: "CrédiPublio",
          type: "Automóveis",
        })
      }
			return res.render('Calc.ejs', {
        title: "CrédiPublio",
      })
		});
	}
};

module.exports.page = '/calcule';