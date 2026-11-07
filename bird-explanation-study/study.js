/* Bird Explanation Study: blinded pairwise comparison of two explanation cards.
 * Card files have opaque ids; the id -> method key is NOT part of this site.
 * Responses are POSTed to a Google Apps Script web app (ENDPOINT) that stores
 * one row per participant (idempotent) in a Google Sheet. */
"use strict";

const ENDPOINT = "https://script.google.com/macros/s/AKfycby0midHnX-lqZbKYGULL-5DgblEGF0PS--Tr3YTGk1W7qrryYf9jAZTLWghy1vLaFvMIA/exec";
const VERSION = "v3";
const LABELS = ["A", "B"];
const SAME = "same";            // "No clear difference"
const MIN_VIEW_MS = 5000;       // Next unlocks after this long on a screen (guards against rushed clicking)

const $ = (id) => document.getElementById(id);
let config = null;
let state = null;
let storeKey = null;
let storageOk = true;
let shownAt = 0;
let sending = false;
let waitTimer = null;

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
  if (cfg.design !== "pairwise" || cfg.items.some((it) => it.cards.length !== 2)) throw new Error("not a pairwise release");
  const main = shuffle(cfg.items.map((it) => ({ item_id: it.item_id, is_repeat: false })));
  return main.map((s) => ({ ...s, test: byId[s.item_id].test, order: shuffle(byId[s.item_id].cards) }));
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
  state.current = { better: null };
  const box = document.querySelector('.q-opts[data-q="better"]');
  box.innerHTML = "";
  [...LABELS.map((L, k) => ["Explanation " + L, k]), ["No clear difference", SAME]].forEach(([text, val]) => {
    const b = document.createElement("button"); b.type = "button"; b.textContent = text;
    if (val === SAME) b.classList.add("tie");
    b.addEventListener("click", () => {
      state.current.better = val;
      box.querySelectorAll("button").forEach((x) => x.classList.toggle("selected", x === b));
      validate();
    });
    box.append(b);
  });
  $("btn-next").disabled = true;
  shownAt = performance.now();
  if (waitTimer) clearTimeout(waitTimer);
  waitTimer = setTimeout(validate, MIN_VIEW_MS + 50);
  validate();
  preload(state.idx + 1);
}

function validate() {
  const waited = performance.now() - shownAt >= MIN_VIEW_MS;
  const chosen = state.current && state.current.better !== null;
  $("q-wait").textContent = chosen && !waited ? "Please take a few seconds to compare both explanations." : "";
  $("btn-next").disabled = !(chosen && waited);
}

function pick(s, v) { return v === SAME ? SAME : s.order[v]; }
function pos(v) { return v === SAME ? SAME : LABELS[v]; }

function nextScreen() {
  const s = state.screens[state.idx], c = state.current;
  if (!c || c.better === null || performance.now() - shownAt < MIN_VIEW_MS) return;
  state.responses.push({
    screen: state.idx, item_id: s.item_id, is_repeat: s.is_repeat,
    shown_order: s.order,                       // card ids shown as A, B
    better: pick(s, c.better), better_pos: pos(c.better),
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
