type ButtonProp = {
  label: string;
  callback: () => void;
};

export default function DefaultButton(prop: ButtonProp) {
  return <button onClick={prop.callback}>{prop.label}</button>;
}
