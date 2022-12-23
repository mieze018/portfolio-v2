export const Button = ({ children, ...props }: { children: React.ReactNode }) => (
  <button {...props} className="border">
    {children}
  </button>
)
