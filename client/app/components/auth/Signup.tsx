'use client'

import React, { FC, useEffect, useState } from 'react'
import { useFormik, } from 'formik';
import * as Yup from 'yup';
import { styles } from '../../styles/style';
import Image from 'next/image';
import AsteriskSymbol from './../../utils/AsteriskSymbol';


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { useRegisterMutation } from './../../redux/features/auth/authApi';
import { toast } from 'sonner';
import LoadingButtonText from '../../utils/LoadingButtonText';




type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
}


const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please enter your email"),
    password: Yup.string().required("Please enter your password").min(6),
    name: Yup.string().required("Please enter your name"),
    accountType: Yup.string().required("Please select an account type"),
    // avatar: Yup.string().required("Please select an avatar"),
});


const Signup: FC<Props> = ({ setRoute, setOpen }) => {

    const [register, { isError, data, isSuccess, error, isLoading }] = useRegisterMutation()
    const formik = useFormik({
        initialValues: { name: "", email: "", password: "", accountType: "" },
        validationSchema: schema,
        onSubmit: async ({ email, password, accountType, name }) => {
            console.log({ email, password, accountType, name })
            const data = { email, password, accountType, name }
            await register(data)
        }
    })
    const { errors, touched, values, handleChange, handleSubmit } = formik
    const [showPassword, setShowPassword] = useState(false)



    useEffect(() => {
        if (isSuccess) {
            console.log("Sucess")
            toast.success("OTP sent to mail")
            setRoute("verification")
            // setOpen(true)
        }
        if (error) {
            if ("data" in error) {
                console.log("USER REGISTER API ERROR => ",error)
                const errorData = error as any
                toast.error(errorData.data.message)
            }
        }
    }, [isSuccess, error])

    return (
        <div className='w-full'>
            <form onSubmit={handleSubmit}>
                {/* choose Account Type */}
                <div className='w-full text-black dark:text-white flex-between'>
                    <label className={`${styles.label}`} >
                        Choose Account Type <AsteriskSymbol />
                    </label>

                    <Select onValueChange={handleChange('accountType')}>
                        <SelectTrigger className="w-[220px] text-[14px] focus:outline-none border dark:border-white border-black rounded outline-none font-Poppins ">
                            <SelectValue placeholder="Account Type" />
                        </SelectTrigger>
                        <SelectContent className='text-[14px]'>
                            <SelectItem value="Team member">Team Member</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {
                    errors.accountType && touched.accountType &&
                    <span className='text-red-500 pt-2 block'>{errors.accountType}</span>
                }


                <div className='flex mt-3 gap-5'>
                    {/* user name field */}
                    <div>
                        <label
                            className={`${styles.label}`}
                            htmlFor="name"
                        >
                            Enter your name <AsteriskSymbol />
                        </label>
                        <input
                            id='name'
                            type='text'
                            name=''
                            value={values.name}
                            onChange={handleChange}
                            placeholder='Aniruddha Gade'
                            className={`${errors.name && touched.name && 'border-red-600'} ${styles.input}`}
                        />
                        {
                            errors.name && touched.name &&
                            <span className='text-red-500 pt-2 block'>{errors.name}</span>
                        }
                    </div>

                    {/* email field */}
                    <div>
                        <label
                            className={`${styles.label}`}
                            htmlFor="email"
                        >
                            Enter your email <AsteriskSymbol />
                        </label>
                        <input
                            id='email'
                            type='email'
                            name=''
                            value={values.email}
                            onChange={handleChange}
                            placeholder='abcd123@gmail.com'
                            className={`${errors.email && touched.email && 'border-red-600'} ${styles.input}`}
                        />
                        {
                            errors.email && touched.email &&
                            <span className='text-red-500 pt-2 block'>{errors.email}</span>
                        }
                    </div>
                </div>


                {/* password field */}
                <div className='w-full mt-5 mb-1 relative '>
                    <label
                        className={`${styles.label}`}
                        htmlFor="password"
                    >
                        Enter your password <AsteriskSymbol />
                    </label>
                    <input
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        name=''
                        value={values.password}
                        onChange={handleChange}
                        placeholder='xz@#$%&'
                        className={`${errors.password && touched.password && 'border-red-600'} ${styles.input}`}
                    />
                    {/* show icon on basis of showPassword */}
                    {
                        showPassword ? (
                            <Image
                                src="/assets/icons/lock-icon.png"
                                alt="key icon"
                                width={27}
                                height={27}
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute bottom-2 right-2 z-1 cursor-pointer'
                            />
                        ) :
                            (
                                <Image
                                    src="/assets/icons/key-icon.png"
                                    alt="lock icon"
                                    width={27}
                                    height={27}
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute bottom-2 right-2 z-1 cursor-pointer'
                                />
                            )
                    }
                </div>
                {
                    errors.password && touched.password &&
                    <span className='text-red-500 pt-2 block'>{errors.password}</span>
                }

                <div className='w-full mt-5'>
                    <button type='submit' disabled={isLoading} className={`${styles.button}`} >
                        {
                            isLoading ? <LoadingButtonText />
                                : 'Signup'
                        }
                    </button>
                </div>

                <h5 className='text-center pt-4 text-[14px] font-Poppins text-black dark:text-white '>
                    Or join with
                </h5>
                <div className='w-full flex-center gap-4 my-3'>
                    <Image
                        src="/assets/icons/google-logo.png"
                        width={35}
                        height={35}
                        className='cursor-pointer'
                        alt="google icon"
                    />
                    <Image
                        src="/assets/icons/github-logo.png"
                        width={35}
                        height={35}
                        className='cursor-pointer'
                        alt="github icon"
                    />
                </div>
            </form>
        </div>
    )
}

export default Signup
