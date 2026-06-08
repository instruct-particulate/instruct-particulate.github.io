const microwaveDemoAsset = {
  inputSrc: "/webpage/image_conditioned/microwave_input.png",
  partsSrc: "/webpage/image_conditioned/microwave_parts_axes.glb",
  texturedSrc: "/webpage/image_conditioned/microwave_textured.glb",
  inputAlt: "Microwave conditioning input",
};

// Add, remove, or reorder result objects here; both the homepage and /gallery/ read this list.
export const generationItems = [
  { id: "microwave-01", title: "Microwave Result 01", ...microwaveDemoAsset },
  { id: "microwave-02", title: "Microwave Result 02", ...microwaveDemoAsset },
  { id: "microwave-03", title: "Microwave Result 03", ...microwaveDemoAsset },
  { id: "microwave-04", title: "Microwave Result 04", ...microwaveDemoAsset },
  { id: "microwave-05", title: "Microwave Result 05", ...microwaveDemoAsset },
  { id: "microwave-06", title: "Microwave Result 06", ...microwaveDemoAsset },
  { id: "microwave-07", title: "Microwave Result 07", ...microwaveDemoAsset },
  { id: "microwave-08", title: "Microwave Result 08", ...microwaveDemoAsset },
  { id: "microwave-09", title: "Microwave Result 09", ...microwaveDemoAsset },
  { id: "microwave-10", title: "Microwave Result 10", ...microwaveDemoAsset },
  { id: "microwave-11", title: "Microwave Result 11", ...microwaveDemoAsset },
  { id: "microwave-12", title: "Microwave Result 12", ...microwaveDemoAsset },
  { id: "microwave-13", title: "Microwave Result 13", ...microwaveDemoAsset },
  { id: "microwave-14", title: "Microwave Result 14", ...microwaveDemoAsset },
  { id: "microwave-15", title: "Microwave Result 15", ...microwaveDemoAsset },
  { id: "microwave-16", title: "Microwave Result 16", ...microwaveDemoAsset },
  { id: "microwave-17", title: "Microwave Result 17", ...microwaveDemoAsset },
  { id: "microwave-18", title: "Microwave Result 18", ...microwaveDemoAsset },
  { id: "microwave-19", title: "Microwave Result 19", ...microwaveDemoAsset },
  { id: "microwave-20", title: "Microwave Result 20", ...microwaveDemoAsset },
  { id: "microwave-21", title: "Microwave Result 21", ...microwaveDemoAsset },
];

const textureIcon = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 22a7 7 0 0 0 7-7c0-2.8-1.5-4.7-3-6.7-1.2-1.6-2.4-3.1-3-5.3-3.9 3-8 6.5-8 12a7 7 0 0 0 7 7z" />
    <path d="M12 22a4 4 0 0 0 4-4c0-1.8-1.1-3-2.1-4.2-.8-.9-1.5-1.9-1.9-3.3-2.2 1.8-4 3.7-4 6.5a4 4 0 0 0 4 4z" />
  </svg>
`;

function createResultCard(item) {
  const card = document.createElement("article");
  card.className = "generation-card";
  card.dataset.resultId = item.id;

  const viewer = document.createElement("model-viewer");
  viewer.className = "generation-viewer";
  viewer.setAttribute("src", item.partsSrc);
  viewer.setAttribute("alt", `Generated articulated 3D asset for ${item.title}`);
  viewer.setAttribute("camera-controls", "");
  viewer.setAttribute("auto-rotate", "");
  viewer.setAttribute("autoplay", "");
  viewer.setAttribute("interaction-prompt", "none");
  viewer.setAttribute("loading", "lazy");
  viewer.setAttribute("shadow-intensity", "0.65");
  viewer.setAttribute("exposure", "1");

  const input = document.createElement("div");
  input.className = "generation-input";
  input.innerHTML = `
    <img src="${item.inputSrc}" alt="${item.inputAlt}" loading="lazy" decoding="async" />
    <span>Input</span>
  `;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "generation-texture-button";
  button.dataset.partsSrc = item.partsSrc;
  button.dataset.texturedSrc = item.texturedSrc;
  button.setAttribute("aria-label", `Show textured animation for ${item.title}`);
  button.innerHTML = `${textureIcon}<span data-texture-label>Show textured animation</span>`;
  button.addEventListener("click", () => toggleTexture(viewer, button, item.title));

  card.append(viewer, input, button);
  return card;
}

function toggleTexture(viewer, button, title) {
  const partsSrc = button.dataset.partsSrc;
  const texturedSrc = button.dataset.texturedSrc;
  const label = button.querySelector("[data-texture-label]");
  if (!partsSrc || !texturedSrc) return;

  const isShowingTextured = viewer.getAttribute("src") === texturedSrc;
  const nextSrc = isShowingTextured ? partsSrc : texturedSrc;
  if (viewer.getAttribute("src") === nextSrc) return;

  button.disabled = true;
  if (label) label.textContent = isShowingTextured ? "Loading parts & axes" : "Loading textured animation";

  const cleanup = () => {
    viewer.removeEventListener("load", handleLoad);
    viewer.removeEventListener("error", handleError);
  };

  const handleLoad = () => {
    if (viewer.getAttribute("src") !== nextSrc) return;
    cleanup();
    const nowShowingTextured = nextSrc === texturedSrc;
    button.disabled = false;
    button.classList.toggle("is-textured", nowShowingTextured);
    if (label) label.textContent = nowShowingTextured ? "Show parts & axes" : "Show textured animation";
    button.setAttribute(
      "aria-label",
      `${nowShowingTextured ? "Show parts & axes" : "Show textured animation"} for ${title}`,
    );
  };

  const handleError = () => {
    cleanup();
    button.disabled = false;
    if (label) label.textContent = isShowingTextured ? "Show parts & axes" : "Show textured animation";
  };

  viewer.addEventListener("load", handleLoad, { once: true });
  viewer.addEventListener("error", handleError, { once: true });
  viewer.setAttribute("src", nextSrc);
}

export function renderGenerationGrid(grid, items, options = {}) {
  const limit = Number.isFinite(options.limit) ? Math.max(0, options.limit) : items.length;
  const visibleItems = items.slice(0, limit);
  grid.replaceChildren(...visibleItems.map(createResultCard));
  return visibleItems.length;
}
