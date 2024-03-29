"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export type UserType = {
	id: string;
	email: string;
	name: string;
	image: string;
};

export type Post = { prompt: string; tag: string };

const CreatePromptPage = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const user = session?.user as UserType;

	const [submitting, setSubmitting] = useState<boolean>(false);
	const [post, setPost] = useState<Post>({ prompt: "", tag: "" });

	const createPrompt = async (e: FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		const newPost = { ...post, userId: user.id };

		try {
			const response = await fetch("/api/prompt/new", {
				method: "POST",
				body: JSON.stringify(newPost),
			});

			if (response.ok) {
				router.push("/");
			}
		} catch (error: any) {
			throw new Error(error.message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<section className="w-full max-w-full pt-6 pb-10 flex-start items-center flex-col">
			<Form
				type="Create"
				post={post}
				setPost={setPost}
				submitting={submitting}
				handleSubmit={createPrompt}
			/>
		</section>
	);
};

export default CreatePromptPage;
