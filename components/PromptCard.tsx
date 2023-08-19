"use client";

import { UserType } from "@/app/create-prompt/page";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { PostType } from "./Feed";

type PropsType = {
	post: PostType;
	handleTagClick?: (tag: string) => void;
	handleEdit?: (id: string) => void;
	handleDelete?: (id: string) => void;
};

const PromptCard = ({
	post,
	handleTagClick,
	handleDelete,
	handleEdit,
}: PropsType) => {
	const { data: session } = useSession();
	const pathName = usePathname();
	const router = useRouter();
	const user = session?.user as UserType;

	const [copied, setCopied] = useState<string>("");

	const handleProfileClick = () => {
		if (post.creator._id === user?.id) return router.push("/profile");

		router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
	};

	const handleCopy = () => {
		setCopied(post.prompt);
		navigator.clipboard.writeText(post.prompt);
		setTimeout(() => setCopied(""), 3000);
	};

	return (
		<div className="prompt_card">
			<div className="flex justify-between items-start gap-5">
				<div
					className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
					onClick={handleProfileClick}
				>
					<Image
						src={post.creator.image}
						alt="user_image"
						width={40}
						height={40}
						className="rounded-full object-contain"
					/>

					<div className="flex flex-col">
						<h3 className="font-satoshi font-semibold text-gray-900">
							{post.creator.username}
						</h3>
						<p className="font-inter text-sm text-gray-500">
							{post.creator.email}
						</p>
					</div>
				</div>

				<div className="copy_btn" onClick={handleCopy}>
					<Image
						src={
							copied === post.prompt
								? "/assets/icons/tick.svg"
								: "/assets/icons/copy.svg"
						}
						alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
						width={12}
						height={12}
					/>
				</div>
			</div>

			<p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
			<p
				className="font-inter text-sm blue_gradient cursor-pointer"
				onClick={() => handleTagClick && handleTagClick(post.tag)}
			>
				#{post.tag}
			</p>

			{user?.id === post.creator._id && pathName === "/profile" && (
				<div className="mt-2 flex-center gap-4 border-t border-gray-100 pt-3">
					<button
						className="font-inter text-sm text-green-500 cursor-pointer border px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
						onClick={() => handleEdit && handleEdit(user.id)}
					>
						Edit
					</button>
					<button
						className="font-inter text-sm text-orange-500 cursor-pointer border px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
						onClick={() => handleDelete && handleDelete(user.id)}
					>
						Delete
					</button>
				</div>
			)}
		</div>
	);
};

export default PromptCard;
