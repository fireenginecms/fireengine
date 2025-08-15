
// Simplified license wrapper - actual validation happens in the backend
// License is stored in Firestore _fireengineMeta/license document
module.exports = function(config = {}) {
  // Lazy require to avoid Firebase initialization during import
  const originalModule = require('./index.min.js');
  
  // No license validation needed in npm package
  // License validation happens server-side via Stripe API calls
  
  return originalModule(config);
};

// Also export the original for backward compatibility
module.exports.default = module.exports;
