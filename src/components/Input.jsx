export default function Input({
  label,
  type = 'text',
  placeholder = '',
  error = '',
  fullWidth = true,
  className = '',
  containerClassName = '',
  ...props
}) {
  const baseStyles = 'w-full px-4 py-2.5 border-2 rounded-lg transition-colors duration-200 outline-none bg-white text-foreground font-medium';
  
  const borderStyles = error
    ? 'border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive'
    : 'border-input focus:border-primary-600 focus:ring-1 focus:ring-primary-600';

  const placeholderStyles = 'placeholder-muted-foreground';

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-semibold text-foreground mb-2">
          {label}
          {props.required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`${baseStyles} ${borderStyles} ${placeholderStyles} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-destructive font-medium mt-1">{error}</p>
      )}
    </div>
  );
}
