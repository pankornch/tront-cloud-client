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
import { useMutation } from "@apollo/client"
import { SIGN_UP_MUTATION } from "@/src/gql"
import { signIn, useSession } from "next-auth/react"
import LoadingPage from "@/src/components/Loading/LoadingPage"
import Toast from "@/src/components/Toast"
import LoadingOverLay from "@/src/components/Loading/LoadingOverlay"

interface IForm {
	email: string
	password: string
	confirmPassword: string
}

const SignUpPage: NextPage = () => {
	const router = useRouter()
	const { data, status } = useSession()

	const [signUp] = useMutation(SIGN_UP_MUTATION)

	const validator = Yup.object().shape({
		email: Yup.string().email().required(),
		password: Yup.string().min(6).required(),
		confirmPassword: Yup.string().oneOf(
			[Yup.ref("password"), null],
			"Password must match"
		),
	})

	const handleSubmit = async (values: IForm) => {
		const stop = LoadingOverLay()
		try {
			const { errors } = await signUp({
				variables: {
					input: {
						email: values.email,
						password: values.password,
						confirmPassword: values.confirmPassword,
					},
				},
			})

			stop()

			if (errors) {
				console.error(errors)
				return
			}

			await signIn("credentials", {
				email: values.email,
				password: values.password,
				callbackUrl: "/apps",
			})

			router.replace("/apps")
		} catch (error:any) {
			stop()
			Toast({
				type: "ERROR",
				title: "Sign up error",
				body: error.message,
			})
			console.error(error)
		}
	}

	const formik = useFormik({
		initialValues: { email: "", password: "", confirmPassword: "" },
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

	const signInWith = (type: string) => {
		return () => {
			signIn(type, {
				callbackUrl: "/apps",
			})
		}
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
							placeholder="Enter email"
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
							placeholder="Enter password"
							name="password"
							type="password"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
							errorText={errorText("password")}
						/>
						<Input
							className="w-full"
							leftIcon={<PasswordSVG className="h-5 text-main-blue" />}
							label="Re-type password"
							placeholder="Enter re-type password"
							name="confirmPassword"
							type="password"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.confirmPassword}
							errorText={errorText("confirmPassword")}
						/>

						<button
							className="bg-main-blue w-full py-2 rounded-lg shadow-lg text-white"
							type="submit"
						>
							Sign Up
						</button>
					</form>

					<div className="flex justify-center">
						<span>Already have an account?</span>
						<Link href="/login">
							<a className="text-main-blue ml-2">Log in</a>
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
							<div>Sign up with Google</div>
						</div>
						<div
							onClick={signInWith("github")}
							className="flex items-center space-x-3 border border-gray-200 px-4 py-2 rounded-md hover:shadow-lg cursor-pointer"
						>
							<GithubSVG className="w-6 h-6" />
							<div>Sign up with Github</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignUpPage
