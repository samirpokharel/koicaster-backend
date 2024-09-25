import cors, { type CorsOptions } from "cors";
import {
  IncomingMessage,
  type ServerResponse,
  type Server as HttpServer,
} from "http";
import { createServer, type ServerOptions } from "https";

import express, { Router } from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import { setupPassport } from "./config/passport";
import AuthService from "./feature/authentication/auth.service";
import { ErrorMiddleware } from "./middleware/error.middleware";
import { AppError } from "./helper/errors";
import { HTTPStatusCode } from "./config/constant";

import ConnectPg from "connect-pg-simple";
const pgSession = ConnectPg(session);

interface ServerOption {
  port: number;
  routes: Router;
  apiPrefix: string;
  corsOption: CorsOptions;
  serverCertificateOptions?: ServerOptions;
}

export class Server {
  public readonly app = express();

  private readonly port: number;
  private readonly routes: Router;
  private readonly apiPrefix: string;
  private readonly corsOption: CorsOptions;
  private readonly certificate?: ServerOptions;
  private serverListner?: HttpServer<
    typeof IncomingMessage,
    typeof ServerResponse
  >;

  constructor(serverOption: ServerOption) {
    this.port = serverOption.port;
    this.routes = serverOption.routes;
    this.apiPrefix = serverOption.apiPrefix;
    this.corsOption = serverOption.corsOption;
    this.certificate = serverOption.serverCertificateOptions;
  }

  async start(): Promise<void> {
    dotenv.config();

    // Middlewares
    this.app.use(
      session({
        store: new pgSession({
          conString: process.env.DATABASE_URL,
          tableName: "Session"
        }),
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: true,
      })
    );

    // Set up Passport
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors(this.corsOption));

    setupPassport(new AuthService());

    this.app.get("/", (req, res, next) => {
      return res.status(HTTPStatusCode.Ok).send({
        status: "Working",
        message: "Welcome to Koicaster Backend. API's are working ",
      });
    });
    // Routes
    this.app.use(this.apiPrefix, this.routes);

    this.routes.all("*", (req, res, next) => {
      next(AppError.notFound(`Cant find ${req.originalUrl} on this server!`));
    });

    // Error Handler
    this.routes.use(ErrorMiddleware.handleError);

    if (this.certificate) {
      const httpsServer = createServer(this.certificate, this.app);
      this.serverListner = httpsServer.listen(this.port, () => {
        console.log(`HTTPS Server running on PORT: ${this.port}`);
      });
    } else {
      this.serverListner = this.app.listen(this.port, () =>
        console.log(`Server Running on PORT: ${this.port}`)
      );
    }
  }
  close(): void {
    this.serverListner?.close();
  }
}
