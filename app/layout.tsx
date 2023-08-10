import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Promptopia",
	description: "Discover and share AI prompts.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<div className="main" aria-hidden="true">
				<div className="gradient" aria-hidden="true"></div>
			</div>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
