import type { FC } from "react";
import styles from "./TextInput.module.scss";

type Props = {
  id: string;
  label: string;
  value: string;
  onChange(val: string): void;
};

export const TextInput: FC<Props> = (props: Props) => {
  const { id, label, value, onChange } = props;

  return (
    <div className={styles.root}>
      <input id={id} className={styles.input} type="text" value={value} onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)} />
      <label className={styles.label} htmlFor={id}>{label}</label>
    </div>
  );
};
