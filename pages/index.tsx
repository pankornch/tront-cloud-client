import type { NextPage } from "next"
import LogoSVG from "@/public/logo.svg"
import BoardSVG from "@/public/board.svg"
import DatabaseSVG from "@/public/database.svg"
import ConfigSVG from "@/public/config.svg"
import RelationSVG from "@/public/relation.svg"
import MongoDBSVG from "@/public/mongodb.svg"
import HambugerSVG from "@/public/hamburger.svg"
import CloseSVG from "@/public/close.svg"
import { useState } from "react"
import Link from "next/link"
const Home: NextPage = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<div>
			{/* Navbar */}
			<nav className="fixed top-0 right-0 w-screen container flex justify-between items-center py-5 shadow-md bg-white z-50">
				<div className="flex items-center space-x-20">
					<div className="flex items-center z-50">
						<LogoSVG className="h-10" />
						<span className="font-semibold ml-2 text-xl">Tront</span>
					</div>
					<div className="hidden lg:block">Features</div>
					{/* <div className="hidden lg:block">Database supported</div> */}
				</div>
				<div className="hidden lg:flex space-x-7">
					<Link href="/login">
						<a className="bg-main-blue-light text-main-blue px-4 py-2 rounded-md cursor-pointer">
							Log in
						</a>
					</Link>
					<Link href="/signup">
						<a className="bg-main-blue text-white px-4 py-2 rounded-md cursor-pointer">
							Sign up
						</a>
					</Link>
				</div>
				<div className="lg:hidden block">
					{isOpen ? (
						<CloseSVG className="h-4" onClick={() => setIsOpen(false)} />
					) : (
						<HambugerSVG className="h-4" onClick={() => setIsOpen(true)} />
					)}
				</div>
			</nav>
			<div className="block lg:hidden">
				{isOpen && (
					<div className="container flex flex-col space-y-6 fixed top-0 right-0 w-screen pt-28 pb-5 h-screen bg-white z-40">
						<Link href="/login">
							<a className="bg-main-blue-light text-main-blue px-4 py-2 rounded-md cursor-pointer">
								Log in
							</a>
						</Link>
						<Link href="/signup">
							<a className="bg-main-blue text-white px-4 py-2 rounded-md cursor-pointer">
								Sign up
							</a>
						</Link>
					</div>
				)}
			</div>
			{/* Content */}
			<div className="container space-y-24 mt-20">
				{/*  */}
				<div className="grid grid-cols-1 sm:grid-cols-2 pt-6 sm:pt-32 items-end gap-x-12">
					<div className="flex flex-col justify-between items-start h-96">
						<h1 className="font-semibold leading-tight">
							The easy way to get your own{" "}
							<span className="text-main-blue underline">RESTful API</span>
						</h1>
						<h6 className="">
							Tront is website that helps you to get you own RESTful API by
							simple config
						</h6>
						<Link href="/signup">
							<a className="bg-main-blue text-white px-5 py-2 rounded-md text-lg">
								Get Started
							</a>
						</Link>
					</div>
					<BoardSVG className="hidden sm:block w-full h-auto justify-self-end " />
				</div>

				{/* Features */}
				{/* <div className="">
					<h3 className="font-semibold mb-8">Features</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
						<div className="flex space-x-5 items-start">
							<DatabaseSVG className="w-12" />
							<div>
								<div className="font-bold">กำหนด Database field</div>
								<div>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor
								</div>
							</div>
						</div>
						<div className="flex space-x-5 items-start">
							<ConfigSVG className="w-12" />
							<div>
								<div className="font-bold">ตั้งค่า API Method</div>
								<div>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
								</div>
							</div>
						</div>
						<div className="flex space-x-5 items-start">
							<RelationSVG className="w-12" />
							<div>
								<div className="font-bold">มี Relation</div>
								<div>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore
								</div>
							</div>
						</div>
					</div>
				</div> */}

				{/* Database & API Supported */}
				{/* <div>
					<h2 className="text-3xl font-bold mb-8">Database & API Supported</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12">
						<div>
							<h3 className="text-xl font-bold mb-5">Database Supported</h3>
							<ul className="ml-5 space-y-5">
								<li>
									<MongoDBSVG className="w-48" />
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl font-bold mb-5">API Supported</h3>
							<ul className="ml-5 space-y-5">
								<li>REST</li>
							</ul>
						</div>
					</div>
				</div> */}
				{/* Footer */}
				<footer className="py-12 flex justify-between items-center">
					<div className="flex items-center">
						<LogoSVG className="h-10" />
						<span className="font-semibold ml-2 text-xl">Tront</span>
					</div>
					<div>2021 Tront. All rights reserved</div>
				</footer>
			</div>
		</div>
	)
}

export default Home
