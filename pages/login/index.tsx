import Input from "@/src/components/Forms/Input"
import { NextPage } from "next"
import React, { useEffect } from "react"
import EmailSVG from "@/public/email.svg"
import PasswordSVG from "@/public/lock.svg"
import { useFormik } from "formik"
import Link from "next/link"
import GoogleSVG from "@/public/google.svg"
import GithubSVG from "@/public/github.svg"
import BackSVG from "@/public/back.svg"
import { useRouter } from "next/router"
import * as Yup from "yup"
import useErrorText from "@/src/utils/errorText"
import { signIn, useSession } from "next-auth/react"
import LoadingPage from "@/src/components/Loading/LoadingPage"
import Toast from "@/src/components/Toast"
import LoadingOverLay from "@/src/components/Loading/LoadingOverlay"

interface IForm {
	email: string
	password: string
}

const LoginPage: NextPage = () => {
	const router = useRouter()
	const { data, status } = useSession()
	const validator = Yup.object().shape({
		email: Yup.string().email().required(),
		password: Yup.string().required(),
	})

	const handleSubmit = async (values: IForm) => {
		const stop = LoadingOverLay()
		try {
			await signIn("credentials", {
				email: values.email,
				password: values.password,
				callbackUrl: "/apps",
				redirect: false,
			})
				.then((e: any) => {
					stop()
					if (e.ok) {
						Toast({
							type: "SUCCESS",
							title: "Sign in completed",
						})
					} else {
						Toast({
							type: "ERROR",
							title: "Sign in error",
							body: "Incorrect email or password",
						})
					}
				})
				.catch((e) => {
					Toast({
						type: "ERROR",
						title: "Sign in error",
						body: "Incorrect email or password",
					})
					stop()
				})
		} catch (error) {
			console.error(error)
			Toast({
				type: "ERROR",
				title: "Login error",
				body: "Incorrect email or password!",
			})
		}
	}

	const signInWith = (type: string) => {
		return () => {
			signIn(type, {
				callbackUrl: "/apps",
			})
		}
	}

	const formik = useFormik({
		initialValues: { email: "", password: "" },
		validationSchema: validator,
		onSubmit: handleSubmit,
	})

	const errorText = useErrorText<IForm>(formik)

	useEffect(() => {
		if (data) {
			router.replace("/apps")
		}
	}, [data])

	if (status == "loading") {
		return <LoadingPage></LoadingPage>
	}

	return (
		<div className="bg-main-blue-light min-h-screen min-w-full flex items-center justify-center p-0 sm:p-6">
			<div className="bg-white py-12 px-8 sm:p-16 w-screen sm:w-128 sm:rounded-lg shadow-lg h-screen sm:h-auto relative">
				<div
					onClick={() => router.replace("/")}
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
							className="w-full"
							leftIcon={<EmailSVG className="h-5 text-main-blue" />}
							label="Email"
							placeholder="Enter your email"
							name="email"
							type="email"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
							errorText={errorText("email")}
						/>
						<Input
							className="w-full"
							leftIcon={<PasswordSVG className="h-5 text-main-blue" />}
							label="Password"
							placeholder="Enter your password"
							name="password"
							type="password"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
							errorText={errorText("password")}
						/>
						<button
							className="bg-main-blue w-full py-2 rounded-lg shadow-lg text-white"
							type="submit"
						>
							Log In
						</button>
					</form>

					<div className="flex justify-center">
						<span>Doesn&apos;t have an account yet?</span>
						<Link href="/signup">
							<a className="text-main-blue ml-2">Sign up</a>
						</Link>
					</div>

					<div className="flex items-center space-x-3">
						<hr className="w-1/2" />
						<span>OR</span>
						<hr className="w-1/2" />
					</div>
					<div className="flex flex-col space-y-3 mt-6">
						<div
							onClick={signInWith("google")}
							className="flex items-center space-x-3 border border-gray-200 px-4 py-2 rounded-md hover:shadow-lg cursor-pointer"
						>
							<GoogleSVG className="w-6 h-6" />
							<div>Sign in with Google</div>
						</div>
						<div
							onClick={signInWith("github")}
							className="flex items-center space-x-3 border border-gray-200 px-4 py-2 rounded-md hover:shadow-lg cursor-pointer"
						>
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
