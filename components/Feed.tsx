const Feed = async () => {
	const feed = await fetch("/api/prompt/", {
		cache: "no-store",
	}).then((res) => res.json());

	console.log(feed);

	return <div>Feed</div>;
};

export default Feed;
