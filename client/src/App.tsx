import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./route";
import { store } from "./store";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<AppRoutes />
			</Router>
		</Provider>
	);
}

export default App;
