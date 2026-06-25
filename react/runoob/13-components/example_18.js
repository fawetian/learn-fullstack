// components.jsx
export function Button({ text }) {
  return <button>{text}</button>;
}
export function Input({ value, onChange }) {
  return <input value={value} onChange={onChange} />;
}
// App.jsx
import { Button, Input } from './components';