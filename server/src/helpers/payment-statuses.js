/**
 * Statuses
 *
 * 0: charge:created    New charge is created
 * 1: charge:confirmed  Charge has been confirmed and the associated payment is completed
 * 2: charge:failed     Charge failed to complete
 * 3: charge:delayed    Charge received a payment after it had been expired
 * 4: charge:pending    Charge has been detected but has not been confirmed yet
 * 5: charge:resolved   Charge has been resolved
 */

module.exports.statuses = {
  started: 0,
  created: 1,
  confirmed: 2,
  failed: 3,
  delayed: 4,
  pending: 5,
  resolved: 6,
};

module.exports.statusesReverse = {
  0: 'started',
  1: 'created',
  2: 'confirmed',
  3: 'failed',
  4: 'delayed',
  5: 'pending',
  6: 'resolved',
};

module.exports.webhookStatuses = {
  created: 'charge:created',
  confirmed: 'charge:confirmed',
  failed: 'charge:failed',
  delayed: 'charge:delayed',
  pending: 'charge:pending',
  resolved: 'charge:resolved',
};
