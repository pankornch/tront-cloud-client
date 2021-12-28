import Input from "@/src/components/Input"
import { NextPage } from "next"
import React from "react"
import EmailSVG from "@/public/email.svg"
import PasswordSVG from "@/public/lock.svg"
import { useFormik } from "formik"
import Link from "next/link"
import GoogleSVG from "@/public/google.svg"
import GithubSVG from "@/public/github.svg"
import BackSVG from "@/public/back.svg"
import { useRouter } from "next/router"

const LoginPage: NextPage = () => {
	const router = useRouter()

	const validator = (values: any) => {
		const errors: any = {}
		if (!values.email) errors.email = "Email is required"
		if (
			values.email &&
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
		)
			errors.email = "Invalid email"
		if (!values.password) errors.password = "Password is required"

		return errors
	}

	const handleSubmit = (e: any) => {
		e.preventDefault()
	}

	const formik = useFormik({
		initialValues: { email: "", password: "" },
		validate: validator,
		onSubmit: handleSubmit,
	})

	return (
		<div className="bg-main-blue min-h-screen min-w-full flex items-center justify-center p-0 sm:p-12">
			<div className="bg-white py-12 px-8 sm:p-16 w-screen sm:w-128 rounded-lg shadow-lg h-screen sm:h-auto relative">
				<div
					onClick={() => router.back()}
					className="absolute top-12 left-5 sm:top-16 sm:left-14 cursor-pointer hover:bg-gray-100 rounded-full"
				>
					<BackSVG className="w-8" />
				</div>
				<h1 className="text-center text-3xl font-bold mb-6">
					Welcome To Tront
				</h1>
				<div className="space-y-6">
					<form
						onSubmit={formik.handleSubmit}
						className="flex flex-col items-center space-y-6"
					>
						<Input
							leftIcon={<EmailSVG className="h-5 text-main-blue" />}
							label="Email"
							placeholder="Enter your email"
							name="email"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
							errorText={formik.touched.email ? formik.errors.email : undefined}
						/>
						<Input
							leftIcon={<PasswordSVG className="h-5 text-main-blue" />}
							label="Password"
							placeholder="Enter your password"
							name="password"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
							errorText={
								formik.touched.password ? formik.errors.password : undefined
							}
						/>
						<button
							className="bg-main-blue w-full py-2 rounded-lg shadow-lg text-white"
							type="submit"
						>
							Log in
						</button>
					</form>

					<div className="flex justify-center">
						<span>Doesn’t have an account yet?</span>
						<Link href="#">
							<a className="text-main-blue ml-2">Sign up</a>
						</Link>
					</div>

					<div className="flex items-center space-x-3">
						<hr className="w-1/2" />
						<span>OR</span>
						<hr className="w-1/2" />
					</div>
					<div className="flex flex-col space-y-3 mt-6">
						<div className="flex items-center space-x-3 border border-gray-200 px-4 py-2 rounded-md hover:shadow-lg cursor-pointer">
							<GoogleSVG className="w-6 h-6" />
							<div>Sign in with Google</div>
						</div>
						<div className="flex items-center space-x-3 border border-gray-200 px-4 py-2 rounded-md hover:shadow-lg cursor-pointer">
							<GithubSVG className="w-6 h-6" />
							<div>Sign in with Github</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
