export default function shoesRoutes(shoesData) {
  function home(req, res, next) {
    delete req.session.user;
    res.render("login");
  }
  async function login(req, res, next) {
    try {
      let username = req.body.username;
      let password = req.body.password;
      let user = await shoesData.getLogin(username, password);
      if (user) {
        req.session.user = user;
        res.redirect("/admin");
      } else {
        req.flash("info", "Incorrect username/password");
        res.redirect("/");
      }
    } catch (err) {
      next(err);
    }
  }
  async function logout(req, res, next) {
    try {
      delete req.session.user;
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  }
  async function admin(req, res, next) {
    try {
      res.render("update", {
        products: await shoesData.productsList(),
        sizes: await shoesData.sizes(),
        edition: await shoesData.getEdition(),
      });
    } catch (err) {
      next(err);
    }
  }
  async function addToStock(req, res, next) {
    try {
      let edition = req.body.updtEdition;
      let size = req.body.updtSize;
      let qty = req.body.updtQty;
      let color = req.body.updtColor;
      if (!edition || !size || !qty || !color) {
        req.flash("info", "missing some details");
        res.redirect("/admin");
        return;
      } else {
        await shoesData.updateStock(edition, size, color, qty);
        req.flash("info", "successfully updated stock");
        res.redirect("/admin");
      }
    } catch (err) {
      next(err);
    }
  }
  return {
    home,
    login,
    logout,
    admin,
    addToStock,
  };
}
