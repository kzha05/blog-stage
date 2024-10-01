import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Single from './single-post.jsx';

const Entrypoint = () => {

	const router = createBrowserRouter( [
		{
			path: '/',
			Component: App,
		},
		{
			path: '/single/:pageId',
			Component: Single,
		}
	] );

	return (
		<RouterProvider router={ router } />
	)
};

export default Entrypoint;
