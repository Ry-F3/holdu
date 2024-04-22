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

<br>

## User Stories 

#### Section 1

| #   | User Story                                                                                                      | Completed |
|-----|-----------------------------------------------------------------------------------------------------------------|-----------|
| [**#1**](https://github.com/Ry-F3/holdu/issues/1)   | As a new user, I want to be able to sign up for an account by providing my email, username, and password.      |    ✅     |
| [**#2**](https://github.com/Ry-F3/holdu/issues/2)   | If I already have an account, I should be notified that the chosen username or email is already in use.       |    ✅     |
| [**#3**](https://github.com/Ry-F3/holdu/issues/3)    | As a registered user, I want to log in to my account using my username/email and password.                     |    ✅     |
| [**#4**](https://github.com/Ry-F3/holdu/issues/4)    | As a user I would like to pick my profile type when registering.                                                |  ✅          |
| [**#5**](https://github.com/Ry-F3/holdu/issues/5)    | If my credentials are incorrect, I should receive an error message prompting me to try again.                  |      ✅      |
| [**#6**](https://github.com/Ry-F3/holdu/issues/6)    | Upon successful login, I should be redirected to the dashboard.                                                 |     ✅       |
| [**#7**](https://github.com/Ry-F3/holdu/issues/7)    | As a user, I want a top navigation bar with links to different sections of the application such as Home, Profile, Notifications, Messages, etc. |  ✅   |
| [**#8**](https://github.com/Ry-F3/holdu/issues/8)    | The navigation bar should also include options for logging out and accessing settings.                         |    ✅     |
| [**#9**](https://github.com/Ry-F3/holdu/issues/9)    | As a user on mobile devices, I want a bottom navigation bar for easy access to different sections of the application. |     ✅   |
| [**#10**](https://github.com/Ry-F3/holdu/issues/10)   | The bottom navigation should include icons or labels for Home, Profile, Notifications, Messages, etc.          |    ✅    |

<br>

#### Section 2

| #   | User Story                                                                                                                                           | Completed |
|-----|------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| [**#12**](https://github.com/Ry-F3/holdu/issues/12)   | As a user, I want to browse through available job listings.                                                                                          |    ✅     |
| [**#13**](https://github.com/Ry-F3/holdu/issues/13)   | As an Employer user I should be able to post adverts with details such as job title, company name, location, and a brief description.                |    ✅     |
| [**#14**](https://github.com/Ry-F3/holdu/issues/14)   | As an Employer user, I want to be able to manage my job listings.                                                                                     |    ✅     |
| [**#15**](https://github.com/Ry-F3/holdu/issues/15)   | As an Employee user, I want to be able to apply for jobs that interest me.                                                                            |    ✅     |
| [**#16**](https://github.com/Ry-F3/holdu/issues/16)   | As an Employee user, I want to be able to track the status of my job applications.                                                                    |    ❌     |
| [**#17**](https://github.com/Ry-F3/holdu/issues/17)   | As an employer, I want to be able to respond to job applications.                                                                                     |    ✅     |
| [**#18**](https://github.com/Ry-F3/holdu/issues/18)   | As a user, I want to view my profile information including name, profile type, content, image.                                                        |    ✅     |
| [**#19**](https://github.com/Ry-F3/holdu/issues/19)   | If I'm an employee, I should be able to add/edit my work experiences.                                                                                 |    ❌     |
| [**#20**](https://github.com/Ry-F3/holdu/issues/20)   | As a user I want to be able to rate other users and view their ratings.                                                                               |    ✅     |

<br>

#### Section 3

| #   | User Story                                                                                                                                           | Completed |
|-----|------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| [**#21**](https://github.com/Ry-F3/holdu/issues/21)  | As a user, I want to have control over the connections I establish on the platform.                                                                 |    ✅     |
| [**#22**](https://github.com/Ry-F3/holdu/issues/22)   | I should be able to view pending connection requests and manage them accordingly.                                                                    |    ✅     |
| [**#23**](https://github.com/Ry-F3/holdu/issues/23)   | As a user, I want to be able to view the connection requests I've sent to other users.                                                              |    ✅     |
| [**#24**](https://github.com/Ry-F3/holdu/issues/24)   | As a user, I want a centralized dashboard to manage all my connections.                                                                              |    ✅     |
| [**#25**](https://github.com/Ry-F3/holdu/issues/25)   | As a user, I want to receive notifications for connection requests, job alerts, accepted applications, message alerts, and new ratings.            |     ✅ / ❌     |
| [**#26**](https://github.com/Ry-F3/holdu/issues/26)   | I should be able to mark notifications as read or delete them.                                                                                        |    ✅ / ❌     |

<br>

#### Section 4


| #   | User Story                                                                                                                                      | Completed |
|-----|-------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| [**#27**](https://github.com/Ry-F3/holdu/issues/27) | As a user, I want to be able to leave reviews on users' profile pages that contribute to their average rating.                                |    ✅     |
| [**#28**](https://github.com/Ry-F3/holdu/issues/28) | As a user, I want to be able to see the employer's activity on their profile page.                                                           |    ✅    |
| [**#29**](https://github.com/Ry-F3/holdu/issues/29) | As a user, I want to be able to see the number of connections on a profile page.                                                              |    ✅    |
| [**#30**](https://github.com/Ry-F3/holdu/issues/30) | As a user, I want to see a defining badge to know if a user is looking to work or looking to hire.                                           |    ✅     |


## Development Choices

<br>

| Used Models         | Description                                     |
|---------------------|-------------------------------------------------|
| User                | Model representing the user entity.            |
| Custom Profile      | Model representing custom user profiles.       |
| Connection          | Model representing connections between users.  |
| Rating              | Model representing ratings given by users.     |
| Job                 | Model representing job listings.                |
| Application         | Model representing job applications.            |
| Notification        | Model representing notifications for users.    |
| Like                | Model representing likes on certain entities.  |

| Unused Models       | Description                                     |
|---------------------|-------------------------------------------------|
| Chat                | Model representing chat conversations.         |
| Message             | Model representing individual chat messages.   |
| Experience          | Model representing user work experiences.      |
| Comment             | Model representing comments on entities.       |

<br>

The unused models, including Chat, Message, Experience, and Comment, will be explored in future development plans to enhance the product and broaden the application's use case. These models represent features such as chat conversations, individual chat messages, user work experiences, and comments on entities within the application. Integrating these features will enrich the user experience and provide additional functionality, ultimately improving engagement and expanding the application's capabilities.

<br>

## Data Models

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

## Agile Methodology

<br>

During my development process, I experienced differing approaches between backend and frontend work, which were reflected in my utilization of the sprint boards.

The backend development proceeded smoothly, with a more concise approach and well-timed execution in line with the planning of user stories. The structured nature of backend tasks allowed for efficient progress tracking on the sprint boards, ensuring alignment with project goals and timely completion of objectives.

In contrast, frontend development presented more challenges, requiring a more fluid approach to address evolving requirements and complexities. The dynamic nature of frontend tasks necessitated frequent adjustments and iterations, making it challenging to adhere strictly to predefined sprint plans. As a result, the frontend sprint boards often saw more frequent updates and adaptations to accommodate changing needs and overcome hurdles encountered during development.

Overall, while backend work followed a more structured and predictable path facilitated by the sprint boards, frontend development demanded greater flexibility and adaptability to navigate the complexities inherent in building the user interface and ensuring a seamless user experience.


<hr>

#### Sprint 1 (March - April 2024)

<details>

<summary>Sprint details</summary>

<hr>

Description: A bit of a learning curve with React, and I have been humbled on many occasions. Unfortunately, I wasted a lot of time not realizing that the user context and the profile provider were the wrong way around in the index.js file. I kept getting unexpected data errors. Once fixed, the understanding came a little quicker.

[Board 1](https://github.com/users/Ry-F3/projects/6)



</details>

<hr>

#### Sprint 2 (March - April 2024)

<details>

<summary>Sprint details</summary>

<hr>

Description: Mostly focused on the jobs management tool and posting. Please note that due to the extended development time on this section, I left out 2 user stories: #16 and #19.

[Board 2](https://github.com/users/Ry-F3/projects/7)



</details>

<hr>

#### Sprint 3 (March - April 2024)

<details>

<summary>Sprint details</summary>

<hr>

Description: Mostly focused on utilizing the connections model and notifications. Please note that there are tick and cross, next to user stories #25 and #26 because they were half completed. Applicant notifications will be implemented in future developments.

[Board 3](https://github.com/users/Ry-F3/projects/8)



</details>

<hr>

#### Sprint 4 (March - April 2024)

<details>

<summary>Sprint details</summary>

<hr>

Description: Mostly focused on building the profile pages. This is in its most basic form and will need further expansion in future developments.

[Board 4](https://github.com/users/Ry-F3/projects/9)



</details>

<hr>






<hr>

## Technologies Used

### Frameworks and Libraries

### Key Packages


### Other Software


## Testing

<hr>

### Manual Testing

| Test Case                | Expected Outcome                                                                                                                    | Actual Outcome                                                                                                                                                                                                                                                                                                   |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Join Now Button          | User clicks "Join Now" button and is taken to a view to fill out information. Form is validated to prevent errors. After joining, user is redirected to sign in.                            | User successfully clicks "Join Now" button, fills out information, and is redirected to sign in. Form validation prevents errors.                                                                                                                                                                          |
| Signing In               | Upon initial sign in, user enters details. If any errors occur, appropriate messages indicate the issue. User is then directed to sign up form if `is_signup_completed` is `false`. Sometimes directed to sign up form upon reload or initially. | User enters details during sign in. Error messages indicate issues if any. User is directed to sign up form if `is_signup_completed` is `false`. Occasionally, sign up form appears upon reload or initial login.                                                                                                                                                            |
| Profile Choice Form      | After selecting a profile option (hire or work), user is taken to the home page with appropriate icons for the chosen profile.   | User selects a profile option and is redirected to the home page with icons corresponding to the chosen profile.                                                                                                                                                                                              |
| Home Page                | Depending on user's profile (employer or employee), different options are available. User can apply for jobs (if employee) or like jobs (if employer or employee). Mobile view hides top jobs, while desktop view shows top jobs.           | User can interact with appropriate options based on profile. Top jobs visibility varies between mobile and desktop views. Clicking on user profile name redirects to their profile page.                                                                                                                                                                             |
| Connections Page         | User can navigate to connections page using navbar or bottom navigation. Connection requests must be confirmed. Tool to manage connections works dynamically. User can click on connections' names or search bar to view their profile page.   | User successfully navigates to connections page. Connection requests require confirmation. Connection management tool works as expected. Clicking on connections' names or search bar redirects to their profile page.                                                                                                                                              |
| Jobs Icon                | Employer profile can post job ads, which are fully validated. Employer can manage ads, view applicants, and approve/reject applicants for closed listings.                          | Employer posts job ads successfully. Ads are validated and prevent posting without required fields. Employer can manage ads and view applicants. Approving/rejecting applicants for closed listings functions, but applicant status remains unchanged unexpectedly.                                                                                             |
| Notifications Icon       | Notifications show incoming notifications appropriately. Employee sees new job listings, while employer and employee see new ratings, connection requests, and connections.            | Notifications display correctly based on user profile. Employee receives new job listings notifications. Employer and employee receive new ratings, connection requests, and connections notifications.                                                                                                                                                             |
| Profile Page             | User can see average rating and ratings. Connections are displayed with option to click or delete, updating connection badge. Employer sees job listing activity.                | User can view average rating and ratings. Connections are displayed with click or delete options, updating connection badge. Employer views job listing activity.                                                                                                                                                                                                      |
| Navigation Search Bar    | Search bar works on all pages and takes user to home page. Clear button sometimes requires two clicks to work.                                                                           | Search bar successfully navigates to home page. Clear button occasionally requires two clicks to work, needing investigation for future developments.                                                                                                                                                                                                                   |


### Bugs

<br>

| Component               | Known Bug                                                                                                                                         | Investigate | Solution                                                                                                          | Implementation                                                          |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| ProfileViewPage.jsx     | Authentication errors. An ideal solution would be to create a new view for specific profile IDs where authentication is not needed as a list format. |             | Quick fix: Removed the authenticated permission class from the detail view, which seemed to solve the problem temporarily. | Profile view has not crashed again on further testing.                    |
| JobListItem.jsx         | Error code while fetching applicants. URL permissions are causing conflicts.                                                                        | Needs further investigation  | Trial removal of URL permissions caused recursive errors. Investigate and implement a solution to handle URL permissions effectively. | Error fetching applicants: Request failed with status code 400. Solutions will be found in further developments but seems to be causing no additional harm. Errors are present in the console.         |
| ProfileTypeChoiceForm.jsx | Implementation of a pop-up profile choice form on initial sign up was complex. Addition of a login count to prevent posting to a specific URL.    |             | Further solutions needed for a more efficient user experience. If pop-up box doesn't appear on joining, please reload the page.  | Pop-up profile choice form may not appear on initial sign-up. Reload page if necessary. |




#### Deployment Steps




## Bibliography



