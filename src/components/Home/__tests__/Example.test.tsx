import { act, fireEvent, render, screen } from "@testing-library/react";
import i18next from "i18next";
import {
  AppProviders,
  AppProvidersProps
} from "~/components/common/AppProviders/AppProviders";
import { somethingSelector } from "~/state/features/example/selectors";
import { store } from "~/state/store";
import { t, tkHome } from "~/translations/i18n";
import { Example } from "../Example/Example";

describe("Example component", () => {
  let tk: typeof tkHome.component.example;
  let providersProps: AppProvidersProps;

  beforeAll(() => {
    tk = tkHome.component.example;
    providersProps = { store, i18n: i18next };
  });

  it("should match with the snapshot", () => {
    const { container } = render(
      <AppProviders {...providersProps}>
        <Example />
      </AppProviders>
    );
    expect(container).toMatchSnapshot();
  });

  it("should have the input value empty at the beginning", () => {
    render(
      <AppProviders {...providersProps}>
        <Example />
      </AppProviders>
    );
    const inputPlaceholderText = t(tk.input.placeholder);
    const input: HTMLInputElement =
      screen.getByPlaceholderText(inputPlaceholderText);
    expect(input.value).toBe("");
  });

  it('should have the input value "algo" after change it', async () => {
    render(
      <AppProviders {...providersProps}>
        <Example />
      </AppProviders>
    );
    const inputPlaceholderText = t(tk.input.placeholder);
    const input: HTMLInputElement =
      screen.getByPlaceholderText(inputPlaceholderText);
    await act(async () => {
      fireEvent.input(input, { target: { value: "algo" } });
    });
    expect(input.value).toBe("algo");
  });

  it('should have the redux state value "algo" after change the input value and clicking submit button', async () => {
    render(
      <AppProviders {...providersProps}>
        <Example />
      </AppProviders>
    );
    const something = somethingSelector(providersProps.store.getState());
    expect(something).toBe("");
  });

  it("should have the redux state value empty at the beginning", async () => {
    render(
      <AppProviders {...providersProps}>
        <Example />
      </AppProviders>
    );
    const inputPlaceholderText = t(tk.input.placeholder);
    const input: HTMLInputElement =
      screen.getByPlaceholderText(inputPlaceholderText);
    const submitButtonText = t(tk.submitButton);
    const submitButton: HTMLButtonElement = screen.getByRole("button", {
      name: submitButtonText
    });
    await act(async () => {
      fireEvent.input(input, { target: { value: "algo" } });
      fireEvent.click(submitButton);
    });
    const something = somethingSelector(providersProps.store.getState());
    expect(something).toBe("algo");
  });
});
