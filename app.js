// =============================================================================
//  DEBUG LAB v3.0 — 10 MODES · 73 CHALLENGES
// =============================================================================

const CHALLENGES = {

// =============================================================================
//  CSS BUG HUNT — 10 Challenges
// =============================================================================
css: [
{
    title:"Center the Box",diff:"Easy",pts:100,
    desc:"The red box must be perfectly centered inside the dashed container. It's stuck top-left.",
    file:"style.css",
    html:'<div class="container"><div class="box">CENTER ME</div></div>',
    code:`.container {
  width: 100%;
  height: 200px;
  background: #111;
  border: 2px dashed #444;
}

.box {
  width: 120px;
  height: 120px;
  background: #f87171;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}`,
    check(c){
        const s=c.replace(/\s+/g,' ').toLowerCase();
        const p=s.split('.box')[0]||'';
        return (p.includes('display')&&p.includes('flex')&&p.includes('justify-content')&&p.includes('center')&&p.includes('align-items'))||(p.includes('display')&&p.includes('grid')&&p.includes('place-items')&&p.includes('center'));
    },
    hints:["The .container has no layout mode — elements just stack.","Add display: flex to .container.","Then add justify-content: center and align-items: center to .container."]
},
{
    title:"Navbar Behind Popup",diff:"Medium",pts:150,
    desc:"The purple navbar should appear ABOVE the red popup. Fix the stacking order.",
    file:"style.css",
    html:'<nav class="navbar">Navigation Bar</nav><div class="content"><div class="popup">I\'m blocking the navbar!</div></div>',
    code:`.navbar {
  background: #7c3aed;
  color: #fff;
  padding: 14px 20px;
  font-weight: 700;
}

.content {
  padding: 20px;
}

.popup {
  background: #dc2626;
  color: #fff;
  padding: 18px;
  position: relative;
  z-index: 10;
  margin-top: -8px;
  border-radius: 8px;
  font-weight: 600;
}`,
    check(c){
        const s=c.replace(/\s+/g,' ').toLowerCase();
        const nav=s.split('.content')[0]||s.split('.popup')[0]||'';
        return nav.includes('z-index')&&nav.includes('position');
    },
    hints:["The .popup has z-index:10 but .navbar has none.","z-index only works on positioned elements.","Add position: relative and z-index: 100 to .navbar."]
},
{
    title:"Cards Side by Side",diff:"Medium",pts:150,
    desc:"The three cards should display in a horizontal row, not stacked vertically.",
    file:"style.css",
    html:'<div class="cards"><div class="card"><h3>Alpha</h3><p>Info</p></div><div class="card"><h3>Beta</h3><p>Info</p></div><div class="card"><h3>Gamma</h3><p>Info</p></div></div>',
    code:`.cards {
  padding: 20px;
  gap: 14px;
}

.card {
  background: #1e1b4b;
  padding: 24px;
  border-radius: 10px;
  border: 1px solid #312e81;
}

.card h3 { color: #a78bfa; margin-bottom: 6px; }
.card p { color: #888; font-size: 13px; }`,
    check(c){
        const s=c.replace(/\s+/g,' ').toLowerCase();
        const cont=s.split('.card')[0]||s;
        return cont.includes('display')&&(cont.includes('grid')||cont.includes('flex'));
    },
    hints:["The .cards container needs a layout mode.","Try display: grid or display: flex on .cards.","Use display:grid; grid-template-columns:repeat(3,1fr); on .cards."]
},
{
    title:"Text Overflows Box",diff:"Easy",pts:100,
    desc:"Long text spills outside the bordered box. Make it contained and scrollable.",
    file:"style.css",
    html:'<div class="textbox"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p></div>',
    code:`.textbox {
  width: 100%;
  height: 100px;
  background: #111;
  border: 2px solid #7c3aed;
  border-radius: 8px;
  padding: 14px;
}

.textbox p {
  color: #ccc;
  font-size: 13px;
  line-height: 1.6;
}`,
    check(c){
        return c.toLowerCase().includes('overflow')&&(c.includes('auto')||c.includes('scroll')||c.includes('hidden'));
    },
    hints:["The text exceeds the container height.","CSS has an 'overflow' property for this.","Add overflow: auto to .textbox."]
},
{
    title:"Invisible Overlay Blocks Button",diff:"Hard",pts:200,
    desc:"The green button can't be clicked — a transparent overlay is blocking it. Fix interaction.",
    file:"style.css",
    html:'<div class="wrapper"><div class="overlay-layer"></div><button class="action-btn">Click Me!</button></div>',
    code:`.wrapper {
  position: relative;
  padding: 40px;
  background: #111;
  border-radius: 8px;
}

.overlay-layer {
  position: absolute;
  inset: 0;
  background: transparent;
  z-index: 5;
}

.action-btn {
  background: #22c55e;
  color: #000;
  border: none;
  padding: 12px 28px;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  position: relative;
  z-index: 1;
}`,
    check(c){
        const s=c.replace(/\s+/g,' ').toLowerCase();
        if(s.includes('pointer-events')&&s.includes('none'))return true;
        const btnZ=/\.action-btn[^}]*z-index\s*:\s*(\d+)/.exec(s);
        return btnZ&&parseInt(btnZ[1])>5;
    },
    hints:["The overlay has z-index:5, button has z-index:1.","pointer-events: none makes an element 'transparent' to clicks.","Add pointer-events: none to .overlay-layer."]
},
{
    title:"Flex Items Not Spaced",diff:"Medium",pts:150,
    desc:"Nav links should be evenly spaced across the full width, not bunched left.",
    file:"style.css",
    html:'<nav class="topnav"><a href="#">Home</a><a href="#">About</a><a href="#">Services</a><a href="#">Contact</a></nav>',
    code:`.topnav {
  display: flex;
  background: #1e1b4b;
  padding: 14px 20px;
  border-radius: 8px;
}

.topnav a {
  color: #a5b4fc;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  padding: 6px 12px;
}`,
    check(c){
        const s=c.replace(/\s+/g,' ').toLowerCase();
        return s.includes('justify-content')&&(s.includes('space-between')||s.includes('space-around')||s.includes('space-evenly'));
    },
    hints:["Items default to flex-start (left-aligned).","justify-content controls main-axis spacing.","Add justify-content: space-between to .topnav."]
},
{
    title:"Sticky Footer",diff:"Medium",pts:150,
    desc:"The footer should stick to the bottom of the viewport when content is short. It's floating in the middle.",
    file:"style.css",
    html:'<div class="page"><div class="main-content"><p>Short content.</p></div><footer class="site-ft">© 2025 DebugLab</footer></div>',
    code:`.page {
  min-height: 100vh;
  background: #0c0c0e;
}

.main-content {
  padding: 20px;
  color: #ccc;
}

.site-ft {
  background: #7c3aed;
  color: #fff;
  padding: 14px 20px;
  text-align: center;
  font-size: 13px;
}`,
    check(c){
        const s=c.replace(/\s+/g,' ').toLowerCase();
        const hasFlex=s.includes('display')&&s.includes('flex')&&s.includes('column');
        const hasAuto=s.includes('margin-top')&&s.includes('auto');
        const hasGrid=s.includes('grid-template-rows');
        return (hasFlex&&hasAuto)||hasGrid;
    },
    hints:["The .page needs to be a flex column so children can spread out.","Use margin-top: auto on the footer to push it down.","Add display:flex; flex-direction:column to .page and margin-top:auto to .site-ft."]
},
{
    title:"Image Stretches",diff:"Easy",pts:100,
    desc:"The image inside the container is stretched and distorted. Make it fill the box while keeping its aspect ratio.",
    file:"style.css",
    html:'<div class="img-box"><img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'200\' fill=\'%23334\'%3E%3Crect width=\'400\' height=\'200\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' fill=\'%23aaa\' text-anchor=\'middle\' dy=\'.3em\' font-size=\'20\'%3EPhoto%3C/text%3E%3C/svg%3E" alt="photo"></div>',
    code:`.img-box {
  width: 200px;
  height: 200px;
  border: 2px solid #444;
  border-radius: 10px;
  overflow: hidden;
}

.img-box img {
  width: 100%;
  height: 100%;
}`,
    check(c){
        return c.toLowerCase().includes('object-fit')&&(c.includes('cover')||c.includes('contain'));
    },
    hints:["The image is forced to 100% width AND height, ignoring aspect ratio.","CSS has object-fit to control how images fill their container.","Add object-fit: cover to .img-box img."]
},
{
    title:"Box Sizing Bug",diff:"Medium",pts:150,
    desc:"The box should be exactly 200px wide, but padding and border make it 250px. Fix the sizing model.",
    file:"style.css",
    html:'<div class="sized-box">I should be 200px wide!</div><div style="width:200px;height:4px;background:#22c55e;margin-top:10px;border-radius:2px"></div><p style="color:#666;font-size:12px;margin-top:4px">↑ Green line = 200px reference</p>',
    code:`.sized-box {
  width: 200px;
  padding: 20px;
  border: 5px solid #7c3aed;
  background: #1e1b4b;
  color: #fff;
  border-radius: 8px;
  font-size: 13px;
}

/* The box should match the green
   reference line width (200px).
   But it's wider! */`,
    check(c){
        return c.toLowerCase().includes('box-sizing')&&c.toLowerCase().includes('border-box');
    },
    hints:["Default box-sizing is content-box: width doesn't include padding/border.","border-box makes width include padding + border.","Add box-sizing: border-box to .sized-box."]
},
{
    title:"Text Truncation with Ellipsis",diff:"Easy",pts:100,
    desc:"Long card titles should truncate with '...' instead of wrapping to multiple lines.",
    file:"style.css",
    html:'<div class="truncate-card"><h3 class="card-title">This is a very long card title that should be truncated with an ellipsis</h3><p>Card content below</p></div>',
    code:`.truncate-card {
  width: 220px;
  background: #1e1b4b;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid #312e81;
}

.card-title {
  font-size: 15px;
  color: #fff;
  margin-bottom: 8px;
}

.truncate-card p {
  color: #888;
  font-size: 12px;
}`,
    check(c){
        const s=c.toLowerCase();
        return s.includes('text-overflow')&&s.includes('ellipsis')&&s.includes('overflow')&&s.includes('white-space')&&s.includes('nowrap');
    },
    hints:["You need three properties together for text truncation.","white-space: nowrap prevents wrapping, overflow: hidden clips it.","Add white-space:nowrap; overflow:hidden; text-overflow:ellipsis to .card-title."]
}
],

// =============================================================================
//  JAVASCRIPT LOGIC BUGS — 10 Challenges
// =============================================================================
js: [
{
    title:"Counter Shows NaN",diff:"Easy",pts:100,
    desc:"Counter should start at 0 and increment, but shows NaN. Find the initialization bug.",
    file:"app.js",
    expected:"Counter starts at 0, increments to 1, 2, 3...",
    code:`let count;

function increment() {
  count = count + 1;
  updateDisplay();
}

function decrement() {
  count = count - 1;
  updateDisplay();
}

function updateDisplay() {
  document.getElementById('counter')
    .textContent = count;
}

// Bug: shows NaN on increment!`,
    check(c){ return /(?:let|var|const)\s+count\s*=\s*0/.test(c); },
    hints:["What is undefined + 1?","'count' is declared but never initialized.","Change 'let count;' to 'let count = 0;'"]
},
{
    title:"Assignment Instead of Comparison",diff:"Medium",pts:150,
    desc:"Filter should return adults (age >= 18) but returns everyone with age set to 18.",
    file:"app.js",
    expected:"Returns only Ali (25) and Ahmed (30).",
    code:`const users = [
  { name: "Ali", age: 25 },
  { name: "Sara", age: 16 },
  { name: "Ahmed", age: 30 },
  { name: "Zara", age: 14 }
];

function getAdults(list) {
  return list.filter(
    user => user.age = 18
  );
}

console.log(getAdults(users));
// Returns ALL, everyone age=18!`,
    check(c){
        return /user\.age\s*(>=|>|===|==)\s*18/.test(c.replace(/\s+/g,' '));
    },
    hints:["Look at the filter condition carefully.","= is assignment, >= is comparison.","Change user.age = 18 to user.age >= 18."]
},
{
    title:"Function Called Instead of Referenced",diff:"Medium",pts:150,
    desc:"Alert fires immediately on load instead of on button click.",
    file:"app.js",
    expected:"Alert appears ONLY when button is clicked.",
    code:`function setup() {
  const btn = document
    .getElementById('myBtn');
  btn.addEventListener(
    'click', showMessage()
  );
}

function showMessage() {
  alert('Button clicked!');
}

setup();
// Bug: alert fires on page load!`,
    check(c){
        return /addEventListener\s*\(\s*['"]click['"]\s*,\s*showMessage\s*\)/.test(c.replace(/\s+/g,' '));
    },
    hints:["What happens with () after a function name?","showMessage() CALLS it; showMessage is a reference.","Remove () — pass showMessage, not showMessage()."]
},
{
    title:"Closure Bug in Loop",diff:"Hard",pts:200,
    desc:"Loop should log 0,1,2,3,4 but logs 5 five times. Classic closure issue.",
    file:"app.js",
    expected:"Logs 0, 1, 2, 3, 4 after delays.",
    code:`for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100 * i);
}

// Expected: 0, 1, 2, 3, 4
// Actual: 5, 5, 5, 5, 5`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /for\s*\(\s*let\s+i/.test(s)||/\(function/.test(s);
    },
    hints:["'var' is function-scoped — all callbacks share same 'i'.","'let' is block-scoped — each iteration gets its own.","Change 'var i' to 'let i'."]
},
{
    title:"Sort Mutates Original Array",diff:"Medium",pts:150,
    desc:"Sorted should be separate from original, but both arrays are sorted.",
    file:"app.js",
    expected:"Original stays [3,1,4,1,5] while sorted is [1,1,3,4,5].",
    code:`const original = [3, 1, 4, 1, 5];

const sorted = original.sort(
  (a, b) => a - b
);

console.log("Original:", original);
// [1,1,3,4,5] — mutated!

console.log("Sorted:", sorted);
// [1,1,3,4,5]`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /\[\.\.\.original\]/.test(s)||/original\.slice\(/.test(s)||/Array\.from/.test(s)||/\.toSorted/.test(s);
    },
    hints:[".sort() modifies the array in-place.","You need to copy the array before sorting.","Use [...original].sort() or original.slice().sort()."]
},
{
    title:"Type Coercion Trap",diff:"Easy",pts:100,
    desc:"isZero should only match the number 0, but matches empty string and null too.",
    file:"app.js",
    expected:"isZero(0)=true, isZero('')=false, isZero(null)=false.",
    code:`function isZero(val) {
  if (val == 0) {
    return true;
  }
  return false;
}

console.log(isZero(0));     // true ✓
console.log(isZero(''));    // true ✗
console.log(isZero(null));  // true ✗
console.log(isZero(false)); // true ✗`,
    check(c){ return /val\s*===\s*0/.test(c.replace(/\s+/g,' ')); },
    hints:["== does type coercion: '' == 0 is true.","=== checks value AND type.","Change val == 0 to val === 0."]
},
{
    title:"Off-by-One Error",diff:"Easy",pts:100,
    desc:"Function should return the last array element but returns undefined.",
    file:"app.js",
    expected:"getLastItem(['a','b','c']) returns 'c'.",
    code:`function getLastItem(arr) {
  return arr[arr.length];
}

const items = ['a', 'b', 'c'];
console.log(getLastItem(items));
// Expected: 'c'
// Actual: undefined
// Array indices are 0-based!`,
    check(c){
        return /arr\s*\[\s*arr\.length\s*-\s*1\s*\]/.test(c.replace(/\s+/g,' '))||c.includes('.at(-1)');
    },
    hints:["Array with 3 items has indices 0, 1, 2.","arr.length is 3, but arr[3] doesn't exist.","Use arr[arr.length - 1] or arr.at(-1)."]
},
{
    title:"Object Reference Shared",diff:"Medium",pts:150,
    desc:"Two users share the same object reference, so changing one changes both.",
    file:"app.js",
    expected:"alice.name='Alice', bob.name='Bob' — separate objects.",
    code:`const defaults = {
  theme: 'dark',
  lang: 'en'
};

function createUser(name) {
  const settings = defaults;
  settings.name = name;
  return settings;
}

const alice = createUser('Alice');
const bob = createUser('Bob');

console.log(alice.name);
// Expected: 'Alice'
// Actual: 'Bob' — overwritten!`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /\{\s*\.\.\.defaults/.test(s)||/Object\.assign\s*\(\s*\{\}/.test(s)||/structuredClone/.test(s)||/JSON\.parse\(JSON\.stringify/.test(s);
    },
    hints:["const settings = defaults doesn't copy — it's the same reference.","Objects are assigned by reference in JavaScript.","Use { ...defaults } or Object.assign({}, defaults) to create a copy."]
},
{
    title:"String Concatenation Not Addition",diff:"Easy",pts:100,
    desc:"Adding two prices gives '1020' instead of 30 because they're strings.",
    file:"app.js",
    expected:"addPrices('10', '20') returns 30 (number).",
    code:`function addPrices(a, b) {
  return a + b;
}

const total = addPrices("10", "20");
console.log(total);
// Expected: 30
// Actual: "1020"
// String + String = concatenation!`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /Number\s*\(/.test(s)||/parseInt/.test(s)||/parseFloat/.test(s)||/\+\s*a/.test(s)||/\+\s*b/.test(s);
    },
    hints:["'10' + '20' is string concatenation, not math.","Convert strings to numbers first.","Use Number(a) + Number(b) or parseFloat(a) + parseFloat(b)."]
},
{
    title:"Return Inside forEach Doesn't Work",diff:"Medium",pts:150,
    desc:"findUser returns undefined because return inside forEach only exits the callback, not the outer function.",
    file:"app.js",
    expected:"findUser(users, 'Sara') returns the Sara object.",
    code:`function findUser(users, name) {
  users.forEach(user => {
    if (user.name === name) {
      return user;
    }
  });
}

const users = [
  { name: 'Ali', age: 25 },
  { name: 'Sara', age: 22 },
  { name: 'Ahmed', age: 30 }
];

console.log(findUser(users, 'Sara'));
// Expected: { name: 'Sara', age: 22 }
// Actual: undefined`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /\.find\s*\(/.test(s)||(/for\s*\(/.test(s)&&/return\s+user/.test(s)&&!/forEach/.test(s));
    },
    hints:["return inside forEach exits only the callback function.","forEach ignores callback return values entirely.",".find() returns the first matching element — use it instead of forEach."]
}
],

// =============================================================================
//  CONSOLE ERROR MODE — 8 Challenges
// =============================================================================
console: [
{
    title:"Cannot Read 'name' of Undefined",diff:"Easy",pts:100,
    desc:"Function crashes when called without arguments. Read the error.",
    file:"app.js",
    expected:'Outputs "Hello, Guest!" when called with no argument.',
    error:'TypeError: Cannot read properties of undefined (reading \'name\')\n  at greetUser (app.js:2)\n  at app.js:6',
    code:`function greetUser(user) {
  const msg = "Hello, " + user.name + "!";
  return msg;
}

const greeting = greetUser();
console.log(greeting);`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /user\s*=\s*\{/.test(s)||/user\?\.\s*name/.test(s)||/if\s*\(!?\s*user/.test(s)||/user\s*\|\|/.test(s);
    },
    hints:["greetUser() is called with NO argument.","Add a default: user = { name: 'Guest' }","Or use optional chaining: user?.name || 'Guest'"]
},
{
    title:"DOM Null — Script in Head",diff:"Medium",pts:150,
    desc:"Script runs before body loads, getElementById returns null.",
    file:"app.js",
    expected:"Event listener attaches after DOM loads.",
    error:"TypeError: Cannot read properties of null (reading 'addEventListener')\n  at init (app.js:5)\n  at app.js:13\n\n#submitBtn is null — DOM not loaded yet.",
    code:`// Runs in <head> before body!

function init() {
  const btn = document
    .getElementById('submitBtn');
  btn.addEventListener(
    'click', handleSubmit
  );
}

function handleSubmit() {
  console.log('Submitted!');
}

init();`,
    check(c){
        const s=c.replace(/\s+/g,' ').toLowerCase();
        return s.includes('domcontentloaded')||s.includes('window.onload');
    },
    hints:["Script runs BEFORE HTML body exists.","Wait for DOM to be fully parsed.","Use document.addEventListener('DOMContentLoaded', init)"]
},
{
    title:"data.map is Not a Function",diff:"Hard",pts:200,
    desc:"data is a Promise, not an array. Also response needs .json().",
    file:"app.js",
    expected:"Fetches users and logs names array.",
    error:"TypeError: data.map is not a function\n  at displayNames (app.js:10)\n\ndata is a Promise, not an array!\nAlso: response needs .json() to parse.",
    code:`async function fetchUsers() {
  const response = await fetch(
    '/api/users'
  );
  const data = response;
  return data;
}

async function displayNames() {
  const data = fetchUsers();
  const names = data.map(
    user => user.name
  );
  console.log(names);
}

displayNames();`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /await\s+fetchUsers/.test(s)&&/\.json\s*\(/.test(s);
    },
    hints:["fetchUsers() returns a Promise — need await.","fetch response is a Response object, not JSON.","Add await before fetchUsers() AND use await response.json()."]
},
{
    title:"ReferenceError: taxRate Not Defined",diff:"Easy",pts:100,
    desc:"Variable used but never declared. Read the error trace.",
    file:"app.js",
    expected:"Calculates total: 108 (100 + 8% tax).",
    error:"ReferenceError: taxRate is not defined\n  at calculateTotal (app.js:2)\n  at app.js:6",
    code:`function calculateTotal(price) {
  const tax = price * taxRate;
  const total = price + tax;
  return total;
}

const result = calculateTotal(100);
console.log("Total:", result);
// Expected: 108 (8% tax)`,
    check(c){
        return /(const|let|var)\s+taxRate\s*=/.test(c)||/function\s+calculateTotal\s*\(\s*price\s*,\s*taxRate/.test(c);
    },
    hints:["'taxRate' is used but never declared.","Define it: const taxRate = 0.08","Add 'const taxRate = 0.08;' before it's used."]
},
{
    title:"JSON SyntaxError — Single Quotes",diff:"Medium",pts:150,
    desc:"JSON.parse fails because of invalid JSON syntax.",
    file:"app.js",
    expected:"Parses to object { name: 'Ali', age: 25 }.",
    error:"SyntaxError: Unexpected token ' in JSON at position 1\n\nJSON requires double quotes.\nTrailing commas are not allowed.",
    code:`const jsonStr = "{'name': 'Ali', 'age': 25, }";

const user = JSON.parse(jsonStr);
console.log(user.name, user.age);

// Crashes with SyntaxError!`,
    check(c){
        return c.includes('"name"')||c.includes('\\"name\\"');
    },
    hints:["JSON requires double quotes, not single quotes.","Trailing commas are invalid in JSON.",'Use: \'{"name": "Ali", "age": 25}\'']
},
{
    title:"Stack Overflow — No Base Case",diff:"Medium",pts:150,
    desc:"Recursive function calls itself forever. Read the error.",
    file:"app.js",
    expected:"factorial(5) returns 120.",
    error:"RangeError: Maximum call stack size exceeded\n  at factorial (app.js:2)\n  at factorial (app.js:2)\n  at factorial (app.js:2)\n  ... (infinite recursion)",
    code:`function factorial(n) {
  return n * factorial(n - 1);
}

console.log(factorial(5));
// Expected: 120
// Actual: Stack Overflow!
// The recursion never stops.`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /if\s*\(/.test(s)&&(/n\s*(<=|<|===|==)\s*(0|1)/.test(s)||/n\s*===?\s*0/.test(s));
    },
    hints:["The function never stops calling itself.","Every recursion needs a base case — a condition to stop.","Add: if (n <= 1) return 1; at the start."]
},
{
    title:"Cannot Set Property of Undefined",diff:"Medium",pts:150,
    desc:"Trying to set a nested property when parent doesn't exist.",
    file:"app.js",
    expected:"config.database.host = 'localhost' works.",
    error:"TypeError: Cannot set properties of undefined (setting 'host')\n  at app.js:3\n\nconfig.database is undefined!",
    code:`const config = {};

config.database.host = 'localhost';
config.database.port = 5432;

console.log(config);
// Bug: config.database doesn't exist
// Can't set .host on undefined!`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /config\.database\s*=\s*\{/.test(s)||/database\s*:\s*\{/.test(s);
    },
    hints:["config.database is undefined — you can't set properties on it.","You need to create the nested object first.","Add config.database = {} first, or define it inline: { database: { host: ... } }"]
},
{
    title:"Not a Function — Typo in Method",diff:"Medium",pts:150,
    desc:"Array method name is misspelled. Read the TypeError.",
    file:"app.js",
    expected:"Filters and logs even numbers: [2, 4, 6].",
    error:"TypeError: numbers.fliter is not a function\n  at getEvens (app.js:4)\n  at app.js:9\n\nLook closely at the method name!",
    code:`const numbers = [1, 2, 3, 4, 5, 6];

function getEvens(arr) {
  return arr.fliter(
    n => n % 2 === 0
  );
}

console.log(getEvens(numbers));
// Expected: [2, 4, 6]
// Actual: TypeError!`,
    check(c){
        return /\.filter\s*\(/.test(c)&&!/\.fliter/.test(c);
    },
    hints:["Read the error: 'fliter is not a function'.","There's a typo in the method name.","Change .fliter to .filter (swap 'i' and 'l')."]
}
],

// =============================================================================
//  DOM MANIPULATION — 8 Challenges
// =============================================================================
dom: [
{
    title:"getElementById Uses #",diff:"Easy",pts:100,
    desc:"Element not found because getElementById doesn't need the # prefix.",
    file:"app.js",
    expected:"Finds element and changes text to 'Updated!'.",
    code:`function updateTitle() {
  const el = document
    .getElementById('#main-title');
  el.textContent = 'Updated!';
}

// getElementById doesn't use #!
// Only querySelector needs it.
updateTitle();`,
    check(c){
        return /getElementById\s*\(\s*['"]main-title['"]\s*\)/.test(c.replace(/\s+/g,' '))||/querySelector\s*\(\s*['"]#main-title['"]\s*\)/.test(c.replace(/\s+/g,' '));
    },
    hints:["getElementById takes just the ID, no # symbol.","# prefix is only for querySelector/querySelectorAll.","Change getElementById('#main-title') to getElementById('main-title')."]
},
{
    title:"innerHTML Allows XSS",diff:"Medium",pts:150,
    desc:"User input via innerHTML allows script injection. Use a safer method.",
    file:"app.js",
    expected:"Displays input as plain text, no XSS possible.",
    code:`function displayComment(text) {
  const div = document
    .getElementById('comments');
  div.innerHTML += '<p>' + text + '</p>';
}

// XSS attack works!
displayComment(
  '<img src=x onerror="alert(1)">'
);`,
    check(c){
        const s=c.toLowerCase();
        return s.includes('textcontent')||s.includes('createtextnode')||s.includes('innertext');
    },
    hints:["innerHTML interprets HTML — including malicious scripts.","textContent treats everything as plain text.","Use element.textContent = text instead of innerHTML."]
},
{
    title:"forEach Returns Undefined",diff:"Medium",pts:150,
    desc:"forEach doesn't return anything. Use the right array method.",
    file:"app.js",
    expected:"Returns ['ALI', 'SARA', 'AHMED'].",
    code:`function getUpperNames(users) {
  const result = users.forEach(
    user => user.name.toUpperCase()
  );
  return result;
}

const users = [
  { name: 'Ali' },
  { name: 'Sara' },
  { name: 'Ahmed' }
];

console.log(getUpperNames(users));
// Expected: ['ALI','SARA','AHMED']
// Actual: undefined`,
    check(c){ return /\.map\s*\(/.test(c.replace(/\s+/g,' ')); },
    hints:["forEach always returns undefined.","You need a method that builds a new array.","Change .forEach() to .map()."]
},
{
    title:"removeEventListener Anonymous",diff:"Hard",pts:200,
    desc:"Listener can't be removed because two anonymous functions aren't the same reference.",
    file:"app.js",
    expected:"Click handler is successfully removed.",
    code:`const btn = document
  .getElementById('btn');

btn.addEventListener('click',
  function() {
    console.log('Clicked!');
  }
);

// Try to remove:
btn.removeEventListener('click',
  function() {
    console.log('Clicked!');
  }
);

// Bug: NOT removed!
// Different function objects.`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        const add=/addEventListener\s*\(\s*['"]click['"]\s*,\s*(\w+)\s*\)/.exec(s);
        const rem=/removeEventListener\s*\(\s*['"]click['"]\s*,\s*(\w+)\s*\)/.exec(s);
        return add&&rem&&add[1]===rem[1];
    },
    hints:["Two identical anonymous functions are different objects.","Both add/remove need the SAME function reference.","Define separately: const handler = () => {...}; use for both."]
},
{
    title:"className vs .class Property",diff:"Easy",pts:100,
    desc:"Using .class doesn't work — it's a reserved keyword in JS.",
    file:"app.js",
    expected:"Element gets the 'active' CSS class.",
    code:`function activate(id) {
  const el = document.getElementById(id);
  el.class = 'active';
}

// .class is reserved in JS!
// Element doesn't change.
activate('menu-item');`,
    check(c){
        const s=c.toLowerCase();
        return s.includes('classname')||s.includes('classlist');
    },
    hints:["'class' is a reserved keyword in JavaScript.","DOM uses 'className' for the class string.","Use el.className = 'active' or el.classList.add('active')."]
},
{
    title:"querySelectorAll Not an Array",diff:"Medium",pts:150,
    desc:"querySelectorAll returns a NodeList, not Array. .map() doesn't exist on it.",
    file:"app.js",
    expected:"Returns array of text content from all .item elements.",
    code:`function getItemTexts() {
  const items = document
    .querySelectorAll('.item');

  const texts = items.map(
    item => item.textContent
  );

  return texts;
}

// TypeError: items.map is
// not a function!`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /Array\.from\s*\(/.test(s)||/\[\.\.\.\s*(items|document)/.test(s)||/forEach/.test(s);
    },
    hints:["querySelectorAll returns a NodeList, not an Array.","NodeList doesn't have .map() method.","Use Array.from(items).map() or [...items].map()."]
},
{
    title:"Dynamic Elements Need Delegation",diff:"Medium",pts:150,
    desc:"Listeners on existing items work, but dynamically added items don't respond to clicks.",
    file:"app.js",
    expected:"All items (including future ones) respond to click.",
    code:`// Add listener to each item
const items = document
  .querySelectorAll('.item');

items.forEach(item => {
  item.addEventListener('click', () => {
    console.log(item.textContent);
  });
});

// Bug: items added AFTER this code
// runs won't have click handlers!
// Need event delegation.`,
    check(c){
        const s=c.replace(/\s+/g,' ').toLowerCase();
        const hasDelegation=s.includes('closest')||s.includes('target')||s.includes('matches');
        const hasParent=s.includes('list')||s.includes('container')||s.includes('parent');
        return hasDelegation||(/addeventlistener/.test(s)&&/target/.test(s));
    },
    hints:["Direct listeners only work on existing elements.","Event delegation attaches one listener to a parent.","Listen on parent, check e.target.matches('.item') or e.target.closest('.item')."]
},
{
    title:"Form Refreshes Page",diff:"Easy",pts:100,
    desc:"Form submission refreshes the page before fetch can complete.",
    file:"app.js",
    expected:"Form submits via fetch without page refresh.",
    code:`const form = document
  .getElementById('myForm');

form.addEventListener('submit', (e) => {
  const data = new FormData(form);

  fetch('/api/submit', {
    method: 'POST',
    body: data
  });

  console.log('Submitted!');
  // Bug: page refreshes before
  // fetch completes!
});`,
    check(c){
        return /e\.preventDefault\s*\(\s*\)/.test(c.replace(/\s+/g,' '))||/event\.preventDefault/.test(c);
    },
    hints:["Forms default behavior is to refresh the page on submit.","You need to prevent the default action.","Add e.preventDefault() at the start of the handler."]
}
],

// =============================================================================
//  ASYNC & PROMISES — 8 Challenges
// =============================================================================
async: [
{
    title:"Missing Await on Async Call",diff:"Easy",pts:100,
    desc:"Variable holds a Promise instead of actual data because await is missing.",
    file:"app.js",
    expected:"Logs the actual user data object.",
    code:`async function getUser(id) {
  const res = await fetch(
    '/api/user/' + id
  );
  return res.json();
}

async function showUser() {
  const user = getUser(1);
  console.log("User:", user);
  // Logs: [object Promise]
  // Not actual data!
}

showUser();`,
    check(c){ return /await\s+getUser/.test(c.replace(/\s+/g,' ')); },
    hints:["getUser() is async — returns a Promise.","To get the value, you must await it.","Change to: const user = await getUser(1)"]
},
{
    title:"Promise.all Without Array Brackets",diff:"Medium",pts:150,
    desc:"Promise.all receives separate arguments instead of an array.",
    file:"app.js",
    expected:"All three fetches run in parallel.",
    code:`async function loadAll() {
  const results = await Promise.all(
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/comments')
  );

  console.log(results);
  // Only first fetch runs!
}

loadAll();`,
    check(c){ return /Promise\.all\s*\(\s*\[/.test(c.replace(/\s+/g,' ')); },
    hints:["Promise.all expects a single array argument.","You passed 3 separate arguments.","Wrap in []: Promise.all([fetch(...), ...])"]
},
{
    title:"setTimeout Closure — var Scoping",diff:"Medium",pts:150,
    desc:"All timeouts log '3' instead of 0, 1, 2.",
    file:"app.js",
    expected:"Logs 'Task 0 done', 'Task 1 done', 'Task 2 done'.",
    code:`function runTasks() {
  for (var i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log('Task ' + i + ' done');
    }, 1000 * (i + 1));
  }
}

// Actual: Task 3 done (x3)
runTasks();`,
    check(c){
        return /for\s*\(\s*let\s/.test(c.replace(/\s+/g,' '))||/\(function\s*\(/.test(c);
    },
    hints:["var is function-scoped — all closures share same i.","let creates a new binding per iteration.","Change var i to let i."]
},
{
    title:"Fetch Without Error Handling",diff:"Medium",pts:150,
    desc:"Network failures crash the app. Add try/catch.",
    file:"app.js",
    expected:"Errors are caught and logged gracefully.",
    code:`async function loadData() {
  const res = await fetch('/api/data');
  const data = await res.json();
  displayData(data);
}

function displayData(data) {
  console.log('Data:', data);
}

// If network fails = unhandled crash!
loadData();`,
    check(c){
        const s=c.replace(/\s+/g,' ').toLowerCase();
        return (s.includes('try')&&s.includes('catch'))||s.includes('.catch(');
    },
    hints:["If fetch fails, await throws an error.","Use try/catch around async/await code.","Wrap in try { ... } catch(err) { console.error(err) }"]
},
{
    title:"async forEach Doesn't Wait",diff:"Hard",pts:200,
    desc:"'Done!' logs before any processing finishes because forEach ignores async.",
    file:"app.js",
    expected:"All items processed, THEN 'Done!' logs.",
    code:`async function processItems(items) {
  items.forEach(async (item) => {
    await saveToServer(item);
    console.log('Saved:', item);
  });

  console.log('Done!');
  // 'Done!' logs FIRST!
}

async function saveToServer(item) {
  return new Promise(resolve =>
    setTimeout(resolve, 100)
  );
}

processItems(['a', 'b', 'c']);`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return (/for\s*\(/.test(s)&&/await\s+save/.test(s)&&!/forEach/.test(s))||(/Promise\.all/.test(s)&&/\.map/.test(s));
    },
    hints:["forEach ignores async return values (Promises).","Use for...of with await for sequential execution.","Replace forEach with: for (const item of items) { await saveToServer(item); }"]
},
{
    title:"Promise Chain Missing Return",diff:"Medium",pts:150,
    desc:".then() chain breaks because res.json() isn't returned.",
    file:"app.js",
    expected:"data in second .then() is the parsed JSON.",
    code:`fetch('/api/user')
  .then(res => {
    res.json();
  })
  .then(data => {
    console.log(data);
    // undefined!
  });

// Bug: res.json() result is lost
// because it's not returned!`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /return\s+res\.json\s*\(/.test(s)||/=>\s*res\.json\s*\(/.test(s);
    },
    hints:["In .then() chains, you must return values to pass them forward.","res.json() is called but its result isn't returned.","Add 'return' before res.json() or use arrow shorthand: .then(res => res.json())"]
},
{
    title:"Unhandled Promise Rejection",diff:"Easy",pts:100,
    desc:"Async function errors are never caught — add a .catch() handler.",
    file:"app.js",
    expected:"Errors are caught and logged instead of crashing.",
    code:`async function loadProfile() {
  const res = await fetch('/api/profile');
  if (!res.ok) {
    throw new Error('HTTP ' + res.status);
  }
  return res.json();
}

loadProfile();

// Bug: if it fails, error is
// completely unhandled!
// "Unhandled Promise Rejection"`,
    check(c){
        const s=c.replace(/\s+/g,' ').toLowerCase();
        return s.includes('.catch(')||s.includes('.catch (')||(s.includes('try')&&s.includes('catch'));
    },
    hints:["Unhandled rejections can crash Node apps and show warnings in browsers.","Every async call that might fail needs error handling.","Add .catch(err => console.error(err)) to loadProfile()."]
},
{
    title:"Race Condition — Stale Response",diff:"Hard",pts:200,
    desc:"Fast typing causes old search results to overwrite newer ones.",
    file:"app.js",
    expected:"Only the latest search result is displayed.",
    code:`let currentQuery = '';

async function search(query) {
  const res = await fetch(
    '/api/search?q=' + query
  );
  const data = await res.json();

  // Bug: if user types fast,
  // older (slower) request can
  // resolve AFTER a newer one!
  displayResults(data);
}

function displayResults(data) {
  console.log('Results:', data);
}

// User types: "a", "ab", "abc"
// "a" response arrives LAST!`,
    check(c){
        const s=c.replace(/\s+/g,' ').toLowerCase();
        return s.includes('abortcontroller')||s.includes('abort')||(s.includes('currentquery')&&s.includes('query')&&s.includes('if')&&s.includes('return'));
    },
    hints:["Older requests can resolve after newer ones due to network timing.","Track the latest query and only display results if it matches.","Use AbortController to cancel previous requests, or compare query before displaying."]
}
],

// =============================================================================
//  HTML — 6 Challenges
// =============================================================================
html: [
{
    title:"Image Missing Alt Text",diff:"Easy",pts:100,
    desc:"The image has no alt attribute. Screen readers can't describe it. Add meaningful alt text.",
    file:"index.html",
    expected:"Image has a descriptive alt attribute for accessibility.",
    html:'<img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\' fill=\'%23334\'%3E%3Crect width=\'300\' height=\'200\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' fill=\'%23aaa\' text-anchor=\'middle\' dy=\'.3em\' font-size=\'18\'%3ETeam Photo%3C/text%3E%3C/svg%3E">',
    code:`<img
  src="team-photo.jpg"
  width="300"
  height="200"
>

<!-- Accessibility issue:
     Screen readers say "image"
     but can't describe it.
     What's missing? -->`,
    check(c){
        return /alt\s*=\s*["'][^"']+["']/.test(c);
    },
    hints:["Images need an 'alt' attribute for accessibility.","alt describes the image for screen readers and when images fail to load.","Add alt=\"Team photo\" (or any descriptive text) to the img tag."]
},
{
    title:"Form Inputs Missing Labels",diff:"Easy",pts:100,
    desc:"Form inputs have no labels. Users with screen readers can't tell what each field is for.",
    file:"index.html",
    expected:"Each input has an associated label element.",
    html:'<form><input type="text" placeholder="Email"><input type="password" placeholder="Password"><button>Login</button></form>',
    code:`<form>
  <input
    type="text"
    id="email"
    placeholder="Email"
  >
  <input
    type="password"
    id="pass"
    placeholder="Password"
  >
  <button>Login</button>
</form>

<!-- No labels! Placeholder is NOT
     a substitute for <label>. -->`,
    check(c){
        const s=c.toLowerCase();
        return (s.includes('<label')&&s.includes('for='))||(s.includes('<label')&&s.includes('</label>'));
    },
    hints:["Placeholders disappear when typing — they're not labels.","<label> elements associate text with form controls.","Add <label for=\"email\">Email</label> before each input."]
},
{
    title:"Both Buttons Submit Form",diff:"Easy",pts:100,
    desc:"Both buttons submit the form. The Reset button should not submit.",
    file:"index.html",
    expected:"Search submits, Reset only clears the form without submitting.",
    html:'<form><input type="text" placeholder="Search..."><button>Search</button><button>Reset</button></form>',
    code:`<form id="searchForm" action="/search">
  <input type="text" name="q">
  <button>Search</button>
  <button>Reset</button>
</form>

<!-- Bug: clicking Reset ALSO
     submits the form!
     Default button type = submit -->`,
    check(c){
        const s=c.toLowerCase();
        return s.includes('type="button"')||s.includes('type="reset"');
    },
    hints:["Buttons inside forms default to type=\"submit\".","The Reset button needs a different type.","Add type=\"button\" or type=\"reset\" to the Reset button."]
},
{
    title:"Divs Instead of Semantic Tags",diff:"Medium",pts:150,
    desc:"Page uses only divs. Replace with proper semantic HTML5 elements.",
    file:"index.html",
    expected:"Uses <header>, <nav>, <main>, <footer> for better accessibility and SEO.",
    html:'<div class="header"><div class="nav">Nav</div></div><div class="main">Content</div><div class="footer">Footer</div>',
    code:`<div class="header">
  <h1>My Site</h1>
  <div class="nav">
    <a href="/">Home</a>
    <a href="/about">About</a>
  </div>
</div>
<div class="main">
  <h2>Welcome</h2>
  <p>Main content here.</p>
</div>
<div class="footer">
  <p>© 2025</p>
</div>

<!-- All divs! No semantic meaning.
     Bad for SEO and accessibility. -->`,
    check(c){
        const s=c.toLowerCase();
        return s.includes('<header')&&s.includes('<nav')&&s.includes('<main')&&s.includes('<footer');
    },
    hints:["Semantic tags tell browsers/screen readers what each section IS.","<header>, <nav>, <main>, <footer> replace generic divs.","Replace div.header with <header>, div.nav with <nav>, etc."]
},
{
    title:"Missing Viewport Meta Tag",diff:"Easy",pts:100,
    desc:"Site isn't responsive on mobile because viewport meta is missing from <head>.",
    file:"index.html",
    expected:"Page scales correctly on mobile devices.",
    code:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Website</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>

<!-- Bug: site looks zoomed-out
     and tiny on mobile phones.
     What's missing from <head>? -->`,
    check(c){
        return /meta\s+name\s*=\s*["']viewport["']/.test(c.toLowerCase());
    },
    hints:["Mobile browsers need instructions on how to scale the page.","There's a meta tag specifically for viewport configuration.","Add: <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"]
},
{
    title:"Broken Table Structure",diff:"Medium",pts:150,
    desc:"Table is missing proper <thead>, <tbody>, and <th> structure.",
    file:"index.html",
    expected:"Table has proper thead/tbody/th structure for accessibility.",
    html:'<table><tr><td>Name</td><td>Age</td></tr><tr><td>Ali</td><td>25</td></tr><tr><td>Sara</td><td>22</td></tr></table>',
    code:`<table>
  <tr>
    <td>Name</td>
    <td>Age</td>
    <td>City</td>
  </tr>
  <tr>
    <td>Ali</td>
    <td>25</td>
    <td>Delhi</td>
  </tr>
  <tr>
    <td>Sara</td>
    <td>22</td>
    <td>Mumbai</td>
  </tr>
</table>

<!-- Header row uses <td> not <th>.
     No <thead> or <tbody>. -->`,
    check(c){
        const s=c.toLowerCase();
        return s.includes('<thead')&&s.includes('<tbody')&&s.includes('<th');
    },
    hints:["Header cells should use <th> not <td>.","Group headers in <thead> and data rows in <tbody>.","Wrap first row in <thead>, use <th> tags, put data rows in <tbody>."]
}
],

// =============================================================================
//  REACT — 6 Challenges (Simulated Patterns)
// =============================================================================
react: [
{
    title:"Direct State Mutation",diff:"Medium",pts:150,
    desc:"Array is mutated directly with push() instead of creating a new array. React won't re-render.",
    file:"Component.jsx",
    expected:"New item appears in UI after addItem is called.",
    code:`function TodoList() {
  const [items, setItems] = useState([]);

  function addItem(text) {
    items.push(text);
    setItems(items);
  }

  // Bug: React sees same array
  // reference, skips re-render!
  // push() mutates the original.

  return (
    <ul>
      {items.map(item => (
        <li>{item}</li>
      ))}
    </ul>
  );
}`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /setItems\s*\(\s*\[\s*\.\.\.items/.test(s)||/setItems\s*\(\s*prev/.test(s)||/setItems\s*\(\s*items\.concat/.test(s);
    },
    hints:["push() mutates the array — same reference, React doesn't detect change.","React requires a NEW array reference to trigger re-render.","Use setItems([...items, text]) to create a new array."]
},
{
    title:"Missing Key Prop in List",diff:"Easy",pts:100,
    desc:"List items rendered without unique key prop. React shows a warning.",
    file:"Component.jsx",
    expected:"Each <li> has a unique key prop. No console warnings.",
    code:`function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li>
          {user.name} — {user.email}
        </li>
      ))}
    </ul>
  );
}

// Console warning:
// "Each child in a list should
//  have a unique 'key' prop."`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /key\s*=\s*\{/.test(s);
    },
    hints:["React needs key prop to track list items efficiently.","key should be unique and stable (not array index ideally).","Add key={user.id} or key={user.email} to the <li> element."]
},
{
    title:"useEffect Infinite Loop",diff:"Hard",pts:200,
    desc:"useEffect runs on every render because dependency array is missing, causing infinite API calls.",
    file:"Component.jsx",
    expected:"API is called only ONCE on component mount.",
    code:`function Profile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/user/' + userId)
      .then(res => res.json())
      .then(data => setUser(data));
  });

  // Bug: runs on EVERY render!
  // setUser triggers re-render,
  // which triggers useEffect again!
  // = infinite loop!

  return <div>{user?.name}</div>;
}`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /useEffect\s*\(\s*\(\)\s*=>\s*\{[\s\S]*\}\s*,\s*\[/.test(s);
    },
    hints:["useEffect without dependency array runs after EVERY render.","The second argument is a dependency array controlling when it runs.","Add [userId] as second argument: useEffect(() => {...}, [userId])"]
},
{
    title:"Stale State in setTimeout",diff:"Hard",pts:200,
    desc:"Counter always shows 1 after clicking because setTimeout captures old state.",
    file:"Component.jsx",
    expected:"After 3 rapid clicks, shows 3 after the timeout.",
    code:`function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setTimeout(() => {
      setCount(count + 1);
    }, 1000);
  }

  // Bug: click 3 times fast,
  // count is still 1 after timeout!
  // 'count' is stale (captured = 0).

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>
        +1 (delayed)
      </button>
    </div>
  );
}`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /setCount\s*\(\s*prev/.test(s)||/setCount\s*\(\s*c\s*=>/.test(s)||/setCount\s*\(\s*n\s*=>/.test(s);
    },
    hints:["Closures capture the value of count at render time (stale closure).","Inside setTimeout, 'count' is always the value from that render.","Use functional update: setCount(prev => prev + 1)"]
},
{
    title:"setState Not Using Previous Value",diff:"Medium",pts:150,
    desc:"Two consecutive setCount calls result in only +1 instead of +2 because they both read the same stale state.",
    file:"Component.jsx",
    expected:"handleDoubleIncrement adds 2 to the count.",
    code:`function Counter() {
  const [count, setCount] = useState(0);

  function handleDoubleIncrement() {
    setCount(count + 1);
    setCount(count + 1);
    // Both read count=0!
    // Result: count=1, not 2!
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleDoubleIncrement}>
        +2
      </button>
    </div>
  );
}`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /setCount\s*\(\s*prev/.test(s)||/setCount\s*\(\s*c\s*=>/.test(s)||/setCount\s*\(\s*n\s*=>/.test(s);
    },
    hints:["Both setCount calls read the same 'count' value (batched).","React batches state updates — second call doesn't see first update.","Use functional form: setCount(prev => prev + 1) for both calls."]
},
{
    title:"Hook Called Conditionally",diff:"Hard",pts:200,
    desc:"useState is called inside an if block, breaking React's rules of hooks.",
    file:"Component.jsx",
    expected:"Hook is always called, condition controls the logic instead.",
    code:`function UserProfile({ isLoggedIn }) {

  if (isLoggedIn) {
    const [name, setName] = useState('');
    // ... use name
  }

  const [theme, setTheme] = useState('dark');

  // Bug: "React Hook useState is
  // called conditionally. Hooks
  // must be called in the same
  // order every render."

  return <div>Profile</div>;
}`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        const hookBeforeIf=/useState\s*\([^)]*\)\s*;[\s\S]*useState\s*\([^)]*\)\s*;[\s\S]*if/.test(s);
        const allHooksTop=!/if\s*\([^)]*\)\s*\{[^}]*useState/.test(s);
        return allHooksTop;
    },
    hints:["Hooks must always be called in the same order, every render.","You can't put hooks inside if/else, loops, or nested functions.","Move useState outside the if block. Use the condition inside the logic instead."]
}
],

// =============================================================================
//  TYPESCRIPT — 6 Challenges
// =============================================================================
typescript: [
{
    title:"Missing Null Check",diff:"Easy",pts:100,
    desc:"Function might receive null but doesn't handle it, causing runtime crash.",
    file:"utils.ts",
    expected:"Handles null safely, returns 'Unknown' for null input.",
    code:`function getUserName(
  user: { name: string } | null
): string {
  return user.name;
}

// TypeScript Error:
// 'user' is possibly 'null'.
//
// If user is null, accessing
// .name crashes at runtime!

const name = getUserName(null);`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /user\?\.\s*name/.test(s)||/if\s*\(\s*!?\s*user/.test(s)||/user\s*\?\s*user\.name/.test(s)||/user\s*&&/.test(s)||/user\s*!==?\s*null/.test(s);
    },
    hints:["TypeScript tells you: 'user' is possibly null.","You need to check for null before accessing properties.","Use optional chaining: user?.name ?? 'Unknown' or add an if check."]
},
{
    title:"Type Narrowing Required",diff:"Medium",pts:150,
    desc:"Union type needs narrowing before accessing type-specific properties.",
    file:"utils.ts",
    expected:"Correctly handles both Circle and Rectangle shapes.",
    code:`type Circle = {
  kind: 'circle';
  radius: number;
};

type Rectangle = {
  kind: 'rectangle';
  width: number;
  height: number;
};

type Shape = Circle | Rectangle;

function getArea(shape: Shape): number {
  return shape.width * shape.height;
}

// Error: Property 'width' does not
// exist on type 'Circle'.
// Shape could be Circle OR Rectangle!`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return (/shape\.kind\s*===/.test(s)||/if\s*\(/.test(s))&&s.includes('radius')&&s.includes('width');
    },
    hints:["TypeScript doesn't know which Shape variant you have.","Use the 'kind' discriminant to narrow the type.","Check shape.kind === 'circle' to access radius, else access width/height."]
},
{
    title:"Readonly Property Mutation",diff:"Medium",pts:150,
    desc:"Trying to modify a readonly property. TypeScript prevents this.",
    file:"utils.ts",
    expected:"Create a new config object instead of mutating the existing one.",
    code:`interface AppConfig {
  readonly apiUrl: string;
  readonly debug: boolean;
}

const config: AppConfig = {
  apiUrl: 'https://api.example.com',
  debug: false
};

function enableDebug(cfg: AppConfig) {
  cfg.debug = true;
  return cfg;
}

// Error: Cannot assign to 'debug'
// because it is a read-only property.`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /\{\s*\.\.\.cfg/.test(s)||/Object\.assign\s*\(\s*\{\}/.test(s)||/return\s*\{/.test(s);
    },
    hints:["readonly means you cannot modify the property.","Create a new object with the updated value instead.","Return { ...cfg, debug: true } to create a new object."]
},
{
    title:"Optional Property Access",diff:"Easy",pts:100,
    desc:"Accessing an optional property without checking if it exists.",
    file:"utils.ts",
    expected:"Safely accesses address.city even when address is undefined.",
    code:`interface User {
  name: string;
  address?: {
    city: string;
    zip: string;
  };
}

function getCity(user: User): string {
  return user.address.city;
}

// Error: 'user.address' is
// possibly 'undefined'.
// address is optional (?)!

const u: User = { name: 'Ali' };
console.log(getCity(u)); // crash!`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /address\?\./.test(s)||/if\s*\(\s*user\.address/.test(s)||/user\.address\s*&&/.test(s);
    },
    hints:["address? means the property might not exist.","Accessing .city on undefined causes a runtime error.","Use optional chaining: user.address?.city ?? 'Unknown'"]
},
{
    title:"Union Type Guard Needed",diff:"Medium",pts:150,
    desc:"Function accepts string | number but needs different logic for each type.",
    file:"utils.ts",
    expected:"Doubles numbers and repeats strings: format(5)='10', format('hi')='hihi'.",
    code:`function format(
  input: string | number
): string {
  return input.toFixed(2);
}

// Error: Property 'toFixed' does
// not exist on type 'string'.
//
// input could be string OR number!
// toFixed only works on numbers.`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /typeof\s+input\s*===/.test(s);
    },
    hints:["TypeScript doesn't know if input is string or number.","Use typeof to narrow the type at runtime.","Add: if (typeof input === 'number') for number-specific logic."]
},
{
    title:"Generic Constraint Missing",diff:"Hard",pts:200,
    desc:"Generic function tries to access .length but T might not have it.",
    file:"utils.ts",
    expected:"Only accepts types that have a .length property.",
    code:`function logLength<T>(item: T): void {
  console.log(item.length);
}

// Error: Property 'length' does
// not exist on type 'T'.
//
// T could be anything — numbers
// don't have .length!

logLength("hello");     // 5
logLength([1, 2, 3]);   // 3
logLength(42);           // crash!`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /extends\s*\{[^}]*length/.test(s)||/extends\s*\{\s*length\s*:\s*number/.test(s);
    },
    hints:["T has no constraints — it could be any type.","Use 'extends' to constrain T to types with .length.","Change to: <T extends { length: number }>"]
}
],

// =============================================================================
//  API & FETCH — 6 Challenges
// =============================================================================
api: [
{
    title:"GET Request Sends Body",diff:"Easy",pts:100,
    desc:"GET requests shouldn't have a request body. Server rejects it.",
    file:"api.js",
    expected:"GET request fetches users without a body.",
    code:`async function getUsers() {
  const res = await fetch('/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      page: 1,
      limit: 10
    })
  });

  return res.json();
}

// Bug: GET requests should NOT
// have a body! Use query params.`,
    check(c){
        const s=c.replace(/\s+/g,' ').toLowerCase();
        const noBody=!s.includes('body:')||!s.includes('get');
        const hasQuery=s.includes('?')||s.includes('urlsearchparams')||s.includes('query');
        return noBody||hasQuery;
    },
    hints:["GET requests fetch data — they should not send a body.","Use URL query parameters instead: /api/users?page=1&limit=10","Remove the body property and add params to the URL."]
},
{
    title:"POST Missing Content-Type",diff:"Medium",pts:150,
    desc:"Server receives empty body because Content-Type header is missing.",
    file:"api.js",
    expected:"Server correctly receives the JSON data.",
    code:`async function createUser(userData) {
  const res = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  });

  return res.json();
}

// Bug: server receives empty body!
// It doesn't know the data format.
createUser({ name: 'Ali', age: 25 });`,
    check(c){
        const s=c.replace(/\s+/g,' ').toLowerCase();
        return s.includes('content-type')&&s.includes('application/json');
    },
    hints:["Server doesn't know how to parse the body without Content-Type.","JSON data needs Content-Type: application/json header.","Add headers: { 'Content-Type': 'application/json' } to the fetch options."]
},
{
    title:"Not Checking res.ok",diff:"Easy",pts:100,
    desc:"fetch() doesn't throw on HTTP errors (404, 500). Code assumes success.",
    file:"api.js",
    expected:"404 and 500 errors are detected and handled.",
    code:`async function getUser(id) {
  const res = await fetch(
    '/api/user/' + id
  );
  const data = await res.json();
  return data;
}

// Bug: if server returns 404,
// fetch does NOT throw an error!
// It happily parses the error body.
// res.ok would be false.`,
    check(c){
        const s=c.replace(/\s+/g,' ').toLowerCase();
        return (s.includes('res.ok')||s.includes('response.ok')||s.includes('.ok'))&&(s.includes('throw')||s.includes('if'));
    },
    hints:["fetch() only throws on network errors, not HTTP errors.","res.ok is false for 4xx and 5xx status codes.","Add: if (!res.ok) throw new Error('HTTP ' + res.status)"]
},
{
    title:"JSON Body Not Stringified",diff:"Medium",pts:150,
    desc:"Sending an object directly instead of JSON.stringify causes '[object Object]' on the server.",
    file:"api.js",
    expected:"Server receives proper JSON string.",
    code:`async function updateProfile(data) {
  const res = await fetch('/api/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  });

  return res.json();
}

// Bug: server receives
// "[object Object]" string!
updateProfile({ name: 'Ali' });`,
    check(c){
        return /JSON\.stringify\s*\(/.test(c.replace(/\s+/g,' '));
    },
    hints:["Passing a plain object as body converts it to string: '[object Object]'.","JSON data must be serialized with JSON.stringify().","Change body: data to body: JSON.stringify(data)."]
},
{
    title:"URL Not Encoded",diff:"Medium",pts:150,
    desc:"Search query with special characters breaks the URL.",
    file:"api.js",
    expected:"Query with spaces and special chars is properly encoded.",
    code:`async function search(query) {
  const url = '/api/search?q=' + query;
  const res = await fetch(url);
  return res.json();
}

// Bug: if query = "hello world"
// URL becomes: /api/search?q=hello world
// Space in URL is invalid!
//
// query = "a&b=c" breaks params!
search("hello world & more");`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        return /encodeURIComponent/.test(s)||/URLSearchParams/.test(s)||/encodeURI\(/.test(s);
    },
    hints:["Spaces and special characters like & break URLs.","URL parameters must be encoded.","Use encodeURIComponent(query) or new URLSearchParams({ q: query })."]
},
{
    title:"Retry on Server Error",diff:"Hard",pts:200,
    desc:"API call fails once and gives up. Add retry logic for transient failures.",
    file:"api.js",
    expected:"Retries up to 3 times on 5xx errors before giving up.",
    code:`async function fetchData(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed: ' + res.status);
  }

  return res.json();
}

// Bug: 503 errors are often
// temporary — server recovers
// after a few seconds.
// Should retry, not fail immediately!
fetchData('/api/data');`,
    check(c){
        const s=c.replace(/\s+/g,' ').toLowerCase();
        return (s.includes('retry')||s.includes('retries')||s.includes('attempts')||s.includes('tries'))&&(s.includes('for')||s.includes('while')||s.includes('recursive'));
    },
    hints:["Some server errors (503, 429) are temporary.","Implement a retry loop with a counter.","Add a loop that retries up to 3 times with a delay between attempts."]
}
],

// =============================================================================
//  REGEX — 5 Challenges
// =============================================================================
regex: [
{
    title:"Dot Not Escaped",diff:"Easy",pts:100,
    desc:"Regex should match literal dots in filenames but matches any character instead.",
    file:"utils.js",
    expected:"Matches 'style.css' but NOT 'stylexcss'.",
    code:`function isCSS(filename) {
  return /style.css/.test(filename);
}

console.log(isCSS('style.css'));  // true ✓
console.log(isCSS('stylexcss'));  // true ✗
console.log(isCSS('style-css'));  // true ✗

// Bug: the dot (.) matches ANY
// character, not just a literal dot!`,
    check(c){
        return /\\\.\s*css/.test(c)||/\\\./.test(c);
    },
    hints:["In regex, . (dot) matches ANY single character.","To match a literal dot, you need to escape it.","Use \\. instead of . → /style\\.css/"]
},
{
    title:"Greedy Matching Grabs Too Much",diff:"Medium",pts:150,
    desc:"Regex extracts HTML tag content but grabs everything between first < and last >.",
    file:"utils.js",
    expected:"Matches individual tags, not the entire string.",
    code:`const html = '<b>Hello</b> and <i>World</i>';

const tags = html.match(/<.*>/g);
console.log(tags);

// Expected: ['<b>Hello</b>', '<i>World</i>']
// Actual: ['<b>Hello</b> and <i>World</i>']
// It grabs EVERYTHING from first < to last >!`,
    check(c){
        return /\.\*\?/.test(c)||/\[^<\]\*/.test(c)||/\[^>\]\*/.test(c);
    },
    hints:["* is greedy — matches as much as possible.","? after * makes it lazy — matches as little as possible.","Use /<.*?>/g for lazy matching, or /<[^>]*>/g to exclude >."]
},
{
    title:"Global Flag State Bug",diff:"Hard",pts:200,
    desc:"Regex with /g flag has stateful lastIndex — alternates between true/false on same string.",
    file:"utils.js",
    expected:"test() returns true consistently for matching strings.",
    code:`const emailRegex = /\\S+@\\S+\\.\\S+/g;

function isEmail(str) {
  return emailRegex.test(str);
}

console.log(isEmail('a@b.com')); // true
console.log(isEmail('a@b.com')); // false!
console.log(isEmail('a@b.com')); // true!
console.log(isEmail('a@b.com')); // false!

// Bug: alternates true/false!
// Same input, different results!`,
    check(c){
        const s=c.replace(/\s+/g,' ');
        const noGlobal=!/\/g/.test(s)||/\/[gimsuy]*[^g]\//.test(s);
        const newRegex=/new RegExp/.test(s);
        const resetIdx=/lastIndex\s*=\s*0/.test(s);
        return !s.includes('/g')||newRegex||resetIdx;
    },
    hints:["Regex with /g flag remembers lastIndex between .test() calls.","On each test(), it continues from where it left off.","Remove the /g flag (not needed for test) or reset regex.lastIndex = 0."]
},
{
    title:"Missing Start/End Anchors",diff:"Easy",pts:100,
    desc:"Regex should validate that entire string is a number, but passes partial matches.",
    file:"utils.js",
    expected:"isNumber('123') = true, isNumber('abc123') = false.",
    code:`function isNumber(str) {
  return /[0-9]+/.test(str);
}

console.log(isNumber('123'));    // true ✓
console.log(isNumber('abc123')); // true ✗
console.log(isNumber('12.3x'));  // true ✗

// Bug: matches if ANY part of the
// string contains digits!
// Should match ENTIRE string only.`,
    check(c){
        return /\^[^]*\$/.test(c)||(/\^/.test(c)&&/\$/.test(c));
    },
    hints:["The regex matches digits ANYWHERE in the string.","^ anchors to start, $ anchors to end of string.","Use /^[0-9]+$/ to require the ENTIRE string to be digits."]
},
{
    title:"Character Class Missing Dash",diff:"Easy",pts:100,
    desc:"Regex for slug validation doesn't allow hyphens in the middle of the pattern.",
    file:"utils.js",
    expected:"isSlug('my-post') = true, isSlug('my post') = false.",
    code:`function isSlug(str) {
  return /^[a-z0-9]+$/.test(str);
}

console.log(isSlug('hello'));     // true ✓
console.log(isSlug('my-post'));   // false ✗
console.log(isSlug('blog-2024'));  // false ✗

// Bug: hyphens are valid in slugs!
// The character class [a-z0-9]
// doesn't include the dash.`,
    check(c){
        return /\[a-z0-9-\]/.test(c)||/\[a-z0-9\\-\]/.test(c)||/\[-a-z0-9\]/.test(c);
    },
    hints:["The character class [a-z0-9] only allows letters and numbers.","Hyphens are common in URL slugs: my-blog-post.","Add hyphen to the class: [a-z0-9-] (put - at end to be safe)."]
}
]
};


// =============================================================================
//  GAME STATE
// =============================================================================

const state = {
    mode:null, challenges:[], idx:0, score:0, timer:0, interval:null,
    hintIdx:0, totalHints:0, skipped:0, solved:0, results:[],
    currentStreak:0, bestStreak:0, challengeTime:0, attempts:0,
    codeModified:false, _challengeInterval:null
};


// =============================================================================
//  SCREEN MANAGEMENT
// =============================================================================

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (id === 'screen-home') { updateHighScoreDisplay(); updateTotalSolved(); }
    if (id === 'screen-modes') renderModeCards();
}


// =============================================================================
//  TIMER
// =============================================================================

function startTimer() {
    state.timer = 0;
    clearInterval(state.interval);
    state.interval = setInterval(() => {
        state.timer++;
        const el = document.getElementById('timer-display');
        el.textContent = fmtTime(state.timer);
        const chip = el.closest('.stat-chip');
        if (chip) {
            chip.classList.toggle('warning', state.timer >= 60 && state.timer < 120);
            chip.classList.toggle('danger', state.timer >= 120);
        }
    }, 1000);
}

function stopTimer() { clearInterval(state.interval); }

function fmtTime(s) {
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
}


// =============================================================================
//  START MODE
// =============================================================================

function startMode(mode) {
    state.mode = mode;
    state.challenges = [...CHALLENGES[mode]];
    state.idx = 0; state.score = 0; state.totalHints = 0;
    state.skipped = 0; state.solved = 0; state.results = [];
    state.currentStreak = 0; state.bestStreak = 0; state.codeModified = false;
    document.getElementById('score-display').textContent = '0';
    showScreen('screen-game');
    loadChallenge();
    startTimer();
}


// =============================================================================
//  LOAD CHALLENGE
// =============================================================================

function loadChallenge() {
    const ch = state.challenges[state.idx];
    if (!ch) return endMode();

    state.hintIdx = 0; state.attempts = 0; state.challengeTime = 0; state.codeModified = false;
    clearInterval(state._challengeInterval);
    state._challengeInterval = setInterval(() => { state.challengeTime++; }, 1000);

    // Header
    const mb = document.getElementById('mode-badge');
    mb.textContent = state.mode.toUpperCase();
    mb.className = 'badge badge-' + state.mode;

    document.getElementById('ch-title').textContent = ch.title;
    const db = document.getElementById('diff-badge');
    db.textContent = ch.diff;
    db.className = 'badge badge-' + ch.diff.toLowerCase();

    document.getElementById('progress-display').textContent = (state.idx + 1) + '/' + state.challenges.length;
    document.getElementById('ch-desc').textContent = ch.desc;
    document.getElementById('file-label').textContent = ch.file;
    document.getElementById('code-editor').value = ch.code;
    updateLineNumbers();

    document.getElementById('hints-left').textContent = ch.hints.length;
    document.getElementById('hint-btn').disabled = false;

    clearConsole();

    const labels = {
        css:'CSS Bug Hunt', js:'JavaScript Logic Debug', console:'Console Error Debug',
        dom:'DOM Manipulation', async:'Async & Promises', html:'HTML Structure',
        react:'React Patterns', typescript:'TypeScript Types', api:'API & Fetch', regex:'Regex Patterns'
    };
    addConsole('[ ' + (labels[state.mode] || state.mode) + ' ]', 'c-info');
    addConsole('Challenge ' + (state.idx + 1) + ': ' + ch.title, 'c-dim');
    addConsole('', '');
    if (ch.error) { ch.error.split('\n').forEach(l => addConsole(l, 'c-err')); addConsole('', ''); }

    updatePreview();
}


// =============================================================================
//  UPDATE PREVIEW — Supports CSS & HTML modes for live preview
// =============================================================================

function updatePreview() {
    const ch = state.challenges[state.idx];
    if (!ch) return;
    const frame = document.getElementById('preview-frame');
    const jsDiv = document.getElementById('js-preview');

    if (state.mode === 'css') {
        frame.style.display = 'block';
        jsDiv.style.display = 'none';
        const css = document.getElementById('code-editor').value;
        frame.srcdoc = `<!DOCTYPE html><html><head><style>
            *{margin:0;padding:0;box-sizing:border-box}
            body{padding:16px;font-family:Inter,sans-serif;background:#0c0c0e;color:#e4e4e7}
            ${css}
        </style></head><body>${ch.html}</body></html>`;
    } else if (state.mode === 'html') {
        frame.style.display = 'block';
        jsDiv.style.display = 'none';
        const htmlCode = document.getElementById('code-editor').value;
        frame.srcdoc = `<!DOCTYPE html><html><head><style>
            *{margin:0;padding:0;box-sizing:border-box}
            body{padding:16px;font-family:Inter,sans-serif;background:#0c0c0e;color:#e4e4e7;font-size:14px}
            table{border-collapse:collapse;width:100%}
            td,th{border:1px solid #333;padding:8px;text-align:left}
            th{background:#1e1b4b;color:#a5b4fc}
            form{display:flex;flex-direction:column;gap:10px;max-width:300px}
            input{padding:8px 12px;background:#111;border:1px solid #333;border-radius:6px;color:#e4e4e7;font-size:14px}
            button{padding:8px 16px;background:#646cff;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px}
            label{color:#a1a1aa;font-size:13px}
            img{max-width:100%;border-radius:8px}
            a{color:#818cf8}
            header,nav,main,footer{padding:12px;margin-bottom:8px;border:1px dashed #333;border-radius:6px}
            header{border-color:#7c3aed}
            nav{border-color:#22d3ee}
            main{border-color:#4ade80}
            footer{border-color:#fbbf24}
        </style></head><body>${htmlCode}</body></html>`;
    } else {
        frame.style.display = 'none';
        jsDiv.style.display = 'block';
        jsDiv.innerHTML = `
            <div style="color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">Expected Behavior</div>
            <div class="expected-box">${escapeHTML(ch.expected || '')}</div>
            <div style="margin-top:16px;color:#71717a;font-size:12px">Fix the code and press Run to verify.</div>
        `;
    }
}


// =============================================================================
//  LINE NUMBERS
// =============================================================================

function updateLineNumbers() {
    const editor = document.getElementById('code-editor');
    const gutter = document.getElementById('line-numbers');
    if (!editor || !gutter) return;
    const count = editor.value.split('\n').length;
    let html = '';
    for (let i = 1; i <= count; i++) html += '<div>' + i + '</div>';
    gutter.innerHTML = html;
}


// =============================================================================
//  CONSOLE
// =============================================================================

function addConsole(msg, cls) {
    const d = document.getElementById('console-out');
    const line = document.createElement('div');
    line.className = 'c-line ' + (cls || '');
    line.textContent = msg;
    d.appendChild(line);
    d.scrollTop = d.scrollHeight;
}

function clearConsole() { document.getElementById('console-out').innerHTML = ''; }


// =============================================================================
//  RUN CODE
// =============================================================================

function runCode() {
    const ch = state.challenges[state.idx];
    if (!ch) return;
    const code = document.getElementById('code-editor').value;

    if (state.mode === 'css' || state.mode === 'html') updatePreview();

    addConsole('', '');
    addConsole('▶ Running checks...', 'c-dim');

    if (ch.check(code)) {
        const timeBonus = getTimeBonus(state.challengeTime);
        const hintPenalty = getHintPenalty(state.hintIdx);
        const earned = Math.max(0, ch.pts + timeBonus - hintPenalty);

        state.score += earned;
        state.solved++;
        state.currentStreak++;
        if (state.currentStreak > state.bestStreak) state.bestStreak = state.currentStreak;

        let streakBonus = 0;
        if (state.currentStreak >= 3) { streakBonus = state.currentStreak * 10; state.score += streakBonus; }

        state.results.push({ title: ch.title, earned: earned + streakBonus, max: ch.pts, status: 'solved' });
        document.getElementById('score-display').textContent = state.score;

        addConsole('✓ All checks passed!', 'c-ok');
        addConsole('  +' + ch.pts + ' base  +' + timeBonus + ' speed  -' + hintPenalty + ' hints = ' + earned + ' pts', 'c-ok');
        if (streakBonus > 0) addConsole('  🔥 ' + state.currentStreak + 'x streak: +' + streakBonus, 'c-streak');

        SFX.play('success');
        const extra = state.currentStreak >= 3 ? '🔥 ' + state.currentStreak + 'x streak!' : timeBonus >= 50 ? '⚡ Speed bonus!' : '';
        showPopup(true, earned + streakBonus, ch.title, extra);
    } else {
        state.attempts++;
        state.currentStreak = 0;
        SFX.play('error');
        addConsole('✗ Bug still present.', 'c-err');
        if (state.attempts === 2) addConsole('  Try using a hint.', 'c-warn');
        else if (state.attempts >= 4) addConsole('  You can skip this one.', 'c-warn');
    }
}


// =============================================================================
//  HINT
// =============================================================================

function useHint() {
    const ch = state.challenges[state.idx];
    if (!ch || state.hintIdx >= ch.hints.length) return;
    SFX.play('hint');
    addConsole('💡 ' + ch.hints[state.hintIdx], 'c-warn');
    state.hintIdx++;
    state.totalHints++;
    const left = ch.hints.length - state.hintIdx;
    document.getElementById('hints-left').textContent = left;
    if (left === 0) document.getElementById('hint-btn').disabled = true;
    addConsole('  (Penalty: -' + getHintPenalty(state.hintIdx) + ' pts)', 'c-dim');
}


// =============================================================================
//  RESET CODE
// =============================================================================

function resetCode() {
    const ch = state.challenges[state.idx];
    if (!ch) return;
    document.getElementById('code-editor').value = ch.code;
    updateLineNumbers();
    if (state.mode === 'css' || state.mode === 'html') updatePreview();
    addConsole('↺ Code reset.', 'c-dim');
}


// =============================================================================
//  SKIP
// =============================================================================

function skipChallenge() {
    const ch = state.challenges[state.idx];
    if (!ch) return;
    state.skipped++;
    state.currentStreak = 0;
    state.results.push({ title: ch.title, earned: 0, max: ch.pts, status: 'skipped' });
    SFX.play('skip');
    addConsole('⏭ Skipped: ' + ch.title, 'c-warn');
    showPopup(false, 0, ch.title, '');
}


// =============================================================================
//  EXIT
// =============================================================================

function confirmExit() {
    if (confirm('Leave? Progress will be lost.')) {
        stopTimer(); clearInterval(state._challengeInterval);
        showScreen('screen-modes');
    }
}


// =============================================================================
//  END MODE
// =============================================================================

function endMode() {
    stopTimer();
    clearInterval(state._challengeInterval);

    const maxPts = state.challenges.reduce((a, c) => a + c.pts, 0);
    const pct = maxPts > 0 ? state.score / maxPts : 0;

    let grade, gradeClass;
    if (pct >= 0.95) { grade = 'S'; gradeClass = 'grade-s'; }
    else if (pct >= 0.9) { grade = 'A+'; gradeClass = 'grade-aplus'; }
    else if (pct >= 0.75) { grade = 'A'; gradeClass = 'grade-a'; }
    else if (pct >= 0.6) { grade = 'B'; gradeClass = 'grade-b'; }
    else if (pct >= 0.45) { grade = 'C'; gradeClass = 'grade-c'; }
    else if (pct >= 0.25) { grade = 'D'; gradeClass = 'grade-d'; }
    else { grade = 'F'; gradeClass = 'grade-f'; }

    const stars = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : pct >= 0.3 ? 1 : 0;

    let titleMsg, subMsg;
    if (pct >= 0.9) { titleMsg = 'Outstanding!'; subMsg = 'Debugging master!'; }
    else if (pct >= 0.75) { titleMsg = 'Great Job!'; subMsg = 'Solid skills.'; }
    else if (pct >= 0.6) { titleMsg = 'Well Done!'; subMsg = 'Keep improving!'; }
    else if (pct >= 0.4) { titleMsg = 'Not Bad'; subMsg = 'Practice more!'; }
    else { titleMsg = 'Keep Going'; subMsg = 'Every expert was a beginner.'; }

    const gradeEl = document.getElementById('r-grade');
    gradeEl.textContent = grade;
    gradeEl.className = 'result-grade ' + gradeClass;

    document.getElementById('r-title').textContent = titleMsg;
    document.getElementById('r-subtitle').textContent = subMsg;
    document.getElementById('r-score').textContent = state.score;
    document.getElementById('r-max').textContent = 'out of ' + maxPts + ' points';

    const sc = document.getElementById('r-stars');
    sc.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const s = document.createElement('span');
        s.className = i < stars ? 'star filled' : 'star empty';
        s.textContent = '★';
        sc.appendChild(s);
    }

    document.getElementById('r-time').textContent = fmtTime(state.timer);
    document.getElementById('r-solved').textContent = state.solved + '/' + state.challenges.length;
    document.getElementById('r-hints').textContent = state.totalHints;
    document.getElementById('r-skipped').textContent = state.skipped;
    document.getElementById('r-accuracy').textContent = Math.round(pct * 100) + '%';
    document.getElementById('r-streak').textContent = state.bestStreak;

    renderBreakdown();
    saveHighScore(state.score);
    saveStats();
    showScreen('screen-results');
}


// =============================================================================
//  BREAKDOWN
// =============================================================================

function renderBreakdown() {
    const c = document.getElementById('r-breakdown');
    if (!c) return;
    c.innerHTML = '';
    state.results.forEach((r, i) => {
        const row = document.createElement('div');
        row.className = 'breakdown-row';
        const icon = r.status === 'solved' ? '✓' : '⏭';
        const cls = r.status === 'solved' ? 'status-solved' : 'status-skipped';
        row.innerHTML = `<span class="breakdown-num">${i + 1}</span><span class="breakdown-title-text">${escapeHTML(r.title)}</span><span class="breakdown-status ${cls}">${icon}</span><span class="breakdown-pts">${r.earned}/${r.max}</span>`;
        c.appendChild(row);
    });
}


// =============================================================================
//  POPUP
// =============================================================================

function showPopup(success, pts, title, extra) {
    const existing = document.querySelector('.overlay');
    if (existing) existing.remove();

    const isLast = state.idx >= state.challenges.length - 1;
    const nextLabel = isLast ? 'View Results' : 'Next Challenge →';

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="popup-box ${success ? 'popup-success' : 'popup-fail'}">
            <div class="popup-icon">${success ? '✓' : '⏭'}</div>
            <div class="popup-title">${success ? 'Bug Fixed!' : 'Skipped'}</div>
            <div class="popup-challenge-name">${escapeHTML(title)}</div>
            <div class="popup-points ${pts === 0 ? 'zero' : ''}">${pts > 0 ? '+' : ''}${pts}<span class="popup-pts-label"> pts</span></div>
            ${extra ? '<div class="popup-extra">' + extra + '</div>' : ''}
            <div class="popup-actions"><button class="btn btn-primary" onclick="closePopup()">${nextLabel}</button></div>
        </div>`;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('visible'));
    overlay._kh = e => { if (e.key === 'Enter') { e.preventDefault(); closePopup(); } };
    document.addEventListener('keydown', overlay._kh);
}

function closePopup() {
    const o = document.querySelector('.overlay');
    if (!o) return;
    if (o._kh) document.removeEventListener('keydown', o._kh);
    o.classList.add('closing');
    setTimeout(() => { o.remove(); state.idx++; state.idx < state.challenges.length ? loadChallenge() : endMode(); }, 200);
}


// =============================================================================
//  PERSISTENCE
// =============================================================================

function saveHighScore(s) { try { const o = parseInt(localStorage.getItem('dl_hs') || '0'); if (s > o) localStorage.setItem('dl_hs', s); } catch (e) {} }
function loadHighScore() { try { return parseInt(localStorage.getItem('dl_hs') || '0'); } catch (e) { return 0; } }
function updateHighScoreDisplay() { const el = document.getElementById('hi-score'); if (el) el.textContent = loadHighScore(); }

function saveStats() {
    try {
        const all = JSON.parse(localStorage.getItem('dl_stats') || '{}');
        if (!all[state.mode]) all[state.mode] = { best: 0, plays: 0, solved: 0 };
        const m = all[state.mode];
        m.plays++; m.solved += state.solved;
        if (state.score > m.best) m.best = state.score;
        if (!all._total) all._total = { solved: 0 };
        all._total.solved += state.solved;
        localStorage.setItem('dl_stats', JSON.stringify(all));
    } catch (e) {}
}

function getModeBest(mode) {
    try { const all = JSON.parse(localStorage.getItem('dl_stats') || '{}'); return all[mode] ? all[mode].best || 0 : 0; }
    catch (e) { return 0; }
}

function updateTotalSolved() {
    try {
        const all = JSON.parse(localStorage.getItem('dl_stats') || '{}');
        const el = document.getElementById('total-solved');
        if (el) el.textContent = all._total ? all._total.solved : 0;
    } catch (e) {}
}


// =============================================================================
//  RENDER MODE CARDS — 10 Modes
// =============================================================================

function renderModeCards() {
    const grid = document.getElementById('mode-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const info = {
        css:        { icon:'🎨', title:'CSS Bug Hunt',       desc:'Fix broken layouts, centering, z-index, overflow, and visual bugs.' },
        js:         { icon:'⚡', title:'JS Logic Bugs',       desc:'Debug state issues, operators, closures, type coercion, and references.' },
        console:    { icon:'🖥️', title:'Console Errors',      desc:'Read stack traces and fix TypeError, ReferenceError, SyntaxError.' },
        dom:        { icon:'🌳', title:'DOM Manipulation',    desc:'Fix selectors, event handlers, XSS, and DOM traversal bugs.' },
        async:      { icon:'⏳', title:'Async & Promises',    desc:'Fix missing awaits, race conditions, and Promise chain bugs.' },
        html:       { icon:'📄', title:'HTML Structure',      desc:'Fix semantic tags, accessibility, forms, and document structure.' },
        react:      { icon:'⚛️', title:'React Patterns',      desc:'Fix state mutations, hooks rules, stale closures, and keys.' },
        typescript: { icon:'🔷', title:'TypeScript Types',    desc:'Fix null checks, type narrowing, readonly, generics, and unions.' },
        api:        { icon:'🌐', title:'API & Fetch',         desc:'Fix HTTP methods, headers, error handling, and request bodies.' },
        regex:      { icon:'🔍', title:'Regex Patterns',      desc:'Fix escaping, greedy matching, anchors, and global flag bugs.' }
    };

    Object.keys(CHALLENGES).forEach(mode => {
        const mi = info[mode] || { icon:'🔧', title:mode, desc:'' };
        const count = CHALLENGES[mode].length;
        const best = getModeBest(mode);

        const card = document.createElement('div');
        card.className = 'mode-card';
        card.onclick = () => startMode(mode);
        card.innerHTML = `
            <div class="mode-icon">${mi.icon}</div>
            <h3>${mi.title}</h3>
            <p>${mi.desc}</p>
            <div class="mode-meta">
                <span class="badge badge-${mode}">${count} Challenges</span>
                <span class="mode-best">${best > 0 ? 'Best: ' + best : 'Not played'}</span>
            </div>`;
        grid.appendChild(card);
    });
}


// =============================================================================
//  SCORING
// =============================================================================

function getTimeBonus(sec) {
    if (sec <= 15) return 75; if (sec <= 30) return 50; if (sec <= 45) return 35;
    if (sec <= 60) return 25; if (sec <= 90) return 15; if (sec <= 120) return 5; return 0;
}

function getHintPenalty(n) { let p = 0; for (let i = 0; i < n; i++) p += 15 + i * 10; return p; }


// =============================================================================
//  SOUND
// =============================================================================

const SFX = {
    _ctx: null,
    _getCtx() { if (!this._ctx) { try { this._ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } } return this._ctx; },
    play(type) {
        const ctx = this._getCtx(); if (!ctx) return;
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination); g.gain.value = 0.06; const t = ctx.currentTime;
        switch (type) {
            case 'success': o.frequency.value=523;o.type='sine';g.gain.exponentialRampToValueAtTime(0.001,t+0.25);o.start(t);o.stop(t+0.25);
                setTimeout(()=>{const o2=ctx.createOscillator(),g2=ctx.createGain();o2.connect(g2);g2.connect(ctx.destination);g2.gain.value=0.06;o2.frequency.value=659;o2.type='sine';g2.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.25);o2.start(ctx.currentTime);o2.stop(ctx.currentTime+0.25);},100);break;
            case 'error': o.frequency.value=200;o.type='sawtooth';g.gain.exponentialRampToValueAtTime(0.001,t+0.15);o.start(t);o.stop(t+0.15);break;
            case 'hint': o.frequency.value=440;o.type='triangle';g.gain.exponentialRampToValueAtTime(0.001,t+0.12);o.start(t);o.stop(t+0.12);break;
            case 'skip': o.frequency.value=330;o.type='sine';g.gain.exponentialRampToValueAtTime(0.001,t+0.2);o.start(t);o.stop(t+0.2);break;
        }
    }
};


// =============================================================================
//  UTILITIES
// =============================================================================

function escapeHTML(str) { const d = document.createElement('div'); d.textContent = str; return d.innerHTML; }
function replayMode() { state.mode ? startMode(state.mode) : showScreen('screen-modes'); }

function shareResults() {
    const maxPts = state.challenges.reduce((a, c) => a + c.pts, 0);
    const pct = maxPts > 0 ? Math.round(state.score / maxPts * 100) : 0;
    const text = ['🔧 Debug Lab Results', 'Mode: ' + state.mode.toUpperCase(), 'Score: ' + state.score + '/' + maxPts + ' (' + pct + '%)', 'Solved: ' + state.solved + '/' + state.challenges.length, 'Time: ' + fmtTime(state.timer), '', 'Can you beat my score?'].join('\n');
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            const b = document.getElementById('share-btn');
            if (b) { const o = b.textContent; b.textContent = 'Copied!'; setTimeout(() => b.textContent = o, 2000); }
        });
    }
}


// =============================================================================
//  KEYBOARD SHORTCUTS
// =============================================================================

document.addEventListener('keydown', function (e) {
    const gameOn = document.getElementById('screen-game').classList.contains('active');
    const popupOpen = !!document.querySelector('.overlay');
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); if (gameOn && !popupOpen) runCode(); return; }
    if (e.key === 'Escape') { if (popupOpen) closePopup(); else if (gameOn) confirmExit(); }
});


// =============================================================================
//  EDITOR ENHANCEMENTS
// =============================================================================

(function () {
    const editor = document.getElementById('code-editor');
    if (!editor) return;
    editor.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const s = this.selectionStart, en = this.selectionEnd;
            this.value = this.value.substring(0, s) + '  ' + this.value.substring(en);
            this.selectionStart = this.selectionEnd = s + 2;
        }
    });
    editor.addEventListener('input', function () {
        state.codeModified = true;
        updateLineNumbers();
        if (state.mode === 'css' || state.mode === 'html') updatePreview();
    });
    editor.addEventListener('scroll', function () {
        const gutter = document.getElementById('line-numbers');
        if (gutter) gutter.scrollTop = this.scrollTop;
    });
})();


// =============================================================================
//  CSS for new mode badges (inject dynamically)
// =============================================================================

(function injectExtraStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .badge-html { background: rgba(251,146,60,.12); color: #fb923c; }
        .badge-react { background: rgba(96,165,250,.12); color: #60a5fa; }
        .badge-typescript { background: rgba(56,189,248,.12); color: #38bdf8; }
        .badge-api { background: rgba(74,222,128,.12); color: #4ade80; }
        .badge-regex { background: rgba(244,114,182,.12); color: #f472b6; }
    `;
    document.head.appendChild(style);
})();


// =============================================================================
//  INIT
// =============================================================================

(function init() {
    updateHighScoreDisplay();
    updateTotalSolved();
    showScreen('screen-home');
})();