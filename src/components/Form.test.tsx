import { cleanup, render } from "@testing-library/react";
import Form from "./Form";

afterEach(cleanup);

test('should generate a snapshot for `Form` component', () => {
  const asFragment = render(<Form />);
  expect(asFragment).toMatchSnapshot();
});
