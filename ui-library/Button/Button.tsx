import { FC, ReactNode } from "react";
import cx from "classnames";
import styles from "./Button.module.scss";

type Props = {
  children: ReactNode;
  onClick(): void;
  primary?: boolean;
  secondary?: boolean;
};

export const Button: FC<Props> = (props: Props) => {
  const { children,
    onClick, primary,
    secondary} = props;
  return (
    <button onClick={onClick} className={cx(styles.root, {
      [styles.primary]: primary,
      [styles.secondary]: secondary
    })}>
      {children}
    </button>
  );
};

Button.displayName = "Button";
