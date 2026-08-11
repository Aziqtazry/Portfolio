function ShinyText({ as: Tag = 'span', children, className = '' }) {
  return <Tag className={`shiny-text ${className}`.trim()}>{children}</Tag>;
}

export default ShinyText;
