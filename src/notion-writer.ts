import { Client } from "@notionhq/client";
import {
  CreatePageParameters,
  GetDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { JobPosting } from "./scraper";

import * as _ from "lodash";
import { config } from "dotenv";
config();

const notion = new Client({ auth: process.env["NOTION_TOKEN"] });

function makePropertiesData(
  properties: GetDatabaseResponse["properties"],
  jodData: JobPosting
): Record<string, CreatePageParameters["properties"]> {
  const propertyValues: Record<string, CreatePageParameters["properties"]> = {};

  type TextObject = {
    type: "text";
    text: { content: string };
  };
  let processedDescription: TextObject[] = [];
  const maxLength = 2000;
  for (let i = 0; i < jodData.description.length; i += maxLength) {
    const part = jodData.description.substr(i, maxLength);
    processedDescription.push({
      type: "text",
      text: { content: part },
    });
  }

  Object.entries(properties).forEach(([name, property]) => {
    if (name === "Company") {
      propertyValues[name] = {
        type: "title",
        title: [
          {
            type: "text",
            text: {
              content: jodData.company,
            },
          },
        ],
      };
    } else if (name === "Apply_Date") {
      propertyValues[name] = {
        type: "date",
        date: {
          start: new Date().toISOString(),
        },
      };
    } else if (name === "URL") {
      propertyValues[name] = {
        type: "url",
        id: property.id,
        url: jodData.url,
      };
    } else if (name === "Description") {
      propertyValues[name] = {
        type: "rich_text",
        id: property.id,
        rich_text: processedDescription,
      };
    } else if (name === "Role") {
      propertyValues[name] = {
        type: "select",
        id: property.id,
        select: { name: jodData.title },
      };
    }
  });
  return propertyValues;
}

async function exerciseWriting(
  databaseId: string,
  properties: GetDatabaseResponse["properties"],
  data: JobPosting
) {
  const propertiesData = makePropertiesData(properties, data);
  const parameters: CreatePageParameters = {
    parent: {
      database_id: databaseId,
    },
    properties: propertiesData,
  } as CreatePageParameters;
  await notion.pages.create(parameters);
}

export async function writeToNotion(data: JobPosting | null) {
  const database_id: string = process.env["DATABASE_ID"]!;
  const { properties } = await notion.databases.retrieve({
    database_id: database_id,
  });
  await exerciseWriting(database_id, properties, data!);
}
