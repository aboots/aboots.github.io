(function () {
  var root = document.getElementById("publications");
  if (!root) return;

  var filters = root.querySelector(".pub-filters");
  var empty = root.querySelector(".pub-empty");

  function matches(entry, filter) {
    if (filter === "all") return true;
    var kind = filter.split(":")[0];
    var value = filter.split(":")[1];
    if (kind === "topic") {
      var topics = (entry.getAttribute("data-topics") || "").split(/\s+/);
      return topics.indexOf(value) !== -1;
    }
    if (kind === "status" && value === "unpublished") {
      var status = entry.getAttribute("data-status");
      return status === "preprint" || status === "under_review";
    }
    return true;
  }

  function apply(filter) {
    var chips = filters.querySelectorAll(".pub-chip");
    Array.prototype.forEach.call(chips, function (chip) {
      var on = chip.getAttribute("data-filter") === filter;
      chip.classList.toggle("is-active", on);
      chip.setAttribute("aria-pressed", on ? "true" : "false");
    });

    Array.prototype.forEach.call(root.querySelectorAll(".pub-entry"), function (entry) {
      entry.hidden = !matches(entry, filter);
    });

    Array.prototype.forEach.call(root.querySelectorAll(".pub-year"), function (year) {
      var visible = year.querySelectorAll(".pub-entry:not([hidden])");
      year.hidden = visible.length === 0;
      var count = year.querySelector(".pub-count");
      if (count) {
        var n = visible.length;
        count.textContent = n + (n === 1 ? " paper" : " papers");
      }
    });

    var selected = root.querySelector(".pub-selected-wrap");
    if (selected) {
      selected.hidden = selected.querySelectorAll(".pub-entry:not([hidden])").length === 0;
    }

    if (empty) {
      var rows = root.querySelectorAll(".pub-year .pub-entry:not([hidden])");
      empty.hidden = rows.length !== 0;
    }
  }

  if (filters) {
    filters.addEventListener("click", function (event) {
      var chip = event.target.closest(".pub-chip");
      if (!chip) return;
      apply(chip.getAttribute("data-filter"));
    });
  }

  function copyWithSelection(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "0";
    area.style.top = "0";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.focus();
    area.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (err) {
      ok = false;
    }
    document.body.removeChild(area);
    return ok;
  }

  function flash(btn, message, original) {
    btn.textContent = message;
    window.setTimeout(function () {
      btn.textContent = original;
    }, 1400);
  }

  Array.prototype.forEach.call(root.querySelectorAll(".pub-bib-toggle"), function (btn) {
    btn.addEventListener("click", function () {
      var panel = btn.closest(".pub-actions").querySelector(".pub-bibtex");
      if (!panel) return;
      var open = panel.hidden;
      panel.hidden = !open;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  Array.prototype.forEach.call(root.querySelectorAll(".pub-copy"), function (btn) {
    btn.addEventListener("click", function () {
      var pre = btn.parentNode.querySelector("pre");
      if (!pre) return;
      var label = btn.getAttribute("data-label") || "Copy";
      var text = pre.textContent.trim();
      if (copyWithSelection(text)) {
        flash(btn, "Copied", label);
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          flash(btn, "Copied", label);
        }).catch(function () {
          flash(btn, "Copy failed", label);
        });
        return;
      }
      flash(btn, "Copy failed", label);
    });
  });
})();
