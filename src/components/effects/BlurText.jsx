function BlurText({ as: Tag = 'span', text, className = '', delay = 55 }) {
  let characterIndex = 0;

  return (
    <Tag className={`blur-text ${className}`.trim()} aria-label={text}>
      {text.split('\n').map((line, lineIndex) => (
        <span className="blur-text-line" aria-hidden="true" key={`${line}-${lineIndex}`}>
          {line.split('').map((character) => {
            const currentIndex = characterIndex;
            characterIndex += 1;

            return (
              <span
                className="blur-text-character"
                style={{ animationDelay: `${currentIndex * delay}ms` }}
                key={`${character}-${lineIndex}-${currentIndex}`}
              >
                {character === ' ' ? '\u00a0' : character}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

export default BlurText;
