export const home = (_req, res) => {
  res.redirect('/folders');
};

export const registerGet = (req, res, next) => {
  if (!req.isAuthenticated()) return res.render('register');
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/register');
  });
};
