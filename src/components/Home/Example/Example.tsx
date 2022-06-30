import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { onSomethingChange } from "~/state/features/example/events";
import { somethingSelector } from "~/state/features/example/selectors";
import { useAppDispatch } from "~/state/store";
import { tkHome } from "~/translations/i18n";
import { FC } from "~/types/react";
import { getClassName } from "~/utils/components";
import classes from "./Example.module.scss";

export interface ExampleProps {
  className?: string;
}

const tk = tkHome.component.example;
const somethingId = "something";

export const Example: FC<ExampleProps> = ({ className }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [currentSomething, setCurrentSomething] = useState<string>("");
  const something = useSelector(somethingSelector);
  const handleSomethingSubmit = () => {
    dispatch(onSomethingChange(currentSomething));
  };
  return (
    <div className={getClassName(classes.container, className)}>
      <label>{t(tk.input.label)}</label>
      <input
        id={somethingId}
        placeholder={t(tk.input.placeholder)}
        value={currentSomething}
        onChange={(e) => setCurrentSomething(e.target.value)}
      />
      <button onClick={handleSomethingSubmit}>{t(tk.submitButton)}</button>
      <p>{t(tk.value, { value: something })}</p>
    </div>
  );
};
