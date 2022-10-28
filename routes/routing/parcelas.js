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

        db.set(`CalcSugestionParc_1_${req.cookies.SessionID}`, `${vl1 + vl2}`)
        db.set(`CalcSugestionParc_2_${req.cookies.SessionID}`, `${vl3 + vl4}`)
        db.set(`CalcSugestionParc_3_${req.cookies.SessionID}`, `${vl5 + vl6}`)
        
        db.set(`CalcSugestionNParc_1_${req.cookies.SessionID}`, `5`)
        db.set(`CalcSugestionNParc_2_${req.cookies.SessionID}`, `10`)
        db.set(`CalcSugestionNParc_3_${req.cookies.SessionID}`, `25`)
        
        return res.render('Calc3.ejs', {
          title: "CrédiPublio",
          type: "Pessoal",
          reqtype: "1",
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

        db.set(`CalcSugestionParc_1_${req.cookies.SessionID}`, `${vl1 + vl2}`)
        db.set(`CalcSugestionParc_2_${req.cookies.SessionID}`, `${vl3 + vl4}`)
        db.set(`CalcSugestionParc_3_${req.cookies.SessionID}`, `${vl5 + vl6}`)
        
        db.set(`CalcSugestionNParc_1_${req.cookies.SessionID}`, `40`)
        db.set(`CalcSugestionNParc_2_${req.cookies.SessionID}`, `65`)
        db.set(`CalcSugestionNParc_3_${req.cookies.SessionID}`, `120`)
        
        return res.render('Calc3.ejs', {
          title: "CrédiPublio",
          type: "Imóveis",
          reqtype: "2",
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
        
        db.set(`CalcSugestionParc_1_${req.cookies.SessionID}`, `${vl1 + vl2}`)
        db.set(`CalcSugestionParc_2_${req.cookies.SessionID}`, `${vl3 + vl4}`)
        db.set(`CalcSugestionParc_3_${req.cookies.SessionID}`, `${vl5 + vl6}`)
        
        db.set(`CalcSugestionNParc_1_${req.cookies.SessionID}`, `12`)
        db.set(`CalcSugestionNParc_2_${req.cookies.SessionID}`, `24`)
        db.set(`CalcSugestionNParc_3_${req.cookies.SessionID}`, `30`)
        
        return res.render('Calc3.ejs', {
          title: "CrédiPublio",
          type: "Automóveis",
          reqtype: "3",
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
      let value = db.get(`CalcValue_${req.cookies.SessionID}`)
      let percent = 0
      let parc = req.body.value
      if(parc <= 12 && req.query.type === "1") percent = 0.03
      if(parc > 12 && req.query.type === "1") percent = 0.04
      if(parc >= 24 && req.query.type === "1") percent = 0.05
      if(parc <= 12 && req.query.type === "3") percent = 0.06
      if(23 > parc > 12 && req.query.type === "3") percent = 0.07
      if(parc <= 24 && req.query.type === "3") percent = 0.08
      if(parc <= 60 && req.query.type === "2") percent = 0.01
      if(120 > parc > 60 && req.query.type === "2") percent = 0.02
      if(parc >= 121 && req.query.type === "2") percent = 0.025
      
      let vl1 = value / parc
      let vl2 = value * percent

      db.set(`CalcParcelasValue_${req.cookies.SessionID}`, `${vl1 + vl2}`)
      //db.delete(`CalcParcelasValue_${req.cookies.SessionID}`)

      return res.redirect(`/parcelas/finish?type=${req.query.type}`)
    });

    this.get('/finish', function (req, res) {
     if(req.query.type === "1") {
       let parcv = db.get(`CalcParcelas_${req.cookies.SessionID}`)
       let nparc = db.get(`CalcParcelas_${req.cookies.SessionID}`)
       
       if(req.query.sugestion) {
         parcv = db.get(`CalcSugestionParc_${req.query.sugestion}_${req.cookies.SessionID}`)
         nparc = db.get(`CalcSugestionNParc_${req.query.sugestion}_${req.cookies.SessionID}`)
       }
       
       return res.render('Finish.ejs', {
       title: "CrédiPublio",
       type: "pessoal",
       value: db.get(`CalcValue_${req.cookies.SessionID}`),
       nparcelas: nparc,
       parcelaValue: parcv,
     })
     }
      if(req.query.type === "2") {
        let parcv = db.get(`CalcParcelas_${req.cookies.SessionID}`)
       let nparc = db.get(`CalcParcelas_${req.cookies.SessionID}`)
       
       if(req.query.sugestion) {
         parcv = db.get(`CalcSugestionParc_${req.query.sugestion}_${req.cookies.SessionID}`)
         nparc = db.get(`CalcSugestionNParc_${req.query.sugestion}_${req.cookies.SessionID}`)
       }
        return res.render('Finish.ejs', {
       title: "CrédiPublio",
       type: "imobiliário",
       value: db.get(`CalcValue_${req.cookies.SessionID}`),
       nparcelas: nparc,
       parcelaValue: parcv,
     })
      }
      if(req.query.type === "3") {
        let parcv = db.get(`CalcParcelas_${req.cookies.SessionID}`)
       let nparc = db.get(`CalcParcelas_${req.cookies.SessionID}`)
       
       if(req.query.sugestion) {
         parcv = db.get(`CalcSugestionParc_${req.query.sugestion}_${req.cookies.SessionID}`)
         nparc = db.get(`CalcSugestionNParc_${req.query.sugestion}_${req.cookies.SessionID}`)
       }
        return res.render('Finish.ejs', {
       title: "CrédiPublio",
       type: "automobilístico",
       value: db.get(`CalcValue_${req.cookies.SessionID}`),
       nparcelas: nparc,
       parcelaValue: parcv,
     })
      }
      return res.redirect(`/calcule`)
    })
	}
};

module.exports.page = '/parcelas';