import express, {NextFunction} from 'express';
import {Request, Response} from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import cors from 'cors';
import User from './models/User';
import bcrypt from 'bcrypt';
const app = express();
const port = 4200;

app.use(cors());
app.use(express.json());
app.use(cookieParser('secret_code'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: true}));
app.use(
  expressSession({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }),
);

app.get('/', (req: Request, res: Response) => {
  res.send('API is working');
});

app.post('/api/register', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({username: req.body.username});
    if (user) {
      console.log('User with that username already exists');
      return res.status(400).send('User with that username already exists');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    res.send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.post('/api/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    (err: Error, user: any, info: any, message: string) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({err: 'No user exists!'}); // Send JSON response
      }
      req.logIn(user, (err: Error) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({message: 'User logged in successfully!'}); // Send JSON response
      });
    },
  )(req, res, next);
});

app.post('/api/logout', (req: Request, res: Response) => {
  req.logOut((err: Error) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }
    return res.status(200).send('User logged out successfully');
  });
  res.status(200).json({message: 'User logged out successfully!'});
});
app.listen(port);
