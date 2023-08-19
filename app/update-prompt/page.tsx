"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export type UserType = {
	id: string;
	email: string;
	name: string;
	image: string;
};

export type Post = { prompt: string; tag: string };

const EditPromptPage = () => {
	const searchParams = useSearchParams();
	const postId = searchParams.get("id");

	const { data: session } = useSession();
	const router = useRouter();
	const user = session?.user as UserType;

	const [submitting, setSubmitting] = useState<boolean>(false);
	const [post, setPost] = useState<Post>({ prompt: "", tag: "" });

	const editPrompt = async (e: FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		const newPost = { ...post, userId: user.id };

		try {
			const response = await fetch(`/api/prompt/${postId}`, {
				method: "PATCH",
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

	const getPrompt = async (id: string) => {
		const prompt = await fetch(`/api/prompt/${id}`).then((response) =>
			response.json()
		);
		console.log(prompt);
		setPost(prompt);
	};

	useEffect(() => {
		getPrompt(postId!);
	}, [postId]);

	return (
		<section className="w-full max-w-full pt-6 pb-10 flex-start items-center flex-col">
			<Form
				type="Edit"
				post={post}
				setPost={setPost}
				submitting={submitting}
				handleSubmit={editPrompt}
			/>
		</section>
	);
};

export default EditPromptPage;
