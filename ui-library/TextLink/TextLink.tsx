import { FC, ReactNode } from "react";
import Link from "next/link";
import styles from "./TextLink.module.scss";

type Props = {
  children: ReactNode;
  href: string;
};

export const TextLink: FC<Props> = ({ children, href }) => {
  return (
    <Link href={href}>
      <a className={styles.root}>{children}</a>
    </Link>
  );
};
