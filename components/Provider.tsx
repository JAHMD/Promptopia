"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const Provider = ({
	session,
	children,
}: {
	session: any;
	children: ReactNode;
}) => {
	return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
