"use client";

import { ChangeEvent, useEffect, useState } from "react";
import PromptCard from "./PromptCard";

export type PostType = {
	_id: string;
	prompt: string;
	tag: string;
	creator: any;
};

const PromptCardList = ({
	data,
	handleTagClick,
}: {
	data: PostType[];
	handleTagClick: any;
}) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [allPosts, setAllPosts] = useState<PostType[]>([]);

	const [searchText, setSearchText] = useState("");

	const [searchedResults, setSearchedResults] = useState<PostType[]>([]);

	const filterPrompts = (searchtext: string) => {
		const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
		console.log(regex);
		return allPosts.filter(
			(item) =>
				regex.test(item.creator.username) ||
				regex.test(item.tag) ||
				regex.test(item.prompt)
		);
	};

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
		const searchResult = filterPrompts(e.target.value);
		setSearchedResults(searchResult);
	};

	const handleTagClick = (tagName: string) => {
		setSearchText(tagName);
		const searchResult = filterPrompts(tagName);
		setSearchedResults(searchResult);
	};

	async function getPosts() {
		const allPosts = await fetch("/api/prompt").then((res) => res.json());
		setAllPosts(allPosts);
	}

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="search"
					placeholder="Search for a tag or a username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			{searchText ? (
				<PromptCardList
					data={searchedResults}
					handleTagClick={handleTagClick}
				/>
			) : (
				<PromptCardList data={allPosts} handleTagClick={handleTagClick} />
			)}
		</section>
	);
};

export default Feed;
