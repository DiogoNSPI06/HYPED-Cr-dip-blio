const { Router } = require('express');

module.exports.Router = class Routes extends Router {
	constructor() {
		super();

		this.get('/', function (req, res) {
			return res.render('index.ejs', {
        title: "CrédiPublio",
        testemonialName1: "Fernando Públio",
        testemonialName2: "Cesar Alejandro",
        testemonialPhrase1: "Nossa empresa tem compromisso em ajudar nossos clientes na realização\n de seus sonhos.",
        testemonialPhrase2: "Graças a CrédiPublio consegui voltar para o meu querido país, el Perú",
        percent: "1,24",
        amount1: "2000",
        amount2: "5",
        amount3: "500",
      })
		});
	}
};

module.exports.page = '/';
