import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Promptopia",
	description: "Discover and share AI prompts.",
};

export default function RootLayout({
	children,
	session,
}: {
	children: React.ReactNode;
	session: any;
}) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/assets/images/logo.svg" sizes="any" />
			</head>
			<body className="">
				<Provider session={session}>
					<div className="main" aria-hidden="true">
						<div className="gradient" aria-hidden="true"></div>
					</div>
					<Navbar />
					<main className="app">{children}</main>
				</Provider>
				;
			</body>
		</html>
	);
}
