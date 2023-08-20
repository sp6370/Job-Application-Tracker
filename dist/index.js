#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = require("./scraper");
const notion_writer_1 = require("./notion-writer");
const { Command } = require("commander");
const figlet = require("figlet");
function writer(url) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Writing to notion...");
        try {
            const data = yield (0, scraper_1.scrapeJobDetails)(url);
            yield (0, notion_writer_1.writeToNotion)(data);
        }
        catch (error) {
            console.error("Error occurred while writting to notion!", error);
        }
    });
}
const program = new Command();
console.log(figlet.textSync("Job Application Tracker"));
program
    .version("0.1")
    .description("An simple CLI for tracking job applications")
    .option("-u, -u [value]", "Update job application information on notions")
    .parse(process.argv);
const options = program.opts();
if (options.U) {
    const url = typeof options.U === "string" ? options.U : "";
    console.log("Job application url: ", url);
    writer(url);
}
//# sourceMappingURL=index.js.map