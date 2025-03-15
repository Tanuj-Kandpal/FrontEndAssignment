import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import Posts from "../Components/Posts";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockStore = configureStore([]);

describe("Posts Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      post: { posts: [] },
    });
    store.dispatch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test("renders search input and shows 'No posts found' initially", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Posts />
        </MemoryRouter>
      </Provider>
    );

    // Check if the search input is rendered
    expect(screen.getByPlaceholderText("Search posts...")).toBeInTheDocument;

    // Check if the 'No posts found' message is displayed
    expect(screen.getByText("No posts found.")).toBeInTheDocument;

    // Optionally, verify that dispatch was not called (if expected)
    expect(store.dispatch).not.toHaveBeenCalled;
  });
});
