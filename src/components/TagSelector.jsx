import React from 'react';
import './TagSelector.css';

const TagSelector = ({ tags, selectedTags, onToggle }) => {
  return (
    <div className="tag-selector">
      <p className="tag-hint">What stood out? <span>(Pick all that apply)</span></p>
      <div className="tags-grid">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag.label);
          return (
            <button
              key={tag.id || tag.label}
              className={`tag-pill ${isSelected ? 'selected' : ''}`}
              onClick={() => onToggle(tag.label)}
              aria-pressed={isSelected}
            >
              <span className="tag-emoji">{tag.emoji}</span>
              <span className="tag-label">{tag.label}</span>
              {isSelected && (
                <span className="tag-check">✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TagSelector;
