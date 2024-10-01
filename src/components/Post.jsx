const Post = (props) => {
	const { title, text, created_at, category, id } = props;

	const backgroundColor = category === 'stage 1' ? 'var(--stage-1)' : category === 'stage 2' ? 'var(--stage-2)' : 'var(--grey-black)';

	return (
		<div className="post">
			<p className="category" style={{ background: backgroundColor }}>{ category }</p>
			<h2 className="post-title">{ title }</h2>
			<p className="post-date">{
				new Intl.DateTimeFormat('nl-NL', {
					year: 'numeric',
					month: 'long',
					day: '2-digit',
				}).format(new Date(created_at))
			}</p>
			<a href={`single/${id}`} className="post-text">{ text }</a>
		</div>
	);
};

export default Post;
