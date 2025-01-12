

<img height="100" src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/logo.png' />

# Product Picker 🛒

 A full-stack application designed to manage products efficiently with robust features including authentication, role-based access, product management, review submissions, and more. 
 <br/>
 Built with the latest technologies such as Next.js 14, TypeScript, Express.js,Redis , Redux Toolkit and MongoDB, it offers a seamless user experience for both team members and admins.

<hr/>

<h2>Live link 🌍📡 - [  ]</h2>

<h2>
Postman Collection 📬 : [ https://documenter.getpostman.com/view/29064533/2sAY4xAMG5 ]
</h2>

<h2>
Backend deployed on Render 📬 : [ ]
</h2>

<hr/>

## Table of Contents

| Section                 | Description                                  |
|-------------------------|----------------------------------------------|
| [Tech Stack](#tech-stack-)             | 💻🔧 Technologies used in the project         |
| [Features](#features-)             | 🚀 Features of the project         |
| [File Structure](#file-structure-)             | 📁 File Structure for NextJs14        |
| [Packages](#packages-)             | 🏆 Packages for frontend && backend        |
| [Schema](#schema-)                  | 🗂 Explanation of data schemas used          |
| [React Hooks](#react-hooks-)            | 🎣 Overview of React Hooks utilized          |
| [Acknowledgements](#acknowledgements-)         | 🙏 Libraries and tools acknowledged        |
| [Screen Preview](#screen-preview-)         | 🖥️ Screen Preview        |

## Tech Stack 💻🔧

| Logo                 | Technology                                  |
|-------------------------|----------------------------------------------|
| <code title="Next.js"><img height="40" src="https://github.com/vercel.png"></code>        |Next.js 14|
| <code title="TypeScript"><img height="40" src="https://cdn.worldvectorlogo.com/logos/typescript.svg"></code>      |TypeScript |
| <code title="Express"><img height="50" src="https://github.com/expressjs.png"></code>      |Express.js |
| <code title="MongoDB"><img height="55" src="https://github.com/mongodb.png"></code>      |MongoDB |
| <code title="Tailwind CSS"><img height="30" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnJf8Q93W26P9Y8wtFfgQciy9SGYybCxEa3A&s"></code>      |Tailwind CSS |
| <code title="Redux Toolkit"><img height="35" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHYiSZ7pgNHIi4X9la9Z1_oHsBpntPBeY6fA&s"></code>      |Redux Toolkit|
| <code title="Redis"><img height="35" src="https://github.com/redis.png"></code>      |Redis|

## Features: 🚀

- **Role-Based Access**: 🔐 Different access levels for Admins and Team Members.
- **JWT Authentication**: 🔑 Secure authentication using JWT tokens.
- **Product Management**: 🛠️ Create, update, review, and delete products with dynamic role-based interfaces.
- **Review Submission**: ✍️ Users can submit reviews, and admins can approve them.
- **State Management with Redux Toolkit**: Efficient state handling throughout the application.
- **File Uploads**: 📸 Image uploads for products with Cloudinary integration.
- **Responsive UI**: 📱 Built with Tailwind CSS for a mobile-friendly user experience.
- **Caching with Redis**: 🚀 Optimized performance using Redis for caching.
- **Formik and Yup Validation**: 📝 Form handling with robust validation.
- **Redux RTK Query** : used Redux RTK query for API.


# Additional Points:

- **Secure Routes**: 🛡️ Protected routes based on user roles.
- **Efficient API Handling**: 🌐 Thoroughly tested APIs with Postman.
- **Extensive TypeScript Use**: 🛠️ Type safety across the stack.
- **RTK Query**: 🏆 Simplify the integration of backend APIs with the Redux store, reducing boilerplate code for handling API requests and responses.
- **Git and GitHub**: 📝 Organized version control with clear commit history.
- **Theme**:💡 Light and 🌑 Dark Theme
- **Token**: Security with two ✌ tokens - Refresh Token and Access Token
- **Protected Pages**: 🔐 Admin pages could not be access by team member and same for admin
- **Sidebar Layout**:⚡ used layout for dashboard sidebar
- **Local Storage, Cookies**:🧲 stored tokens ans user data
- **Reusable Components**:📌 reusable component to create, view and review Products
- **Loading Skeleton**:💡 Implement loading skeleton rather than just showing loading text 
- **Quality**:✅ I make sure to have best UI and code quality to deliver this project
- **Pagination**:➡️ ensuring only the necessary data is fetched from the server.


# File Structure 📁

Here's the file structure text for the routes in Next.js:

```bash
App/
└── dashboard/
    ├── admin/
    │   ├── pending-requests/
    │   │   ├── page.tsx
    │   │   └── [request_id]/
    │   │       └── page.tsx
    ├── team-member/
    │   └── my-submissions/
    │       └── page.tsx
    ├── create-product/
    │   └── page.tsx
    ├── all-products/
    │   ├── page.tsx
    │   └── [product_id]/
    │       └── page.tsx
    ├── page.tsx
    └── profile/
        └── page.tsx
```

# Packages: 🏆
💻 Frontend Technologies
Utilized the following packages and libraries on the frontend:
- 🎨 ShadCN UI Components
- 📝 Formik
- 🌗 Next-Themes
- ✅ Yup
- ⚛️ React-Redux
- 🏆 RTK Query


🔧 Backend Technologies
Integrated the following libraries and tools on the backend:
- 🔑 JSON Web Token
- 📄 EJS
- 📲 OTP-Generator
- 🔐 Bcrypt
- 📤 Multer
- 📧 Nodemailer
- 🗄️ Mongoose
- ➕ And Others



<hr/>
## Getting Started: 💡

### Prerequisites

- **Node.js** (version 14 or later)
- **MongoDB**
- **Redis**
- **Cloudinary** (for file uploads)

### Installation

1. **Clone the repository**: 🔍 

   ```bash
   https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14.git
   ```


## Contributing: 🤝

Contributions are welcome! Please feel free to submit a pull request or open an issue.


## React Hooks 🎣

- `useState`
- `useEffect`
- `useSelector`
- `useDispatch`
- `useForm`
- `useParams`
- `useRouter`

## Acknowledgements 🙏

- **Tailwind CSS**: For fast and responsive UI development.
- **Next.js**: For a powerful and scalable frontend framework.
- **MongoDB**: For flexible and scalable data storage.
- **Cloudinary**: For efficient media management.

## Screen Preview 💻

### Dashboard Page 📊


### Total, Aprroved, Pending and Rejected Request 📊
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/Request-stats-light.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/Request-stats-dark2.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/Request-stats-dark.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/profile-stats-dark.png' />
<hr/>

### OTP Template 
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/otp-template.png' />
<hr/>

### Creatd Product Page 📊
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/create-product-form-dark.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/create-product-form-light.png' />
<hr/>

### My Submission 📝
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/my-submission-dark1.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/my-submission-dark2.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/my-submission-dark3.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/my-submission-dark4.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/my-submission-dark5.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/my-submission-light.png' />
<hr/>


### Pending Requests 📝
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/pending-request-dark1.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/pending-request-list.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/pending-request-dark2.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/pending-request-dark3.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/pending-request-list-white.png' />
<hr/>


### Review Submission 📝
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/pending-request-white.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/select-status.png' />
<hr/>


### Product List 🛍️
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/product-list-dark1.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/product-list-dark2.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/product-list-dark3.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/product-list-dark4.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/product-list-dark5.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/product-list-dark6.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/product-list-light.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/product-list-light2.png' />
<hr/>


### Loading Skeleton 🛍️
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/product-list-loading-skeleton.png' />
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/submissions-list-loading-skeleton.png' />
<hr/>


### Profile Page 🛍️
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/profile-dark.png' />

<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/team-member-profile-dark.png' />
<hr/>


### Profile Dropdown (profile, dashboard, logout) 🛍️
<img width='100%' src='https://github.com/Aniruddha-Gade/Product-Picker___Next.Js14/blob/main/screenshots/profile-dropdown.png' />
<hr/>




