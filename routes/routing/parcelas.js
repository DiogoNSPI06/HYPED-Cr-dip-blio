const { Router } = require('express');
const db = require("quick.db");

module.exports.Router = class Routes extends Router {
	constructor() {
		super();

		this.get('/', function (req, res) {
			let isRegistered = db.get(`Session_${req.cookies.SessionID}`)
      console.log(isRegistered)
      console.log(req.cookies.SessionID)
      db.delete("Session_undefined")

      let value = db.get(`CalcValue_${req.cookies.SessionID}`)
      
      if(req.query.type === "1") {
        if(isRegistered !== true) return res.redirect(`/calcule?type=1`)
        let vl1 = value / 5
        let vl2 = value * 0.06
        
        let vl3 = value / 10
        let vl4 = value * 0.07
        
        let vl5 = value / 25
        let vl6 = value * 0.08 
        return res.render('Calc3.ejs', {
          title: "CrédiPublio",
          type: "Pessoal",
          subtitle: "Parcelas de até R$ 1.250/mês, crédito de até R$ 50.000,00",
          value: value,
          parcela1: 5,
          parcela2: 10,
          parcela3: 25,
          parcelasValue1: vl1 + vl2,
          parcelasValue2: vl3 + vl4,
          parcelasValue3: vl5 + vl6,
        })
      }
      if(req.query.type === "2") {
        if(isRegistered !== true) return res.redirect(`/calcule?type=2`)
        let vl1 = value / 40
        let vl2 = value * 0.01
        
        let vl3 = value / 65
        let vl4 = value * 0.02
        
        let vl5 = value / 120
        let vl6 = value * 0.025
        return res.render('Calc3.ejs', {
          title: "CrédiPublio",
          type: "Imóveis",
          subtitle: "Parcelas de até R$ 1.250/mês, crédito de até R$ 750.000,00",
          value: value,
          parcela1: 40,
          parcela2: 65,
          parcela3: 120,
          parcelasValue1: vl1 + vl2,
          parcelasValue2: vl3 + vl4,
          parcelasValue3: vl5 + vl6,
        })
      }
      if(req.query.type === "3") {
        if(isRegistered !== true) return res.redirect(`/calcule?type=3`)
        let vl1 = value / 12
        let vl2 = value * 0.03
        
        let vl3 = value / 24
        let vl4 = value * 0.04
        
        let vl5 = value / 30
        let vl6 = value * 0.05
        return res.render('Calc3.ejs', {
          title: "CrédiPublio",
          type: "Automóveis",
          subtitle: "Parcelas de até R$ 1.250/mês, crédito de até R$ 150.000,00",
          value: value,
          parcela1: 12,
          parcela2: 24,
          parcela3: 30,
          parcelasValue1: vl1 + vl2,
          parcelasValue2: vl3 + vl4,
          parcelasValue3: vl5 + vl6,
        })
      }
			return res.render('Calc.ejs', {
        title: "CrédiPublio",
      })
		});

    this.post('/', function (req, res) {
      db.set(`CalcParcelas_${req.cookies.SessionID}`, req.body.value)

      return res.redirect(`/finish?type=${req.query.type}`)
    });

    this.get('/finish', function (req, res) {
     return res.render('Finish.ejs') 
    })
	}
};

module.exports.page = '/parcelas';