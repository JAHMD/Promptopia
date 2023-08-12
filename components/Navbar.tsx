"use client";

import { BuiltInProviderType } from "next-auth/providers/index";
import {
	ClientSafeProvider,
	LiteralUnion,
	getProviders,
	signIn,
	signOut,
	useSession,
} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
	const { data: session } = useSession();

	const [providers, setProviders] = useState<Record<
		LiteralUnion<BuiltInProviderType, string>,
		ClientSafeProvider
	> | null>(null);

	const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

	useEffect(() => {
		const handleProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		handleProviders();
	}, []);

	return (
		<header className="relative z-10 bg-transparent">
			<nav className="container flex-between py-6">
				<Link href="/" className="flex gap-2 items-center">
					<Image
						src="/assets/images/logo.svg"
						alt="logo image"
						width={30}
						height={30}
						className="object-contain"
					/>
					<p className="logo_text">Promptopia</p>
				</Link>

				{session?.user ? (
					<>
						{/* for desctop */}
						<div className="sm:flex hidden">
							<div className="flex gap-3 md:gap-5">
								<Link href="/create-prompt" className="black_btn">
									Create Prompt
								</Link>
								<button className="outline_btn" onClick={() => signOut()}>
									Sign out
								</button>
								<Link href="/profile" className="">
									<Image
										src={session?.user?.image!}
										alt="user image"
										width={37}
										height={37}
										className="rounded-full"
									/>
								</Link>
							</div>
						</div>
						{/* for mobile */}
						<div className="sm:hidden relative">
							<Image
								src={session?.user?.image!}
								alt="user image"
								width={37}
								height={37}
								className="rounded-full cursor-pointer"
								onClick={() => setToggleDropdown((curState) => !curState)}
							/>
							{toggleDropdown && (
								<div className="dropdown">
									<Link
										href="/profile"
										className="dropdown_link"
										onClick={() => setToggleDropdown(false)}
									>
										My Profile
									</Link>
									<Link
										href="/create-prompt"
										className="dropdown_link"
										onClick={() => setToggleDropdown(false)}
									>
										Create Prompt
									</Link>
									<button
										className="black_btn w-full mt-2"
										onClick={() => {
											setToggleDropdown(false);
											signOut();
										}}
									>
										Sign out
									</button>
								</div>
							)}
						</div>
					</>
				) : (
					<div className="flex">
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									className="black_btn flex gap-2 items-center"
									key={provider.name}
									onClick={() => signIn(provider.id)}
								>
									<Image
										src="/assets/icons/google.svg"
										alt="google icon"
										width={20}
										height={20}
									/>
									Sign in
								</button>
							))}
					</div>
				)}
			</nav>
		</header>
	);
};

export default Navbar;
