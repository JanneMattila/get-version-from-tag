"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github_1 = require("@actions/github");
async function run() {
    var _a;
    try {
        if (github_1.context.eventName !== "release") {
            core.setFailed(`Cannot execute release action in event '${github_1.context.eventName}'.`);
            return;
        }
        let tag = (_a = github_1.context.payload.release) === null || _a === void 0 ? void 0 : _a.tag_name;
        if (tag.length < 5) {
            core.setFailed(`Invalid release tag. Expecting either 'v1.2.3' or '1.2.3' or 'v1.2.3-preview' but got '${tag}'.`);
            return;
        }
        // Select the last element e.g., "release/v1.2.3" -> "v1.2.3"
        const parts = tag.split("/");
        tag = parts[parts.length - 1];
        // Remove the "v" prefix if it exists
        if (tag.startsWith("v")) {
            tag = tag.substring(1);
        }
        core.info(`Version: ${tag}`);
        core.setOutput("version", tag);
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
run();
