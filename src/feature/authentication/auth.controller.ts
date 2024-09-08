import { type Request, type Response, type NextFunction } from "express";
import passport from "passport";

export default class AuthController {
  // TODO: implement
  googleLogin = (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
  };
  googleCallback = (req: Request, res: Response, next: NextFunction): void => {
    console.log("callback", process.env.CLIENT_URL);
    passport.authenticate("google", {
      successRedirect: `${process.env.CLIENT_URL}`,
      failureRedirect: `${process.env.CLIENT_URL}/login`,
    })(req, res, next);
  };
  logout = (req: any, res: any, next: NextFunction): void => {
    req.logout((err: Error) => {
      if (err) {
        console.error("Error logging out:", err);
      }
      res.redirect("/");
    });
  };
}
