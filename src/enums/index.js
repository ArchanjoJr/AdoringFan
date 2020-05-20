const Regions = require('./LOR/Region');
const CardTypes = require('./LOR/CardTypes');
const SuperType = require('./LOR/SuperType');
module.exports = {
  REGIONS: { ...Regions },
  CARD_TYPE: { ...CardTypes },
  SUPERTYPE: { ...SuperType }
};