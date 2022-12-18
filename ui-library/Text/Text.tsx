import { FC, ReactNode } from "react";
import cx from "classnames";
import styles from "./Text.module.scss";

type Props = {
  children: ReactNode;
  heading?: boolean;
  center?: boolean;
};

export const Text: FC<Props> = ({ children, heading, center }) => {
  return (
    <span className={cx(styles.root, {
      [styles.heading]: heading,
      [styles.center]: center
    })}>
      {children}
    </span>
  );
};
