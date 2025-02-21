# HSE Consultancy Information Form Project

This project is a web application developed to collect students' academic and social experiences and record them in a Google Sheets document.

## Project Description

The HSE Consultancy Information Form collects various information from students through the following questions:

1. Name and surname
2. School and grade information
3. Courses taken from programs such as IB, AP, or A-Level
4. Results from exams like IELTS, TOEFL, or Duolingo
5. Academic research experiences
6. Project participation details
7. Internship experiences
8. Participation in competitions
9. Volunteer work
10. Certified courses
11. Interests in sports or arts
12. Additional academic or social activities

When the form is submitted, this information is automatically saved to a Google Sheets document.

## Technologies Used

- **Next.js**: Used for frontend development.
- **Google Apps Script**: Used to save form data to Google Sheets.
- **Fetch API**: Used for communication between Next.js and Google Apps Script.

## Installation

1. **Download Project Code:**
   ```bash
   git clone <repo-link>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Google Sheets Integration:**
   - Create a new Google Sheets document.
   - Open **Extensions → Apps Script**.
   - Paste the provided `doPost(e)` function here.
   - Click **Deploy → New Deployment** and select **Web app**.
   - Set access to **Anyone** and copy the URL.

4. **API Endpoint Setup:**
   - Open the `app/api/saveToGoogleSheet/route.js` file in the project.
   - Replace the fetch URL here with your Google Apps Script URL.

5. **Start the Project:**
   ```bash
   npm run dev
   ```

## Usage

- Go to `http://localhost:3000` in your browser to access the form page.
- When you fill out and submit the form, the information will automatically be saved to Google Sheets.

## Contribution

For contributions:
1. Fork the repo.
2. Make your changes and commit.
3. Send a pull request.

## License

This project is licensed under the MIT License.

