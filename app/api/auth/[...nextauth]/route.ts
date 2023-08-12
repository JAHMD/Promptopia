import User from "@/models/user";
import { connectToDB } from "@/utils/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async signIn({ user }: any) {
			try {
				await connectToDB();
				const oldUser = await User.findOne({ email: user.email });

				if (!oldUser) {
					User.create({
						email: user.email,
						name: user.name,
						username: user.name?.replace(" ", "").toLowerCase(),
						image: user.image,
					});
				}

				return user;
			} catch (error: any) {
				alert(error.message);
			}
		},
		async session({ session }: any) {
			const userSession = await User.findOne({ email: session.user.email });
			session.user.id = userSession._id.toString();

			return session;
		},
	},
});

export { handler as GET, handler as POST };
