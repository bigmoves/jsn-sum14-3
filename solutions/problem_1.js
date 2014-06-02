// Part a

//Number.isInteger() polyfill (needed for node)
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
if (!Number.isInteger) {
  Number.isInteger = function isInteger (nVal) {
    return typeof nVal === "number" && isFinite(nVal) && nVal > -9007199254740992 && nVal < 9007199254740992 && Math.floor(nVal) === nVal;
  };
}

function makeCard( id ) {
  var card = {};

  if (!makeCard.isValid( id )) {
    throw new Error( 'Not a valid card id.' );
  }

  card.id = id;
  card.ranks = makeCard.ranks;
  card.suits = makeCard.suits;
  card.rank = makeCard.rank;
  card.suit = makeCard.suit;
  card.cardID = makeCard.cardID;
  card.color = makeCard.color;
  card.cardName = makeCard.cardName;
  card.precedes = makeCard.precedes;
  card.sameColor = makeCard.sameColor;
  card.nextInSuit = makeCard.nextInSuit;
  card.prevInSuit = makeCard.prevInSuit;
  return card;
};

makeCard.isValid = function( n ){
  if ( typeof n !== 'number' ) return false;
  if ( !Number.isInteger( n ) ) return false;
  if ( n < 0 || n > 51 ) return false;
  return true;
};

makeCard.ranks = ['Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten', 'Jack','Queen','King'];

makeCard.suits = ['Hearts','Diamonds','Spades','Clubs'];

makeCard.rank = function() {
  return Math.floor( this.id / 4 ) + 1;
};

makeCard.suit = function() {
  return ( this.id % 4 ) + 1;
};

makeCard.cardID = function() {
  return this.id;
};

makeCard.color = function() {
  return this.suit() < 3 ? 'red' : 'black';
};

makeCard.cardName = function() {
  return this.ranks[this.rank() - 1] + ' of ' + this.suits[this.suit() - 1];
};

makeCard.precedes = function( cardObj ) {
  var diff = cardObj.rank() - this.rank();
  return diff == 1 || diff == -12;
};

makeCard.sameColor = function( cardObj ) {
  return this.color() === cardObj.color();
};

makeCard.nextInSuit = function() {
  var nextCard = this.id + 4;
  return ( nextCard > 51 ) ? nextCard -= 52 : nextCard;
};

makeCard.prevInSuit = function() {
  var prevCard = this.id - 4;
  return ( prevCard < 0 ) ? prevCard += 52 : prevCard;
};

// Part b

// TESTING:
function assert ( claim, message ) {
  if ( !claim ) console.error( message );
}

assert( makeCard( 0 ).rank() === 1, "Test 1 failed" );
assert( makeCard( 3 ).rank() === 1, "Test 2 failed" );
assert( makeCard( 51 ).rank() === 13, "Test 3 failed" );
assert( makeCard( 0 ).suit() === 1, "Test 4 failed" );
assert( makeCard( 5 ).suit() === 2, "Test 5 failed" );
assert( makeCard( 51 ).suit() === 4, "Test 6 failed" );
assert( makeCard( 1 ).cardID() === 1, "Test 7 failed" );
assert( makeCard( 51 ).cardID() === 51, "Test 8 failed" );
assert( makeCard( 30 ).cardID() === 30,"Test 9 failed" );
assert( makeCard( 0 ).color() === 'red', "Test 10 failed" );
assert( makeCard( 2 ).color() === 'black', "Test 11 failed");
assert( makeCard( 5 ).cardName() === 'Two of Diamonds', "Test 12 failed" );
assert( makeCard( 51 ).cardName() === 'King of Clubs', "Test 13 failed" );
assert( !makeCard( 0 ).precedes( makeCard( 1 ) ), "Test 14 failed" );
assert( makeCard( 0 ).precedes( makeCard( 5 ) ), "Test 15 failed" );
assert( makeCard( 51 ).precedes( makeCard( 0 ) ), "Test 16 failed" );
assert( makeCard( 50 ).precedes( makeCard( 2 ) ), "Test 17 failed" );
assert( makeCard( 0 ).sameColor( makeCard( 1 ) ), "Test 18 failed" );
assert( !makeCard( 1 ).sameColor( makeCard( 2 ) ), "Test 19 failed" );
assert( makeCard( 0 ).nextInSuit() === 4, "Test 20 failed" );
assert( makeCard( 51 ).nextInSuit() === 3, "Test 21 failed" );
assert( makeCard( 48 ).nextInSuit() === 0, "Test 22 failed" );
assert( makeCard( 0 ).prevInSuit() === 48, "Test 23 failed" );
assert( makeCard( 3 ).prevInSuit() === 51, "Test 24 failed" );
assert( makeCard( 5 ).prevInSuit() === 1, "Test 25 failed" );

// Part c

var cardA = makeCard( 1 );
var cardB = makeCard( 2 );
assert( makeCard.rank === cardA.rank, "Test 26 failed" );
assert( cardA.rank === cardB.rank, "Test 27 faild" );
