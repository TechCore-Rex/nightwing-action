import './sourcemap-register.cjs';/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@actions/core"));
const axios_1 = __importDefault(require("axios"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        core_1.default.info("TechCore build action initiated.");
        const buildId = core_1.default.getInput("techcore-build-id");
        const techCoreToken = core_1.default.getInput("techcore-api-key");
        console.log(`your buildId: ${buildId}`);
        console.log(`your techCoreToken: ${techCoreToken}`);
        const response = yield axios_1.default.get("https://04c6-216-106-133-65.ngrok.io", {
            responseType: "stream",
        });
        const stream = response.data;
        stream.on("data", (data) => {
            const parsedData = Buffer.from(data).toString("utf-8");
            console.log(parsedData);
        });
        stream.on("end", () => {
            console.log("stream done");
        });
    });
}
main();


//# sourceMappingURL=index.js.map