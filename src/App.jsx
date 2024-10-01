import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Post from './components/Post.jsx';
import './App.css';


function App() {
	const [posts, setPosts] = useState([]);  // Posts from the database
	const [filteredPosts, setFilteredPosts] = useState([]);  // Posts to display
	const [selectedCategory, setSelectedCategory] = useState('');  // Selected filter category
	const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_ANON_TOKEN);

	useEffect(() => {
		// Fetch the posts
		(async () => {
			const { data } = await supabase.from('posts').select();
			setPosts(data);
			setFilteredPosts(data);  // show all
		})();
	}, []);

	// Function to handle filtering posts by category
	const filterPosts = (category) => {
		setSelectedCategory(category);
		if (category) {
			// Filter posts by category
			setFilteredPosts(posts.filter(post => post.category === category));
		} else {
			// Show all posts
			setFilteredPosts(posts);
		}
	};

	return (
		<>
			<header className="header">
				<nav>
					<button
						className={ selectedCategory === '' ? 'active' : '' }
						onClick={ () => filterPosts('') }
					>
						All
					</button>
					<button
						className={ selectedCategory === 'stage 1' ? 'active' : '' }
						onClick={ () => filterPosts('stage 1') }
					>
						Stage 1
					</button>
					<button
						className={ selectedCategory === 'stage 2' ? 'active' : '' }
						onClick={ () => filterPosts('stage 2') }
					>
						Stage 2
					</button>
				</nav>
				<div className="profile"></div>
			</header>
			<main className="main">
				<div id="posts-scroll" className="posts">
					{ filteredPosts && filteredPosts.map((post) => (
						<Post
							key={ post.id }
							category={ post.category }
							title={ post.Title }
							text={ post['post-text'] }
							created_at={ post.created_at }
							id={ post.id }
						/>
					)) }
				</div>
				<div className="side-bar"></div>
			</main>
		</>
	);
}

export default App;
