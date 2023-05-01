import { Fragment, useMemo } from "react";

export const SIZE_TYPE = {
  full: "full",
  medium: "medium",
  small: "small",
};

function Modal({
  children,
  open,
  onClose = () => {},
  size = SIZE_TYPE.full,
  isDimmer = false,
  bgColors = "bg-slate-800",
}) {
  const { clss, clssDimmer } = useMemo(() => {
    const clss = [bgColors, "z-40"];
    const clssDimmer = ["fixed", "inset-0", "bg-black", "opacity-75", "z-30"];

    if (size === SIZE_TYPE.full) {
      clss.push("fixed", "inset-0");
    }

    if (size === SIZE_TYPE.medium) {
      clss.push(
        "fixed",
        "inset-0",
        "top-1/2",
        "left-1/2",
        "-translate-x-1/2",
        "-translate-y-1/2",
        "max-w-screen-lg"
      );
    }

    if (size === SIZE_TYPE.small) {
      clss.push(
        "fixed",
        "inset-0",
        "top-1/2",
        "left-1/2",
        "-translate-x-1/2",
        "-translate-y-1/2",
        "max-w-screen-md"
      );
    }

    if (!open) {
      clssDimmer.push("hidden");
      clss.push("hidden");
    }

    return { clss: clss.join(" "), clssDimmer: clssDimmer.join(" ") };
  }, [open, size, isDimmer, bgColors]);

  return (
    <Fragment>
      {isDimmer && <div className={clssDimmer} onClick={onClose} />}
      <div className={clss}>{children}</div>
    </Fragment>
  );
}
export default Modal;
