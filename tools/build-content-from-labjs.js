#!/usr/bin/env node
/**
 * One-off importer: rebuilds content/dragons.csv, content/stages.csv and
 * content/syllables.csv from the archived lab.js export, and normalises the
 * Dutch trial CSVs into content/trials/nl. Kept for provenance; the CSVs in
 * content/ are now the source of truth and can be edited directly.
 *
 * Usage: node tools/build-content-from-labjs.js
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv } from '../app/engine/csv.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROOT = path.resolve(__dirname, '..');
const EXPORT = path.join(ROOT, 'legacy/labjs-gamified-export');
const CONTENT = path.join(ROOT, 'content');

// ---- load the lab.js study object ------------------------------------------------
const src = fs.readFileSync(path.join(EXPORT, 'script.js'), 'utf8');
let study;
const lab = { util: { fromObject: (o) => { study = o; return { run() {} }; } } };
new Function('lab', src)(lab);

const nodes = {};
(function walk(n) {
  if (n.title && !nodes[n.title]) nodes[n.title] = n;
  if (n.template) walk(n.template);
  if (Array.isArray(n.content)) n.content.forEach(walk);
  else if (n.content && typeof n.content === 'object') walk(n.content);
})(study);
const handler = (title, key) => String(nodes[title].messageHandlers[key]);

// ---- dragons ---------------------------------------------------------------------
const images = {};
for (const m of handler('phase_transition', 'after:prepare').matchAll(/nextstage == (\d+)\) \{\s*\n\s*this\.state\.next_Dragon_image = '([^']+)'/g)) images[m[1]] = m[2];
const factsNl = {};
for (const m of handler('next_stage', 'before:prepare').matchAll(/nextstage == (\d+)\) \{\s*\n\s*this\.state\.Dragon_fact = '((?:[^'\\]|\\.)*)'/g)) factsNl[m[1]] = m[2].replace(/\\'/g, "'");

// Corrections to the archived data (see README "Content notes").
const fixes = {
  22: { image: 'static/Frostrex 22.png' },                                   // file is spelled Frostrex
  55: { image: 'static/Runebrorn 55.png' },                                  // fact is about Runebrorn
  56: { image: 'static/Shadowmire 56.png' },                                 // fact is about Shadowmire
  67: { fact_nl: (f) => f.replace('Amthyst', 'Amethyst') },
  91: { fact_nl: (f) => f.replace('Somnyx', 'Somnix') },
};

const factsEn = {
  5: 'Emeralion is an ordinary green dragon that loves living in open fields.',
  6: 'Dracor is an ordinary dragon with fiery red scales.',
  7: 'Cindri is an ordinary baby dragon. Look how cute she is!',
  8: 'Dandelion is an ordinary dragon that got its name from its shiny yellow skin.',
  9: 'Herbion is a forest dragon that breathes no ordinary fire, but a magical flame that can bring dead plants back to life!',
  10: "Thornscale's tail is covered in razor-sharp spikes that grow straight back if they break.",
  11: 'Leafdrake can camouflage itself perfectly in dense forests, making it almost invisible.',
  12: 'Nautrion is a water dragon that prefers to live in glittering seas.',
  13: 'Dewscale lets morning dew form on her scales at night, making her sparkle like tiny diamonds.',
  14: 'Aqualis can breathe under water and creates enchanting bioluminescent waves.',
  15: 'Azuryth can camouflage itself perfectly in the water thanks to its blue scales.',
  16: 'Terradon has rocky skin that is almost unbreakable and just as strong as the mountains it comes from.',
  17: 'Granitor has powerful legs that can stamp so hard on the ground that they cause small earthquakes.',
  18: 'Crysalith has a gem-covered body that reflects light in dazzling, hypnotic patterns.',
  19: 'Infernis can turn sand into glass in the blink of an eye with its fiery breath.',
  20: 'Emberok can rekindle an extinguished campfire kilometres away with a single beat of its wings.',
  21: "Volcaryx was born from a volcanic eruption, and Volcaryx's core is hotter than molten lava.",
  22: 'Frostrex grows ice crystals along its spine, even in the warmest climates.',
  23: 'Snowveil leaves a trail of snow behind her when she flies, like a gentle winter snow shower.',
  24: 'Glacirion can freeze entire lakes with one breath, creating perfect ice rinks.',
  25: 'Sandrake buries itself under the desert sand, waiting for the perfect moment to strike.',
  26: 'Dunaryn has rough, sand-coloured scales that make it almost impossible to tell apart from the sand dunes.',
  27: 'Cactarion stores water in its body, so it can survive for years without a single drop.',
  28: 'Skyflare shoots upwards like a comet, leaving a dazzling streak of light across the sky.',
  29: 'Aerolith can summon powerful gusts of wind strong enough to lift boulders.',
  30: 'Spectragon shimmers in and out of existence and only appears when she wants to.',
  31: 'Nocturna is a nocturnal dragon that glides silently through the darkness, her sparkling scales seeming to mirror the stars.',
  32: 'Echoryn is a bat-like dragon that sends out ultrasonic waves to scan its surroundings and track opponents flawlessly in the dark.',
  33: 'Noctyrax only appears under a full moon, glowing softly in the silver light.',
  34: 'According to legend, Eclipsar draws her power from solar eclipses and vanishes right after them.',
  35: 'Leafdris can regrow any limb, just like the plants it resembles.',
  36: 'Arboris has wings covered in moss, which makes it perfectly camouflaged in the forest.',
  37: 'Blossara makes flowers bloom wherever she goes, even in the harshest surroundings.',
  38: "Stellaryx's tail glows like a shooting star flying across the night sky.",
  39: 'Solarius is said to radiate the warmth of the sun and can melt snow just by flying past.',
  40: 'Lunareth has silver scales that glisten like the surface of a calm lake in the moonlight.',
  41: 'Borealis is a very rare dragon that is only visible under the northern lights!',
  42: 'Shocktail can generate enough electricity to power a whole village for a day.',
  43: 'Sparklis lets tiny lightning bolts dance across its body when it gets excited.',
  44: 'Voltaris stores immense energy in its horns and fires it off as lightning bolts.',
  45: 'Gloomshire is a poisonous dragon that gives off a strange mist that confuses intruders in its territory.',
  46: 'Toxaryn can spit acid that melts through steel in a matter of seconds.',
  47: 'Acidrake has claws that drip with a poison that can melt stone.',
  48: 'Venomir has fangs that contain a rare poison with which it can paralyse its prey instantly.',
  49: 'Steelion has a body harder than any known metal, making her almost indestructible.',
  50: 'Argentis reflects sunlight so brightly that it can temporarily blind its enemies.',
  51: 'Gildrion has golden wings that are said to bring luck to those who get to see them.',
  52: 'Floragon can control plants and tree roots, making the earth itself her ally.',
  53: 'Solbloem absorbs sunlight straight into its body and uses it to heal wounds.',
  54: 'Leaflet may be small, but it can summon towering trees in the blink of an eye.',
  55: 'Runebrorn has ancient symbols on its scales that are said to hold the secrets of lost magic.',
  56: 'Shadowmire moves like a shadow, which makes it impossible to follow and almost never seen.',
  57: 'Mystifly is an extremely rare dragon whose wings shimmer with an ever-changing pattern of mysterious runes.',
  58: 'Reefback is a stately dragon with a body covered in vivid coral formations, like a living reef.',
  59: "Abyssal's long, whip-like tail ends in a cluster of poisonous, jellyfish-like tentacles.",
  60: 'When Tidepool feels threatened, it can camouflage itself by changing the colours of its coral, blending seamlessly into its surroundings.',
  61: 'Instead of breathing fire, Vinedrake breathes out a mist that speeds up plant growth, making roots and vines appear that trap everything in sight.',
  62: 'According to legend, Bloomthorn is the guardian of the enchanted forests and only appears when nature is in danger.',
  63: "Hollowgrove's hollow chest contains a glowing core of magical energy that lights up the twisting roots and branches inside.",
  64: 'Prismhearth is a slender, elegant dragon with a body made of translucent, prismatic crystals that split light into dazzling rainbows.',
  65: 'Obsidian is a fearsome dragon with jagged black crystal scales that glisten like volcanic glass.',
  66: "Celestide's wings are semi-transparent, like sheets of sapphire, and its horns are shaped like delicate spires of quartz.",
  67: 'When Amethyst moves, soft chimes ring out around it, as if the crystals in its body were singing.',
  68: "Mycelium's wings look like giant, spore-covered mushrooms, releasing a glittering mist with every flap.",
  69: 'Sporeborn is a ghostly, translucent dragon formed almost entirely from swirling fungal spores and mist.',
  70: "Poisonous mushrooms pulse along Blightmaw's spine, releasing clouds of dark, spore-laden mist.",
  71: "Wraithveil's eyes glow with an eerie silver light, and when she moves they leave trails of spectral energy behind.",
  72: "Ancestral's scales look like carved stone, engraved with the wisdom of long-forgotten ancestors.",
  73: 'Hollowbone is a skeletal dragon wrapped in swirling ghostly mist. Its body is an eerie fusion of ancient bones and translucent spirit energy.',
  74: "Echoryx's elongated body vibrates with every movement, creating ghostly echoes that can travel for miles.",
  75: 'Thunderclap is a huge, muscular dragon covered in jagged metal scales that amplify every sound it makes. Its deep, rumbling growl shakes the ground and its mighty wings create sonic booms with every beat.',
  76: 'Whisperwind is a delicate, ethereal dragon that glides silently through the air, its body seeming almost weightless.',
  77: 'Gearforge is a huge, steam-powered dragon made of bronze and iron. Its body is covered in interlocking cogs.',
  78: 'Instead of breathing fire, Nexus sends out electromagnetic pulses that disable technology and disrupt enemy communications.',
  79: 'Temporus is an elegant golden dragon powered by a complex system of ticking gears, spinning cogs and intricate clockwork.',
  80: 'Boglurkur is a huge swamp dragon with thick, moss-covered scales that blend into the murky surroundings.',
  81: "Murkfang's dark, mud-covered scales are speckled with bioluminescent fungi that glow faintly at night.",
  82: 'Rootmaw is a colossal swamp dragon with a body covered in bark-like armour and a tail that looks like a twisting tree root. Large, gnarled antlers covered in hanging moss and fungi grow from its head.',
  83: 'Cloudlet is a gentle cloud dragon with fluffy wings of mist that lets tiny raindrops drift down.',
  84: 'Rainwisp is a playful rain dragon that summons gentle showers, making flowers grow faster.',
  85: 'Stormlet is a small but powerful storm dragon that can let gentle little lightning bolts dance across its scales.',
  86: 'Rainbowra leaves a sparkling rainbow behind with every step and only appears after a perfect rain shower.',
  87: 'Sugarwing has shiny, candy-coloured scales and leaves a trail of sparkling sugar glitter behind when she flies.',
  88: 'Gummir has an elastic body that it can stretch and bend like a gummy bear, without ever breaking.',
  89: 'Chocolyx always smells of hot chocolate, and its shiny brown scales seem to melt softly in the light.',
  90: 'Dozelyn is a dreamy sleep dragon that rests curled up under the starlight and watches over sweet dreams.',
  91: 'Somnix whispers gentle stories in the night, and its moon symbols glow whenever someone falls asleep.',
  92: 'Lucidora can make dreams light up like tiny floating lights that dance above her wings.',
  93: 'Pullix is a magnetic dragon that gently makes small metal objects float around it.',
  94: 'Gravion can briefly strengthen the gravity around its body, making the ground feel heavier for a moment.',
  95: 'Alignor has glowing lines across her scales that light up when she helps others work together.',
  96: 'Primarok is an ancient dragon with dark stone scales in which fiery cracks glow like molten lava.',
  97: 'Worldshard carries spinning fragments of rock around her body and protects a glowing core in her chest.',
  98: 'Firstflame is thought to be the very first fire, and its breath glows like an eternal flame.',
  99: 'Collosyx is a gigantic titan dragon whose heavy footsteps make the earth tremble.',
  100: 'Skybreaker flies so high that clouds split open beneath her mighty wings.',
  101: 'Enderhorn only appears when a great challenge has been overcome, and its enormous horns glow with power.',
  102: 'Starbloom makes tiny star flowers grow wherever it rests under the night sky.',
  103: 'Cometkin travels along with shooting stars and leaves a sparkling trail of cosmic light behind.',
};

const csvEscape = (v) => {
  const s = v == null ? '' : String(v);
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};
const writeCsv = (file, header, rows) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, [header.join(','), ...rows.map((r) => header.map((h) => csvEscape(r[h])).join(','))].join('\n') + '\n');
};

const FIRST = 5, LAST = 122;
const dragons = [];
for (let s = FIRST; s <= LAST; s++) {
  const fix = fixes[s] || {};
  let image = fix.image || images[s] || '';
  let factNl = factsNl[s] || '';
  if (typeof fix.fact_nl === 'function') factNl = fix.fact_nl(factNl);
  const hasArt = s <= 103;
  const name = hasArt ? image.replace('static/', '').split(' ')[0] : `Dragon ${s}`;
  dragons.push({
    stage: s,
    name,
    image: hasArt ? image : 'static/placeholder-dragon.svg',
    fact_nl: hasArt ? factNl : 'Deze draak is nog een geheim! De onderzoeker voegt binnenkort een echte draak toe.',
    fact_en: hasArt ? factsEn[s] : 'This dragon is still a secret! The researcher will add a real dragon soon.',
  });
}
writeCsv(path.join(CONTENT, 'dragons.csv'), ['stage', 'name', 'image', 'fact_nl', 'fact_en'], dragons);

// ---- stages ----------------------------------------------------------------------
const bgRanges = [];
for (const m of handler('session-timer-frame', 'run').matchAll(/level >= (\d+) && level <= (\d+)\) \{\s*\n\s*backgroundDiv\.classList\.add\('background-level-(\d+)'\)/g)) bgRanges.push({ from: +m[1], to: +m[2], bg: +m[3] });
const familyOf = (s) => (s <= 29 ? 'opposition' : s <= 55 ? 'quantity' : s <= 81 ? 'temporal' : s <= 103 ? 'containment' : 'mathematics');
const stages = [];
for (let s = FIRST; s <= LAST; s++) {
  const r = bgRanges.find((x) => s >= x.from && s <= x.to);
  stages.push({
    stage: s,
    family: familyOf(s),
    background: r ? `static/Background_${r.bg}.jpg` : 'static/Background_32.jpg',
    training_criterion: '',
    testing_trials: '',
    abort_on_first_error: '',
  });
}
writeCsv(path.join(CONTENT, 'stages.csv'), ['stage', 'family', 'background', 'training_criterion', 'testing_trials', 'abort_on_first_error'], stages);

// ---- syllables -------------------------------------------------------------------
const buckets = {};
for (const m of handler('session-timer-frame', 'before:prepare').matchAll(/stimulus_(\d)_bucket = \[([^\]]*)\]/g)) buckets[m[1]] = [...m[2].matchAll(/'([^']+)'/g)].map((x) => x[1]);
const maxLen = Math.max(...Object.values(buckets).map((b) => b.length));
const sylRows = [];
for (let i = 0; i < maxLen; i++) sylRows.push({ bucket_1: buckets[1][i] || '', bucket_2: buckets[2][i] || '', bucket_3: buckets[3][i] || '', bucket_4: buckets[4][i] || '' });
writeCsv(path.join(CONTENT, 'syllables.csv'), ['bucket_1', 'bucket_2', 'bucket_3', 'bucket_4'], sylRows);

// ---- Dutch trials: normalise -----------------------------------------------------
const srcDir = path.join(EXPORT, 'trials-nl');
let count = 0;
for (let s = FIRST; s <= LAST; s++) {
  const file = path.join(srcDir, `stage_${s}.csv`);
  if (!fs.existsSync(file)) continue;
  const rows = parseCsv(fs.readFileSync(file, 'utf8'));
  const header = Object.keys(rows[0]);
  if (!header.includes('q_word')) header.push('q_word');
  for (const r of rows) {
    // The old build derived the question word in code; make it explicit.
    if (!r.q_word) r.q_word = s >= 56 && s <= 81 ? 'Komt' : 'Is';
  }
  writeCsv(path.join(CONTENT, 'trials/nl', `stage_${s}.csv`), header, rows);
  count++;
}
console.log(`dragons: ${dragons.length}, stages: ${stages.length}, syllable rows: ${sylRows.length}, nl trial files: ${count}`);
