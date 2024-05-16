// it was also called as server.ts file

import { setupServer } from "msw/node";
import { handlers } from "./handlers.ts";

export const server = setupServer(...handlers);
