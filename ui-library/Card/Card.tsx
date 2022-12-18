import styles from "./Card.module.scss";
import { FC, ReactNode } from "react";
import cx from "classnames";

type Props = {
  children: ReactNode;
  center?: boolean;
  className?: string;
};

export const Card: FC<Props> = ({ children, center, className }) => {
  return (
    <div className={cx(styles.root, className, {[styles.center]: center})}>{children}</div>
  );
};
