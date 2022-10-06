const { Router } = require('express');

module.exports.Router = class Routes extends Router {
	constructor() {
		super();

		this.get('/', function (req, res) {
			return res.render('index.ejs', {
        title: "CrédiPublio",
        testemonialName1: "Fernando Públio",
        testemonialName2: "Muryllo Dionizio",
        testemonialPhrase1: "Nossa empresa tem compromisso com seus clientes",
        testemonialPhrase2: "Graças a PublioCrédi consegui financiar meu imóvel tão sonhado.",
        percent: "1,24",
        amount1: "2",
        amount2: "5",
        amount3: "500",
      })
		});
	}
};

module.exports.page = '/';