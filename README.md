# J.A.T - Job Application Tracker

Simplify Your Job Application Tracking with J.A.T

J.A.T (Job Application Tracker) is a streamlined solution that utilizes the Notion API to efficiently manage your job application process.

## What is J.A.T?

J.A.T streamlines the job application tracking process using the power of the Notion API. By providing a LinkedIn job posting URL to J.A.T, the tool automatically extracts key details from the posting, such as job role, company, and job description. These details are then seamlessly saved to your Notion workspace for easy access and future reference.

## Why Use J.A.T?

Are you tired of losing track of your job applications, only to hear back from companies weeks later? With J.A.T, you can bid farewell to the hassle of manually copying and pasting job details into your Notion database. J.A.T was born out of the need for a more efficient solution, saving you time and ensuring you never forget which roles you've applied for.

## Getting Started

Setting up J.A.T on your local machine might require a bit of initial effort, but once configured, it runs smoothly. Any future optimization efforts will only enhance this experience.

1. **Add Notion Template:** Begin by duplicating the provided Notion template in your workspace. To ensure proper functioning of the CLI, refrain from renaming the template's columns. [Notion Template Link](https://wry-tiger-6d4.notion.site/1cb27f52554943b0a11e49de24e346eb?v=92d6427bf03141aab691920765fa89b7)

2. **Retrieve Database ID:** Find the database ID for your duplicated template by following this guide: [Retrieve a Database](https://developers.notion.com/reference/retrieve-a-database).

3. **Create Notion Integration:** Create a Notion integration and grant it access to the aforementioned database. Make sure to keep the API token readily available. Follow this guide: [Create a Notion Integration](https://developers.notion.com/docs/create-a-notion-integration#give-your-integration-page-permissions).

4. **Clone the Repository:** Clone the J.A.T repository and create a `.env` file.

5. **Configure .env File:** Add your Notion API token and the database ID to the `.env` file.

6. **Install Dependencies:** Install the required CLI dependencies using the command `npm install`.

7. **Command Accessibility:** Make the J.A.T command accessible by running `npm install -g .`.

8. **You're Ready to Go:** With the setup complete, you can now add your first job posting using the command: `jat -u "linkedin_job_posting_url"`.

## Contributing

Your contributions to J.A.T are highly appreciated. If you have suggestions, improvements, or fixes, please feel free to open an issue or submit a pull request.

## License

J.A.T is released under the [MIT License](LICENSE).

---

*Disclaimer: J.A.T is a third-party tool and is not affiliated with LinkedIn or Notion.*
