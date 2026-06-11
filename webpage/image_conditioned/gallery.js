const resultBase = "/webpage/image_conditioned/results";

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
  resultAsset("assets-802c1ccad00e90567182698145546d2f", "Image-Conditioned Result 01", {
    inputAlt: "Stainless steel pedal bin conditioning input",
  }),
  resultAsset("assets-54ca4892caaa2413d290c99dca417006", "Image-Conditioned Result 02", {
    inputAlt: "Rectangular pedal bin conditioning input",
  }),
  resultAsset("articulated-models-2-007", "Image-Conditioned Result 03"),
  resultAsset("articulated-models-5-019", "Image-Conditioned Result 04"),
  resultAsset("articulated-models-5-011", "Image-Conditioned Result 05"),
  resultAsset("articulated-models-5-005", "Image-Conditioned Result 06"),
  resultAsset("articulated-models-5-002", "Image-Conditioned Result 07"),
  resultAsset("articulated-models-3-000", "Image-Conditioned Result 08"),
  resultAsset("articulated-models-5-010", "Image-Conditioned Result 09"),
  resultAsset("articulated-models-5-004", "Image-Conditioned Result 10"),
  resultAsset("articulated-model-046", "Image-Conditioned Result 11"),
  resultAsset("2c0c6134800d926367827b58ce8a3ecf", "Image-Conditioned Result 12", {
    inputAlt: "Stand mixer conditioning input",
  }),
  resultAsset("4857147c301f001520ddcfb11189fc8f", "Image-Conditioned Result 13", {
    inputAlt: "Bicycle conditioning input",
  }),
  resultAsset("4e11c085443c93b3efb7f4df6218ab05", "Image-Conditioned Result 14", {
    inputAlt: "Drone conditioning input",
  }),
  resultAsset("hy-eval-024", "Image-Conditioned Result 15", {
    inputAlt: "Faucet conditioning input",
  }),
  resultAsset("hy-eval-008", "Image-Conditioned Result 16", {
    inputAlt: "Soap dispenser conditioning input",
  }),
  resultAsset("hy-eval-041", "Image-Conditioned Result 17", {
    inputAlt: "Table conditioning input",
  }),
  resultAsset("hy-eval-017", "Image-Conditioned Result 18", {
    inputAlt: "Stapler conditioning input",
  }),
  resultAsset("hy-eval-000", "Image-Conditioned Result 19", {
    inputAlt: "Bucket conditioning input",
  }),
  resultAsset("hy-eval-029", "Image-Conditioned Result 20", {
    inputAlt: "Laptop conditioning input",
  }),
  resultAsset("hy-eval-013", "Image-Conditioned Result 21", {
    inputAlt: "Suitcase conditioning input",
  }),
  resultAsset("hy-eval-050", "Image-Conditioned Result 22", {
    inputAlt: "Stapler conditioning input",
  }),
  resultAsset("hy-eval-021", "Image-Conditioned Result 23", {
    inputAlt: "Toilet conditioning input",
  }),
  resultAsset("hy-eval-005", "Image-Conditioned Result 24", {
    inputAlt: "Globe conditioning input",
  }),
  resultAsset("hy-eval-039", "Image-Conditioned Result 25", {
    inputAlt: "Desk conditioning input",
  }),
  resultAsset("hy-eval-012", "Image-Conditioned Result 26", {
    inputAlt: "Soap dispenser conditioning input",
  }),
  resultAsset("hy-eval-026", "Image-Conditioned Result 27", {
    inputAlt: "Stapler conditioning input",
  }),
  resultAsset("hy-eval-015", "Image-Conditioned Result 28", {
    inputAlt: "Faucet conditioning input",
  }),
  resultAsset("hy-eval-022", "Image-Conditioned Result 29", {
    inputAlt: "Sunglasses conditioning input",
  }),
  resultAsset("articulated-models-2-004", "Image-Conditioned Result 30"),
  resultAsset("articulated-models-3-004", "Image-Conditioned Result 31"),
  resultAsset("articulated-models-5-015", "Image-Conditioned Result 32"),
  resultAsset("articulated-models-5-021", "Image-Conditioned Result 33"),
  resultAsset("articulated-models-2-005", "Image-Conditioned Result 34"),
  resultAsset("cfa75307489fe67b4ee40f38839e40dd", "Image-Conditioned Result 35", {
    inputAlt: "Blender conditioning input",
  }),
  resultAsset("8006c06cdf7bc0c44990f021a7fc9450", "Image-Conditioned Result 36", {
    inputAlt: "Electric cooktop conditioning input",
  }),
  resultAsset("USB2-manual", "Image-Conditioned Result 37", {
    inputAlt: "USB flash drive conditioning input",
  }),
  resultAsset("scrooter2-auto", "Image-Conditioned Result 38", {
    inputAlt: "Kick scooter conditioning input",
  }),
  resultAsset("toaster1-auto", "Image-Conditioned Result 39", {
    inputAlt: "Toaster conditioning input",
  }),
  resultAsset("bicycle-auto", "Image-Conditioned Result 40", {
    inputAlt: "Bicycle conditioning input",
  }),
  resultAsset("calculator-manualallkey", "Image-Conditioned Result 41", {
    inputAlt: "Calculator conditioning input",
  }),
  resultAsset("lamp7-auto", "Image-Conditioned Result 42", {
    inputAlt: "Desk lamp conditioning input",
  }),
];

const textureIcon = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 22a7 7 0 0 0 7-7c0-2.8-1.5-4.7-3-6.7-1.2-1.6-2.4-3.1-3-5.3-3.9 3-8 6.5-8 12a7 7 0 0 0 7 7z" />
    <path d="M12 22a4 4 0 0 0 4-4c0-1.8-1.1-3-2.1-4.2-.8-.9-1.5-1.9-1.9-3.3-2.2 1.8-4 3.7-4 6.5a4 4 0 0 0 4 4z" />
  </svg>
`;

function createGenerationViewer(src, alt, { eager = false } = {}) {
  const viewer = document.createElement("model-viewer");
  viewer.className = "generation-viewer";
  viewer.setAttribute("src", src);
  viewer.setAttribute("alt", alt);
  viewer.setAttribute("camera-controls", "");
  viewer.setAttribute("auto-rotate", "");
  viewer.setAttribute("autoplay", "");
  viewer.setAttribute("interaction-prompt", "none");
  viewer.setAttribute("loading", eager ? "eager" : "lazy");
  viewer.setAttribute("shadow-intensity", "0.65");
  viewer.setAttribute("exposure", "1");
  viewer.setAttribute("orientation", "0deg -90deg 0deg");
  // Pin a fixed vertical field of view (radius still auto-frames each model) so
  // the parts and textured viewers never adapt fov independently. Equal fov is
  // a prerequisite for the camera-radius copy in syncViewerCamera to yield an
  // identical projection, and hence an identical on-screen scale. Pinning
  // min == max == field-of-view also stops model-viewer's "zoom past the closest
  // orbit shrinks the fov" behaviour, so user zoom only ever changes the orbit
  // radius — which we keep in sync between the two viewers.
  viewer.setAttribute("field-of-view", "30deg");
  viewer.setAttribute("min-field-of-view", "30deg");
  viewer.setAttribute("max-field-of-view", "30deg");
  return viewer;
}

// Mirror the full camera state from `source` onto `target` so the two viewers
// of a pair always show the model at the same scale, position and orientation —
// including after the user zooms, pans or drags. We copy:
//   * camera-target   (pan / look-at point)
//   * camera-orbit     theta, phi (manual rotation) AND radius (zoom)
//   * turntableRotation (the `auto-rotate` scene yaw, which is independent of the
//                        camera orbit and only advances on the visible viewer)
//
// Because the two GLBs share a coordinate frame and the fov is fixed-equal on
// both (see createGenerationViewer), copying the orbit radius is what makes the
// on-screen size identical. The caller is responsible for giving both viewers a
// shared zoom band first (see applyRadiusBounds) so the copied radius is not
// clamped to a viewer's own tighter auto-framing distance.
//
// Written via `setAttribute` (declarative, authoritative) so it survives
// model-viewer's own auto-framing pass, and applied only after the target has
// painted at least once — otherwise its camera controller is not yet
// initialised and the values are silently dropped. Callers therefore invoke
// this from inside a `requestAnimationFrame`.
function syncViewerCamera(source, target) {
  if (!source || !target || typeof source.getCameraOrbit !== "function") return;
  const orbit = source.getCameraOrbit();
  if (!orbit) return;
  if (typeof source.getCameraTarget === "function") {
    const center = source.getCameraTarget();
    target.setAttribute("camera-target", `${center.x}m ${center.y}m ${center.z}m`);
  }
  target.setAttribute("camera-orbit", `${orbit.theta}rad ${orbit.phi}rad ${orbit.radius}m`);
  // Match the auto-rotate turntable angle (radians). resetTurntableRotation sets
  // the scene yaw; auto-rotate then keeps accumulating from there.
  const yaw = source.turntableRotation;
  if (typeof yaw === "number" && Number.isFinite(yaw) &&
      typeof target.resetTurntableRotation === "function") {
    target.resetTurntableRotation(yaw);
  }
  if (typeof target.jumpCameraToGoal === "function") target.jumpCameraToGoal();
}

// Each card keeps two stacked viewers (parts + textured) and toggles which is
// visible. Swapping a single viewer's `src` back and forth triggers a
// model-viewer cache bug where re-requesting a previously-shown URL reuses a
// disposed cache entry and fires `error` instead of `load`, leaving the toggle
// stuck on "Loading…". Loading each model once and toggling visibility avoids
// that entirely and makes switching instant after the first load.
function createResultCard(item) {
  const card = document.createElement("article");
  card.className = "generation-card";
  card.dataset.resultId = item.id;

  const partsViewer = createGenerationViewer(
    item.partsSrc,
    `Generated articulated 3D asset for ${item.title}`,
  );

  let texturedViewer = null;
  let showingTextured = false;
  let partsReady = false;
  // The parts model's framing distance, captured once. It is the shared zoom-out
  // limit for both viewers and the reference the radius copy must not be clamped
  // below, so the two models stay the same size at every zoom level.
  let sharedRadius = null;

  const captureSharedRadius = () => {
    if (sharedRadius) return sharedRadius;
    const orbit =
      typeof partsViewer.getCameraOrbit === "function" ? partsViewer.getCameraOrbit() : null;
    if (orbit && Number.isFinite(orbit.radius) && orbit.radius > 0) sharedRadius = orbit.radius;
    return sharedRadius;
  };

  // Give a viewer the shared zoom band [0.25·R, R]. This (a) lets the textured
  // viewer accept the parts viewer's (larger) framing radius instead of clamping
  // it to its own tighter auto distance, and (b) makes both viewers zoom within
  // the identical range so their sizes stay locked together as the user zooms.
  const applyRadiusBounds = (viewer) => {
    const r = captureSharedRadius();
    if (!viewer || !r) return;
    viewer.setAttribute("min-camera-orbit", `auto auto ${(r * 0.25).toFixed(5)}m`);
    viewer.setAttribute("max-camera-orbit", `auto auto ${r.toFixed(5)}m`);
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
  button.setAttribute("aria-label", `Show textured animation for ${item.title}`);
  button.innerHTML = `${textureIcon}<span data-texture-label>Show textured animation</span>`;

  const setButtonLabel = (textured, { loading = false } = {}) => {
    const label = button.querySelector("[data-texture-label]");
    if (label) {
      label.textContent = loading
        ? (textured ? "Loading textured animation" : "Loading parts & axes")
        : (textured ? "Show parts & axes" : "Show textured animation");
    }
    if (!loading) {
      button.classList.toggle("is-textured", textured);
      button.setAttribute(
        "aria-label",
        `${textured ? "Show parts & axes" : "Show textured animation"} for ${item.title}`,
      );
    }
  };

  // `model-viewer` sets `:host { display: block }` in its shadow DOM, which
  // overrides the UA `[hidden] { display: none }` rule. Toggle visibility with
  // an inline `display` style instead, since inline styles win over `:host`.
  const setViewerVisible = (viewer, visible) => {
    if (viewer) viewer.style.display = visible ? "" : "none";
  };

  const ensureTexturedViewer = () => {
    if (texturedViewer) return texturedViewer;
    // Use eager loading so the model fetches even while hidden (display:none
    // elements never intersect the viewport, so lazy loading would never fire).
    texturedViewer = createGenerationViewer(
      item.texturedSrc,
      `Textured animation for ${item.title}`,
      { eager: true },
    );
    setViewerVisible(texturedViewer, false);
    // Allow the textured viewer to reach the parts viewer's framing radius and
    // zoom within the same band, so the radius copy below is never clamped.
    applyRadiusBounds(texturedViewer);
    card.insertBefore(texturedViewer, input);
    return texturedViewer;
  };

  const showParts = () => {
    showingTextured = false;
    setViewerVisible(texturedViewer, false);
    setViewerVisible(partsViewer, true);
    // Adopt the textured view's current camera (incl. any zoom/pan the user did)
    // so the size stays consistent, once parts has painted this frame.
    if (texturedViewer) {
      requestAnimationFrame(() => syncViewerCamera(texturedViewer, partsViewer));
    }
    button.disabled = false;
    setButtonLabel(false);
  };

  const showTextured = () => {
    showingTextured = true;
    setViewerVisible(partsViewer, false);
    setViewerVisible(texturedViewer, true);
    // Adopt the parts viewer's full camera (framing + current zoom + rotation) so
    // the textured model renders at the same scale and orientation. Deferred to
    // the next frame so the textured viewer's camera controller exists and the
    // attributes stick.
    requestAnimationFrame(() => {
      applyRadiusBounds(texturedViewer);
      syncViewerCamera(partsViewer, texturedViewer);
    });
    button.disabled = false;
    setButtonLabel(true);
  };

  button.addEventListener("click", () => {
    if (!partsReady) return;
    if (showingTextured) {
      showParts();
      return;
    }

    const viewer = ensureTexturedViewer();
    if (viewer.loaded) {
      showTextured();
      return;
    }

    button.disabled = true;
    setButtonLabel(true, { loading: true });

    const cleanup = () => {
      viewer.removeEventListener("load", onLoad);
      viewer.removeEventListener("error", onError);
    };
    const onLoad = () => {
      cleanup();
      showTextured();
    };
    const onError = () => {
      cleanup();
      button.disabled = false;
      setButtonLabel(false);
    };
    viewer.addEventListener("load", onLoad, { once: true });
    viewer.addEventListener("error", onError, { once: true });
  });

  partsViewer.addEventListener("load", () => {
    partsReady = true;
    button.disabled = false;
    // Capture the auto-framing radius (after it settles) and pin the shared zoom
    // band on the parts viewer, so it zooms within the same range as textured.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        captureSharedRadius();
        applyRadiusBounds(partsViewer);
      }),
    );
  });

  partsViewer.addEventListener("error", () => {
    button.disabled = false;
  });

  card.append(partsViewer, input, button);
  return card;
}

export function renderGenerationGrid(grid, items, options = {}) {
  const limit = Number.isFinite(options.limit) ? Math.max(0, options.limit) : items.length;
  const visibleItems = items.slice(0, limit);
  grid.replaceChildren(...visibleItems.map(createResultCard));
  return visibleItems.length;
}
