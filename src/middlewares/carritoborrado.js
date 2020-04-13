function carrito(req, res, next) {
   CookieBorrada=req.body.borrado; // VALOR QUE ENTRA
   DatosCookie=JSON.parse(req.cookies.compra); //Array completo
   var index = DatosCookie.indexOf(CookieBorrada);
   if (index !== -1) DatosCookie.splice(index, 1);
   res.cookie('compra', JSON.stringify(DatosCookie), { maxAge: (1000 * 60) * 5 });
   DatosCookie= JSON.stringify(DatosCookie) //FORMATO no JSON
    next();
}


module.exports = carrito



