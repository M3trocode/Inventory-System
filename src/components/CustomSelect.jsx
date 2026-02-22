/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useRef, useEffect } from 'react';
import './customSelect.css';

export default function CustomSelect({ options = [], value, onChange, placeholder = '' }) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const root = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (root.current && !root.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  useEffect(() => {
    const idx = options.indexOf(value);
    // allow updating highlight from controlled `value` prop
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (idx >= 0) setHighlight(idx);
  }, [value, options]);

  const selected = value || placeholder || options[0];

  function toggle() {
    setOpen((s) => !s);
  }

  function handleKey(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => Math.min(h + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const opt = options[highlight];
      if (opt) {
        onChange?.(opt);
        setOpen(false);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  function selectOption(opt, idx) {
    onChange?.(opt);
    setHighlight(idx);
    setOpen(false);
  }

  return (
    <div
      className="custom-select"
      ref={root}
      tabIndex={0}
      onKeyDown={handleKey}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
    >
      <button type="button" className="cs-toggle" onClick={toggle} aria-label={`Select ${selected}`}>
        <span className="cs-label">{selected}</span>
        <span className="cs-chevron" aria-hidden />
      </button>

      {open && (
        <ul className="cs-options" role="listbox">
          {options.map((opt, idx) => (
            <li
              key={opt}
              role="option"
              aria-selected={opt === selected}
              className={`cs-option ${idx === highlight ? 'highlight' : ''} ${opt === selected ? 'selected' : ''}`}
              onMouseEnter={() => setHighlight(idx)}
              onClick={() => selectOption(opt, idx)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
