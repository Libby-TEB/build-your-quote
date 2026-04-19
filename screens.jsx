// Self-serve pricing flow for The Ethical Bookkeeper
// Brand palette — teal primary, amber + pink accents on white
// Fonts — Sanchez (headlines), Roboto (UI)

const TEB = {
  ink: '#000000',
  inkSoft: '#4A4A4A',
  primary: '#00628B',
  primaryDeep: '#004A6A',
  amber: '#EBA331',
  pink: '#DE67A5',
  pinkHot: '#EF2E8B',
  surface: '#FFFFFF',
  surfaceAlt: '#F2F4F6',
  border: '#E1E5E8',
  muted: '#8A8F93',
};
const SERIF = '"Sanchez", Georgia, serif';
const SANS  = '"Roboto", -apple-system, system-ui, sans-serif';

// ─── Price formatting ───────────────────────────────────────
const gbp = (n) => '£' + (Math.round(n * 100) / 100).toFixed(2).replace(/\.00$/, '');

// ─── Shared UI primitives ───────────────────────────────────
function TEBLogo({ size = 56 }) {
  return (
    <img src="teb-logo.jpg" alt="The Ethical Bookkeeper"
      style={{ height: size, width: 'auto', display: 'block', mixBlendMode: 'multiply' }}/>
  );
}

function PrimaryButton({ label, onClick, disabled, variant = 'primary', icon }) {
  const bg = disabled ? '#CBD0D4' : (variant === 'primary' ? TEB.primary : 'transparent');
  const fg = variant === 'primary' ? '#fff' : TEB.primary;
  const border = variant === 'primary' ? 'none' : `1.5px solid ${TEB.primary}`;
  return (
    <button onClick={disabled ? undefined : onClick} style={{
      width: '100%', height: 54, borderRadius: 14,
      background: bg, color: fg, border,
      fontFamily: SANS, fontSize: 17, fontWeight: 500,
      letterSpacing: -0.2,
      cursor: disabled ? 'default' : 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    }}>
      {label}{icon}
    </button>
  );
}

// Shared turnover / annual revenue bands — used on the business intro screen
// AND passed through as the default "Annual Revenue Range" for each service.
const TURNOVER_BANDS = [
  'Nil',
  'Up to £10k',
  'Up to £30k',
  '£30k - £70k',
  '£70k - £125k',
  '£125 - £250k',
  '£250k - £500k',
  '£500k - £1m',
  '£1m - £2m',
  '£2m - £4m',
  '£4m - £6.5m',
  '£6.5m - £10m',
  '£10m - £15m',
  '£15m - £20m',
  '£20m+',
];

function Field({ label, value, onChange, placeholder, type = 'text', suffix }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <label style={{ display: 'block', marginBottom: 14 }}>
      <div style={{
        fontSize: 11, fontWeight: 700, color: TEB.inkSoft,
        textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 7,
      }}>{label}</div>
      <div style={{
        display: 'flex', alignItems: 'center',
        height: 50, borderRadius: 12,
        background: TEB.surface,
        border: `1.5px solid ${focused ? TEB.primary : TEB.border}`,
        padding: '0 14px',
        boxShadow: focused ? `0 0 0 3px ${TEB.primary}20` : 'none',
      }}>
        <input
          type={type} value={value || ''} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          onChange={e => onChange && onChange(e.target.value)}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: SANS, fontSize: 16, color: TEB.ink,
            letterSpacing: -0.2, minWidth: 0,
          }}
        />
        {suffix && <span style={{ color: TEB.muted, fontSize: 14, marginLeft: 8 }}>{suffix}</span>}
      </div>
    </label>
  );
}

// Native-style dropdown — styled to match Field
function SelectField({ label, value, onChange, options, placeholder }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <label style={{ display: 'block', marginBottom: 14 }}>
      <div style={{
        fontSize: 11, fontWeight: 700, color: TEB.inkSoft,
        textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 7,
      }}>{label}</div>
      <div style={{
        position: 'relative',
        display: 'flex', alignItems: 'center',
        height: 50, borderRadius: 12,
        background: TEB.surface,
        border: `1.5px solid ${focused ? TEB.primary : TEB.border}`,
        padding: '0 14px',
        boxShadow: focused ? `0 0 0 3px ${TEB.primary}20` : 'none',
      }}>
        <select
          value={value || ''}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          onChange={e => onChange && onChange(e.target.value)}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: SANS, fontSize: 16, color: value ? TEB.ink : TEB.muted,
            letterSpacing: -0.2, minWidth: 0, appearance: 'none',
            WebkitAppearance: 'none', MozAppearance: 'none',
            cursor: 'pointer', paddingRight: 24,
          }}>
          <option value="" disabled>{placeholder || 'Choose…'}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <svg width="12" height="8" viewBox="0 0 12 8" style={{
          position: 'absolute', right: 14, pointerEvents: 'none',
        }}>
          <path d="M1 1.5L6 6.5L11 1.5" stroke={TEB.inkSoft} strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>
    </label>
  );
}

function Stepper({ step, total }) {
  return (
    <div style={{ display: 'flex', gap: 5, padding: '0 24px', marginTop: 14 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 4, borderRadius: 2,
          background: i < step ? TEB.primary : TEB.surfaceAlt,
        }}/>
      ))}
    </div>
  );
}

function ScreenHeader({ eyebrow, title, sub, step, total, onBack }) {
  return (
    <div>
      {step !== undefined && <Stepper step={step} total={total}/>}
      <div style={{ padding: '26px 24px 0' }}>
        {onBack && (
          <button onClick={onBack} style={{
            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
            color: TEB.primary, fontFamily: SANS, fontSize: 14, fontWeight: 500,
            marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke={TEB.primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
        )}
        {eyebrow && (
          <div style={{
            fontSize: 11, fontWeight: 700, color: TEB.primary,
            textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10,
          }}>{eyebrow}</div>
        )}
        <h1 style={{
          margin: 0, fontFamily: SERIF, fontSize: 28, fontWeight: 400,
          letterSpacing: -0.6, color: TEB.ink, lineHeight: 1.15,
        }}>{title}</h1>
        {sub && (
          <p style={{
            margin: '10px 0 0', fontFamily: SANS, fontSize: 15, lineHeight: 1.5,
            color: TEB.inkSoft, letterSpacing: -0.1,
          }}>{sub}</p>
        )}
      </div>
    </div>
  );
}

// Shell — all screens share the layout
function Shell({ children, footer, paddingTop = 54 }) {
  return (
    <div style={{
      height: '100%', background: TEB.surface, fontFamily: SANS,
      display: 'flex', flexDirection: 'column',
      paddingTop, boxSizing: 'border-box', color: TEB.ink,
    }}>
      <div style={{ flex: 1, overflow: 'auto' }}>{children}</div>
      {footer && <div style={{ padding: '12px 24px 28px', borderTop: `1px solid ${TEB.border}`, background: TEB.surface }}>{footer}</div>}
    </div>
  );
}

// ─── Price engine ───────────────────────────────────────────
// Compute the live price for a selected service.
function priceService(svc, cfg = {}) {
  // Confirmation Statement — £7/mo always, plus a catch-up one-off based on months until next renewal
  if (svc._formula === 'cs_catchup') {
    return 7; // monthly fee; one-off catch-up shown separately
  }

  // Payroll — custom tiered formula: £25 covers up to 3 employees, £4.50 each additional
  if (svc._formula === 'payroll_tiered') {
    let n = 1;
    const v = cfg['No. of Employees'];
    if (typeof v === 'number') n = v;
    else if (typeof v === 'string') {
      // Match "11-15" → 15, "50+" → 75, "4" → 4, "1-3 (included)" → 3
      const m = v.match(/(\d+)\s*(?:\+|-\s*(\d+))?/);
      if (m) n = +(m[2] || m[1]);
      if (/^\s*50\+/.test(v)) n = 75;
    }
    n = Math.max(1, n);
    return 25 + Math.max(0, n - 3) * 4.5;
  }

  // If base is 0, the first range/select driver holds ABSOLUTE £ values (e.g. revenue bands).
  // Otherwise drivers are multipliers on the base.
  const baseZero = !svc.base;
  let price = svc.base || 0;
  let absoluteApplied = false;
  let frequencyDriver = null;
  let frequencyValue = null;
  for (const [name, d] of Object.entries(svc.drivers || {})) {
    const v = cfg[name];
    // "Months behind / months catch up" drivers are consumed by catchupFor() only —
    // they must NEVER change the monthly fee. Skip them here.
    if (/months? behind|months? catch.?up|number of months/i.test(name)) continue;
    // Frequency is applied LAST so it operates on the fully-multiplied monthly fee
    // (important for _freqQuarterly's round-to-nearest-£5 step).
    if (d.type === 'frequency') {
      frequencyDriver = d;
      frequencyValue = v;
      continue;
    }
    if (d.type === 'numeric') {
      if (baseZero && !absoluteApplied) {
        price += Math.max(1, +v || 1);
        absoluteApplied = true;
      } else {
        price *= Math.max(1, +v || 1);
      }
    } else if (d.type === 'range' || d.type === 'select' || d.type === 'select_count') {
      const opt = d.options.find(o => o.label === v) || d.options[0];
      if (!opt) continue;
      if (baseZero && !absoluteApplied) {
        // Skip "Nil" — use first non-nil option instead
        const useOpt = (/nil/i.test(v || '') || !v) && opt.value === 0
          ? d.options.find(o => !/nil/i.test(o.label) && o.value > 0) || opt
          : opt;
        price += useOpt.value;
        absoluteApplied = true;
      } else {
        price *= opt.value;
      }
    } else if (d.type === 'boolean') {
      // Use driver's own options if provided, otherwise default: Yes = ×1.15
      if (Array.isArray(d.options) && d.options.length) {
        const opt = d.options.find(o => o.label === v) || d.options[0];
        if (opt) price *= opt.value;
      } else if (v === 'Yes') {
        price *= 1.15;
      }
    }
  }
  // Apply Frequency last — it operates on the fully-multiplied monthly fee.
  if (frequencyDriver) {
    const v = frequencyValue;
    if (svc._freqQuarterly && v === 'Quarterly') {
      price = Math.round((price * 1.3 / 3) / 5) * 5;
    } else if (svc._freqDiscount && frequencyDriver.options && frequencyDriver.options.length) {
      // Business Strategy-style: headline is quarterly rate (monthly billing).
      // Monthly sessions discounted 10%, weekly 25% — price per session, divided by 3 when quarterly.
      // (Defined on a per-service basis via _freqDiscount map on the service.)
      const opt = frequencyDriver.options.find(o => o.label === v);
      if (opt) price = Math.round((price * opt.value) / 5) * 5;
    } else if (Array.isArray(frequencyDriver.options) && frequencyDriver.options.length) {
      const opt = frequencyDriver.options.find(o => o.label === v) || frequencyDriver.options[0];
      if (opt) price *= opt.value;
    } else {
      const freqMap = { 'Monthly': 1, 'Quarterly': 0.5, 'Annually': 0.25 };
      const mult = freqMap[v] ?? 1;
      price *= mult;
    }
  }
  // Final rounding for services that prefer clean fiver amounts
  if (svc._roundTo5) price = Math.round(price / 5) * 5;
  // Price floor (e.g. Budget & Variance "from £200")
  if (svc._minPrice && price < svc._minPrice) price = svc._minPrice;
  return price;
}

// "From £X" — the cheapest realistic price for a service, before drivers are set.
// Skips zero/"Nil" driver bands so we never show "from £0" on a paid service.
function priceFrom(svc) {
  if (svc._from) return svc._from;
  if (svc._formula === 'payroll_tiered') return 25;
  if (svc.base && svc.base > 0) return svc.base;
  // No base price — pull minimum non-zero from the first range/select driver
  for (const [name, d] of Object.entries(svc.drivers || {})) {
    if ((d.type === 'range' || d.type === 'select') && Array.isArray(d.options)) {
      const candidates = d.options
        .filter(o => !/nil/i.test(o.label || '') && (o.value || 0) > 0)
        .map(o => o.value);
      if (candidates.length) return Math.min(...candidates);
    }
  }
  return 0;
}

// Billing label helper
function billingSuffix(svc) {
  if (svc.billing === 'monthly') return '/mo';
  if (svc.billing === 'per_half_day') return '/half day';
  return ' once';
}

// ─── Screen 1 — Welcome ─────────────────────────────────────
function Welcome({ onNext }) {
  return (
    <div style={{
      height: '100%', minHeight: '100%', background: TEB.surface, fontFamily: SANS,
      display: 'flex', flexDirection: 'column',
      padding: '32px 24px 28px', boxSizing: 'border-box',
      color: TEB.ink, position: 'relative', overflow: 'auto',
    }}>
      <div style={{ position: 'absolute', width: 520, height: 520, borderRadius: '50%',
        border: `1.5px solid ${TEB.primary}`, opacity: 0.1, top: -200, right: -230 }}/>
      <div style={{ position: 'absolute', width: 340, height: 340, borderRadius: '50%',
        border: `1.5px solid ${TEB.primary}`, opacity: 0.18, top: -100, right: -140 }}/>
      <div style={{ position: 'absolute', width: 18, height: 18, borderRadius: '50%',
        background: TEB.amber, top: 170, right: 60 }}/>
      <div style={{ position: 'absolute', width: 10, height: 10, borderRadius: '50%',
        background: TEB.pinkHot, top: 320, right: 30 }}/>

      <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center' }}>
        <TEBLogo size={140}/>
      </div>

      {/* decorative middle — layered "quote cards" in brand palette */}
      <div style={{
        marginTop: 48, marginBottom: 8,
        display: 'flex', justifyContent: 'center',
        position: 'relative', height: 170, flexShrink: 0,
      }}>
        {/* sun / burst behind */}
        <svg width="220" height="220" viewBox="0 0 220 220" style={{
          position: 'absolute', top: -25, left: '50%', transform: 'translateX(-50%)',
          opacity: 0.55,
        }}>
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i / 16) * Math.PI * 2;
            const x1 = 110 + Math.cos(a) * 60;
            const y1 = 110 + Math.sin(a) * 60;
            const x2 = 110 + Math.cos(a) * 98;
            const y2 = 110 + Math.sin(a) * 98;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={TEB.amber} strokeWidth="2.2" strokeLinecap="round"/>;
          })}
        </svg>

        {/* back card — pink */}
        <div style={{
          position: 'absolute', top: 18, left: '50%',
          transform: 'translateX(-50%) rotate(-6deg)',
          width: 190, height: 118, borderRadius: 14,
          background: TEB.pink, border: `1.5px solid ${TEB.ink}`,
          boxShadow: `4px 4px 0 ${TEB.ink}22`,
        }}/>

        {/* middle card — amber with stripes */}
        <div style={{
          position: 'absolute', top: 24, left: '50%',
          transform: 'translateX(-50%) rotate(4deg)',
          width: 190, height: 118, borderRadius: 14,
          background: TEB.amber, border: `1.5px solid ${TEB.ink}`,
          overflow: 'hidden',
          boxShadow: `4px 4px 0 ${TEB.ink}22`,
        }}>
          <svg width="100%" height="100%" viewBox="0 0 190 118" preserveAspectRatio="none">
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={i} x1={-20 + i * 26} y1="0" x2={10 + i * 26} y2="118"
                stroke={TEB.ink} strokeWidth="1.2" opacity="0.18"/>
            ))}
          </svg>
        </div>

        {/* front card — cream with content */}
        <div style={{
          position: 'absolute', top: 14, left: '50%',
          transform: 'translateX(-50%) rotate(-1deg)',
          width: 200, height: 128, borderRadius: 14,
          background: TEB.surface, border: `1.5px solid ${TEB.ink}`,
          boxShadow: `4px 4px 0 ${TEB.ink}`,
          padding: '14px 16px', boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, color: TEB.inkSoft,
                textTransform: 'uppercase', letterSpacing: 1.2 }}>Your quote</div>
              <div style={{ fontSize: 20, fontFamily: SERIF, letterSpacing: -0.4, color: TEB.ink, lineHeight: 1.1, marginTop: 4 }}>
                Built for<br/>your business
              </div>
            </div>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: TEB.primary, border: `1.5px solid ${TEB.ink}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path d="M3 7.5L6 10.5L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[TEB.primary, TEB.amber, TEB.pinkHot, TEB.border, TEB.border].map((c, i) => (
              <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: c }}/>
            ))}
          </div>
          <div style={{ fontSize: 9, color: TEB.inkSoft, textAlign: 'center',
            textTransform: 'uppercase', letterSpacing: 1.4, fontWeight: 600 }}>
            Qualified · Experienced · Licensed
          </div>
        </div>

        {/* floating dots */}
        <div style={{ position: 'absolute', top: 0, left: 26, width: 10, height: 10,
          borderRadius: '50%', background: TEB.pinkHot, border: `1.5px solid ${TEB.ink}` }}/>
        <div style={{ position: 'absolute', bottom: 8, right: 32, width: 14, height: 14,
          borderRadius: '50%', background: TEB.primary, border: `1.5px solid ${TEB.ink}` }}/>
        <svg width="18" height="18" viewBox="0 0 18 18" style={{ position: 'absolute', top: 6, right: 18 }}>
          <path d="M9 1v16M1 9h16M3 3l12 12M15 3L3 15" stroke={TEB.ink} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      <div style={{ marginTop: 32, marginBottom: 20 }}>
        <h1 style={{
          margin: 0, fontFamily: SERIF, fontSize: 30, fontWeight: 400,
          letterSpacing: -0.6, lineHeight: 1.1, color: TEB.ink,
        }}>Build your own<br/>transparent quote.</h1>
        <p style={{
          margin: '12px 0 0', fontFamily: SANS, fontSize: 14, lineHeight: 1.45,
          color: TEB.inkSoft, maxWidth: 320,
        }}>Pick the services you need, see your price in real time, and book a free discovery call with Libby.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <PrimaryButton label="Start my quote" onClick={onNext}/>
      </div>
    </div>
  );
}

// ─── Screen 2 — Your business ───────────────────────────────
function BusinessStep({ state, setState, onNext, onBack }) {
  const types = [
    { id: 'sole', label: 'Sole trader', sub: 'Just me, trading under my name' },
    { id: 'ltd', label: 'Limited company', sub: 'Registered at Companies House' },
    { id: 'ptn', label: 'Partnership', sub: 'Two or more owners' },
    { id: 'cic', label: 'CIC or charity', sub: 'Non-profit or community-led' },
  ];
  const softwares = ['Xero', 'Sage Cloud', 'Sage 50'];
  return (
    <Shell footer={<PrimaryButton label="Continue" onClick={onNext} disabled={!state.businessName || !state.entity}/>}>
      <ScreenHeader eyebrow="Step 1 of 5" step={1} total={5} onBack={onBack}
        title="About your business"
        sub="We'll use these to tailor your quote. You can change anything on the next step."/>
      <div style={{ padding: '24px 24px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
          {types.map(t => {
            const active = state.entity === t.id;
            return (
              <button key={t.id} onClick={() => setState({ entity: t.id })} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 14px', textAlign: 'left', fontFamily: SANS,
                background: active ? `${TEB.primary}0A` : TEB.surface,
                border: `1.5px solid ${active ? TEB.primary : TEB.border}`,
                borderRadius: 14, cursor: 'pointer',
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 11, flexShrink: 0,
                  border: `1.5px solid ${active ? TEB.primary : TEB.border}`,
                  background: active ? TEB.primary : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {active && (
                    <svg width="12" height="9" viewBox="0 0 12 9">
                      <path d="M1 4.5L4.5 8L11 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.2 }}>{t.label}</div>
                  <div style={{ fontSize: 13, color: TEB.inkSoft, marginTop: 2 }}>{t.sub}</div>
                </div>
              </button>
            );
          })}
        </div>

        <Field label="Business name"
          value={state.businessName} onChange={v => setState({ businessName: v })}
          placeholder="Rowan & Thorn Ltd"/>
        <SelectField label="Approx. annual turnover"
          value={state.turnover} onChange={v => setState({ turnover: v })}
          options={TURNOVER_BANDS}
          placeholder="Select a range…"/>

        {state.entity && state.entity !== 'sole' && (
          <SelectField label="Your business year-end"
            value={state.yearEnd} onChange={v => setState({ yearEnd: v })}
            options={MONTHS}
            placeholder="Select a month…"/>
        )}
        {state.entity === 'sole' && (
          <div style={{
            background: `${TEB.amber}14`, border: `1px solid ${TEB.amber}40`,
            borderRadius: 10, padding: '10px 12px', fontSize: 13, color: TEB.ink,
            fontFamily: SANS, marginBottom: 14, lineHeight: 1.4,
          }}>
            As a sole trader, your tax year ends <strong>5 April</strong> — we'll use that for your catch-up calculations.
          </div>
        )}

        <SelectField label="When would you like to start with us?"
          value={state.startMonth} onChange={v => setState({ startMonth: v })}
          options={nextStartMonths(12).map(m => m.label)}
          placeholder="Select a month…"/>

        <div style={{
          fontSize: 11, fontWeight: 700, color: TEB.inkSoft,
          textTransform: 'uppercase', letterSpacing: 1.2, margin: '14px 0 10px',
        }}>Accounting software</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {softwares.map(s => {
            const active = state.software === s;
            return (
              <button key={s} onClick={() => setState({ software: s })} style={{
                padding: '9px 14px', borderRadius: 999,
                background: active ? TEB.primary : TEB.surface,
                color: active ? '#fff' : TEB.ink,
                border: `1.5px solid ${active ? TEB.primary : TEB.border}`,
                fontFamily: SANS, fontSize: 14, fontWeight: 500, cursor: 'pointer',
              }}>{s}</button>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}

// ─── Catch-up engine ─────────────────────────────────────────
// Universal rule: catch-up = months_behind × monthly_fee.
// months_behind is how many whole months have passed since the service's last
// "reset point" (year-end, renewal, or a user-entered count) up to — but not
// including — the client's chosen start month. Always in the range 0..12.

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// Build rolling "next N months" labels like "May 2026", starting from the month AFTER today.
function nextStartMonths(n = 12) {
  const out = [];
  const now = new Date();
  for (let i = 1; i <= n; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    out.push({ label: `${MONTHS[d.getMonth()]} ${d.getFullYear()}`, month: d.getMonth(), year: d.getFullYear() });
  }
  return out;
}

// Parse "May 2026" → { month: 4, year: 2026 }
function parseStart(label) {
  if (!label) return null;
  const [m, y] = label.split(' ');
  const idx = MONTHS.indexOf(m);
  if (idx < 0) return null;
  return { month: idx, year: +y };
}

// Months elapsed from year-end month (exclusive) up to start month (exclusive).
// Example: year-end Dec (11), start May (4) → Jan, Feb, Mar, Apr = 4 months.
// Example: year-end Jan (0), start May (4) → Feb, Mar, Apr = 3 months.
// Always returns 0..12.
function monthsSince(yearEndMonth, startMonth) {
  if (yearEndMonth == null || startMonth == null) return 0;
  let n = startMonth - yearEndMonth - 1;
  if (n < 0) n += 12;
  return Math.max(0, Math.min(12, n));
}

// Returns the year-end/renewal month index (0..11) for a given service + state, or null if N/A.
// sole traders always use March (tax year basis).
function resetMonthFor(svc, state, cfg) {
  // Confirmation Statement — its own per-service renewal month
  if (svc._formula === 'cs_catchup') {
    const m = cfg?.['Month confirmation statement is due'];
    return m ? MONTHS.indexOf(m) : null;
  }
  // Self-Assessment — always tax-year end (5 April) → treat as end of March
  if (/self.?assessment/i.test(svc.section || '') || /self.?assessment/i.test(svc.title || '')) {
    return 2; // March
  }
  // Annual Accounts, Corp Tax, VAT Returns — use business year-end
  if (/annual accounts|corporation tax|vat returns/i.test(svc.title || '')) {
    if (state.entity === 'sole') return 2; // March for sole traders
    const ye = state.yearEnd;
    return ye ? MONTHS.indexOf(ye) : null;
  }
  return null;
}

// Compute the one-off catch-up for a selected service, given global state + cfg.
// Returns 0 for services without catch-up.
function catchupFor(svc, state = {}, cfg = {}) {
  if (!svc) return 0;

  // "Catch Up: Previous Years..." services are always a full year (12 months)
  // at the monthly rate (driven by turnover band × quality of records).
  if (/^Catch Up: Previous Years/i.test(svc.title || '')) {
    // If the service is billed once (e.g. CS catch-up £84 flat), return base directly.
    if (svc.billing === 'once_on_completion') return priceService(svc, cfg);
    const monthly = priceService(svc, cfg);
    return 12 * monthly;
  }

  // Generic: any service with a "months behind" / "months catch up" driver
  const behindKey = Object.keys(svc.drivers || {}).find(k =>
    /months? behind|months? catch.?up/i.test(k));
  if (behindKey) {
    const n = parseBehind(cfg[behindKey]);
    if (!n) return 0;
    const monthly = priceService(svc, cfg);
    return n * monthly;
  }

  // CS / Annual Accounts / Corp Tax / VAT / SA — months since reset × monthly fee
  const resetMonth = resetMonthFor(svc, state, cfg);
  if (resetMonth == null) return 0;
  const start = parseStart(state.startMonth);
  if (!start) return 0;
  const n = monthsSince(resetMonth, start.month);
  if (!n) return 0;
  const monthly = priceService(svc, cfg);
  return n * monthly;
}

function parseBehind(v) {
  if (!v) return 0;
  if (typeof v === 'number') return Math.max(0, Math.min(12, v));
  const m = String(v).match(/(\d+)/);
  return m ? Math.max(0, Math.min(12, +m[1])) : 0;
}

// Public: how many months of catch-up? (for UI display)
function catchupMonths(svc, state = {}, cfg = {}) {
  if (!svc) return 0;
  if (/^Catch Up: Previous Years/i.test(svc.title || '')) return 12;
  const behindKey = Object.keys(svc.drivers || {}).find(k =>
    /months? behind|months? catch.?up/i.test(k));
  if (behindKey) return parseBehind(cfg[behindKey]);
  const resetMonth = resetMonthFor(svc, state, cfg);
  if (resetMonth == null) return 0;
  const start = parseStart(state.startMonth);
  if (!start) return 0;
  return monthsSince(resetMonth, start.month);
}

Object.assign(window, {
  TEB, SERIF, SANS, gbp, TEBLogo, PrimaryButton, Field, SelectField, TURNOVER_BANDS,
  Stepper, ScreenHeader, Shell,
  priceService, priceFrom, billingSuffix,
  catchupFor, catchupMonths, nextStartMonths, MONTHS,
  Welcome, BusinessStep,
});
