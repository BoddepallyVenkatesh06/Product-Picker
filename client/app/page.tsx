'use client'

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import Image from "next/image";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import AuthModal from "./components/auth/AuthModal";
import Verification from "./components/auth/Verification";

export default function Home() {

  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const [route, setRoute] = useState("")

  const { token, user } = useSelector((state: any) => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (!user && !token) {
      router.push("/")
      setOpen(true)
      setRoute("auth")
    }
  }, [user, token])



  return (
    <div className="">
      <Heading
        title="Product Picker"
        description="Product Picker is platform for ..."
        keywords="sofa, table, tea table, "
      />

      {/* navbar */}
      <Header
        setOpen={setOpen}
        open={open}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />


      <div className='flex flex-col mt-14 min-h-screen text-black dark:text-white p-5'>
        <h3 className='text-2xl font-semibold '>Furniture for you?</h3>

        <div className="bg-black/10 dark:bg-white/10 mt-5 p-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-semibold  mb-4">Product Picker 💪🏆</h1>

          <p className="">
            A full-stack application designed to manage products efficiently with robust features including authentication, role-based access, product management, review submissions, and more.
          </p>

          <p className="mt-4">
            Built with the latest technologies such as
          </p>

          <ul className="list-disc list-inside font-bold mb-4 text-green-600 mt-4">
            <li>NextJs 14</li>
            <li>TypeScript</li>
            <li>NodeJs && Express.js</li>
            <li>MongoDB</li>
            <li>Tailwind CSS </li>
            <li>Redux Toolkit</li>
            <li>Redis</li>
            <li>Cloudinary</li>
          </ul>

          <p>It offers a seamless user experience for both team members and admins.</p>
        </div>



        <section className=" py-8">
          <div className="">
            {/* Features Section  */}
            <div className="mb-12 bg-black/10 dark:bg-white/10 mt-5 p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">🚀 Features</h2>
              <ul className="text-left space-y-3">
                <li>🔐 <strong>Role-Based Access</strong>: Different access levels for Admins and Team Members.</li>
                <li>🔑 <strong>JWT Authentication</strong>: Secure authentication using JWT tokens.</li>
                <li>🛠️ <strong>Product Management</strong>: Create, update, review, and delete products with dynamic role-based interfaces.</li>
                <li>✍️ <strong>Review Submission</strong>: Users can submit reviews, and admins can approve them.</li>
                <li>📝 <strong>State Management with Redux Toolkit</strong>: Efficient state handling throughout the application.</li>
                <li>📸 <strong>File Uploads</strong>: Image uploads for products with Cloudinary integration.</li>
                <li>📱 <strong>Responsive UI</strong>: Built with Tailwind CSS for a mobile-friendly user experience.</li>
                <li>🚀 <strong>Caching with Redis</strong>: Optimized performance using Redis for caching.</li>
                <li>📝 <strong>Formik and Yup Validation</strong>: Form handling with robust validation.</li>
                <li>🏆 <strong>Redux RTK Query</strong>: API integration using Redux RTK Query.</li>
              </ul>
            </div>

            {/* Additional Points Section  */}
            <div className="mb-12 bg-black/10 dark:bg-white/10 mt-5 p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">💡 Additional Points</h2>
              <ul className="text-left space-y-3">
                <li>🛡️ <strong>Secure Routes</strong>: Protected routes based on user roles.</li>
                <li>🌐 <strong>Efficient API Handling</strong>: Thoroughly tested APIs with Postman.</li>
                <li>🛠️ <strong>Extensive TypeScript Use</strong>: Type safety across the stack.</li>
                <li>🔐 <strong>Protected Pages</strong>: Admin pages are inaccessible to team members and vice versa.</li>
                <li>⚡ <strong>Sidebar Layout</strong>: Used layout for the dashboard sidebar.</li>
                <li>🧲 <strong>Local Storage, Cookies</strong>: Stored tokens and user data securely.</li>
                <li>📌 <strong>Reusable Components</strong>: Reusable components to create, view, and review products.</li>
                <li>💡 <strong>Loading Skeleton</strong>: Implemented loading skeleton for better UX.</li>
                <li>✅ <strong>Quality</strong>: Best UI and code quality throughout the project.</li>
                <li>➡️ <strong>Pagination</strong>: Ensuring only necessary data is fetched from the server.</li>
              </ul>
            </div>

            {/* File Structure Section */}
            <div className="mb-12 bg-black/10 dark:bg-white/10 mt-5 p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">📁 File Structure</h2>
              <Image
                src="https://res.cloudinary.com/dfykppt3d/image/upload/v1726644878/Product%20Picker/product/Screenshot_2024-09-18_130028_yk6nh8.png"
                className='w-full h-full '
                width={230}
                height={230}
                alt="NextJs file structure"
              />
            </div>

            {/* Packages Section  */}
            <div className="mb-12 bg-black/10 dark:bg-white/10 mt-5 p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">🏆 Packages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">💻 Frontend Technologies</h3>
                  <ul className="list-disc ml-5 space-y-2">
                    <li>🎨 ShadCN UI Components</li>
                    <li>📝 Formik</li>
                    <li>🌗 Next-Themes</li>
                    <li>✅ Yup</li>
                    <li>⚛️ React-Redux</li>
                    <li>🏆 RTK Query</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">🔧 Backend Technologies</h3>
                  <ul className="list-disc ml-5 space-y-2">
                    <li>🔑 JSON Web Token</li>
                    <li>📄 EJS</li>
                    <li>📲 OTP-Generator</li>
                    <li>🔐 Bcrypt</li>
                    <li>📤 Multer</li>
                    <li>📧 Nodemailer</li>
                    <li>🗄️ Mongoose</li>
                  </ul>
                </div>
              </div>
            </div>


            {/* Acknowledgements Section  */}
            <div className="mb-12 bg-black/10 dark:bg-white/10 mt-5 p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">🙏 Acknowledgements</h2>
              <ul className="list-disc ml-5 space-y-2">
                <li>Tailwind CSS: For fast and responsive UI development.</li>
                <li>Next.js: For a powerful and scalable frontend framework.</li>
                <li>MongoDB: For flexible and scalable data storage.</li>
                <li>Cloudinary: For efficient media management.</li>
              </ul>
            </div>
          </div>
        </section>




      </div>
      {
        route === 'auth' && <>
          <AuthModal open={open} setOpen={setOpen} setRoute={setRoute} />
        </>
      }
      {
        route === 'verification' && <>
          <Verification open={open} setOpen={setOpen} setRoute={setRoute} />
        </>
      }

    </div>
  );
}
