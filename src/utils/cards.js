const {first,isEmpty} = require('underscore');
const {CARD_TYPE, SUPERTYPE} = require('../enums');

// todo add jsdocs to all functions
class CardsUtils {
  constructor() {
    this.cards = require('../gameInfo/cards.json');
  }
  getCardByCode(cardCode) {
    return Promise.resolve(first(this.cards.filter(card  => card.cardCode === cardCode)));
  }
  getCardByName(cardName) {
    return Promise.resolve(first(this.cards.filter(({name}) => name.includes(cardName))));
  }
  getCardsByRegion(regionName) {
    return Promise.resolve(first(this.cards.filter(({region}) => region === regionName)));
  }
  getCardsByCost(cardCost) {
    return Promise.resolve(first(this.cards.filter(({cost}) => cost === cardCost)));
  }
  getCardImage(code) {
    const {assets: [{gameAbsolutePath: cardImage}]} = first(this.cards.filter(({cardCode}) => cardCode === code));
    return Promise.resolve(cardImage);
  }
  getCardByCodeAsync(cardCode) { return first(this.cards.filter(card  => card.cardCode === cardCode)) };
  returnCard(card) {
      const {
        assets: [{gameAbsolutePath: cardImage}],
        associatedCardRefs,
        region,
        attack,
        cost,
        health,
        description,
        flavorText,
        name,
        cardCode,
        keywords,
        rarity,
        type,
        supertype,
      } = card;
      const otherCards = [];
      if (!isEmpty(associatedCardRefs)) {
        associatedCardRefs.forEach(async (cardCode )=> {
          const { region, attack, cost, health, description, flavorText, name, keywords, rarity, type, assets: [{gameAbsolutePath: cardImage}], spellSpeed} = this.getCardByCodeAsync(cardCode);
          otherCards.push({ region, attack, cost, health, description, flavorText, name, keywords, rarity, type, cardImage, spellSpeed});
        });
      }
      switch (type) {
        case CARD_TYPE.SPELL:
          return { associatedCards: !isEmpty(associatedCardRefs) ? otherCards: '', region, attack, cost, health, description, flavorText, name, cardCode, keywords, rarity, type, cardImage, spellSpeed: card.spellSpeed };
        case CARD_TYPE.UNIT:
          return { associatedCards: !isEmpty(associatedCardRefs) ? otherCards: '', region, attack, cost, health, description, flavorText, name, cardCode, rarity, type, cardImage, subtype: card.subtype, };
      }
  }
}
module.exports = CardsUtils;