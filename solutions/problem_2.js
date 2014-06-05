// Part a

// Import makeCard factory from problem 1
var makeCard = require('./problem_1');

//Number.isInteger() polyfill (needed for node)
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
if (!Number.isInteger) {
  Number.isInteger = function isInteger (nVal) {
    return typeof nVal === "number" && isFinite(nVal) && nVal > -9007199254740992 && nVal < 9007199254740992 && Math.floor(nVal) === nVal;
  };
}

function makeDeque(values) {
  var deque = {};
  // create a copy of the array of values
  deque.queue = values.slice();
  deque.top = makeDeque.top;
  deque.bottom = makeDeque.bottom;
  deque.push = makeDeque.push;
  deque.pop = makeDeque.pop;
  deque.shift = makeDeque.shift;
  deque.unshift = makeDeque.unshift;
  deque.isValidOffset = makeDeque.isValidOffset;
  deque.cut = makeDeque.cut;
  deque.sort = makeDeque.sort;
  deque.map = makeDeque.map;
  deque.shuffle = makeDeque.shuffle;
  return deque;
};

makeDeque.top = function() {
  return this.queue[0];
};

makeDeque.bottom = function() {
  return this.queue[this.queue.length - 1];
};

makeDeque.push = function(val) {
  return this.queue.push(val);
};

makeDeque.pop = function(val) {
  return this.queue.pop(val);
};

makeDeque.shift = function() {
  return this.queue.shift();
};

makeDeque.unshift = function(val) {
  return this.queue.unshift(val);
};

makeDeque.isValidOffset = function(num, size) {
  if (num && !Number.isInteger(num)) return false;
  if (num && Math.abs(num) > (size / 2)) return false;
  return true;
}

makeDeque.cut = function(offset) {
  var size = this.queue.length,
      half = size / 2,
      top;

  if (!this.isValidOffset(offset, size)) throw new Error('Invalid offset');

  if (!offset) {
    // queue size is even
    if (size % 2 === 0) {
      top = this.queue.splice(0, half);
      return this.queue = this.queue.concat(top);
    }
    // queue size is odd
    top = this.queue.splice(0, Math.floor(half) + 1);
    return this.queue = this.queue.concat();
  }

  // positive integer
  if (offset > 0) {
    top = this.queue.splice(0, half - offset);
    return this.queue = this.queue.concat(top);
  }
  // negative integer
  top = this.queue.splice(0, half + offset);
  return this.queue = this.queue.concat(top);
};

makeDeque.sort = function(fn) {
  return this.queue.sort(fn);
};

makeDeque.map = function(fn) {
  return this.queue.map(fn);
};

makeDeque.shuffle = function(array) {
  var m = this.queue.length, t, i;

  while(m) {
    i = Math.floor(Math.random() * m--);
    t = this.queue[m];
    this.queue[m] = this.queue[i];
    this.queue[i] = t;
  }

  return this.queue;
}

// Testing

function assert(claim, msg) {
  if (!claim) console.error(msg);
}

var values = [1,2,3,4,5,6];
var deque = makeDeque(values);

assert(deque.top() === 1, 'top test failed');
assert(deque.bottom() === 6, 'bottom test failed');
assert(deque.push(1) === 7, 'push test failed');
assert(deque.pop() === 1, 'pop test failed');
assert(deque.shift() === 1, 'shift test failed');
assert(deque.unshift(1) === 6, 'unshift test failed');
assert(deque.cut()[0] === 4, 'cut test failed');

// Part c

function makeDeck() {
  var deck = [];
  for (var i = 0; i < 52; i++) {
    deck.push(makeCard(i));
  }
  return deck;
}

function sortById(a, b) {
  return a.id - b.id;
}

var someCards = makeDeck();
var deck = makeDeque(someCards);
deck.sort(sortById);
deck.cut();
//console.log(deck.map(function(x) { return x.name() }));
//console.log(deck.top().name())
//console.log(deck.bottom().name())
assert(deck.queue.length === 52, 'deck length test failed');
assert(deck.top().name() === 'Seven of Spades', 'top of deck test failed');
assert(deck.bottom().name() === 'Seven of Diamonds', 'bottom of deck test failed');

function sortByName(a, b) {
  if (a.name() < b.name()) return 1;
  if (a.name() > b.name()) return -1;
  return 0;
}

var deck = makeDeque(someCards);
deck.sort(sortByName);
assert(deck.bottom().name() === 'Ace of Clubs', 'Failed Ace of Clubs test');
assert(deck.top().name() === 'Two of Spades', 'Failed Two of Spades test');

// Part d

// TODO update with the rest of the class
var students = ['Tom', 'Kellen', 'Abe', 'Danielle', 'Adam', 'Chad', 'Shawna',
                'Geoff', 'Hanna', 'Charity', 'Nathan', 'Jesse'];

var assistants = ['Ben', 'Dan', 'Clarissa', 'Jhenna', 'Chris'];
var all = students.concat(assistants);

function sortBySecondLetter(a, b) {
  if (a[1] < b[1]) return 1;
  if (a[1] > b[1]) return -1;
  return 0;
}

var everyone = makeDeque(all);
everyone.sort(sortBySecondLetter);
// TODO figure out what the final name should be
var theFinalName = '';
assert(everyone.top() === theFinalName, 'Failed name test');

// Part e

// added the shuffle method above
var deck = makeDeque(someCards);
deck.shuffle();
var ids = deck.map(function(x) { return x.id });
var names = deck.map(function(x) { return x.name() });


