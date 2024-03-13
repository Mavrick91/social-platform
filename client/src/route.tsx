import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UnauthenticatedLayout from "./layout/UnauthenticatedLayout";

const routes = [
	{
		path: "/login",
		element: <Login />,
		layout: UnauthenticatedLayout,
	},
	{
		path: "/register",
		element: <Register />,
		layout: UnauthenticatedLayout,
	},
	// Add more route configurations as needed
];

export const AppRoutes = () => (
	<Routes>
		{routes.map(({ path, element, layout: Layout }) => (
			<Route key={path} path={path} element={<Layout>{element}</Layout>} />
		))}
	</Routes>
);
