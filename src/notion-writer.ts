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
  console.log(jodData.description);

  if (jodData.description.length > 2000) {
    // discard remaing characters
    jodData.description = jodData.description.substring(0, 2000);
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
        rich_text: [
          {
            type: "text",
            text: { content: jodData.description },
          },
        ],
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
