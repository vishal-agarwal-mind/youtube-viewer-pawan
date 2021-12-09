import { Provider } from "react-redux";
import App from "../App";
import store from "../redux/store";
import { render } from "@testing-library/react";

it('renders without crashing [Test generated via @testing-library/react]', async () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );
});