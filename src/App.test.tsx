import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import { cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";

afterEach(cleanup); // Cleanup each `Test` after rendering, to prevent `Tests` from appending after last executed `Test`.

// Created `Test` using `jest`.
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

// Snapshot test
it("matches snapshot", () => {
  const tree = renderer.create(<Provider store={store}><App /></Provider>).toJSON();
  expect(tree).toMatchSnapshot()
});
