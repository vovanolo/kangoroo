import { useMemo } from "react";
import styles from "./index.module.css";

export default function Loader({ size = "large" }) {
  const classes = useMemo(() => {
    return [styles[`lds-dual-ring`], styles[size]].join(" ");
  }, [size]);

  return <div className={classes}></div>;
}
