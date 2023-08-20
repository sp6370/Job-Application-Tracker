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
exports.writeToNotion = void 0;
const client_1 = require("@notionhq/client");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const notion = new client_1.Client({ auth: process.env["NOTION_TOKEN"] });
function makePropertiesData(properties, jodData) {
    const propertyValues = {};
    let processedDescription = [];
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
        }
        else if (name === "Apply_Date") {
            propertyValues[name] = {
                type: "date",
                date: {
                    start: new Date().toISOString(),
                },
            };
        }
        else if (name === "URL") {
            propertyValues[name] = {
                type: "url",
                id: property.id,
                url: jodData.url,
            };
        }
        else if (name === "Description") {
            propertyValues[name] = {
                type: "rich_text",
                id: property.id,
                rich_text: processedDescription,
            };
        }
        else if (name === "Role") {
            propertyValues[name] = {
                type: "select",
                id: property.id,
                select: { name: jodData.title },
            };
        }
    });
    return propertyValues;
}
function exerciseWriting(databaseId, properties, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const propertiesData = makePropertiesData(properties, data);
        const parameters = {
            parent: {
                database_id: databaseId,
            },
            properties: propertiesData,
        };
        yield notion.pages.create(parameters);
    });
}
function writeToNotion(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const database_id = process.env["DATABASE_ID"];
        const { properties } = yield notion.databases.retrieve({
            database_id: database_id,
        });
        yield exerciseWriting(database_id, properties, data);
    });
}
exports.writeToNotion = writeToNotion;
//# sourceMappingURL=notion-writer.js.map