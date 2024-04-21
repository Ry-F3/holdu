# Holdu
## React FrontEnd: Job Application Platform

![app](src/assets/readme/app-3.png)

*The deployed application link can be found here: [Holdu](https://hold-u-c52c62c74dca.herokuapp.com/)*

*Backend repository link can be found here: [link](https://github.com/Ry-F3/holdu-drf-api)*

## Key Features:

<br>

#### **Employer Profile Overview:**

The Employer Profile provides a comprehensive set of tools and features tailored to the needs of employers. Below are the key features offered by the Employer Profile experience:

Key features of this profile type include:

- **Jobs Management Tool:**
  - Post, edit, and update job listings with ease.
  - View applicants for each job and make decisions to accept or reject them.

- **Profile Type Selection Form:**
  - Employ a customizable user form where users can select their profile type and provide relevant profile information tailored specifically for employer profiles.

- **Connection Management:**
  - Connect with other users and efficiently manage connections within the platform.

- **View Profile:**
  - Access detailed profiles of other users to view their ratings, activity, and profile details.
  - Edit profile details and upload profile images as needed.

- **Alerts and Management Tool:**
  - Receive and manage notifications and alerts related to connections, connection requests, new ratings, and new job listings.

<br>

#### **Employee Profile Overview:**

Originally intended for a more interactive experience, the Employee Profile Type had to be simplified to meet development time constraints. To align with the applicant model, users can apply and unapply for jobs, while employers can accept or reject their applications.

Key features of this profile type include:

- **Apply and Unapply:** Users can apply for jobs they're interested in and withdraw their applications if needed.

- **Like Job Adverts:** Employees can express interest in job listings by liking them.

- **Receive Alerts:** Stay informed about new job listings with alerts.

- **Connect and Rate Profiles:** Connect with other users and rate their profiles based on interactions.

While the current iteration provides basic functionality, future developments will include a management tool for employees to track and respond to their accepted applications, enhancing the overall user experience.

<br>

### **Mobile Design <code>profile_type="employer"</code>:** 

*Refer below to view the details and screenshots for the employer profiles mobile design experience.*

<br>

<details>

<summary>Workflow board [1]</summary>

<hr>

![board-1](src/assets/readme/board-1.png)


<details>

<summary>Details [1]</summary>

<br>

* **User Authentication:**
    * Unauthenticated users are directed to the home page where they can browse job listings.
    * To interact with job listings, users must either join or sign in if they are returning users.
* **Navigation Bar:**
    * The navigation bar provides easy access for users to search for jobs.
* **Form Validation:**
    * The forms for joining and signing in have validation mechanisms in place.
    * These validation features are similar to those demonstrated in the walkthrough project.
    * Code for form validation has been reused, ensuring consistency and reliability.
* **Customized Form:**
    * The form includes a field prompting users to specify what they are looking for, providing insight into their preferences.
    * Note that while a custom Django login was not implemented, this feature emphasises the applications intention regarding the site's content.
* **Simplistic Design:**
    * The design incorporates simplistic colors inspired by the logo, enhancing visual coherence and brand identity.
</details>

</details>

<hr>

<details>

<summary>Workflow board [2]</summary>

<hr>

![board-2](src/assets/readme/board-2.png)

<details>

<summary>Details [2]</summary>

<br>

* **User Authentication:**
  * Upon signing in for the first time after joining, users are directed to a form where they must fill out their details and specify what they are looking for, determining their profile_type.
  * To interact with the platform's features, users are required to join or sign in, catering to both new and returning users.

* **Navigation Bar:**
   * The bottom navigation features active colors to indicate the current page, enhancing user navigation and experience.
   * Users can navigate to the connections page by clicking on the connection icon.
   * On the connections page, users can send connections and view other profiles, with tabs to manage their pending and sent connections.

* **Form Validation:**
  * Forms for user registration and profile setup incorporate validation mechanisms to ensure accurate data entry and a smooth user experience.
  * These validation features align with industry standards and best practices, similar to those demonstrated in the walkthrough project.
  * On the home page, there is a validation mechanism to prevent the owner from liking their own posts.

* **Customized Form:**
  * During profile setup, users are prompted to specify what they are looking for, shaping their profile_type within the platform.
  * Please note that development focus has primarily been on the employer profile type to meet project timelines.
</details>

</details>

<hr>

<details>

<summary>Workflow board [3]</summary>

<hr>

![board-3](src/assets/readme/board-3.png)

<details>

<summary>Details [3]</summary>

<br>


* **Jobs Page Navigation**:
    * Users can navigate to the jobs page where they can view their open and closed listings.
    * Active listings are marked with a teal green tick, while closed listings display a red cross next to the open date.

* **Job Management**:
    * Once a job listing is closed, users have the option to accept or reject applicants.
    * Accepted applicants are stored in a designated "Accepted" folder for easy reference.

* **Filter Toggle**:
    * Users can toggle the filter to view and post jobs using the "Post Job Advert" form.
    * The form validates user data and displays Bootstrap alerts and warnings for improved user experience.

* **Edit Functionality**:
    * Users can click the "Edit" button on active listings to open a pop-up form and make edits to their job listings.

</details>

</details>

<hr>

<details>

<summary>Workflow board [4]</summary>

<hr>

![board-4](src/assets/readme/board-4.png)

<details>

<summary>Details [4]</summary>

<br>

* **Applicant Panel**:
    * On active listings, users can dropdown a panel to view the applicants for each job.
    * Clicking on the filter toggle cycles through the active and inactive listings. However, there are known bugs affecting the functionality. The issue may be attributed to a key error or data communication problem between the child and parent components.

* **Profile Page Navigation**:
    * Navigating to the profile page, users can view their profile type badge, average_rating, and connection count.
    * Users can also view and cycle through individual reviews.

* **Activity Panel**:
    * An activity panel has been implemented on the users profile to record employer profile type activities such as listing jobs. However, it is currently in a basic state and will be part of future development.

* **Profile Information Editing**:
    * Users can edit their profile information by clicking on the ellipsis icon.

* **Bug Explaination**:
    * When filtering through active and inactive job listings, applicants remain in their original positions on the page, while the data associated with the listings changes positions. This leads to a discrepancy where applicants appear to be attached to the wrong jobs or remain unaffected by the filtering action.


</details>

</details>

<hr>

<details>

<summary>Workflow board [5]</summary>

<hr>

![board-5](src/assets/readme/board-5.png)

<details>

<summary>Details [5]</summary>

<br>


* **Navigation to Alerts Icon:** 
    * Users can navigate to the alerts icon to view their notifications for connections, connection requests, new ratings, and new jobs. The labels are clearly displayed at the top in a small panel to inform the user.

* **Alert Types:** 
    * Please note that there are currently no alerts for applicants applying to the user's jobs. This feature will be added in future developments as it was overlooked during initial implementation. However, the applicant count is clearly defined on the job management page.

* **Alert Deletion:**
  * **Single Alert Deletion:** If the user clicks the delete icon without selecting an alert, a warning message will prompt the user to select at least one alert.
  * **Bulk Alert Deletion:** Clicking the tick icon will select all alerts, allowing the user to delete them all at once.
  * **Empty Alerts Notification:** Once all alerts are deleted, the user will be notified that their alerts are empty.

</details>

</details>

<hr>



<br>


### **Mobile Design <code>profile_type="employee"</code>:** 

*Refer below to view the details and screenshots for the employee profiles mobile design experience.*

<br>

![employee-board-1](src/assets/readme/employee-board-1.png)

<br>

**Authentication:**
  - Users must be authenticated with the employee profile type to have a different setup for the navigation icons.

  **Navigation Setup:**
  - The JobsPost file runs a check to see whether the user is an employee.
  - If the user is authenticated as an employee, the file displays the buttons for applying and unapplying for jobs.

<br>

### **Desktop Design Differences:**

<br>

<details>


<summary>Desktop [1]</summary>

<hr>

![desktop-1](src/assets/readme/desktop-1.png)

<details>

<summary>Details [1]</summary>

<br>

* Please be aware that while the design layout code was borrowed from the Code Institute walkthrough project, an image was sourced from [Storyset](https://storyset.com/illustration) to suit the application. I utilized Photoshop to edit the image, to ensure color consistency with my application.


</details>

</details>

<hr>

<details>


<summary>Desktop [2]</summary>

<hr>

![desktop-6](src/assets/readme/desktop-6.png)

<details>

<summary>Details [2]</summary>

<br>


* The desktop view of the home page features a sidebar that analyzes the top jobs with the most applicants. It identifies the top 6 jobs based on the number of applicants. Clicking on any of these jobs filters the job listings for the user, allowing them to apply if they are an employee <code>profile_type</code>.


</details>

</details>

<hr>

<details>



<summary>Desktop [3]</summary>

<hr>

![desktop-4](src/assets/readme/desktop-4.png)


<details>

<summary>Details [3]</summary>

<br>

* Clicking on the user's profile icon in the navbar will direct them to their profile page. The profile page features a sidebar, allowing the owner to easily navigate to their connections' profile pages.

</details>

</details>

<hr>

<details>


<summary>Desktop [4]</summary>

<hr>

![desktop-1](src/assets/readme/desktop-5.png)


<details>

<summary>Details [4]</summary>

<br>

* The rating form is located in the sidebar when viewing another user's profile page. If the user has more than three reviews, a horizontal review carousel is automatically activated, allowing for seamless navigation through the reviews.

</details>

</details>

<hr>

## User Stories 

#### Section 1

| #   | User Story                                                                                                      | Completed |
|-----|-----------------------------------------------------------------------------------------------------------------|-----------|
| 1   | As a new user, I want to be able to sign up for an account by providing my email, username, and password.      |    ✅     |
| 2   | If I already have an account, I should be notified that the chosen username or email is already in use.       |    ✅     |
| 3   | As a registered user, I want to log in to my account using my username/email and password.                     |    ✅     |
| 4   | As a user I would like to pick my profile type when registering.                                                |  ✅          |
| 5   | If my credentials are incorrect, I should receive an error message prompting me to try again.                  |      ✅      |
| 6   | Upon successful login, I should be redirected to the dashboard.                                                 |     ✅       |
| 7   | As a user, I want a top navigation bar with links to different sections of the application such as Home, Profile, Notifications, Messages, etc. |  ✅   |
| 8   | The navigation bar should also include options for logging out and accessing settings.                         |    ✅     |
| 9   | As a user on mobile devices, I want a bottom navigation bar for easy access to different sections of the application. |     ✅   |
| 10  | The bottom navigation should include icons or labels for Home, Profile, Notifications, Messages, etc.          |    ✅    |

<br>

#### Section 2

| #   | User Story                                                                                                                                           | Completed |
|-----|------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| 12  | As a user, I want to browse through available job listings.                                                                                          |    ✅     |
| 13  | As an Employer user I should be able to post adverts with details such as job title, company name, location, and a brief description.                |    ✅     |
| 14  | As an Employer user, I want to be able to manage my job listings.                                                                                     |    ✅     |
| 15  | As an Employee user, I want to be able to apply for jobs that interest me.                                                                            |    ✅     |
| 16  | As an Employee user, I want to be able to track the status of my job applications.                                                                    |    ❌     |
| 17  | As an employer, I want to be able to respond to job applications.                                                                                     |    ✅     |
| 18  | As a user, I want to view my profile information including name, profile type, content, image.                                                        |    ✅     |
| 19  | If I'm an employee, I should be able to add/edit my work experiences.                                                                                 |    ❌     |
| 20  | As a user I want to be able to rate other users and view their ratings.                                                                               |    ✅     |






| Section 3 |


## Agile Methodology



<hr>

#### Sprint 1 ()

<details>

<summary>Sprint details</summary>

<hr>


</details>

<hr>

#### Sprint 2 ()

<details>

<summary>Sprint details</summary>

<hr>



</details>

<hr>

#### Sprint 3 ()

<details>

<summary>Sprint details</summary>

<hr>


</details>

<hr>

## Data Models

<hr>



<hr>

### Profile Model


### Rating Model


### Notification Model


### Like Model


### Comment Model

**Not Used**

### WorkExperience Model
**Not Used**

### Connection Model


### Chat Model
**Not Used**

### Message Model
**Not Used**

<hr>



<hr>

## Technologies Used

### Frameworks and Libraries

### Key Packages


### Other Software


## Testing

<hr>

### Manual Testing




#### Deployment Steps




## Bibliography



