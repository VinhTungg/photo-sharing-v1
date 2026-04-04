import { render, screen } from "@testing-library/react";

import App from "./App";

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url === "/user/list") {
      return Promise.resolve({
        ok: true,
        json: async () => [
          {
            _id: "1",
            first_name: "Test",
            last_name: "User",
            location: "Test City",
          },
        ],
      });
    }

    return Promise.resolve({
      ok: true,
      json: async () => null,
    });
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

test("hiển thị danh sách người dùng ở thanh bên", async () => {
  render(<App />);

  expect(await screen.findByText("Danh sách người dùng")).toBeInTheDocument();

  expect((await screen.findAllByText("Test User")).length).toBeGreaterThan(0);
});
