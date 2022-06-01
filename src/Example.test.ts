import "vue";
import { render } from "@testing-library/vue";
import { VueQueryPlugin } from "vue-query";
import { Api } from "./api";
import Example from "./Example.vue";

jest.mock("./api");
const mockApi = jest.mocked(Api);

function renderExample() {
  return render(Example, {
    global: {
      plugins: [VueQueryPlugin],
    },
  });
}

describe("Example Component", () => {
  beforeEach(() => {
    // Rest JSDOM
    document.getElementsByTagName("html")[0].innerHTML = "";
  });

  it("should show the results when the API returns data", async () => {
    mockApi.getColors.mockResolvedValue(["Blue", "Green", "Red"]);

    const { findByText, queryByText, debug } = renderExample();

    expect(await findByText("Blue")).toBeInTheDocument();
    expect(await findByText("Green")).toBeInTheDocument();
    expect(await findByText("Red")).toBeInTheDocument();
    expect(queryByText("No results")).not.toBeInTheDocument();
    expect(queryByText("Loading...")).not.toBeInTheDocument();

    debug();
  });

  it("should show an empty list when the API returns no data", async () => {
    mockApi.getColors.mockResolvedValue([]);

    const { findByText, debug } = renderExample();

    expect(await findByText("No results")).toBeInTheDocument();

    debug();
  });

  it("should show a loading indicator while the data is loading", async () => {
    mockApi.getColors.mockResolvedValue([]);

    const { findByText, debug } = renderExample();

    expect(await findByText("Loading...")).toBeInTheDocument();

    debug();
  });

  it("should show the error message when the API throws an error", async () => {
    const errorMessage = "Failed to load colors";
    mockApi.getColors.mockRejectedValue(Error(errorMessage));

    const { findByText, queryByText, debug } = renderExample();

    expect(await findByText(errorMessage)).toBeInTheDocument();
    expect(queryByText("Loading...")).not.toBeInTheDocument();
    expect(queryByText("No results")).not.toBeInTheDocument();

    debug();
  });
});
