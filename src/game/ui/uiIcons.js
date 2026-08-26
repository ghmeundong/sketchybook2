import rough from "roughjs";

export function createRoughStarCanvas(stars = 0, { size = 24, gap = 6 } = {}) {
  const safeStars = Math.max(0, Math.min(3, Number.isFinite(stars) ? Math.round(stars) : 0));
  const canvasWidth = safeStars * size + (safeStars - 1) * gap;
  const canvasHeight = size;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return canvas;
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  const rc = rough.canvas(canvas);
  for (let index = 0; index < safeStars; index += 1) {
    const centerX = index * (size + gap) + size / 2;
    const centerY = size / 2;
    const points = [];
    for (let i = 0; i < 5; i += 1) {
      const outer = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const inner = outer + Math.PI / 5;
      points.push([
        Math.cos(outer) * (size / 2.2) + centerX,
        Math.sin(outer) * (size / 2.2) + centerY,
      ]);
      points.push([
        Math.cos(inner) * (size / 4.6) + centerX,
        Math.sin(inner) * (size / 4.6) + centerY,
      ]);
    }

    rc.polygon(points, {
      stroke: "#b8860b",
      strokeWidth: 1.8,
      fill: "#ffd54f",
      fillStyle: "solid",
      roughness: 1.5,
    });
  }

  return canvas;
}

export function createActionIconSvg(
  type,
  { w = 64, h = 40, stroke = "#4f3b24", fill = "#4f3b24", strokeWidth = 3 } = {}
) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  svg.setAttribute("width", String(w));
  svg.setAttribute("height", String(h));
  svg.setAttribute("aria-hidden", "true");
  svg.style.display = "block";
  svg.style.width = `${w}px`;
  svg.style.height = `${h}px`;

  const roughSvg = rough.svg(svg);
  const options = { stroke, strokeWidth, roughness: 1.5, bowing: 1.1 };
  const appendLine = (x1, y1, x2, y2) => svg.appendChild(roughSvg.line(x1, y1, x2, y2, options));

  if (type === "exit") {
    svg.appendChild(roughSvg.rectangle(18, 6, 20, 28, options));
    appendLine(50, 20, 24, 20);
    appendLine(24, 20, 31, 14);
    appendLine(24, 20, 31, 26);
  } else if (type === "settings") {
    svg.appendChild(
      roughSvg.polygon(
        [
          [26, 14],
          [34, 14],
          [34, 18],
          [38, 18],
          [38, 21],
          [42, 21],
          [42, 27],
          [38, 27],
          [38, 30],
          [34, 30],
          [34, 34],
          [26, 34],
          [26, 30],
          [22, 30],
          [22, 27],
          [18, 27],
          [18, 21],
          [22, 21],
          [22, 18],
          [26, 18],
        ],
        options
      )
    );
    svg.appendChild(roughSvg.circle(30, 24, 8, options));
  } else if (type === "retry") {
    appendLine(42, 30, 22, 30);
    appendLine(22, 30, 22, 10);
    appendLine(22, 10, 42, 10);
    appendLine(42, 10, 42, 20);
    appendLine(42, 20, 35, 14);
    appendLine(42, 20, 49, 14);
  } else if (type === "difficulty-next" || type === "difficulty-prev") {
    const direction = type === "difficulty-next" ? 1 : -1;
    const outerX = direction === 1 ? 12 : w - 12;
    const tipX = direction === 1 ? w - 12 : 12;
    const arrowY = h / 2;
    appendLine(outerX, arrowY - 8, tipX, arrowY);
    appendLine(tipX, arrowY, outerX, arrowY + 8);
  } else if (type === "next") {
    svg.appendChild(
      roughSvg.polygon(
        [
          [18, 8],
          [18, 32],
          [46, 20],
        ],
        { ...options, fill, fillStyle: "solid" }
      )
    );
  } else if (type === "prev") {
    svg.appendChild(
      roughSvg.polygon(
        [
          [w - 18, 8],
          [w - 18, 32],
          [w - 46, 20],
        ],
        { ...options, fill, fillStyle: "solid" }
      )
    );
  }

  return svg;
}

export function createActionIconCanvas(
  type,
  { w = 64, h = 40, stroke = "#4f3b24", fill = "#4f3b24", strokeWidth = 3 } = {}
) {
  const canvas = document.createElement("canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return canvas;
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;
  ctx.lineWidth = strokeWidth;

  const roughCanvas = rough.canvas(canvas);
  const roughOptions = {
    stroke,
    strokeWidth,
    roughness: 1.5,
    bowing: 1.1,
  };

  if (type === "exit") {
    roughCanvas.rectangle(18, 6, 20, 28, roughOptions);
    roughCanvas.line(50, 20, 24, 20, roughOptions);
    roughCanvas.line(24, 20, 31, 14, roughOptions);
    roughCanvas.line(24, 20, 31, 26, roughOptions);
  } else if (type === "settings") {
    roughCanvas.polygon(
      [
        [26, 14],
        [34, 14],
        [34, 18],
        [38, 18],
        [38, 21],
        [42, 21],
        [42, 27],
        [38, 27],
        [38, 30],
        [34, 30],
        [34, 34],
        [26, 34],
        [26, 30],
        [22, 30],
        [22, 27],
        [18, 27],
        [18, 21],
        [22, 21],
        [22, 18],
        [26, 18],
      ],
      roughOptions
    );
    roughCanvas.circle(30, 24, 8, roughOptions);
  } else if (type === "retry") {
    roughCanvas.line(42, 30, 22, 30, roughOptions);
    roughCanvas.line(22, 30, 22, 10, roughOptions);
    roughCanvas.line(22, 10, 42, 10, roughOptions);
    roughCanvas.line(42, 10, 42, 20, roughOptions);
    roughCanvas.line(42, 20, 35, 14, roughOptions);
    roughCanvas.line(42, 20, 49, 14, roughOptions);
  } else if (type === "difficulty-next" || type === "difficulty-prev") {
    const direction = type === "difficulty-next" ? 1 : -1;
    const outerX = direction === 1 ? 12 : w - 12;
    const tipX = direction === 1 ? w - 12 : 12;
    const arrowY = h / 2;
    roughCanvas.line(outerX, arrowY - 8, tipX, arrowY, roughOptions);
    roughCanvas.line(tipX, arrowY, outerX, arrowY + 8, roughOptions);
  } else if (type === "next") {
    roughCanvas.polygon(
      [
        [18, 8],
        [18, 32],
        [46, 20],
      ],
      { ...roughOptions, fill, fillStyle: "solid" }
    );
  } else if (type === "prev") {
    roughCanvas.polygon(
      [
        [w - 18, 8],
        [w - 18, 32],
        [w - 46, 20],
      ],
      { ...roughOptions, fill, fillStyle: "solid" }
    );
  }

  return canvas;
}
