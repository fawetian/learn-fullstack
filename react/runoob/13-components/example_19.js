// Card.jsx
export default function Card({ children }) {
  return <div className="card">{children}</div>;
}
export function CardHeader({ title }) {
  return <div className="card-header">{title}</div>;
}
export function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
}
// App.jsx
import Card, { CardHeader, CardBody } from './Card';