(() => {
  const outputEl = document.getElementById("output");
  const inputTextEl = document.getElementById("input-text");
  const cursorEl = document.getElementById("cursor");
  const terminalEl = document.getElementById("terminal");
  const inputProxyEl = document.getElementById("input-proxy");
  const mobileControlsEl = document.querySelector(".mobile-controls");

  const state = {
    input: "",
    history: [],
    historyIndex: -1,
    busy: true
  };

  const TYPE_DELAY = 18;
  const LINE_DELAY = 120;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function scrollToBottom() {
    terminalEl.scrollTop = terminalEl.scrollHeight;
  }

  function setBusy(nextBusy) {
    state.busy = nextBusy;
    cursorEl.classList.toggle("busy", nextBusy);
  }

  function appendLine(text = "", color = "green", html = false, extraClass = "") {
    const line = document.createElement("div");
    line.className = `line line-${color}`;
    if (extraClass) {
      line.classList.add(extraClass);
    }

    if (html) {
      line.innerHTML = text;
    } else {
      line.textContent = text;
    }

    outputEl.appendChild(line);
    scrollToBottom();
    return line;
  }

  async function typeLine(
    text = "",
    color = "green",
    html = false,
    speed = TYPE_DELAY,
    extraClass = ""
  ) {
    const line = appendLine("", color, false, extraClass);

    if (html) {
      line.innerHTML = text;
      scrollToBottom();
      await sleep(Math.max(80, speed * 2));
      return;
    }

    for (const ch of text) {
      line.textContent += ch;
      scrollToBottom();
      await sleep(speed);
    }
  }

  async function typeLines(lines, color = "green") {
    for (const line of lines) {
      await typeLine(line, color, false);
      await sleep(LINE_DELAY);
    }
  }

  function renderInput() {
    inputTextEl.textContent = state.input;
    if (inputProxyEl && inputProxyEl.value !== state.input) {
      inputProxyEl.value = state.input;
    }
    scrollToBottom();
  }

  function printPromptWithInput(command) {
    appendLine(`kasen@portfolio:~$ ${command}`, "white");
  }

  function findAutocompleteMatch(value) {
    if (!value.trim()) {
      return null;
    }

    const matches = COMMAND_LIST.filter((command) => command.startsWith(value.toLowerCase()));

    if (matches.length === 1) {
      return { type: "single", value: matches[0] };
    }

    if (matches.length > 1) {
      return { type: "multiple", value: matches };
    }

    return null;
  }

  async function runHackSequence() {
    const fakeOps = [
      "Injecting payload...",
      "Bypassing firewall...",
      "Escalating privileges...",
      "Harvesting encrypted packets...",
      "Compiling target map..."
    ];

    for (let i = 0; i < fakeOps.length; i += 1) {
      const progress = Math.min(100, (i + 1) * 20);
      await typeLine(`[HACK] ${fakeOps[i]} ${progress}%`, "green");
      await sleep(180);
    }

    await typeLine("[ALERT] Nice try. This is a portfolio, not a live target.", "red");
  }

  async function executeCommand(rawInput) {
    const command = rawInput.trim().toLowerCase();

    if (!command) {
      appendLine("", "green");
      return;
    }

    const config = COMMANDS[command];

    if (!config) {
      await typeLine(`Command not found: ${command}. Type 'help' to see available commands.`, "red");
      return;
    }

    if (config.clear) {
      outputEl.innerHTML = "";
      return;
    }

    if (config.hack) {
      await runHackSequence();
      return;
    }

    if (typeof config.action === "function") {
      config.action();
    }

    if (Array.isArray(config.output)) {
      for (const line of config.output) {
        const isHtml = line.includes("<a ");
        await typeLine(line, "green", isHtml);
      }
    }
  }

  async function boot() {
    setBusy(true);
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const bannerLines = isMobile ? MOBILE_BANNER : BANNER;

    for (const line of BOOT_SEQUENCE) {
      await typeLine(line, "green");
      await sleep(90);
    }

    for (let i = 0; i < bannerLines.length; i += 1) {
      const color = i >= bannerLines.length - 2 ? "white" : "green";
      await typeLine(bannerLines[i], color, false, 8, "banner-line");
      await sleep(50);
    }

    setBusy(false);
    renderInput();
  }

  async function submitCurrentInput() {
    if (state.busy) {
      return;
    }

    setBusy(true);

    const current = state.input;
    printPromptWithInput(current);

    if (current.trim()) {
      state.history.push(current);
    }

    state.historyIndex = state.history.length;
    state.input = "";
    renderInput();

    await executeCommand(current);
    setBusy(false);
    renderInput();
  }

  function navigateHistory(direction) {
    if (!state.history.length) {
      return;
    }

    if (direction === "up") {
      state.historyIndex = Math.max(0, state.historyIndex - 1);
    } else {
      state.historyIndex = Math.min(state.history.length, state.historyIndex + 1);
    }

    if (state.historyIndex === state.history.length) {
      state.input = "";
    } else {
      state.input = state.history[state.historyIndex] || "";
    }

    renderInput();
  }

  async function handleTab() {
    const match = findAutocompleteMatch(state.input);

    if (!match) {
      return;
    }

    if (match.type === "single") {
      state.input = match.value;
      renderInput();
      return;
    }

    printPromptWithInput(state.input);
    await typeLine(`Suggestions: ${match.value.join(", ")}`, "white");
  }

  document.addEventListener("keydown", async (event) => {
    if (event.target === inputProxyEl) {
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      if (!state.busy) {
        await handleTab();
      }
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      await submitCurrentInput();
      return;
    }

    if (event.key === "Backspace") {
      event.preventDefault();
      if (!state.busy) {
        state.input = state.input.slice(0, -1);
        renderInput();
      }
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!state.busy) {
        navigateHistory("up");
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!state.busy) {
        navigateHistory("down");
      }
      return;
    }

    if (event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }

    if (event.key.length === 1 && !state.busy) {
      state.input += event.key;
      renderInput();
    }
  });

  if (inputProxyEl) {
    inputProxyEl.addEventListener("input", () => {
      if (state.busy) {
        return;
      }

      state.input = inputProxyEl.value;
      renderInput();
    });

    inputProxyEl.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        await submitCurrentInput();
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        if (!state.busy) {
          await handleTab();
        }
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (!state.busy) {
          navigateHistory("up");
        }
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (!state.busy) {
          navigateHistory("down");
        }
      }
    });
  }

  if (mobileControlsEl) {
    mobileControlsEl.addEventListener("click", async (event) => {
      const button = event.target.closest("[data-action]");
      if (!button || state.busy) {
        return;
      }

      const action = button.dataset.action;

      if (action === "up") {
        navigateHistory("up");
      } else if (action === "down") {
        navigateHistory("down");
      } else if (action === "tab") {
        await handleTab();
      } else if (action === "enter") {
        await submitCurrentInput();
      }

      if (inputProxyEl) {
        inputProxyEl.focus();
      }
    });
  }

  terminalEl.addEventListener("click", () => {
    if (inputProxyEl) {
      inputProxyEl.focus();
    }
    scrollToBottom();
  });

  boot();
})();
