import './App.css';
import { useEffect, useState } from 'react';
import { useParams, useRoutes } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

function Single() {

	const [post, setPost] = useState(null);
	const { pageId } = useParams();
	const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_ANON_TOKEN);


	useEffect(() => {
		if (pageId === undefined) {
			return;
		}

		// select the supabase post correspondant with the id
		// setPost(supabasepost);
		(async () => {
			const { data } = await supabase.from('posts').select(`*`).eq(`id`, pageId);

			const fetchPost = data[0];

			setPost(fetchPost);

		})();

	}, [pageId]);


	return (
		<>
			<header className="header">
				<nav>
					<a href="/">Home</a>
					<a href="">Stage 1</a>
					<a href="">Stage 2</a>
				</nav>
				<div className="profile"></div>
			</header>
			<main className="main">
				<div id="text-scroll">
					<h1>{ post && post.Title }</h1>
					<h2>{ post && post.category }</h2>
					<h3 className="post-date">{ post && new Intl.DateTimeFormat('nl-NL', {
						year: 'numeric',
						month: 'long',
						day: '2-digit',
					}).format(new Date(post.created_at)) }
					</h3>
					<p style={ { whiteSpace: 'pre-wrap' } }>{ post && post['post-text'] }</p>
				</div>
				<div className="side-bar"></div>
			</main>
		</>);
}

export default Single;
