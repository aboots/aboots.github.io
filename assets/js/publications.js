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
})();
