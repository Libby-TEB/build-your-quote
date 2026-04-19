// Software subscription tier data for Xero, Sage Business Cloud, Sage 50.
// Sourced Apr 2026 from:
//   - xero.com/uk/pricing-plans/{ignite,grow,comprehensive,ultimate}
//   - sage.com/en-gb/sage-business-cloud/sage-accounting
//   - sage.com/en-gb/products/sage-50-accounts + partner price lists
// Prices ex-VAT, GBP/month. RRP — ignore promo discounts.
// ------------------------------------------------------------
// Fields shown per tier: invoices, bills, bank trans, multi-currency, payroll.
// `unlimited: true` on a numeric field means no hard cap.
// `fitMaxTurnover` (GBP) is the soft upper-bound we use to recommend a tier
//   based on the turnover band they picked on the previous step.
//   Nudges only — no warnings.
// ------------------------------------------------------------

window.SOFTWARE_TIERS = {
  'Xero': {
    label: 'Xero',
    tagline: 'Cloud accounting — 4 UK plans (Sept 2024 lineup).',
    tiers: [
      {
        id: 'ignite',
        name: 'Ignite',
        price: 16,
        summary: 'For sole traders with light invoicing.',
        invoices:    { value: 20,  unit: '/month', note: 'Sending AND approving count' },
        bills:       { value: 5,   unit: '/month' },
        bankTrans:   { value: null, unlimited: true, note: 'Unlimited reconciliations' },
        multiCurrency: false,
        payroll:     { value: 0, note: 'Not included' },
        fitMaxTurnover: 50000,
      },
      {
        id: 'grow',
        name: 'Grow',
        price: 37,
        summary: 'Unlimited invoicing + basic payroll.',
        invoices:    { value: null, unlimited: true },
        bills:       { value: null, unlimited: true },
        bankTrans:   { value: null, unlimited: true },
        multiCurrency: false,
        payroll:     { seats: 1, extraPerSeat: 1.50, note: '1 seat, +£1.50/seat up to 200' },
        fitMaxTurnover: 250000,
      },
      {
        id: 'comprehensive',
        name: 'Comprehensive',
        price: 50,
        summary: 'Adds multi-currency + 5-user expenses.',
        invoices:    { value: null, unlimited: true },
        bills:       { value: null, unlimited: true },
        bankTrans:   { value: null, unlimited: true },
        multiCurrency: true,
        payroll:     { seats: 1, extraPerSeat: 1.50, note: '1 seat, +£1.50/seat up to 200' },
        fitMaxTurnover: 750000,
      },
      {
        id: 'ultimate',
        name: 'Ultimate',
        price: 65,
        summary: 'Projects, Analytics Plus, 10-user expenses.',
        invoices:    { value: null, unlimited: true },
        bills:       { value: null, unlimited: true },
        bankTrans:   { value: null, unlimited: true },
        multiCurrency: true,
        payroll:     { seats: 1, extraPerSeat: 1.00, note: '1 seat, +£1/seat up to 200' },
        fitMaxTurnover: null, // no cap
      },
    ],
  },

  'Sage Cloud': {
    label: 'Sage Business Cloud Accounting',
    tagline: '3 tiers — UK cloud product. Payroll included on all plans.',
    tiers: [
      {
        id: 'start',
        name: 'Start',
        price: 18,
        summary: 'VAT-registered sole traders, micro-businesses.',
        invoices:    { value: null, unlimited: true, note: 'Unlimited invoicing' },
        bills:       { value: 0, note: 'No purchase invoices' },
        bankTrans:   { value: null, unlimited: true },
        multiCurrency: false,
        payroll:     { seats: 5, note: 'Up to 5 employees included' },
        fitMaxTurnover: 50000,
      },
      {
        id: 'standard',
        name: 'Standard',
        price: 39,
        summary: 'Small business with creditors, CIS, advanced reports.',
        invoices:    { value: null, unlimited: true },
        bills:       { value: null, unlimited: true },
        bankTrans:   { value: null, unlimited: true },
        multiCurrency: false,
        payroll:     { seats: 5, note: 'Up to 5 employees, upgradeable to 150' },
        fitMaxTurnover: 300000,
      },
      {
        id: 'plus',
        name: 'Plus',
        price: 59,
        summary: 'Inventory, multi-currency, budgets, unlimited users.',
        invoices:    { value: null, unlimited: true },
        bills:       { value: null, unlimited: true },
        bankTrans:   { value: null, unlimited: true },
        multiCurrency: true,
        payroll:     { seats: 5, note: 'Up to 5 employees, upgradeable to 150' },
        fitMaxTurnover: null,
      },
    ],
  },

  'Sage 50': {
    label: 'Sage 50 Accounts',
    tagline: 'Desktop with cloud sync — for in-house bookkeepers.',
    tiers: [
      {
        id: 'standard',
        name: 'Standard',
        price: 84,
        summary: '1 user, up to 2 companies. No multi-currency.',
        invoices:    { value: null, unlimited: true },
        bills:       { value: null, unlimited: true },
        bankTrans:   { value: null, unlimited: true },
        multiCurrency: false,
        payroll:     { seats: 0, note: 'Add Sage Payroll separately' },
        fitMaxTurnover: 500000,
      },
      {
        id: 'professional',
        name: 'Professional',
        price: 169,
        summary: 'Up to 20 users, unlimited companies, stock control, multi-currency.',
        invoices:    { value: null, unlimited: true },
        bills:       { value: null, unlimited: true },
        bankTrans:   { value: null, unlimited: true },
        multiCurrency: true,
        payroll:     { seats: 0, note: 'Add Sage Payroll separately' },
        fitMaxTurnover: null,
      },
    ],
  },
};

// Parse a TURNOVER_BANDS label like "£150,000 – £250,000" → upper bound number.
window.turnoverUpperBound = function (label) {
  if (!label) return 0;
  const nums = String(label).replace(/,/g, '').match(/\d+/g);
  if (!nums || !nums.length) return 0;
  return parseInt(nums[nums.length - 1], 10);
};

// Pick recommended tier id for a software + turnover upper bound.
// Lowest tier whose fitMaxTurnover ≥ turnover, else the top tier.
window.recommendTier = function (softwareKey, turnoverLabel) {
  const sw = window.SOFTWARE_TIERS[softwareKey];
  if (!sw) return null;
  const ub = window.turnoverUpperBound(turnoverLabel);
  if (!ub) return sw.tiers[0].id; // no turnover yet → bottom tier placeholder
  for (const t of sw.tiers) {
    if (t.fitMaxTurnover == null || ub <= t.fitMaxTurnover) return t.id;
  }
  return sw.tiers[sw.tiers.length - 1].id;
};
