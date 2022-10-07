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
      
      if(req.query.type === "1") {
        if(isRegistered !== true) return res.render('register.ejs', {
          title: "CrédiPublio",
          type: "Pessoal",
        })
        return res.render('Calc2.ejs', {
          title: "CrédiPublio",
          type: "Pessoal",
        })
      }
      if(req.query.type === "2") {
        if(isRegistered !== true) return res.render('register.ejs', {
          title: "CrédiPublio",
          type: "Imóveis",
        })
        return res.render('Calc2.ejs', {
          title: "CrédiPublio",
          type: "Imóveis",
        })
      }
      if(req.query.type === "3") {
        if(isRegistered !== true) return res.render('register.ejs', {
          title: "CrédiPublio",
          type: "Automóveis",
        })
        return res.render('Calc2.ejs', {
          title: "CrédiPublio",
          type: "Automóveis",
        })
      }
			return res.render('Calc.ejs', {
        title: "CrédiPublio",
      })
		});

    this.post('/', function (req, res) {
      let randomID = GenId(16, false, true)

      res.setHeader(`Set-Cookie`, `SessionID=${randomID}; Path=/`)
      
      db.set(`Name_${randomID}`, req.body.name)
      db.set(`Email_${randomID}`, req.body.email)
      db.set(`Age_${randomID}`, req.body.age)
      db.set(`Session_${randomID}`, true)
      res.redirect(`/calcule?type=${req.query.type}`)
    })
	}
};

//Generate random id
function GenId(maxWords, onlyNumbers, isToken, compact) {
    if(!maxWords) maxWords = 2
    if(onlyNumbers === true) {
      let random = '';
      let dict = '1234567890'
      for(var i = 0; i < maxWords; i++) {
        random = random + dict.charAt(Math.floor(Math.random() * dict.length));
      }

      return random;
    } else {
      if(isToken === true) {
        let random = '';
        let dict = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ'
        for(var i = 0; i < maxWords; i++) {
          random = random + dict.charAt(Math.floor(Math.random() * dict.length));
        }

        return "Nzal" + random;
      } else {
        if(compact === true) {
          let random = '';
          let dict = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ'
          for(var i = 0; i < 6; i++) {
           random = random + dict.charAt(Math.floor(Math.random() * dict.length));
          }

          return random;
         } else {
          let random = '';
          let dict = '1234567890abcdefghijklmnopqrstuvwxyz'
          for(var i = 0; i < maxWords; i++) {
           random = random + dict.charAt(Math.floor(Math.random() * dict.length));
          }

          return random;
        }
      }
    }
}

module.exports.page = '/calcule';