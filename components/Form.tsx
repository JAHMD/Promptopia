"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Post = { prompt: string; tag: string };

const Form = ({ type }: { type: string }) => {
	const { data: session } = useSession();
	const router = useRouter();

	const [submitting, setSubmitting] = useState<boolean>(false);
	const [post, setPost] = useState<Post>({ prompt: "", tag: "" });

	const createPost = async (e: FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		const tag = post.tag[0] === "#" ? post.tag : `#${post.tag}`;
		const newPost = { ...post, userId: session?.user?.id, tag };

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
		<>
			<h1 className="head_text text-left">
				<span className="blue_gradient">{type} Post</span>
			</h1>
			<p className="desc max-w-md text-center">
				{type} and share amazing prompts with the world, and let your
				imagination run wild with any AI-powered platform
			</p>
			<form
				onSubmit={createPost}
				className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
			>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Your AI Prompt
					</span>

					<textarea
						value={post.prompt}
						onChange={(e) => setPost({ ...post, prompt: e.target.value })}
						placeholder="Write your post here"
						required
						className="form_textarea "
					/>
				</label>

				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Field of Prompt{" "}
						<span className="font-normal text-sm">
							(#product, #webdevelopment, #idea, etc.)
						</span>
					</span>
					<input
						value={post.tag}
						onChange={(e) => setPost({ ...post, tag: e.target.value })}
						type="text"
						placeholder="#tag"
						required
						className="form_input"
					/>
				</label>

				<div className="flex-end mx-3 mb-5 gap-4">
					<Link
						href="/"
						className="text-gray-500 text-sm px-5 py-1.5 font-semibold hover:bg-white border hover:border-transparent border-gray-300 transition-colors rounded-full"
					>
						Cancel
					</Link>

					<button
						type="submit"
						disabled={submitting}
						className="px-5 py-1.5 text-sm disabled:cursor-not-allowed opacity-80 bg-primary-orange hover:bg-[#FF5722d9] transition-colors rounded-full font-semibold text-white capitalize"
					>
						{submitting ? `${type}ing...` : type}
					</button>
				</div>
			</form>
		</>
	);
};

export default Form;
