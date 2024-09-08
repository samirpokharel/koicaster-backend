import { AppRoutes } from "./src/routes";
import { Server } from "./src/server_service";

(() => {
  initialize();
})();

function initialize(): void {
  new Server({
    apiPrefix: "",
    port: Number(process.env.port) || 5000,
    routes: AppRoutes.routes,
    corsOption: {
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    },
  }).start();
}
