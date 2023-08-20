import { Builder, By, until } from "selenium-webdriver";

interface JobPosting {
  title: string;
  description: string;
  company: string;
  url: string;
}

export async function scrapeJobDetails(
  jobUrl: string
): Promise<JobPosting | null> {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get(jobUrl);
    await driver.wait(
      until.elementLocated(By.className("top-card-layout__title"))
    );

    let jobTitle = await driver
      .findElement(By.className("top-card-layout__title"))
      .getText();

    let jobDescription = await driver
      .findElement(By.css("div.description__text--rich"))
      .getText();

    let jobCompany = await driver
      .findElement(By.css("a.topcard__org-name-link"))
      .getText();

    let postingUrl = await driver.getCurrentUrl();

    const jobPosting: JobPosting = {
      title: jobTitle,
      description: jobDescription,
      company: jobCompany,
      url: postingUrl,
    };

    console.log(`
      Title: ${jobTitle} 
      Description: ${jobDescription}
      Company: ${jobCompany}
      URL: ${postingUrl}
    `);

    return jobPosting;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  } finally {
    await driver.quit();
  }
}
