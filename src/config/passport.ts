import {
  Strategy,
  StrategyOptions,
  VerifyCallback,
} from "passport-google-oauth20";
import passport, { Profile } from "passport";
import AuthService from "../feature/authentication/auth.service";

const options: StrategyOptions = {
  clientID: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  passReqToCallback: undefined,
  callbackURL: `/auth/google/callback`,
};

export const setupPassport = (authService: AuthService): void => {
  passport.use(
    new Strategy(
      options,
      async (
        accessTOken: String,
        refreshTOken: String,
        profile: Profile,
        done: VerifyCallback
      ) => {
        try {
          const email = profile.emails?.[0].value;
          if (!email) {
            return done(new Error("No email found in Google profile"));
          }

          const user = await authService.findOrCreateUser(
            email,
            profile.name?.givenName ?? "",
            profile.name?.familyName ?? "",
            profile.id
          );

          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await authService.findUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
