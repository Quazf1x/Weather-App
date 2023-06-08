import { setUpPage } from "./modules/UI.js";
import { makeApiRequest } from "./modules/API.js";

const data = await makeApiRequest();
setUpPage(data);