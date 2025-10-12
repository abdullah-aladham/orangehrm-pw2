## OrangeHrm-pw2

# <p>Welcome to <code>OrangeHrm-pw2</code>Repo</p>

<p>
This project demonstrates an E2E testing for OrangeHrm open-source demo web application.
<a href="https://opensource-demo.orangehrmlive.com/web/index.php/auth/login">Orange HRM website</a>
</p>
<h2><strong>RUN CODE</strong></h2>
<p>To run the tests on your local machine , first make sure that your machine meets the <a href="https://playwright.dev/docs/intro#system-requirements" rel="nofollow">Playwright System Requirements</a>,including the installation of <a href="https://nodejs.org/en/download" target="_blank" rel="nofollow">NodeJs</a> <code>v.20+ </code></p>
<p dir="auto">Executing the following commands will clone the Repo, installing Playwright</p>
```bash
git clone https://github.com/abdullah-aladham/orangehrm-pw2.git #cloning the repo on your machine
cd orangehrm-pw2 # entering the project directory
npm ci #it installs dependencies that are configured in <code>package.json</code>
npx playwright test #command to run all tests
npx playwright test example.spec.ts #to run a single test file
```
