export default function Button({ children, variant = 'solid', className = '', ...props }) {
  return (
    <button className={`button button-${variant} ${className}`} {...props}>
      {children}
    </button>
  )
}
