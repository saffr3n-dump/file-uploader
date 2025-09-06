import { body, validationResult } from 'express-validator';
import User from '../services/user.js';

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

export const registerPost = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .bail()
    .isAlphanumeric()
    .withMessage('Name must only contain latin letters and/or numbers')
    .bail()
    .isLength({ max: 50 })
    .withMessage('Name must not be longer than 50 characters')
    .bail()
    .custom(async (name) => {
      const user = await User.findByName(name);
      if (user) throw new Error('Name is already in use');
    }),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8, max: 50 })
    .withMessage('Password must be 8 to 50 characters long')
    .bail()
    .custom((password, { req }) => password === req.body.confirm)
    .withMessage('Password does not match the confirmation field'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('register', {
        data: { name: req.body.name },
        errors: errors.mapped(),
      });
    }
    const user = await User.create(req.body);
    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect('/folders');
    });
  },
];
