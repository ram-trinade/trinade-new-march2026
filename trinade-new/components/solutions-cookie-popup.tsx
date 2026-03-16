'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CookieCategory {
  id: string;
  label: string;
  description: string;
  required: boolean;
  defaultChecked: boolean;
}

const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: 'necessary',
    label: 'Strictly necessary',
    description: 'Cookies required to enable basic website functionality.',
    required: true,
    defaultChecked: true,
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description:
      'Cookies used to deliver advertising that is more relevant to you and your interests.',
    required: false,
    defaultChecked: false,
  },
  {
    id: 'personalization',
    label: 'Personalization',
    description:
      'Cookies allowing the website to remember choices you make (such as your name, language, or the region you are in).',
    required: false,
    defaultChecked: false,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    description:
      'Cookies helping understand how this website performs, how visitors interact with the site, and whether there may be technical issues.',
    required: false,
    defaultChecked: false,
  },
];

const STORAGE_KEY = 'trinade-cookies-accepted';

const glassStyle: React.CSSProperties = {
  background:
    'linear-gradient(165deg, rgba(210,192,158,0.95) 0%, rgba(195,172,132,0.93) 40%, rgba(215,198,165,0.94) 100%)',
  backdropFilter: 'blur(28px) saturate(1.8)',
  WebkitBackdropFilter: 'blur(28px) saturate(1.8)',
  boxShadow:
    '0 8px 32px rgba(130,95,30,0.22), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(130,95,30,0.12)',
  border: '1px solid rgba(180,150,95,0.35)',
  borderRadius: '28px',
};

const easing = [0.32, 0.72, 0, 1] as const;

export default function SolutionsCookiePopup() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [categories, setCategories] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(COOKIE_CATEGORIES.map((c) => [c.id, c.defaultChecked]))
  );

  useEffect(() => {
    // Always show cookie popup on every page visit
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const persist = (value: Record<string, boolean> | 'all') => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(value === 'all' ? { all: true, timestamp: Date.now() } : { categories: value, timestamp: Date.now() })
      );
    } catch {
      // Silently fail
    }
    setVisible(false);
    setExpanded(false);
  };

  const handleAcceptAll = () => persist('all');

  const handleSaveChanges = () => persist(categories);

  const handleClose = () => {
    setVisible(false);
    setExpanded(false);
  };

  const toggleCategory = (id: string) => {
    setCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Custom scrollbar for expanded modal */}
          <style>{`
            .cookie-modal-expanded::-webkit-scrollbar {
              width: 4px;
            }
            .cookie-modal-expanded::-webkit-scrollbar-track {
              background: rgba(160,120,50,0.08);
              border-radius: 4px;
              margin: 24px 0;
            }
            .cookie-modal-expanded::-webkit-scrollbar-thumb {
              background: rgba(201,168,110,0.35);
              border-radius: 4px;
              transition: background 0.2s;
            }
            .cookie-modal-expanded::-webkit-scrollbar-thumb:hover {
              background: rgba(201,168,110,0.55);
            }
            .cookie-modal-expanded {
              scrollbar-width: thin;
              scrollbar-color: rgba(201,168,110,0.35) rgba(160,120,50,0.08);
            }
          `}</style>

          {/* Dark overlay — only shown in expanded state */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(0,0,0,0.4)',
                  zIndex: 9998,
                }}
                onClick={handleClose}
              />
            )}
          </AnimatePresence>

          {/* Compact popup */}
          <AnimatePresence mode="wait">
            {!expanded ? (
              <motion.div
                key="compact"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{ duration: 0.4, ease: easing }}
                style={{
                  ...glassStyle,
                  position: 'fixed',
                  bottom: '24px',
                  right: '24px',
                  width: '380px',
                  zIndex: 9999,
                  padding: '24px',
                }}
              >
                {/* Close button */}
                <button
                  onClick={handleClose}
                  aria-label="Close cookie popup"
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'rgba(160,120,50,0.12)',
                    border: '1px solid rgba(201,168,110,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'rgba(90,70,40,0.7)',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      'rgba(160,120,50,0.22)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      'rgba(160,120,50,0.12)';
                  }}
                >
                  <CloseIcon />
                </button>

                {/* Title */}
                <h3
                  style={{
                    margin: '0 0 10px 0',
                    fontSize: '20px',
                    fontWeight: 800,
                    color: '#2a2218',
                    lineHeight: 1.2,
                    paddingRight: '32px',
                  }}
                >
                  Cookie settings
                </h3>

                {/* Description */}
                <p
                  style={{
                    margin: '0 0 20px 0',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: 1.6,
                    color: 'rgba(90,70,40,0.75)',
                  }}
                >
                  By clicking &ldquo;Accept all cookies&rdquo;, you agree to
                  storing cookies on your device to enhance site navigation,
                  analyze site usage and assist in our marketing efforts as
                  outlined in our privacy policy.
                </p>

                {/* Separator */}
                <div
                  style={{
                    height: '1px',
                    background: 'rgba(160,120,50,0.2)',
                    marginBottom: '16px',
                  }}
                />

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={handleAcceptAll}
                    style={{
                      flex: 1,
                      height: '48px',
                      borderRadius: '9999px',
                      background: '#1a1a1e',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '15px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      letterSpacing: '0.01em',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        '#2d2d34';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        '#1a1a1e';
                    }}
                  >
                    Accept all
                  </button>
                  <button
                    onClick={() => setExpanded(true)}
                    style={{
                      flex: 1,
                      height: '48px',
                      borderRadius: '9999px',
                      background: 'transparent',
                      color: '#2a2218',
                      border: '1px solid rgba(201,168,110,0.4)',
                      fontSize: '15px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'border-color 0.2s, background 0.2s',
                      letterSpacing: '0.01em',
                    }}
                    onMouseEnter={(e) => {
                      const btn = e.currentTarget as HTMLButtonElement;
                      btn.style.borderColor = 'rgba(201,168,110,0.7)';
                      btn.style.background = 'rgba(201,168,110,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      const btn = e.currentTarget as HTMLButtonElement;
                      btn.style.borderColor = 'rgba(201,168,110,0.4)';
                      btn.style.background = 'transparent';
                    }}
                  >
                    Settings
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Expanded modal */
              <motion.div
                key="expanded"
                className="cookie-modal-expanded"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: easing }}
                style={{
                  ...glassStyle,
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  margin: 'auto',
                  width: '500px',
                  maxWidth: 'calc(100vw - 32px)',
                  height: 'fit-content',
                  maxHeight: 'calc(100vh - 64px)',
                  overflowY: 'auto',
                  zIndex: 9999,
                  padding: '32px',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={handleClose}
                  aria-label="Close cookie popup"
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(160,120,50,0.12)',
                    border: '1px solid rgba(201,168,110,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'rgba(90,70,40,0.7)',
                    transition: 'background 0.2s',
                    zIndex: 1,
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      'rgba(160,120,50,0.22)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      'rgba(160,120,50,0.12)';
                  }}
                >
                  <CloseIcon />
                </button>

                {/* Title */}
                <h3
                  style={{
                    margin: '0 0 12px 0',
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#2a2218',
                    lineHeight: 1.2,
                    paddingRight: '40px',
                  }}
                >
                  Cookie settings
                </h3>

                {/* Description */}
                <p
                  style={{
                    margin: '0 0 22px 0',
                    fontSize: '14.5px',
                    fontWeight: 500,
                    lineHeight: 1.6,
                    color: 'rgba(90,70,40,0.75)',
                  }}
                >
                  By clicking &ldquo;Accept all cookies&rdquo;, you agree to
                  storing cookies on your device to enhance site navigation,
                  analyze site usage and assist in our marketing efforts as
                  outlined in our privacy policy.
                </p>

                {/* Separator */}
                <div
                  style={{
                    height: '1px',
                    background: 'rgba(160,120,50,0.2)',
                    marginBottom: '16px',
                  }}
                />

                {/* Category cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  {COOKIE_CATEGORIES.map((category) => (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      checked={categories[category.id]}
                      onToggle={() => toggleCategory(category.id)}
                    />
                  ))}
                </div>

                {/* Separator */}
                <div
                  style={{
                    height: '1px',
                    background: 'rgba(160,120,50,0.2)',
                    marginBottom: '16px',
                  }}
                />

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={handleAcceptAll}
                    style={{
                      flex: 1,
                      height: '48px',
                      borderRadius: '9999px',
                      background: '#1a1a1e',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '15px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      letterSpacing: '0.01em',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        '#2d2d34';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        '#1a1a1e';
                    }}
                  >
                    Accept all
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    style={{
                      flex: 1,
                      height: '48px',
                      borderRadius: '9999px',
                      background: 'transparent',
                      color: '#2a2218',
                      border: '1px solid rgba(201,168,110,0.4)',
                      fontSize: '15px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'border-color 0.2s, background 0.2s',
                      letterSpacing: '0.01em',
                    }}
                    onMouseEnter={(e) => {
                      const btn = e.currentTarget as HTMLButtonElement;
                      btn.style.borderColor = 'rgba(201,168,110,0.7)';
                      btn.style.background = 'rgba(201,168,110,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      const btn = e.currentTarget as HTMLButtonElement;
                      btn.style.borderColor = 'rgba(201,168,110,0.4)';
                      btn.style.background = 'transparent';
                    }}
                  >
                    Save changes
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function CategoryCard({
  category,
  checked,
  onToggle,
}: {
  category: CookieCategory;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        background: 'rgba(201,168,110,0.12)',
        border: '1px solid rgba(201,168,110,0.18)',
        borderRadius: '16px',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
      }}
    >
      {/* Checkbox */}
      <button
        role="checkbox"
        aria-checked={checked}
        aria-label={category.label}
        disabled={category.required}
        onClick={category.required ? undefined : onToggle}
        style={{
          flexShrink: 0,
          marginTop: '2px',
          width: '20px',
          height: '20px',
          borderRadius: '6px',
          border: checked
            ? '2px solid #8a6b2f'
            : '2px solid rgba(120,85,25,0.55)',
          background: checked ? '#8a6b2f' : 'rgba(140,100,40,0.15)',
          cursor: category.required ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.18s, border-color 0.18s',
          opacity: category.required ? 0.75 : 1,
          padding: 0,
        }}
      >
        {checked && (
          <svg
            width="11"
            height="9"
            viewBox="0 0 11 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 4L4 7.5L10 1"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '4px',
          }}
        >
          <span
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: '#2a2218',
              lineHeight: 1.3,
            }}
          >
            {category.label}
          </span>
          {category.required && (
            <span
              style={{
                fontSize: '11px',
                fontWeight: 500,
                color: 'rgba(90,70,40,0.6)',
                background: 'rgba(201,168,110,0.18)',
                border: '1px solid rgba(201,168,110,0.25)',
                borderRadius: '999px',
                padding: '1px 8px',
                whiteSpace: 'nowrap',
              }}
            >
              always active
            </span>
          )}
        </div>
        <p
          style={{
            margin: 0,
            fontSize: '13.5px',
            fontWeight: 500,
            lineHeight: 1.55,
            color: 'rgba(90,70,40,0.7)',
          }}
        >
          {category.description}
        </p>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L11 11M11 1L1 11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
