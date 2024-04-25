# Holdu
## React FrontEnd: Job Application Platform

![app](src/assets/readme/app-3.png)

*The deployed application link can be found here: [Holdu](https://hold-u-c52c62c74dca.herokuapp.com/)*

*Backend repository link can be found here: [link](https://github.com/Ry-F3/holdu-drf-api)*


## Mission Statement

<br>

Since 2016, I have been working in the health and social sector, collaborating with agencies and private organizations. Through conversations with clients, served by these agencies, I discovered a recurring problem: the absence of a personal touch.

My realization inspired this project. While previously considering self-employment, the challenge lay in finding a support worker to fill in during my absence and vice versa. While platforms like LinkedIn cater well to professionals, they may seem daunting for the health and social use cases. I aimed to develop a product with a less intimidating interface, characterized by soothing colors.

I envisioned a solution born from real-life experiences, facilitating direct connections between individuals and empowering families to hire support directly. Although the product is currently in its MVP stage, with features yet to be fully realized, this mission statement serves as the guiding principle for the project's completion.

Related fully realised products: [Childcare.co.uk](https://www.childcare.co.uk/?gad_source=1&gclid=CjwKCAjwuJ2xBhA3EiwAMVjkVJLap_mlDyBOYIXU_DjqeIY-XD30xb-lTyK4Ne0MSdhidUmqoIg98hoCQn4QAvD_BwE)


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

## Wireframes

### Website Design Planning with Balsamiq

Balsamiq was used to construct a basic plan for the design of the website. Note that it is mostly in line with the walkthrough project as I wanted to concentrate on exploring my jobs and applicant complex model design.

[Learn more about Balsamiq](https://balsamiq.com/)


<br>

<details>
<summary>Wireframe 1</summary>
<br>

![wireframe-1](src/assets/readme/wireframes/wireframe-1.png)
<br>
*Initial landing page (Unauthenticated)*
</details>
<hr>
<details>
<summary>Wireframe 2</summary>
<br>

![wireframe-2](src/assets/readme/wireframes/wireframe-2.png)
<br>
*Join now page with image*
</details>
<hr>
<details>
<summary>Wireframe 3</summary>
<br>

![wireframe-3](src/assets/readme/wireframes/wireframe-3.png)
<br>
*Signin page with image*
</details>
<hr>
<details>
<summary>Wireframe 4</summary>
<br>

![wireframe-4](src/assets/readme/wireframes/wireframe-4.png)
<br>
*Profile information and profile_type choice pop up on initial login*
</details>
<hr>
<details>
<summary>Wireframe 5</summary>
<br>

![wireframe-5](src/assets/readme/wireframes/wireframe-5.png)
<br>
*Home page with top jobs sidebar*
</details>
<hr>
<details>
<summary>Wireframe 6</summary>
<br>

![wireframe-6](src/assets/readme/wireframes/wireframe-6.png)
<br>
*Connections page with profile list sidebar*
</details>
<hr>
<details>
<summary>Wireframe 7</summary>
<br>

![wireframe-7](src/assets/readme/wireframes/wireframe-7.png)
<br>
*Jobs page, post jobs listings with CRUD funtionalities*
</details>
<hr>
<details>
<summary>Wireframe 8</summary>
<br>

![wireframe-8](src/assets/readme/wireframes/wireframe-8.png)
<br>
*Alerts page with CRUD functionalities*
</details>
<hr>
<details>
<summary>Wireframe 9</summary>
<br>

![wireframe-9](src/assets/readme/wireframes/wireframe-9.png)
<br>
*Profile page with user information including reviews*
</details>
<hr>
<br>

## User Stories 

#### Section 1

<br>

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

### Remaining models to be Explored in Future Development

The unused models, including Chat, Message, Experience, and Comment, will be explored in future development plans to enhance the product and broaden the application's use case. These models represent features such as chat conversations, individual chat messages, user work experiences, and comments on entities within the application. Integrating these features will enrich the user experience and provide additional functionality, ultimately improving engagement and expanding the application's capabilities.

The addition of a `profile_type` specifically designed for administrators is another missing feature that warrants attention in future development. This profile type would grant administrators greater control and oversight of user capabilities and functionalities. Although stipulated in the backend, its implementation requires further exploration in future iterations. At present, logging in with the super user does not offer any additional functionalities compared to other user profiles. Integrating an admin profile type would provide enhanced administrative tools and capabilities, contributing to more efficient management of the application.

<br>

## File Tree

<br>

![components](src/assets/readme/components.png)

<br>

The folders within the <strong>components</strong> directory serve to establish a close relationship with the corresponding pages in the application. Each folder corresponds to a specific section or feature of the application, reflecting the organization of the pages and their functionalities.

* **connections**: Contains components related to interactions and networking functionalities.

* **jobs**: Hosts components essential for job-related functionalities, including job creation, browsing, and posting.

* **profiles**: Contains components related to user profiles, including profile creation and viewing.

* **navigation**: Holds components essential for navigation across the application.

<br>

![pages](src/assets/readme/pages.png)

<br>

* **auth**: Contains components for user authentication, including sign-in and sign-up forms.

* **notifications**: Contains the NotificationsPage.jsx file. Please note that NotificationsPage.jsx is the only file not broken down into its components and will be developed further in the future.

* **profiles**: Houses files related to user profiles, including profile type choice and profile viewing functionalities.

* **jobs**: Hosts page files related to job functionalities, such as job creation, browsing, and posting.


In retrospect, the power of components is evident, particularly on the user's personal profile page where the ConnectionsTab component was reused and hosted on ProfileViewPage.js for the owner's profile. It may also be useful to consider implementing a clickable connections badges, allowing users to see their connections' profiles more easily.

#### Re-used components

*Please refer below to see how ConnectionsTab.jsx component, is used within two distinct pages.*

<br>

<details>
  <summary>ConnectionsPage.jsx</summary>
  
  <br>

  ![component-1](src/assets/readme/component-1.png)

</details>
<hr>
<details>
  <summary>ProfileViewPage.jsx</summary>

  <br>
  
  ![component-2](src/assets/readme/component-2.png)

</details>
<hr>

<br>

## Colors

Coolors was used to create [this color palette](https://coolors.co/f34213-ca417f-fc7fb6-41ead4-ffffff):

<br>

![Coolors Logo](src/assets/readme/coolors.png)

<hr>

<br>

The project incorporates the following colors, with the initial color inspired by the logo:

<br>

<details>
  <summary>Holdu Logo</summary>

  <br>
  
  ![logo](src/assets/logo.png)

  *Photoshop was used to create this logo.*

</details>

<br>

- **#FC7FB6**: This color serves as the starting point for the project, inspired by the logo. It likely represents a prominent aspect of the project's branding or identity.

- **#41EAD4**: This color adds a vibrant turquoise accent, possibly used to highlight important elements or for contrast.

- **#CA417F**: This shade of pink adds warmth and complements the primary color (#FC7FB6), likely used for accents or to convey a sense of playfulness.

- **#F34213**: This deep orange-red shade adds contrast and energy, possibly used for highlighting important buttons or calls to action.

- **#FFFFFF**: This color represents white, likely used for backgrounds or to create contrast with darker elements.


<br>

## Form Validation

<br>

In my form validation process, I've chosen to use Bootstrap Alerts to effectively communicate errors to the user. This ensures that any issues with my form submissions are clearly highlighted. Additionally, withinform controls, I've implemented the `required` prop to indicate to the user that certain fields must be filled out before they can successfully post. This combination of Bootstrap Alerts and the `required` prop enhances user experience by guiding them through the form submission process and reducing potential errors.

<br>

<details>
<summary>Prop required</summary>
<br>

![validation-1](src/assets/readme/validation-2.png)

</details>
<hr>
<details>
<summary>Bootstrap Alerts</summary>
<br>

![validation-2](src/assets/readme/validation-1.png)

</details>
<hr>
<details>
<summary>Bootstrap Alerts</summary>
<br>

![validation-3](src/assets/readme/validation-3.png)

</details>
<hr>

<br>

## Agile Methodology

<br>

During my development process, I experienced differing approaches between backend and frontend work, which were reflected in my utilization of the sprint boards.

The backend development proceeded smoothly, with a more concise approach and well-timed execution in line with the planning of user stories. The structured nature of backend tasks allowed for efficient progress tracking on the sprint boards, ensuring alignment with project goals and timely completion of objectives.

In contrast, frontend development presented more challenges, requiring a more fluid approach to address evolving requirements and complexities. The dynamic nature of frontend tasks necessitated frequent adjustments and iterations, making it challenging to adhere strictly to predefined sprint plans. As a result, the frontend sprint boards often saw more frequent updates and adaptations to accommodate changing needs and overcome hurdles encountered during development.

Overall, while backend work followed a more structured and predictable path facilitated by the sprint boards, frontend development demanded greater flexibility and adaptability to navigate the complexities inherent in building the user interface and ensuring a seamless user experience.

#### MoSCoW labeling [link](https://github.com/Ry-F3/holdu/labels)

- **CRUD: Tag**: Implementation of basic CRUD operations for managing tags.
- **EPIC: Jobs**: Large-scale feature development related to job-related functionalities.
- **EPIC: Likes and Comments**: Development of features related to liking and commenting on content.
- **EPIC: Network**: Development of functionalities related to user networks.
- **EPIC: Notification**: Development of notification system features.
- **EPIC: Ratings**: Implementation of features related to user ratings.
- **EPIC: Skills**: Development of features related to user skills management.
- **EPIC: User Profiles Types**: Development of features related to different types of user profiles.
- **PRIORITY: Could-Have**: Features or tasks that are optional but desirable.
- **PRIORITY: Must-Have**: Features or tasks that are essential for the project's success.
- **PRIORITY: Should-Have**: Features or tasks that are important but not critical.
- **PRIORITY: Wont-Have**: Features or tasks that will not be included in the project scope.
- **wontfix**: Indicates that a reported issue will not be addressed or fixed.

<br>

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


## Technologies Used

### Frameworks and Libraries
- React
- JSX
- Code Institute templates
- Bootstrap
- React Bootstrap
- React Router

### Key Packages
- Axios: Used for making HTTP requests to the API.

### Other Software
- Heroku: Deployment platform.
- GitHub: Used for version control and project management.
  - GitHub Issues: Utilized for Agile methodology by assigning user stories to issues and using labels for organization.
  - GitHub Projects: Used for Agile sprint planning and task tracking. 
- Chrome Lighthouse: Used for performance auditing.
- Photoshop: Used for design and image editing.



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
| Jobs Page                | Employer profile can post job ads, which are fully validated. Employer can manage ads, view applicants, and approve/reject applicants for closed listings.                          | Employer posts job ads successfully. Ads are validated and prevent posting without required fields. Employer can manage ads and view applicants. Approving/rejecting applicants for closed listings functions, but applicant status remains unchanged unexpectedly.                                                                                             |
| Notifications Page      | Notifications show incoming notifications appropriately. Employee sees new job listings, while employer and employee see new ratings, connection requests, and connections.            | Notifications display correctly based on user profile. Employee receives new job listings notifications. Employer and employee receive new ratings, connection requests, and connections notifications.                                                                                                                                                             |
| Profile Page             | User can see average rating and ratings. Connections are displayed with option to click or delete, updating connection badge. Employer sees job listing activity.                | User can view average rating and ratings. Connections are displayed with click or delete options, updating connection badge. Employer views job listing activity.                                                                                                                                                                                                      |
| Navigation Search Bar    | Search bar works on all pages and takes user to home page. Clear button sometimes requires two clicks to work.                                                                           | Search bar successfully navigates to home page. Clear button occasionally requires two clicks to work, needing investigation for future developments.                                                                                                                                                                                                                   |
<br>

#### W3C Validator CSS

<br>

All CSS files have been validated using the W3C CSS Validator. Some files initially had mistakes, but they were rectified to ensure compliance with CSS standards.

<br>


| File                     | Pass             |
|--------------------------|------------------|
| Asset.module.css         | &#10003;         |
| Avatar.module.css        | &#10003;         |
| BottomNav.module.css     | &#10003;         |
| Button.module.css        | &#10003;         |
| ConnectionsPage.module.css | &#10003;       |
| DummyBoxes.module.css    | &#10003;         |
| JobAdListItem.module.css | &#10003;         |
| JobPostHomeItem.module.css | &#10003;       |
| JobsCreateForm.module.css | &#10003;        |
| JobsPost.module.css      | &#10003;         |
| NavBar.module.css        | &#10003;         |
| Notification.module.css  | &#10003;         |
| Pointer.module.css       | &#10003;         |
| ProfileView.module.css   | &#10003;         |
| SignInUpForm.module.css  | &#10003;         |
| Spinner.module.css       | &#10003;         |
| TopJobs.module.css       | &#10003;         |
| ApplicantItem.module.css | &#10003;         |

<br>

#### W3C Validator HTML

<br>

All HTML files have been validated using the W3C HTML Validator. The following images show the validation results for each file:

<details>
  <summary>Url: '/' </summary>

  <br>
  
  ![url-home](src/assets/readme/url-home.png)

</details>
<hr>
<details>
  <summary>Url: '/connect'</summary>

  <br>
  
  ![url-connect](src/assets/readme/url-connect.png)

</details>
<hr>
<details>
  <summary>Url: '/jobs/post'</summary>

  <br>
  
  ![url-jobs-post](src/assets/readme/url-jobs-post.png)

</details>
<hr>
<details>
  <summary>Url: '/jobs/post/:id'</summary>

  <br>
  
  ![url-jobs-post-id](src/assets/readme/url-jobs-post-125.png)

</details>
<hr>
<details>
  <summary>Url: '/notifications'</summary>

  <br>
  
  ![url-notification](src/assets/readme/url-notifications.png)

</details>
<hr>
<details>
  <summary>Url: '/jobs/profiles/:id/user/'</summary>

  <br>
  
  ![url-profiles-user](src/assets/readme/url-profiles-2-user.png)

</details>
<hr>

<br>

### Automated Testing

<br>

#### My Testing Experience with ESLint

##### Issues Encountered:
1. **Initial Installation**: I faced some difficulties during the installation of ESLint. The correct command for installing ESLint with npm is <code>`npx install eslint --save-dev`</code>.

2. **File Type Selection**: Initially, I opted for JSX files for their compatibility with the built-in Prettier plugin. However, this decision led to compatibility issues with ESLint.

3. **Configuration Challenges**: Configuring ESLint to work with JSX syntax was a bit challenging. I had to ensure that ESLint was set up to lint both JavaScript and React files.

4. **Conversion to JS**: To address the issues with ESLint, I decided to convert all JSX files to JavaScript files to simplify linting.

5. **Running ESLint**: After configuring ESLint, I ran ESLint using the command <code>`npx eslint .`</code>  to identify and fix linting errors in my project.

6. **Error Detection**: ESLint detected various errors in my codebase, including missing React imports and props validation errors.

7. **Workspace Cleanup**: Due to issues with ESLint's auto-fix feature causing breaking errors in my application, I decided to discard the workspace where ESLint was used.

**Future Development**: Moving forward, I plan to address the identified errors below in future developments to enhance the code quality and maintainability of the project.

#### Summary:
Overall, my testing experience with ESLint involved troubleshooting installation issues, configuring ESLint for JSX syntax, converting file types, and identifying and addressing linting errors.

<hr>

<details>

<hr>

  <summary>Eslint</summary>

  <p><strong>Dropdown Selection:</strong> "Eslint Testing"</p>

  <br>

  ![eslint](src/assets/readme/eslint.png)

  <br>
  
  | File                                                             | Line   | Error                                                                                         |
|------------------------------------------------------------------|--------|-----------------------------------------------------------------------------------------------|
| /workspace/holdu/src/App.js                                     | 32-72  | 'React' must be in scope when using JSX                                                      |
| /workspace/holdu/src/App.test.js                                | 5      | 'React' must be in scope when using JSX                                                      |
| /workspace/holdu/src/components/Asset.js                        | 6      | 'loading', 'src', 'message' are missing in props validation                                  |
| /workspace/holdu/src/components/Avatar.js                       | 5      | 'src', 'height', 'border' are missing in props validation                                    |
| /workspace/holdu/src/components/Spinner.js                      | 4      | 'size' is missing in props validation                                                        |
| /workspace/holdu/src/components/connections/ConnectionsTab.js   | 9, 14, 43, 50, 59  | Various props like 'connections', 'handleDeleteConnection', etc. are missing in props validation  |
| /workspace/holdu/src/components/connections/PendingTab.js       | 9, 12, 40, 47  | Various props like 'pendingConnections', 'handleAccept', 'handleDecline', etc. are missing in props validation  |
| /workspace/holdu/src/components/connections/RecentProfiles.js  | 9-17, 28, 34, 40, 46, 86  | Various props like 'activeTabProfiles', 'searchQuery', 'filteredProfiles', etc. are missing in props validation  |
| /workspace/holdu/src/components/connections/SentTab.js          | 9, 13, 42, 49  | Various props like 'connections', 'handleUnsend', etc. are missing in props validation  |
| /workspace/holdu/src/components/job/ApplicantItem.js            | 3, 11, 12, 16, 18, 22  | Various props like 'applicant', 'applicant.image', 'applicant.owner_username', etc. are missing in props validation  |
| /workspace/holdu/src/components/job/ApprovedApplicantItem.js   | 3, 12, 13, 17, 30, 36  | Various props like 'applicant', 'applicant.applicant', 'applicant.employee_acceptance_response', etc. are missing in props validation  |
| /workspace/holdu/src/components/job/JobAdListItem.js           | 16, 58, 61, 74, 99, 104, etc.  | Various props like 'ad', 'ad.job_listing_id', 'ad.closing_date', etc. are missing in props validation  |
| /workspace/holdu/src/components/job/JobPostHomeItem.js         | 6-11  | Various props like 'title', 'description', 'location', etc. are missing in props validation  |
| /workspace/holdu/src/components/job/TopJobs.js                 | 10-16  | Various props like 'popularJobs', 'handleJobClick', 'handleClearClick', etc. are missing in props validation  |
| /workspace/holdu/src/components/miscellaneous/DummyApplicantBox.js | 3  | 'index' is missing in props validation                                                      |
| /workspace/holdu/src/components/navigation/LoggedOutLogo.js    | 11-15  | 'React' must be in scope when using JSX                                                      |
| /workspace/holdu/src/components/navigation/NavBar.js           | 32  | 'handleSearch' is missing in props validation                                                |
| /workspace/holdu/src/components/profile/ProfileBadges.js       | 4, 25, 27, 30, 34  | Various props like 'profile', 'acceptedConnections', etc. are missing in props validation  |
| /workspace/holdu/src/components/profile/ProfileHeader.js       | 9-12, 18, 19, 23, 28, 42, etc.  | Various props like 'profile', 'currentUser', 'showRatingForm', etc. are missing in props validation  |
| /workspace/holdu/src/components/profile/activity/Activity.js   | 5, 11  | Various props like 'postCount', 'filteredJobsPost', etc. are missing in props validation  |
| /workspace/holdu/src/components/profile/rating/HorizontalRatingList.js | 4, 10  | Various props like 'ratings', 'currentIndex', etc. are missing in props validation  |
| /workspace/holdu/src/components/profile/rating/RatingContent.js | 3, 6  | Various props like 'ratings', 'currentIndex', 'handleStarClick', etc. are missing in props validation  |
| /workspace/holdu/src/components/profile/rating/RatingForm.js  | 7-12  | Various props like 'rating', 'handleStarClick', 'comment', etc. are missing in props validation  |
| /workspace/holdu/src/components/profile/rating/RatingNavigationButtons.js | 5  | 'prevRating', 'nextRating' are missing in props validation                                   |
| /workspace/holdu/src/contexts/CurrentUserContext.js            | 24, 175-177  | 'children', 'React' is missing in props validation                                           |
| /workspace/holdu/src/contexts/ProfileContext.js                | 13  | 'children' is missing in props validation                                                    |
| /workspace/holdu/src/index.js                                   | 11  | ReactDOM.render is deprecated since React 18.0.0, use createRoot instead                       |
| /workspace/holdu/src/pages/auth/SignInForm.js                  | 110  | `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`                               |
| /workspace/holdu/src/pages/jobs/JobsCreateForm.js              | 25, 487  | 'searchQuery', 'fetchApplicants' are missing in props validation                              |
| /workspace/holdu/src/pages/jobs/JobsHomePage.js                | 20  | 'searchQuery' is missing in props validation                                                  |
| /workspace/holdu/src/pages/jobs/JobsPost.js                    | 14-27, 33, 35, 40, 163, 166, etc.  | Various props like 'job_listing_id', 'title', 'description', etc. are missing in props validation  |



</details>

<hr>

<details>

<hr>

  <summary>Wave</summary>

  <p><strong>Dropdown Selection:</strong> "Wave"</p>

   ![wave](src/assets/readme/wave.png)

 <br>
  
  <p><strong>Issue Encountered:</strong> While attempting to test with "wave", the system encountered difficulties. Unfortunately, it did not allow access to other pages and consistently displayed the error message "Page Not Found."</p>


</details>

<hr>

<br>

### Bugs

<br>

| File               | Known Bug                                                                                                                                         | Investigate | Solution                                                                                                          | Implementation                                                          |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| ProfileViewPage.jsx     | Authentication errors. An ideal solution would be to create a new view for specific profile IDs where authentication is not needed as a list format. |             | Quick fix: Removed the authenticated permission class from the detail view, which seemed to solve the problem temporarily. | Profile view has not crashed again on further testing.                    |
| JobListItem.jsx         | Error code while fetching applicants. URL permissions are causing conflicts.                                                                        | Needs further investigation  | Trial removal of URL permissions caused recursive errors. Investigate and implement a solution to handle URL permissions effectively. | Error fetching applicants: Request failed with status code 400. Solutions will be found in further developments but seems to be causing no additional harm. Errors are present in the console.         |
| ProfileTypeChoiceForm.jsx | Implementation of a pop-up profile choice form on initial sign up was complex. Addition of a login count to prevent posting to a specific URL.    |             | Further solutions needed for a more efficient user experience. If pop-up box doesn't appear on joining, please reload the page.  | Pop-up profile choice form may not appear on initial sign-up. Reload page if necessary. |

### Errors 

<br>

<details>
  <summary>Error [1]</summary>
  <br>
  
  ![error](src/assets/readme/error-1.png)

  <br>

  *This warning indicates the usage of the deprecated `findDOMNode` function within a component wrapped in React's `StrictMode`. This function is being called on an instance of `RefHolder`, which is inside `StrictMode`. React advises against using `findDOMNode` due to potential performance issues and unexpected behavior, especially in concurrent mode. Refactoring the code to use refs directly on elements is recommended to address this warning.*

  *This issue will be researched further and addressed in future developments.*

</details>
<hr>
<details>

  <summary>Error [2]</summary>
   <br>

  ![error](src/assets/readme/error-2.png)

   <br>

   *This issue is related to backend permission classes. Due to the application's structure, it may be causing conflicts. Attempts to change the backend resulted in recursive errors with all employee profiles applying for each job. Further investigation and resolution are required in future developments.*


</details>
<hr>
<details>
  <summary>Error [3]</summary>
   <br>

  ![error](src/assets/readme/error-3.png)

  <br>

  *Failed to load resource: the server responded with a status of 401 (Unauthorized)*

  *I believe this error is related to content loading before the current user context is properly established for some reason. Further research will need to be conducted to address this issue.*

</details>
<hr>
<details>
  <summary>Error [4]</summary>
   <br>

  ![error](src/assets/readme/error-4.png)

  <br>

  *This warning suggests that a Chrome extension is attempting to access a resource (index.es.js.map) that is not listed in the web_accessible_resources manifest key. This typically occurs when an extension tries to access resources from a web page outside of its allowed scope.*

  *Further investigation will be conducted in future developments to resolve this issue.*

</details>
<hr>
<details>
  <summary>Error [5]</summary>
   <br>

  ![error](src/assets/readme/error-5.png)

  <br>

  *This error indicates a TypeError caused by attempting to read properties of an undefined value ('0'). It seems to occur within a promise, suggesting an asynchronous operation that failed due to an undefined value.*

  *Further investigation will be conducted in future developments to address and resolve this issue.*

</details>
<hr>
<details>
  <summary>Error [6]</summary>
   <br>

  ![error](src/assets/readme/error-6.png)

  <br>

 *Please note that `eslint-disable-next-line` was used on a few occasions. This was necessary because data was destructured and stored, even though it was not needed directly but for the data flow. In future developments, I will explore additional ways to solve this issue.*


</details>
<hr>
<details>
  <summary>Error [7]</summary>
   <br>

  ![error](src/assets/readme/error-7.png)

  <br>

 *An invisible form control with a non-focusable error was encountered. While I addressed this in the UI by hiding it with `d-none`, I retained the labeling to maintain HTML convention.*


</details>
<hr>


#### Deployment Steps


1. Set up your own instance of Holdu.

2. Clone or duplicate this repository:
   - To duplicate it, visit [this GitHub repository](https://github.com/Ry-F3/holdu), click on Duplicate, and follow the prompts.
   - To clone the repository, run `git clone https://github.com/Ry-F3/holdu` in your terminal.

3. Navigate to the repository directory and edit the file named `src/api/axiosDefaults.js`. In this file, update the value of `axios.defaults.baseURL` with the URL of your deployed API. You can find this URL by accessing your API app through the Heroku dashboard and copying the URL provided.

4. If not already done, log in to your Heroku account on their website. From the Heroku dashboard, create a new app by selecting New and then Create new app.

5. Give your app a unique name and select your preferred region (either US or Europe).

6. Access the Deploy tab and link your Heroku app with your GitHub repository.

7. Scroll down and pick the branch you wish to deploy under the Manual deploy section. Click on Deploy Branch to initiate the initial deployment of the application.

8. If you encounter any difficulties during the deployment process, access Heroku logs by selecting More and then View logs, or review the Activity tab for troubleshooting.

9. Upon successful deployment, click on View to open your deployed application.

10. If the process goes smoothly, the Holdu landing page should appear without any issues. However, if you encounter a scenario where the landing page loads but lacks content from the API (such as a never-ending loading spinner), double-check the accuracy of the CLIENT_ORIGIN configuration variable within your API project, as per the provided instructions. If the content remains invisible, confirm that you've accurately supplied the URL for your API as outlined in step 3. Additionally, consider inspecting the browser console for any potential errors that may arise.




## Bibliography

Special thanks to my mentor, Mo Shami, for their invaluable guidance and support throughout this project. I am also grateful to the tutors at Code Institute for their assistance and expertise.

- Images used from [Storyset](https://storyset.com/illustration/no-data/rafiki)
- [React Bootstrap](https://react-bootstrap.netlify.app/)
- [React Tutorial for Beginners - Programming with Mosh](https://www.youtube.com/watch?v=SqcY0GlETPk)
- [Web Dev Simplified - YouTube](https://www.youtube.com/watch?v=Rh3tobg7hEo&t=315s)
- [Stack Overflow - Navbar disappears after scrollIntoView](https://stackoverflow.com/questions/71014670/navbar-disappears-after-scrollintoview-use-on-mobile-view)
- [React Documentation - Hooks/State](https://legacy.reactjs.org/docs/hooks-state.html)
- [Font Awesome](https://fontawesome.com/)
- [Adobe Photoshop](https://www.adobe.com/uk/products/photoshop/landpa.html?gclid=CjwKCAjw26KxBhBDEiwAu6KXtycXRaL-1bAqsIeQmvWDAhtkQJ5WJJvHcHOWs5Hz7KczvLAMYJoGoRoCKlUQAvD_BwE&mv=search&mv=search&mv2=paidsearch&sdid=2SLRC12G&ef_id=CjwKCAjw26KxBhBDEiwAu6KXtycXRaL-1bAqsIeQmvWDAhtkQJ5WJJvHcHOWs5Hz7KczvLAMYJoGoRoCKlUQAvD_BwE:G:s&s_kwcid=AL!3085!3!594208275240!e!!g!!photoshop!17011954550!138864783347&gad_source=1)
- Code Institute React Walkthrough Project


