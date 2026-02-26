const CHALLENGES = {
css: [
{
    title:"Center the Box", diff:"Easy", pts:100,
    desc:"The red box must be perfectly centered inside the dashed container. It's stuck in the top-left corner. Fix the container's CSS.",
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
    check(c) {
        const s = c.replace(/\s+/g,' ').toLowerCase();
        const parts = s.split('.box');
        const cont = parts[0] || '';
        const hasFlex = cont.includes('display') && cont.includes('flex') &&
                        cont.includes('justify-content') && cont.includes('center') &&
                        cont.includes('align-items');
        const hasGrid = cont.includes('display') && cont.includes('grid') &&
                        cont.includes('place-items') && cont.includes('center');
        return hasFlex || hasGrid;
    },
    hints:[
        "The .container has no layout mode — elements just stack by default.",
        "Add display: flex to the .container to enable flexbox.",
        "Then add justify-content: center and align-items: center to .container."
    ]
},
{
    title:"Navbar Behind Popup", diff:"Medium", pts:150,
    desc:"The purple navigation bar should appear ABOVE the red popup overlay, but it's hidden behind it. Fix the stacking order.",
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
    check(c) {
        const s = c.replace(/\s+/g,' ').toLowerCase();
        const navPart = s.split('.content')[0] || s.split('.popup')[0] || '';
        return navPart.includes('z-index') && navPart.includes('position');
    },
    hints:[
        "The .popup has z-index: 10 but .navbar has no z-index at all.",
        "z-index only works on positioned elements (relative, sticky, fixed, absolute).",
        "Add position: relative and z-index: 100 to .navbar."
    ]
},
{
    title:"Cards Side by Side", diff:"Medium", pts:150,
    desc:"The three cards should display in a horizontal row, not stacked vertically. Fix the .cards container layout.",
    file:"style.css",
    html:'<div class="cards"><div class="card"><h3>Alpha</h3><p>Card one</p></div><div class="card"><h3>Beta</h3><p>Card two</p></div><div class="card"><h3>Gamma</h3><p>Card three</p></div></div>',
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

.card h3 {
  color: #a78bfa;
  margin-bottom: 6px;
}

.card p {
  color: #888;
  font-size: 13px;
}`,
    check(c) {
        const s = c.replace(/\s+/g,' ').toLowerCase();
        const cont = s.split('.card')[0] || s;
        return cont.includes('display') && (cont.includes('grid') || cont.includes('flex'));
    },
    hints:[
        "The .cards container needs a layout display mode to arrange children horizontally.",
        "Try adding display: grid or display: flex to .cards.",
        "Use display: grid; grid-template-columns: repeat(3, 1fr); on .cards."
    ]
},
{
    title:"Text Overflows Box", diff:"Easy", pts:100,
    desc:"The long text is spilling outside the bordered container. Make it contained and scrollable.",
    file:"style.css",
    html:'<div class="textbox"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p></div>',
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
    check(c) {
        const s = c.replace(/\s+/g,' ').toLowerCase();
        return s.includes('overflow') && (s.includes('auto') || s.includes('scroll') || s.includes('hidden'));
    },
    hints:[
        "The text goes beyond the .textbox boundaries because there's no overflow handling.",
        "CSS has an 'overflow' property to control content that exceeds its container.",
        "Add overflow: auto to .textbox to make it scrollable."
    ]
},
{
    title:"Button Not Clickable", diff:"Hard", pts:200,
    desc:"The green button exists but can't be clicked — an invisible overlay is blocking it. Fix the stacking so the button is interactive.",
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
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  position: relative;
  z-index: 1;
}`,
    check(c) {
        const s = c.replace(/\s+/g,' ').toLowerCase();
        const hasPointer = s.includes('pointer-events') && s.includes('none');
        const hasHighZ = /\.action-btn[^}]*z-index\s*:\s*(\d+)/.exec(s);
        const overlayZ = /\.overlay[^}]*z-index\s*:\s*(\d+)/.exec(s);
        if (hasPointer) return true;
        if (hasHighZ && overlayZ && parseInt(hasHighZ[1]) > parseInt(overlayZ[1])) return true;
        if (hasHighZ && parseInt(hasHighZ[1]) > 5) return true;
        return false;
    },
    hints:[
        "The .overlay-layer sits on top of the button because z-index:5 > z-index:1.",
        "You can either raise the button's z-index above 5, or disable the overlay.",
        "Add pointer-events: none to .overlay-layer, or set button z-index: 10."
    ]
},
{
    title:"Flex Items Spacing", diff:"Medium", pts:150,
    desc:"The nav links should be evenly spaced across the full width of the bar, not bunched up on the left.",
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
  border-radius: 4px;
}

.topnav a:hover {
  background: #312e81;
}`,
    check(c) {
        const s = c.replace(/\s+/g,' ').toLowerCase();
        return s.includes('justify-content') &&
            (s.includes('space-between') || s.includes('space-around') || s.includes('space-evenly'));
    },
    hints:[
        "The .topnav is flex but items are default-aligned to flex-start (left).",
        "The justify-content property controls spacing along the main axis.",
        "Add justify-content: space-between (or space-evenly) to .topnav."
    ]
}
],


js: [
{
    title:"Counter Shows NaN", diff:"Easy", pts:100,
    desc:"The counter should start at 0 and increment by 1, but it shows NaN instead. Find the initialization bug.",
    file:"app.js",
    expected:"Counter starts at 0, increments to 1, 2, 3... and decrements correctly.",
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

// Bug: clicking increment shows NaN!`,
    check(c) {
        return /(?:let|var|const)\s+count\s*=\s*0/.test(c);
    },
    hints:[
        "What is undefined + 1 in JavaScript?",
        "The variable 'count' is declared but never given a starting value.",
        "Change 'let count;' to 'let count = 0;'"
    ]
},
{
    title:"Filter Uses = Instead of >=", diff:"Medium", pts:150,
    desc:"The filter should return only adults (age >= 18), but it returns everyone and sets all ages to 18! Find the operator bug.",
    file:"app.js",
    expected:"Returns only Ali (25) and Ahmed (30) — users with age >= 18.",
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

// Expected: Ali, Ahmed
// Actual: returns ALL users,
// everyone's age becomes 18!
console.log(getAdults(users));`,
    check(c) {
        const s = c.replace(/\s+/g,' ');
        return /user\.age\s*(>=|>|===|==)\s*18/.test(s);
    },
    hints:[
        "Look very carefully at the filter condition on the right side.",
        "= is assignment, == is comparison, >= is greater-or-equal.",
        "Change user.age = 18 to user.age >= 18."
    ]
},
{
    title:"addEventListener Calls Immediately", diff:"Medium", pts:150,
    desc:"The alert fires immediately on page load instead of waiting for a button click. Fix the event binding.",
    file:"app.js",
    expected:"Alert appears ONLY when the button is clicked, not on page load.",
    code:`function setup() {
  const btn = document
    .getElementById('myBtn');

  btn.addEventListener(
    'click',
    showMessage()
  );
}

function showMessage() {
  alert('Button clicked!');
}

// Bug: alert fires immediately
// when page loads!
setup();`,
    check(c) {
        return /addEventListener\s*\(\s*['"]click['"]\s*,\s*showMessage\s*\)/.test(c.replace(/\s+/g,' '));
    },
    hints:[
        "What happens when you write functionName() with parentheses?",
        "showMessage() CALLS the function; showMessage is a reference to it.",
        "Remove the () — pass showMessage, not showMessage()."
    ]
},
{
    title:"Closure Bug in Loop", diff:"Hard", pts:200,
    desc:"The loop should log 0, 1, 2, 3, 4 after delays, but it logs 5 five times. Fix the closure issue.",
    file:"app.js",
    expected:"Logs 0, 1, 2, 3, 4 — each number after a short delay.",
    code:`for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100 * i);
}

// Expected: 0, 1, 2, 3, 4
// Actual: 5, 5, 5, 5, 5
// All callbacks see the same 'i'!`,
    check(c) {
        const s = c.replace(/\s+/g,' ');
        const hasLet = /for\s*\(\s*let\s+i/.test(s);
        const hasIIFE = /\(function/.test(s);
        const hasClosure = /forEach|\.map/.test(s);
        return hasLet || hasIIFE || hasClosure;
    },
    hints:[
        "'var' is function-scoped — all callbacks share the same 'i' variable.",
        "'let' is block-scoped — each iteration gets its own 'i'.",
        "Change 'var i' to 'let i' in the for loop."
    ]
},
{
    title:"Sort Mutates Original", diff:"Medium", pts:150,
    desc:"The sorted list should be separate from the original, but both arrays get sorted! Fix the mutation bug.",
    file:"app.js",
    expected:"Original stays [3,1,4,1,5,9] while sorted is [1,1,3,4,5,9].",
    code:`const original = [3, 1, 4, 1, 5, 9];
const sorted = original.sort(
  (a, b) => a - b
);

console.log("Original:", original);
// Expected: [3, 1, 4, 1, 5, 9]
// Actual: [1, 1, 3, 4, 5, 9] (mutated!)

console.log("Sorted:", sorted);
// [1, 1, 3, 4, 5, 9]`,
    check(c) {
        const s = c.replace(/\s+/g,' ');
        return /\[\.\.\.original\]/.test(s) || /original\.slice\(/.test(s) ||
               /Array\.from\(original\)/.test(s) || /original\.toSorted/.test(s) ||
               /structuredClone/.test(s);
    },
    hints:[
        "Array.sort() modifies the original array in place — it doesn't create a copy.",
        "You need to copy the array before sorting it.",
        "Use [...original].sort() or original.slice().sort() to sort a copy."
    ]
},
{
    title:"Type Coercion Trap", diff:"Easy", pts:100,
    desc:"The function should check if a value is exactly the number 0, but it also catches empty strings and null. Fix the comparison.",
    file:"app.js",
    expected:"isZero(0) returns true. isZero('') and isZero(null) return false.",
    code:`function isZero(val) {
  if (val == 0) {
    return true;
  }
  return false;
}

// Bug: all these return true!
console.log(isZero(0));    // true ✓
console.log(isZero(''));   // true ✗ (should be false)
console.log(isZero(null)); // true ✗ (should be false)
console.log(isZero(false));// true ✗ (should be false)`,
    check(c) {
        const s = c.replace(/\s+/g,' ');
        return /val\s*===\s*0/.test(s);
    },
    hints:[
        "== performs type coercion: '' == 0 is true, null == 0 is... tricky.",
        "=== checks both value AND type, no coercion.",
        "Change val == 0 to val === 0."
    ]
}
],

console: [
{
    title:"TypeError: undefined.name", diff:"Easy", pts:100,
    desc:"The function crashes because it receives no argument. Read the console error and fix the code.",
    file:"app.js",
    expected:'Outputs "Hello, Guest!" when called with no argument.',
    error:'TypeError: Cannot read properties of undefined (reading \'name\')\n  at greetUser (app.js:2)\n  at app.js:6',
    code:`function greetUser(user) {
  const msg = "Hello, " + user.name + "!";
  return msg;
}

const greeting = greetUser();
console.log(greeting);`,
    check(c) {
        const s = c.replace(/\s+/g,' ');
        return /user\s*=\s*\{/.test(s) || /user\?\.\s*name/.test(s) ||
               /if\s*\(!?\s*user/.test(s) || /user\s*&&/.test(s) ||
               /user\s*\|\|/.test(s) || /greetUser\s*\(\s*\{/.test(s);
    },
    hints:[
        "greetUser() is called with NO argument — 'user' is undefined.",
        "You can add a default parameter: function greetUser(user = { name: 'Guest' })",
        "Or use optional chaining: user?.name || 'Guest'"
    ]
},
{
    title:"DOM Element is Null", diff:"Medium", pts:150,
    desc:"The script runs before the HTML body loads, so getElementById returns null. Fix the timing.",
    file:"app.js",
    expected:"Event listener attaches successfully after the DOM is fully loaded.",
    error:'TypeError: Cannot read properties of null (reading \'addEventListener\')\n  at init (app.js:5)\n  at app.js:13\n\nHint: #submitBtn is null — the DOM hasn\'t loaded yet.',
    code:`// Runs in <head> before body exists!

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
    check(c) {
        const s = c.replace(/\s+/g,' ').toLowerCase();
        return s.includes('domcontentloaded') || s.includes('window.onload') ||
               (s.includes('addeventlistener') && s.includes('load'));
    },
    hints:[
        "The script runs BEFORE the HTML body exists in the document.",
        "You need to wait until the DOM is fully parsed before accessing elements.",
        "Wrap the call: document.addEventListener('DOMContentLoaded', init)"
    ]
},
{
    title:"Async Data is a Promise", diff:"Hard", pts:200,
    desc:"data.map() crashes because 'data' is a Promise, not an array. Also, response needs .json(). Read the console error.",
    file:"app.js",
    expected:"Fetches users and logs array of names: ['Ali','Sara','Ahmed']",
    error:'TypeError: data.map is not a function\n  at displayNames (app.js:10)\n\ndata is a Promise object, not an array!\nAlso: response needs .json() to parse the body.',
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
    check(c) {
        const s = c.replace(/\s+/g,' ');
        return /await\s+fetchUsers/.test(s) && /\.json\s*\(/.test(s);
    },
    hints:[
        "fetchUsers() is async — it returns a Promise, not the actual data.",
        "Also, fetch() returns a Response object — you need .json() to parse it.",
        "Add 'await' before fetchUsers() AND change 'response' to 'await response.json()'"
    ]
},
{
    title:"ReferenceError: Not Defined", diff:"Easy", pts:100,
    desc:"The code uses a variable that was never declared. Read the error and declare it properly.",
    file:"app.js",
    expected:"Calculates total price correctly: 108 (100 + 8% tax).",
    error:'ReferenceError: taxRate is not defined\n  at calculateTotal (app.js:3)\n  at app.js:7',
    code:`function calculateTotal(price) {
  const tax = price * taxRate;
  const total = price + tax;
  return total;
}

const result = calculateTotal(100);
console.log("Total:", result);
// Expected: 108 (with 8% tax)`,
    check(c) {
        const s = c.replace(/\s+/g,' ');
        return /(const|let|var)\s+taxRate\s*=/.test(s) || /taxRate\s*=\s*0\.08/.test(s) ||
               /function\s+calculateTotal\s*\(\s*price\s*,\s*taxRate/.test(s);
    },
    hints:[
        "The variable 'taxRate' is used but never declared or defined.",
        "You need to define it: const taxRate = 0.08 (for 8% tax).",
        "Add 'const taxRate = 0.08;' before it's used, or pass it as a parameter."
    ]
},
{
    title:"JSON Parse Error", diff:"Medium", pts:150,
    desc:"JSON.parse() fails because the string has syntax errors. Fix the JSON format.",
    file:"app.js",
    expected:"Parses successfully and logs the user object with name 'Ali' and age 25.",
    error:"SyntaxError: Unexpected token ' in JSON at position 1\n\nJSON requires double quotes for keys and strings.\nTrailing commas are not allowed.",
    code:`const jsonStr = "{'name': 'Ali', 'age': 25, }";

const user = JSON.parse(jsonStr);
console.log(user.name, user.age);

// This crashes with SyntaxError!
// What's wrong with the JSON string?`,
    check(c) {
        const s = c.replace(/\s+/g,' ');
        const hasDouble = s.includes('"name"') || s.includes('\\"name\\"');
        const noTrailing = !(/,\s*\}/.test(s)) || s.includes('JSON.parse') === false;
        return hasDouble;
    },
    hints:[
        "JSON requires double quotes (\"), not single quotes (').",
        "Also, trailing commas (comma before closing brace) are invalid in JSON.",
        'Fix: \'{"name": "Ali", "age": 25}\' — double quotes, no trailing comma.'
    ]
}
],


dom: [
{
    title:"getElementById with #", diff:"Easy", pts:100,
    desc:"The element is not found because getElementById doesn't need the # prefix. Fix the selector.",
    file:"app.js",
    expected:"Successfully finds the element and changes its text to 'Updated!'.",
    code:`function updateTitle() {
  const el = document
    .getElementById('#main-title');
  el.textContent = 'Updated!';
}

// Bug: getElementById doesn't
// use # like querySelector does!
// Returns null → crash!
updateTitle();`,
    check(c) {
        const s = c.replace(/\s+/g,' ');
        return /getElementById\s*\(\s*['"]main-title['"]\s*\)/.test(s) ||
               /querySelector\s*\(\s*['"]#main-title['"]\s*\)/.test(s);
    },
    hints:[
        "getElementById takes just the ID name, no # symbol.",
        "The # prefix is only used with querySelector/querySelectorAll.",
        "Change getElementById('#main-title') to getElementById('main-title')."
    ]
},
{
    title:"innerHTML XSS Risk", diff:"Medium", pts:150,
    desc:"User input is inserted via innerHTML, which allows script injection. Use a safer method.",
    file:"app.js",
    expected:"Displays user input as plain text, not executable HTML. No XSS possible.",
    code:`function displayComment(text) {
  const div = document
    .getElementById('comments');
  div.innerHTML += '<p>' + text + '</p>';
}

// This allows XSS attack!
displayComment(
  '<img src=x onerror="alert(1)">'
);
// The malicious script will execute!`,
    check(c) {
        const s = c.replace(/\s+/g,' ').toLowerCase();
        return s.includes('textcontent') || s.includes('createtextnode') || s.includes('innertext');
    },
    hints:[
        "innerHTML interprets HTML tags — including malicious script tags.",
        "textContent or createTextNode treats everything as plain text.",
        "Use element.textContent = text, or create elements properly with createElement."
    ]
},
{
    title:"forEach Has No Return", diff:"Medium", pts:150,
    desc:"The function uses forEach to transform data but returns undefined because forEach doesn't return anything. Fix it.",
    file:"app.js",
    expected:"Returns ['ALI', 'SARA', 'AHMED'] — uppercase names array.",
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
// Expected: ['ALI', 'SARA', 'AHMED']
// Actual: undefined`,
    check(c) {
        const s = c.replace(/\s+/g,' ');
        return /\.map\s*\(/.test(s);
    },
    hints:[
        "forEach() always returns undefined — it just iterates, doesn't collect results.",
        "You need a method that returns a new array with transformed values.",
        "Change .forEach() to .map() — it returns a new array."
    ]
},
{
    title:"removeEventListener Fails", diff:"Hard", pts:200,
    desc:"The event listener can't be removed because an anonymous function was used. Fix it with a named reference.",
    file:"app.js",
    expected:"Click handler is added then successfully removed — no memory leak.",
    code:`const btn = document
  .getElementById('btn');

btn.addEventListener('click',
  function() {
    console.log('Clicked!');
  }
);

// Later, try to remove it:
btn.removeEventListener('click',
  function() {
    console.log('Clicked!');
  }
);

// Bug: listener NOT removed!
// Two different function objects.`,
    check(c) {
        const s = c.replace(/\s+/g,' ');
        const hasNamed = /function\s+\w+\s*\(/.test(s) || /(const|let|var)\s+\w+\s*=\s*(function|\()/.test(s);
        const sameRef = /addEventListener\s*\(\s*['"]click['"]\s*,\s*(\w+)\s*\)/.exec(s);
        const removeRef = /removeEventListener\s*\(\s*['"]click['"]\s*,\s*(\w+)\s*\)/.exec(s);
        if (sameRef && removeRef && sameRef[1] === removeRef[1]) return true;
        return hasNamed && removeRef !== null;
    },
    hints:[
        "Two identical anonymous functions are NOT the same object in JavaScript.",
        "addEventListener and removeEventListener must receive the SAME function reference.",
        "Define the function separately: const handler = () => { ... }; then use handler for both."
    ]
},
{
    title:"className vs class", diff:"Easy", pts:100,
    desc:"The code tries to set the CSS class using .class but that's a reserved word. Fix the property name.",
    file:"app.js",
    expected:"Element gets the 'active' CSS class applied successfully.",
    code:`function activate(id) {
  const el = document.getElementById(id);
  el.class = 'active';
}

// Bug: .class is not the right
// property name in JavaScript!
// The element stays unchanged.
activate('menu-item');`,
    check(c) {
        const s = c.replace(/\s+/g,' ').toLowerCase();
        return s.includes('classname') || s.includes('classlist');
    },
    hints:[
        "'class' is a reserved keyword in JavaScript — it can't be used as a property.",
        "The DOM uses 'className' for the full class string.",
        "Use el.className = 'active' or el.classList.add('active')."
    ]
}
],


async: [
{
    title:"Missing Await Keyword", diff:"Easy", pts:100,
    desc:"The async function result is a Promise object instead of actual data because await is missing.",
    file:"app.js",
    expected:"Logs the actual user data object, not '[object Promise]'.",
    code:`async function getUser(id) {
  const res = await fetch('/api/user/' + id);
  return res.json();
}

async function showUser() {
  const user = getUser(1);
  console.log("User:", user);
  // Logs: User: [object Promise]
  // Not the actual data!
}

showUser();`,
    check(c) {
        const s = c.replace(/\s+/g,' ');
        return /await\s+getUser/.test(s);
    },
    hints:[
        "getUser() is an async function — it always returns a Promise.",
        "To get the resolved value, you must await the Promise.",
        "Change 'const user = getUser(1)' to 'const user = await getUser(1)'."
    ]
},
{
    title:"Promise.all Needs Array", diff:"Medium", pts:150,
    desc:"Promise.all is called with separate arguments instead of an array. Fix the syntax.",
    file:"app.js",
    expected:"All three API calls run in parallel and results are collected in an array.",
    code:`async function loadAll() {
  const results = await Promise.all(
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/comments')
  );

  console.log(results);
  // Bug: only first fetch runs!
  // Promise.all needs an ARRAY.
}

loadAll();`,
    check(c) {
        const s = c.replace(/\s+/g,' ');
        return /Promise\.all\s*\(\s*\[/.test(s);
    },
    hints:[
        "Promise.all() expects a single argument: an array of promises.",
        "You passed 3 separate arguments instead of wrapping them in [].",
        "Wrap in array: Promise.all([fetch(...), fetch(...), fetch(...)])"
    ]
},
{
    title:"setTimeout in Loop", diff:"Medium", pts:150,
    desc:"Same closure bug as the JS mode, but in an async context. All timeouts log the final value of 'i'.",
    file:"app.js",
    expected:"Logs messages: 'Task 0 done', 'Task 1 done', 'Task 2 done' in sequence.",
    code:`function runTasks() {
  for (var i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log('Task ' + i + ' done');
    }, 1000 * (i + 1));
  }
}

// Expected:
//   Task 0 done
//   Task 1 done
//   Task 2 done
// Actual:
//   Task 3 done (x3)
runTasks();`,
    check(c) {
        const s = c.replace(/\s+/g,' ');
        return /for\s*\(\s*let\s/.test(s) || /\(function\s*\(/.test(s) ||
               /forEach|\.map/.test(s);
    },
    hints:[
        "'var' is function-scoped — all closures see the same variable.",
        "'let' creates a new variable binding for each loop iteration.",
        "Change 'var i' to 'let i'."
    ]
},
{
    title:"Fetch Without Error Handling", diff:"Medium", pts:150,
    desc:"The fetch call has no error handling — network failures crash the app silently. Add proper error handling.",
    file:"app.js",
    expected:"Network errors are caught and logged gracefully instead of crashing.",
    code:`async function loadData() {
  const res = await fetch('/api/data');
  const data = await res.json();
  displayData(data);
}

function displayData(data) {
  console.log('Data:', data);
}

// Bug: if network fails or
// server returns 500, the app
// crashes with unhandled error!
loadData();`,
    check(c) {
        const s = c.replace(/\s+/g,' ').toLowerCase();
        return (s.includes('try') && s.includes('catch')) ||
               s.includes('.catch(') || s.includes('.catch (');
    },
    hints:[
        "If the network request fails, the await will throw an error.",
        "Use try/catch around async/await code, or .catch() on the promise.",
        "Wrap in try { ... } catch(err) { console.error(err); }"
    ]
},
{
    title:"async forEach Doesn't Wait", diff:"Hard", pts:200,
    desc:"Using forEach with async callbacks doesn't actually wait for them. The 'Done!' log appears before any processing finishes.",
    file:"app.js",
    expected:"All items are processed sequentially, THEN 'Done!' is logged.",
    code:`async function processItems(items) {
  items.forEach(async (item) => {
    await saveToServer(item);
    console.log('Saved:', item);
  });

  console.log('Done!');
  // Bug: 'Done!' logs FIRST!
  // forEach ignores async returns.
}

async function saveToServer(item) {
  // Simulated API call
  return new Promise(resolve =>
    setTimeout(resolve, 100)
  );
}

processItems(['a', 'b', 'c']);`,
    check(c) {
        const s = c.replace(/\s+/g,' ');
        return /for\s*\(/.test(s) && /await\s+save/.test(s) && !/forEach/.test(s) ||
               /Promise\.all/.test(s) && /\.map/.test(s);
    },
    hints:[
        "forEach() ignores the return value of callbacks — even Promises.",
        "Use a for...of loop with await for sequential execution.",
        "Replace forEach with: for (const item of items) { await saveToServer(item); }"
    ]
}
]
};


const state = {
    mode: null,
    challenges: [],
    idx: 0,
    score: 0,
    timer: 0,
    interval: null,
    hintIdx: 0,
    totalHints: 0,
    skipped: 0,
    solved: 0,
    results: [],
    currentStreak: 0,
    bestStreak: 0,
    challengeTime: 0,
    attempts: 0,
    codeModified: false,
    _challengeInterval: null
};




function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (id === 'screen-home') {
        updateHighScoreDisplay();
        updateTotalSolved();
    }
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
        // Visual warning
        const chip = el.closest('.stat-chip');
        if (chip) {
            chip.classList.toggle('warning', state.timer >= 60 && state.timer < 120);
            chip.classList.toggle('danger', state.timer >= 120);
        }
    }, 1000);
}

function stopTimer() { clearInterval(state.interval); }

function fmtTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
}


// =============================================================================
//  START MODE
// =============================================================================

function startMode(mode) {
    state.mode = mode;
    state.challenges = [...CHALLENGES[mode]];
    state.idx = 0;
    state.score = 0;
    state.totalHints = 0;
    state.skipped = 0;
    state.solved = 0;
    state.results = [];
    state.currentStreak = 0;
    state.bestStreak = 0;
    state.codeModified = false;
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

    // Reset per-challenge state
    state.hintIdx = 0;
    state.attempts = 0;
    state.challengeTime = 0;
    state.codeModified = false;
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

    document.getElementById('progress-display').textContent =
        (state.idx + 1) + '/' + state.challenges.length;
    document.getElementById('ch-desc').textContent = ch.desc;
    document.getElementById('file-label').textContent = ch.file;

    // Editor
    document.getElementById('code-editor').value = ch.code;
    updateLineNumbers();

    // Hints
    document.getElementById('hints-left').textContent = ch.hints.length;
    document.getElementById('hint-btn').disabled = false;

    // Console
    clearConsole();

    const modeLabels = {
        css: 'CSS Bug Hunt',
        js: 'JavaScript Logic Debug',
        console: 'Console Error Mode',
        dom: 'DOM Manipulation Debug',
        async: 'Async & Promises Debug'
    };
    addConsole('[ ' + (modeLabels[state.mode] || state.mode) + ' ]', 'c-info');
    addConsole('Challenge ' + (state.idx + 1) + ': ' + ch.title, 'c-dim');
    addConsole('', '');

    if (ch.error) {
        ch.error.split('\n').forEach(l => addConsole(l, 'c-err'));
        addConsole('', '');
    }

    // Preview
    updatePreview();
}


// =============================================================================
//  UPDATE PREVIEW
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
    } else {
        frame.style.display = 'none';
        jsDiv.style.display = 'block';
        jsDiv.innerHTML = `
            <div style="color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">Expected Behavior</div>
            <div class="expected-box">${escapeHTML(ch.expected || ch.expectedBehavior || '')}</div>
            <div style="margin-top:16px;color:#71717a;font-size:12px">Edit the code and press Run to verify your fix.</div>
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
//  CONSOLE HELPERS
// =============================================================================

function addConsole(msg, cls) {
    const d = document.getElementById('console-out');
    const line = document.createElement('div');
    line.className = 'c-line ' + (cls || '');
    line.textContent = msg;
    d.appendChild(line);
    d.scrollTop = d.scrollHeight;
}

function clearConsole() {
    document.getElementById('console-out').innerHTML = '';
}


// =============================================================================
//  RUN CODE
// =============================================================================

function runCode() {
    const ch = state.challenges[state.idx];
    if (!ch) return;
    const code = document.getElementById('code-editor').value;

    if (state.mode === 'css') updatePreview();

    addConsole('', '');
    addConsole('▶ Running checks...', 'c-dim');

    if (ch.check(code)) {
        // SUCCESS
        const timeBonus = getTimeBonus(state.challengeTime);
        const hintPenalty = getHintPenalty(state.hintIdx);
        const earned = Math.max(0, ch.pts + timeBonus - hintPenalty);

        state.score += earned;
        state.solved++;
        state.currentStreak++;
        if (state.currentStreak > state.bestStreak) state.bestStreak = state.currentStreak;

        // Streak bonus
        let streakBonus = 0;
        if (state.currentStreak >= 3) {
            streakBonus = state.currentStreak * 10;
            state.score += streakBonus;
        }

        state.results.push({
            title: ch.title, earned: earned + streakBonus,
            max: ch.pts, status: 'solved'
        });

        document.getElementById('score-display').textContent = state.score;

        addConsole('✓ All checks passed — bug fixed!', 'c-ok');
        addConsole('  +' + ch.pts + ' base  +' + timeBonus + ' speed  -' + hintPenalty + ' hints = ' + earned + ' pts', 'c-ok');
        if (streakBonus > 0) addConsole('  🔥 ' + state.currentStreak + 'x streak bonus: +' + streakBonus, 'c-streak');

        SFX.play('success');

        const extra = state.currentStreak >= 3 ? '🔥 ' + state.currentStreak + 'x streak!' :
                       timeBonus >= 50 ? '⚡ Speed bonus!' : '';
        showPopup(true, earned + streakBonus, ch.title, extra);

    } else {
        state.attempts++;
        state.currentStreak = 0;

        SFX.play('error');
        addConsole('✗ Tests failed — bug still present.', 'c-err');

        if (state.attempts === 2) addConsole('  Try using a hint if stuck.', 'c-warn');
        else if (state.attempts >= 4) addConsole('  You can skip this challenge.', 'c-warn');
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

    addConsole('  (Hint penalty: -' + getHintPenalty(state.hintIdx) + ' pts)', 'c-dim');
}


// =============================================================================
//  RESET CODE
// =============================================================================

function resetCode() {
    const ch = state.challenges[state.idx];
    if (!ch) return;
    document.getElementById('code-editor').value = ch.code;
    updateLineNumbers();
    if (state.mode === 'css') updatePreview();
    addConsole('↺ Code reset to original.', 'c-dim');
}


// =============================================================================
//  SKIP CHALLENGE
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
//  CONFIRM EXIT
// =============================================================================

function confirmExit() {
    if (confirm('Leave this session? Progress will be lost.')) {
        stopTimer();
        clearInterval(state._challengeInterval);
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

    // Grade
    let grade, gradeClass;
    if (pct >= 0.95) { grade = 'S'; gradeClass = 'grade-s'; }
    else if (pct >= 0.9) { grade = 'A+'; gradeClass = 'grade-aplus'; }
    else if (pct >= 0.75) { grade = 'A'; gradeClass = 'grade-a'; }
    else if (pct >= 0.6) { grade = 'B'; gradeClass = 'grade-b'; }
    else if (pct >= 0.45) { grade = 'C'; gradeClass = 'grade-c'; }
    else if (pct >= 0.25) { grade = 'D'; gradeClass = 'grade-d'; }
    else { grade = 'F'; gradeClass = 'grade-f'; }

    // Stars
    const stars = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : pct >= 0.3 ? 1 : 0;

    // Title
    let titleMsg, subMsg;
    if (pct >= 0.9) { titleMsg = 'Outstanding!'; subMsg = 'You are a debugging master.'; }
    else if (pct >= 0.75) { titleMsg = 'Great Job!'; subMsg = 'Solid debugging skills.'; }
    else if (pct >= 0.6) { titleMsg = 'Well Done!'; subMsg = 'Getting better. Keep at it!'; }
    else if (pct >= 0.4) { titleMsg = 'Not Bad'; subMsg = 'Practice makes perfect.'; }
    else { titleMsg = 'Keep Going'; subMsg = 'Every expert was once a beginner.'; }

    // Populate
    const gradeEl = document.getElementById('r-grade');
    gradeEl.textContent = grade;
    gradeEl.className = 'result-grade ' + gradeClass;

    document.getElementById('r-title').textContent = titleMsg;
    document.getElementById('r-subtitle').textContent = subMsg;
    document.getElementById('r-score').textContent = state.score;
    document.getElementById('r-max').textContent = 'out of ' + maxPts + ' points';

    // Stars
    const sc = document.getElementById('r-stars');
    sc.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const s = document.createElement('span');
        s.className = i < stars ? 'star filled' : 'star empty';
        s.textContent = '★';
        sc.appendChild(s);
    }

    // Stats
    document.getElementById('r-time').textContent = fmtTime(state.timer);
    document.getElementById('r-solved').textContent = state.solved + '/' + state.challenges.length;
    document.getElementById('r-hints').textContent = state.totalHints;
    document.getElementById('r-skipped').textContent = state.skipped;
    document.getElementById('r-accuracy').textContent = Math.round(pct * 100) + '%';
    document.getElementById('r-streak').textContent = state.bestStreak;

    // Breakdown
    renderBreakdown();

    // Save
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
        row.innerHTML = `
            <span class="breakdown-num">${i + 1}</span>
            <span class="breakdown-title-text">${escapeHTML(r.title)}</span>
            <span class="breakdown-status ${cls}">${icon}</span>
            <span class="breakdown-pts">${r.earned}/${r.max}</span>
        `;
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
            <div class="popup-actions">
                <button class="btn btn-primary" onclick="closePopup()">${nextLabel}</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('visible'));

    overlay._keyHandler = e => { if (e.key === 'Enter') { e.preventDefault(); closePopup(); } };
    document.addEventListener('keydown', overlay._keyHandler);
}

function closePopup() {
    const o = document.querySelector('.overlay');
    if (!o) return;
    if (o._keyHandler) document.removeEventListener('keydown', o._keyHandler);
    o.classList.add('closing');
    setTimeout(() => {
        o.remove();
        state.idx++;
        if (state.idx < state.challenges.length) loadChallenge();
        else endMode();
    }, 200);
}


// =============================================================================
//  PERSISTENCE
// =============================================================================

function saveHighScore(s) {
    try {
        const old = parseInt(localStorage.getItem('dl_hs') || '0');
        if (s > old) localStorage.setItem('dl_hs', s);
    } catch (e) {}
}

function loadHighScore() {
    try { return parseInt(localStorage.getItem('dl_hs') || '0'); }
    catch (e) { return 0; }
}

function updateHighScoreDisplay() {
    const el = document.getElementById('hi-score');
    if (el) el.textContent = loadHighScore();
}

function saveStats() {
    try {
        const all = JSON.parse(localStorage.getItem('dl_stats') || '{}');
        if (!all[state.mode]) all[state.mode] = { best: 0, plays: 0, solved: 0 };
        const m = all[state.mode];
        m.plays++;
        m.solved += state.solved;
        if (state.score > m.best) m.best = state.score;

        // Total solved
        if (!all._total) all._total = { solved: 0 };
        all._total.solved += state.solved;

        localStorage.setItem('dl_stats', JSON.stringify(all));
    } catch (e) {}
}

function getModeBest(mode) {
    try {
        const all = JSON.parse(localStorage.getItem('dl_stats') || '{}');
        return all[mode] ? all[mode].best || 0 : 0;
    } catch (e) { return 0; }
}

function updateTotalSolved() {
    try {
        const all = JSON.parse(localStorage.getItem('dl_stats') || '{}');
        const el = document.getElementById('total-solved');
        if (el) el.textContent = all._total ? all._total.solved : 0;
    } catch (e) {}
}


// =============================================================================
//  MODE CARDS — DYNAMIC
// =============================================================================

function renderModeCards() {
    const grid = document.getElementById('mode-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const info = {
        css:     { icon: '🎨', title: 'CSS Bug Hunt', desc: 'Fix broken layouts, centering, z-index, and visual bugs.' },
        js:      { icon: '⚡', title: 'JS Logic Bugs', desc: 'Debug state issues, operator errors, closures, and type coercion.' },
        console: { icon: '🖥️', title: 'Console Errors', desc: 'Read stack traces and fix TypeError, ReferenceError, and more.' },
        dom:     { icon: '🌳', title: 'DOM Manipulation', desc: 'Fix selectors, event handlers, and DOM traversal bugs.' },
        async:   { icon: '⏳', title: 'Async & Promises', desc: 'Fix missing await, Promise.all, and async iteration bugs.' }
    };

    Object.keys(CHALLENGES).forEach(mode => {
        const mi = info[mode] || { icon: '🔧', title: mode, desc: '' };
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
            </div>
        `;
        grid.appendChild(card);
    });
}


// =============================================================================
//  SCORING HELPERS
// =============================================================================

function getTimeBonus(sec) {
    if (sec <= 15) return 75;
    if (sec <= 30) return 50;
    if (sec <= 45) return 35;
    if (sec <= 60) return 25;
    if (sec <= 90) return 15;
    if (sec <= 120) return 5;
    return 0;
}

function getHintPenalty(n) {
    let p = 0;
    for (let i = 0; i < n; i++) p += 15 + i * 10;
    return p;
}


// =============================================================================
//  SOUND (minimal Web Audio)
// =============================================================================

const SFX = {
    _ctx: null,
    _getCtx() {
        if (!this._ctx) {
            try { this._ctx = new (window.AudioContext || window.webkitAudioContext)(); }
            catch (e) { return null; }
        }
        return this._ctx;
    },
    play(type) {
        const ctx = this._getCtx();
        if (!ctx) return;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        g.gain.value = 0.06;
        const t = ctx.currentTime;
        switch (type) {
            case 'success':
                o.frequency.value = 523; o.type = 'sine';
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
                o.start(t); o.stop(t + 0.25);
                setTimeout(() => {
                    const o2 = ctx.createOscillator(), g2 = ctx.createGain();
                    o2.connect(g2); g2.connect(ctx.destination);
                    g2.gain.value = 0.06; o2.frequency.value = 659; o2.type = 'sine';
                    g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
                    o2.start(ctx.currentTime); o2.stop(ctx.currentTime + 0.25);
                }, 100);
                break;
            case 'error':
                o.frequency.value = 200; o.type = 'sawtooth';
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
                o.start(t); o.stop(t + 0.15);
                break;
            case 'hint':
                o.frequency.value = 440; o.type = 'triangle';
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
                o.start(t); o.stop(t + 0.12);
                break;
            case 'skip':
                o.frequency.value = 330; o.type = 'sine';
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
                o.start(t); o.stop(t + 0.2);
                break;
        }
    }
};


// =============================================================================
//  UTILITY
// =============================================================================

function escapeHTML(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

function replayMode() {
    if (state.mode) startMode(state.mode);
    else showScreen('screen-modes');
}

function shareResults() {
    const maxPts = state.challenges.reduce((a, c) => a + c.pts, 0);
    const pct = maxPts > 0 ? Math.round(state.score / maxPts * 100) : 0;
    const text = [
        '🔧 Debug Lab Results',
        'Mode: ' + state.mode.toUpperCase(),
        'Score: ' + state.score + '/' + maxPts + ' (' + pct + '%)',
        'Solved: ' + state.solved + '/' + state.challenges.length,
        'Time: ' + fmtTime(state.timer),
        '',
        'Can you beat my score?'
    ].join('\n');
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

    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (gameOn && !popupOpen) runCode();
        return;
    }
    if (e.key === 'Escape') {
        if (popupOpen) closePopup();
        else if (gameOn) confirmExit();
    }
});


// =============================================================================
//  EDITOR ENHANCEMENTS
// =============================================================================

(function () {
    const editor = document.getElementById('code-editor');
    if (!editor) return;

    // Tab indent
    editor.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const s = this.selectionStart, en = this.selectionEnd;
            this.value = this.value.substring(0, s) + '  ' + this.value.substring(en);
            this.selectionStart = this.selectionEnd = s + 2;
        }
    });

    // Live preview + line numbers on input
    editor.addEventListener('input', function () {
        state.codeModified = true;
        updateLineNumbers();
        if (state.mode === 'css') updatePreview();
    });

    // Sync scroll for line numbers
    editor.addEventListener('scroll', function () {
        const gutter = document.getElementById('line-numbers');
        if (gutter) gutter.scrollTop = this.scrollTop;
    });
})();


// =============================================================================
//  INIT
// =============================================================================

(function init() {
    updateHighScoreDisplay();
    updateTotalSolved();
    showScreen('screen-home');
})();