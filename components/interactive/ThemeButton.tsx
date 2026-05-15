import { cva } from "class-variance-authority";

type ButtonProp = {
  label: string;
  callback: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
};

const buttonStyles = cva("px-4 py-2 rounded font-medium transition", {
  variants: {
    variant: {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
      danger: "bg-red-600 text-white hover:bg-red-700",
      ghost: "bg-transparent hover:bg-gray-100",
    },
    size: {
      sm: "text-sm px-3 py-1",
      md: "text-base px-4 py-2",
      lg: "text-lg px-5 py-3",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export default function DefaultButton(prop: ButtonProp) {
  return (
    <button
      className={buttonStyles({ variant: prop.variant, size: prop.size })}
      onClick={prop.callback}
    >
      {prop.label}
    </button>
  );
}
