// Part a (Constructor Pattern)

//Number.isInteger() polyfill (needed for node)
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
if (!Number.isInteger) {
  Number.isInteger = function isInteger (nVal) {
    return typeof nVal === "number" && isFinite(nVal) && nVal > -9007199254740992 && nVal < 9007199254740992 && Math.floor(nVal) === nVal;
  };
}

class Card {

  constructor( id ) {

    if (!this.isValid( id )) {
      throw new Error( 'Not a valid card id.' );
    }

    this.id = id;

    // traceur hasn't implemented support for public, private, or static
    // properties so this is the only place to define these properties at
    // the moment
    this.ranks = ['Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten', 'Jack','Queen','King'];
    this.suits = ['Hearts','Diamonds','Spades','Clubs'];
  }

  isValid( n ) {
    if ( typeof n !== 'number' ) return false;
    if ( !Number.isInteger( n ) ) return false;
    if ( n < 0 || n > 51 ) return false;
    return true;
  }

  rank() {
    return Math.floor( this.id / 4 ) + 1;
  }

  suit() {
    return ( this.id % 4 ) + 1;
  }

  cardID() {
    return this.id;
  }

  color() {
    return this.suit() < 3 ? 'red' : 'black';
  }

  name() {
    return this.ranks[this.rank() - 1] + ' of ' + this.suits[this.suit() - 1];
  }

  precedes( cardObj ) {
    var diff;

    if ( !( cardObj instanceof Card ) ) {
      throw new Error( 'Not a valid card object.' );
    }

    diff = cardObj.rank() - this.rank();
    return diff == 1 || diff == -12;
  }

  sameColor( cardObj ) {
    if ( !( cardObj instanceof Card ) ) {
      throw new Error( 'Not a valid card object.' );
    }
    return this.color() === cardObj.color();
  }

  nextInSuit() {
    var nextCard = this.id + 4;
    return ( nextCard > 51 ) ? nextCard -= 52 : nextCard;
  }

  prevInSuit() {
    var prevCard = this.id - 4;
    return ( prevCard < 0 ) ? prevCard += 52 : prevCard;
  }

}

// Part b

// TESTING:
function assert ( claim, message ) {
  if ( !claim ) console.error( message );
}

assert( new Card( 0 ).rank() === 1, "Test 1 failed" );
assert( new Card( 3 ).rank() === 1, "Test 2 failed" );
assert( new Card( 51 ).rank() === 13, "Test 3 failed" );
assert( new Card( 0 ).suit() === 1, "Test 4 failed" );
assert( new Card( 5 ).suit() === 2, "Test 5 failed" );
assert( new Card( 51 ).suit() === 4, "Test 6 failed" );
assert( new Card( 1 ).cardID() === 1, "Test 7 failed" );
assert( new Card( 51 ).cardID() === 51, "Test 8 failed" );
assert( new Card( 30 ).cardID() === 30,"Test 9 failed" );
assert( new Card( 0 ).color() === 'red', "Test 10 failed" );
assert( new Card( 2 ).color() === 'black', "Test 11 failed");
assert( new Card( 5 ).name() === 'Two of Diamonds', "Test 12 failed" );
assert( new Card( 51 ).name() === 'King of Clubs', "Test 13 failed" );
assert( !new Card( 0 ).precedes( new Card( 1 ) ), "Test 14 failed" );
assert( new Card( 0 ).precedes( new Card( 5 ) ), "Test 15 failed" );
assert( new Card( 51 ).precedes( new Card( 0 ) ), "Test 16 failed" );
assert( new Card( 50 ).precedes( new Card( 2 ) ), "Test 17 failed" );
assert( new Card( 0 ).sameColor( new Card( 1 ) ), "Test 18 failed" );
assert( !new Card( 1 ).sameColor( new Card( 2 ) ), "Test 19 failed" );
assert( new Card( 0 ).nextInSuit() === 4, "Test 20 failed" );
assert( new Card( 51 ).nextInSuit() === 3, "Test 21 failed" );
assert( new Card( 48 ).nextInSuit() === 0, "Test 22 failed" );
assert( new Card( 0 ).prevInSuit() === 48, "Test 23 failed" );
assert( new Card( 3 ).prevInSuit() === 51, "Test 24 failed" );
assert( new Card( 5 ).prevInSuit() === 1, "Test 25 failed" );

// Part c

var cardA = new Card( 1 );
var cardB = new Card( 2 );
assert( Card.prototype.rank === cardA.rank, "Test 26 failed" );
assert( cardA.rank === cardB.rank, "Test 27 faild" );
