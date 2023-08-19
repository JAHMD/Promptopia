import Feed from "@/components/Feed";

export default async function Home() {
	return (
		<section className="w-full flex flex-col items-center">
			<h1 className="head_text text-center">
				discover & share <br className="" />
				<span className="orange_gradient">AI-Powerd prompt</span>
			</h1>
			<p className="desc text-center">
				Promptopia is an open source AI prompting tool for modern world to
				discover, create and share creative prompts.
			</p>
			<Feed />
		</section>
	);
}
