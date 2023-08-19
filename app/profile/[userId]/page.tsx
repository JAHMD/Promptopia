"use client";

import { PostType } from "@/components/Feed";
import Profile from "@/components/Profile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserPage = ({ params: { userId } }: { params: { userId: string } }) => {
	const searchParams = useSearchParams();
	const userName = searchParams.get("name");

	const [myPosts, setMyPosts] = useState<PostType[]>([]);

	const fetchPosts = async () => {
		const response = await fetch(`/api/users/${userId}/posts`);
		const data = await response.json();
		setMyPosts(data);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<Profile
			name={userName!}
			desc={`Welcome to ${userName} personalized profile page. Look at an exceptional prompts and get inspired with the power of others imagination`}
			data={myPosts}
		/>
	);
};

export default UserPage;
