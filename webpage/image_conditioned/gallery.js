const resultBase = "/webpage/image_conditioned/results";

const microwaveDemoAsset = {
  inputSrc: "/webpage/image_conditioned/microwave_input.png",
  partsSrc: "/webpage/image_conditioned/microwave_parts_axes.glb",
  texturedSrc: "/webpage/image_conditioned/microwave_textured.glb",
  inputAlt: "Microwave conditioning input",
};

function resultAsset(id, title, options = {}) {
  const base = `${resultBase}/${id}`;
  return {
    id,
    title,
    inputSrc: options.inputSrc ?? `${base}/input.png`,
    partsSrc: `${base}/mesh_parts_with_axes.glb`,
    texturedSrc: `${base}/animated_textured.glb`,
    inputAlt: options.inputAlt ?? `${title} conditioning input`,
  };
}

// Add, remove, or reorder result objects here; both the homepage and /gallery/ read this list.
export const generationItems = [
  resultAsset("assets-802c1ccad00e90567182698145546d2f", "Image-Conditioned Result 01", microwaveDemoAsset),
  resultAsset("assets-54ca4892caaa2413d290c99dca417006", "Image-Conditioned Result 02", microwaveDemoAsset),
  resultAsset("articulated-models-2-007", "Image-Conditioned Result 03"),
  resultAsset("articulated-models-5-019", "Image-Conditioned Result 04"),
  resultAsset("articulated-models-5-011", "Image-Conditioned Result 05"),
  resultAsset("articulated-models-5-005", "Image-Conditioned Result 06"),
  resultAsset("articulated-models-5-002", "Image-Conditioned Result 07"),
  resultAsset("articulated-models-3-000", "Image-Conditioned Result 08"),
  resultAsset("articulated-models-5-010", "Image-Conditioned Result 09"),
  resultAsset("articulated-models-5-004", "Image-Conditioned Result 10"),
  resultAsset("articulated-model-046", "Image-Conditioned Result 11"),
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

const normalizedModelExtent = 2;

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
  viewer.setAttribute("orientation", "0deg -90deg 0deg");

  const normalization = {
    scaleAttribute: null,
  };

  const input = document.createElement("div");
  input.className = "generation-input";
  input.innerHTML = `
    <img src="${item.inputSrc}" alt="${item.inputAlt}" loading="lazy" decoding="async" />
    <span>Input</span>
  `;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "generation-texture-button";
  button.disabled = true;
  button.dataset.partsSrc = item.partsSrc;
  button.dataset.texturedSrc = item.texturedSrc;
  button.setAttribute("aria-label", `Show textured animation for ${item.title}`);
  button.innerHTML = `${textureIcon}<span data-texture-label>Show textured animation</span>`;
  button.addEventListener("click", () => toggleTexture(viewer, button, item.title, normalization));

  viewer.addEventListener("load", () => {
    if (viewer.getAttribute("src") !== item.partsSrc) return;
    if (!normalization.scaleAttribute) {
      normalization.scaleAttribute = getNormalizationScale(viewer);
      applyNormalizationScale(viewer, normalization);
    }
    button.disabled = false;
  });

  viewer.addEventListener("error", () => {
    if (viewer.getAttribute("src") === item.partsSrc) button.disabled = false;
  });

  card.append(viewer, input, button);
  return card;
}

function getNormalizationScale(viewer) {
  if (typeof viewer.getDimensions !== "function") return null;

  const dimensions = viewer.getDimensions();
  const maxDimension = Math.max(
    Number(dimensions?.x) || 0,
    Number(dimensions?.y) || 0,
    Number(dimensions?.z) || 0,
  );

  if (!Number.isFinite(maxDimension) || maxDimension <= 0) return null;

  const scale = normalizedModelExtent / maxDimension;
  const formattedScale = Number(scale.toPrecision(8)).toString();
  return `${formattedScale} ${formattedScale} ${formattedScale}`;
}

function applyNormalizationScale(viewer, normalization) {
  if (!normalization.scaleAttribute) return;
  viewer.setAttribute("scale", normalization.scaleAttribute);
}

function toggleTexture(viewer, button, title, normalization) {
  const partsSrc = button.dataset.partsSrc;
  const texturedSrc = button.dataset.texturedSrc;
  const label = button.querySelector("[data-texture-label]");
  if (!partsSrc || !texturedSrc) return;

  const isShowingTextured = viewer.getAttribute("src") === texturedSrc;
  const nextSrc = isShowingTextured ? partsSrc : texturedSrc;
  if (viewer.getAttribute("src") === nextSrc) return;

  button.disabled = true;
  if (label) label.textContent = isShowingTextured ? "Loading parts & axes" : "Loading textured animation";
  applyNormalizationScale(viewer, normalization);

  const cleanup = () => {
    viewer.removeEventListener("load", handleLoad);
    viewer.removeEventListener("error", handleError);
  };

  const handleLoad = () => {
    if (viewer.getAttribute("src") !== nextSrc) return;
    cleanup();
    const nowShowingTextured = nextSrc === texturedSrc;
    applyNormalizationScale(viewer, normalization);
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
