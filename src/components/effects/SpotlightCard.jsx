function SpotlightCard({ as: Tag = 'div', className = '', children }) {
  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    event.currentTarget.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`);
  };

  return (
    <Tag className={`spotlight-card ${className}`.trim()} onPointerMove={handlePointerMove}>
      {children}
    </Tag>
  );
}

export default SpotlightCard;
