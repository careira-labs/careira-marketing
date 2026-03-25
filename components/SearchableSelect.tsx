import { useState, useRef, useEffect, useCallback } from 'react';
import type { SelectOption } from '../lib/form-options';

interface SearchableSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  id?: string;
  hasError?: boolean;
}

export default function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  required,
  id,
  hasError,
}: SearchableSelectProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Display the selected label when not searching
  const selectedLabel = options.find((o) => o.value === value)?.label || '';

  const filtered = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const selectOption = useCallback(
    (val: string) => {
      onChange(val);
      setQuery('');
      setOpen(false);
      setHighlightIndex(-1);
    },
    [onChange],
  );

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
        setHighlightIndex(-1);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightIndex] as HTMLElement;
      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightIndex]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightIndex((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightIndex >= 0 && filtered[highlightIndex]) {
          selectOption(filtered[highlightIndex].value);
        }
        break;
      case 'Escape':
        setOpen(false);
        setQuery('');
        setHighlightIndex(-1);
        break;
    }
  }

  return (
    <>
      <div className="ss-container" ref={containerRef}>
        <input
          ref={inputRef}
          id={id}
          type="text"
          className={`ss-input${hasError ? ' error' : ''}`}
          placeholder={placeholder}
          value={open ? query : selectedLabel}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlightIndex(-1);
            if (!open) setOpen(true);
          }}
          onFocus={() => {
            setOpen(true);
            setQuery('');
          }}
          onKeyDown={handleKeyDown}
          required={required}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-autocomplete="list"
        />
        <span className="ss-chevron" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>

        {open && filtered.length > 0 && (
          <ul className="ss-list" ref={listRef} role="listbox">
            {filtered.map((opt, i) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                className={`ss-option${i === highlightIndex ? ' highlighted' : ''}${opt.value === value ? ' selected' : ''}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectOption(opt.value);
                }}
                onMouseEnter={() => setHighlightIndex(i)}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}

        {open && filtered.length === 0 && (
          <div className="ss-empty">No results</div>
        )}
      </div>

      <style jsx>{`
        .ss-container {
          position: relative;
          width: 100%;
        }

        .ss-input {
          width: 100%;
          padding: 0.875rem 2.25rem 0.875rem 1rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 1rem;
          transition: border-color 0.15s, box-shadow 0.15s;
          background: var(--surface);
          color: var(--text);
          cursor: pointer;
        }

        .ss-input:focus {
          outline: none;
          border-color: var(--brand-coral);
          box-shadow: 0 0 0 3px var(--focus-ring);
          cursor: text;
        }

        .ss-input.error {
          border-color: var(--error);
        }

        .ss-input::placeholder {
          color: var(--text-muted);
        }

        .ss-chevron {
          position: absolute;
          right: 0.875rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
          display: flex;
        }

        .ss-list {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          max-height: 240px;
          overflow-y: auto;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          z-index: 100;
          list-style: none;
          margin: 0;
          padding: 4px 0;
        }

        .ss-option {
          padding: 0.625rem 1rem;
          cursor: pointer;
          font-size: 0.9375rem;
          color: var(--text);
          transition: background 0.1s;
        }

        .ss-option.highlighted {
          background: var(--canvas);
        }

        .ss-option.selected {
          font-weight: 600;
        }

        .ss-empty {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          padding: 0.75rem 1rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          z-index: 100;
          color: var(--text-muted);
          font-size: 0.9375rem;
        }
      `}</style>
    </>
  );
}
