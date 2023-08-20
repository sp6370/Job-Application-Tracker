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
exports.scrapeJobDetails = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const html_to_text_1 = require("html-to-text");
function scrapeJobDetails(jobUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        let driver = yield new selenium_webdriver_1.Builder().forBrowser("chrome").build();
        try {
            yield driver.get(jobUrl);
            yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.className("top-card-layout__title")));
            let jobTitle = yield driver
                .findElement(selenium_webdriver_1.By.className("top-card-layout__title"))
                .getText();
            let jobDescription = (0, html_to_text_1.convert)(yield driver
                .findElement(selenium_webdriver_1.By.css("div.description__text--rich"))
                .getAttribute("innerHTML"));
            let jobCompany = yield driver
                .findElement(selenium_webdriver_1.By.css("a.topcard__org-name-link"))
                .getText();
            let postingUrl = yield driver.getCurrentUrl();
            const jobPosting = {
                title: jobTitle,
                description: jobDescription,
                company: jobCompany,
                url: postingUrl,
            };
            return jobPosting;
        }
        catch (error) {
            console.error("An error occurred:", error);
            return null;
        }
        finally {
            yield driver.quit();
        }
    });
}
exports.scrapeJobDetails = scrapeJobDetails;
//# sourceMappingURL=scraper.js.map