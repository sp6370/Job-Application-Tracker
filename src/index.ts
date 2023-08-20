#! /usr/bin/env node

import { scrapeJobDetails, JobPosting } from "./scraper";
import { writeToNotion } from "./notion-writer";
const { Command } = require("commander");
const figlet = require("figlet");

async function writer(url: string) {
  console.log("Writing to notion...");
  try {
    const data = await scrapeJobDetails(url);
    await writeToNotion(data);
  } catch (error) {
    console.error("Error occurred while writting to notion!", error);
  }
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
