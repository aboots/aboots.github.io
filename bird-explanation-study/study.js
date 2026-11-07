/* Bird Explanation Study: blinded 3-way comparison of explanation cards.
 * Card files have opaque ids; the id -> method key is NOT part of this site.
 * Responses are POSTed to a Google Apps Script web app (ENDPOINT) that stores
 * one row per participant (idempotent) in a Google Sheet. */
"use strict";

const ENDPOINT = "https://script.google.com/macros/s/AKfycby0midHnX-lqZbKYGULL-5DgblEGF0PS--Tr3YTGk1W7qrryYf9jAZTLWghy1vLaFvMIA/exec";
const VERSION = "v2";
const LABELS = ["A", "B", "C"];
const TIE = "tie";              // "Can't tell"
const QUESTIONS = ["best", "worst", "clearest"];

const $ = (id) => document.getElementById(id);
let config = null;
let state = null;
let storeKey = null;
let storageOk = true;
let shownAt = 0;
let sending = false;

function rand(n) {               // unbiased integer in [0, n)
  const buf = new Uint32Array(1);
  const lim = Math.floor(0xffffffff / n) * n;
  do { crypto.getRandomValues(buf); } while (buf[0] >= lim);
  return buf[0] % n;
}
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = rand(i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function newId() {
  const b = new Uint8Array(12); crypto.getRandomValues(b);
  return Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
}
function save() {
  try { localStorage.setItem(storeKey, JSON.stringify(state)); storageOk = true; }
  catch (e) { storageOk = false; }
  const banner = $("storage-warning");
  if (banner) banner.hidden = storageOk;   // reflect status immediately, without re-rendering
}
function load() { try { return JSON.parse(localStorage.getItem(storeKey) || "null"); } catch (e) { storageOk = false; return null; } }
function cardUrl(id) { return "cards/" + id + ".jpg"; }
function encode(s) { return btoa(unescape(encodeURIComponent(s))); }

function buildScreens(cfg) {
  const byId = Object.fromEntries(cfg.items.map((it) => [it.item_id, it]));
  const main = shuffle(cfg.items.map((it) => ({ item_id: it.item_id, is_repeat: false })));
  let reps = shuffle(cfg.repeat_item_ids.map((id) => ({ item_id: id, is_repeat: true })));
  // never show a repeat directly after its first presentation
  if (reps.length > 1 && reps[0].item_id === main[main.length - 1].item_id) reps = reps.slice(1).concat(reps.slice(0, 1));
  return main.concat(reps).map((s) => ({ ...s, test: byId[s.item_id].test, order: shuffle(byId[s.item_id].cards) }));
}

function setStage(stage) { state.stage = stage; save(); render(); }

function render() {
  for (const s of ["welcome", "background", "tutorial", "items", "comment", "done"]) $("stage-" + s).hidden = s !== state.stage;
  $("progress").hidden = state.stage !== "items";
  $("storage-warning").hidden = storageOk;
  if (state.stage === "items") renderScreen();
  if (state.stage === "comment") $("comment").value = state.commentDraft || "";
  if (state.stage === "done") renderDone();
  window.scrollTo(0, 0);
}

function updateProgress() {
  const n = state.screens.length, i = state.idx;
  $("progress-bar").style.width = (100 * i / n) + "%";
  $("progress-text").textContent = `Screen ${Math.min(i + 1, n)} of ${n}`;
}

function preload(idx) {
  const s = state.screens[idx]; if (!s) return;
  [s.test, ...s.order].forEach((id) => { const im = new Image(); im.src = cardUrl(id); });
}

function renderScreen() {
  const s = state.screens[state.idx];
  updateProgress();
  $("item-title").textContent = `Screen ${state.idx + 1} of ${state.screens.length}`;
  $("item-test").src = cardUrl(s.test);
  const cards = $("cards"); cards.innerHTML = "";
  s.order.forEach((cid, k) => {
    const block = document.createElement("div"); block.className = "card-block";
    const lab = document.createElement("div"); lab.className = "card-label"; lab.textContent = "Explanation " + LABELS[k];
    const img = document.createElement("img"); img.src = cardUrl(cid); img.alt = "Explanation " + LABELS[k];
    block.append(lab, img); cards.append(block);
  });
  state.current = { best: null, worst: null, clearest: null };
  document.querySelectorAll(".q-opts").forEach((box) => {
    box.innerHTML = "";
    [...LABELS.map((L, k) => [L, k]), ["Can't tell", TIE]].forEach(([text, val]) => {
      const b = document.createElement("button"); b.type = "button"; b.textContent = text;
      if (val === TIE) b.classList.add("tie");
      b.addEventListener("click", () => {
        state.current[box.dataset.q] = val;
        box.querySelectorAll("button").forEach((x) => x.classList.toggle("selected", x === b));
        validate();
      });
      box.append(b);
    });
  });
  $("near-identical").checked = false;
  $("q-error").textContent = "";
  $("btn-next").disabled = true;
  shownAt = performance.now();
  preload(state.idx + 1);
}

function validate() {
  const c = state.current;
  const complete = QUESTIONS.every((q) => c[q] !== null);
  const clash = c.best !== null && c.best !== TIE && c.best === c.worst;
  $("q-error").textContent = clash ? "The best and worst explanation must be different." : "";
  $("btn-next").disabled = !complete || clash;
}

function pick(s, v) { return v === TIE ? TIE : s.order[v]; }
function pos(v) { return v === TIE ? TIE : LABELS[v]; }

function nextScreen() {
  const s = state.screens[state.idx], c = state.current;
  state.responses.push({
    screen: state.idx, item_id: s.item_id, is_repeat: s.is_repeat,
    shown_order: s.order,                       // card ids shown as A, B, C
    best: pick(s, c.best), worst: pick(s, c.worst), clearest: pick(s, c.clearest),
    best_pos: pos(c.best), worst_pos: pos(c.worst), clearest_pos: pos(c.clearest),
    near_identical: $("near-identical").checked,
    rt_ms: Math.round(performance.now() - shownAt),
  });
  state.idx += 1;
  if (state.idx >= state.screens.length) state.stage = "comment";   // one atomic save below
  save();
  render();
}

function buildPayload() {
  return JSON.stringify({
    version: VERSION, release: config.release, pid: state.pid,
    started_at: state.startedAt, consent_at: state.consentAt, submitted_at: new Date().toISOString(),
    background: state.bg, tutorial_ms: state.tutorialMs, screens: state.screens.length,
    viewport: [window.innerWidth, window.innerHeight], storage_ok: storageOk,
    responses: state.responses, comment: (state.commentDraft || "").slice(0, 2000),
  });
}

async function send() {
  if (sending) return;
  sending = true;
  $("btn-submit").disabled = true; $("btn-retry").disabled = true;
  if (!state.lastPayload) { state.lastPayload = buildPayload(); }   // frozen: retries resend exactly this
  state.stage = "done"; save();
  let ok = false;
  if (ENDPOINT) {
    try {
      // text/plain keeps this a "simple" request (no CORS preflight against Apps Script)
      const res = await fetch(ENDPOINT, { method: "POST", body: state.lastPayload, headers: { "Content-Type": "text/plain;charset=utf-8" } });
      const txt = await res.text();
      ok = res.ok && JSON.parse(txt).ok === true;
    } catch (e) { ok = false; }
  }
  state.submitted = ok; save();
  sending = false;
  $("btn-submit").disabled = false; $("btn-retry").disabled = false;
  render();
}

function renderDone() {
  const ok = !!state.submitted;
  $("done-title").textContent = ok ? "Thank you!" : "Thank you! One more step";
  $("done-msg").textContent = ok
    ? "Your answers were recorded. You can close this page."
    : "Your answers have NOT been recorded yet because we could not reach our server.";
  $("fallback").hidden = ok;
  if (!ok && state.lastPayload) $("fallback-code").value = encode(state.lastPayload);
}

function wire() {
  $("consent").addEventListener("change", (e) => { $("btn-start").disabled = !e.target.checked; });
  $("btn-start").addEventListener("click", () => { state.consentAt = new Date().toISOString(); setStage("background"); });
  const bgInputs = () => ["bird", "ml", "insider"].map((n) => document.querySelector(`input[name="${n}"]:checked`));
  document.querySelectorAll("#stage-background input").forEach((el) =>
    el.addEventListener("change", () => { $("btn-bg").disabled = bgInputs().some((x) => !x); }));
  $("btn-bg").addEventListener("click", () => {
    const [b, m, ins] = bgInputs(); state.bg = { bird: b.value, ml: m.value, insider: ins.value };
    state.tutorialStart = Date.now(); setStage("tutorial");
  });
  $("btn-tut").addEventListener("click", () => {
    state.tutorialMs = Date.now() - (state.tutorialStart || Date.now());
    setStage("items");
  });
  $("btn-next").addEventListener("click", nextScreen);
  $("comment").addEventListener("input", (e) => { state.commentDraft = e.target.value; save(); });
  $("btn-submit").addEventListener("click", send);
  $("btn-retry").addEventListener("click", send);
  $("btn-copy").addEventListener("click", () => { $("fallback-code").select(); document.execCommand("copy"); });
}

async function init() {
  config = await (await fetch("study_config.json", { cache: "no-store" })).json();
  storeKey = "bes_state_" + VERSION + "_" + config.release;
  $("tut-test").src = cardUrl(config.tutorial.test);
  $("tut-card").src = cardUrl(config.tutorial.card);
  if (window.innerWidth < 1000) $("width-warning").hidden = false;
  state = load();
  if (!state || state.version !== VERSION || state.release !== config.release) {
    state = { version: VERSION, release: config.release, pid: newId(), startedAt: new Date().toISOString(),
              stage: "welcome", bg: null, screens: buildScreens(config), idx: 0, responses: [] };
    save();
  }
  if (state.stage === "items" && state.idx >= state.screens.length) state.stage = "comment";
  wire();
  render();
}

init();
