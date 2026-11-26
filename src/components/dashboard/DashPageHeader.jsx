export default function DashPageHeader({ eyebrow, title, text, action }) {
  return (
    <div className="dash-page-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
      {action}
    </div>
  )
}
