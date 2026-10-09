// Generates the placeholder Lottie icons in /public/lottie/.
// Run: node scripts/generate-lottie.mjs
// Replace the output files with designer-made Lottie JSON whenever you like;
// the site only expects /public/lottie/<name>.json to exist.
import { mkdirSync, writeFileSync } from 'node:fs';

const FR = 60;
const OP = 90; // 1.5s per cycle
const BLUE = [0.231, 0.51, 0.965, 1];
const ORANGE = [0.976, 0.451, 0.086, 1];
const LIGHT = [0.953, 0.957, 0.973, 1];
const EASE = { i: { x: [0.33], y: [1] }, o: { x: [0.67], y: [0] } };

const still = (k) => ({ a: 0, k });
/** Keyframed property: frames = [[t, value], ...] */
const anim = (frames) => ({
  a: 1,
  k: frames.map(([t, s], idx) =>
    idx < frames.length - 1
      ? { t, s: Array.isArray(s) ? s : [s], ...EASE }
      : { t, s: Array.isArray(s) ? s : [s] },
  ),
});

const tr = ({
  p = [0, 0],
  a = [0, 0],
  s = still([100, 100]),
  r = still(0),
  o = still(100),
} = {}) => ({
  ty: 'tr',
  p: p.a !== undefined ? p : still(p),
  a: still(a),
  s,
  r,
  o,
  sk: still(0),
  sa: still(0),
});
const stroke = (c, w = 4) => ({
  ty: 'st',
  c: still(c),
  o: still(100),
  w: still(w),
  lc: 2,
  lj: 2,
  ml: 4,
});
const fill = (c) => ({ ty: 'fl', c: still(c), o: still(100), r: 1 });
const ellipse = (size, p = [0, 0]) => ({ ty: 'el', p: still(p), s: still([size, size]), d: 1 });
const rect = (w, h, p = [0, 0], r = 0) => ({
  ty: 'rc',
  p: still(p),
  s: still([w, h]),
  r: still(r),
  d: 1,
});
const path = (v, closed = false) => ({
  ty: 'sh',
  ks: still({ v, i: v.map(() => [0, 0]), o: v.map(() => [0, 0]), c: closed }),
});
const trim = (end) => ({ ty: 'tm', s: still(0), e: end, o: still(0), m: 1 });
const group = (items, transform = tr()) => ({ ty: 'gr', it: [...items, transform] });

const layer = (shapes, ind = 1) => ({
  ddd: 0,
  ind,
  ty: 4,
  sr: 1,
  ks: {
    o: still(100),
    r: still(0),
    p: still([48, 48, 0]),
    a: still([0, 0, 0]),
    s: still([100, 100, 100]),
  },
  ao: 0,
  shapes,
  ip: 0,
  op: OP,
  st: 0,
  bm: 0,
});

const doc = (nm, layers) => ({
  v: '5.7.4',
  fr: FR,
  ip: 0,
  op: OP,
  w: 96,
  h: 96,
  nm,
  ddd: 0,
  assets: [],
  layers,
});

const icons = {
  // Pen stroke: a handwriting squiggle draws itself while a nib follows it.
  content: doc('content', [
    layer(
      [
        group(
          [rect(8, 22, [0, 0], 2), fill(ORANGE)],
          tr({
            p: anim([
              [0, [-26, 6]],
              [50, [26, 6]],
              [OP, [26, 6]],
            ]),
            r: still(35),
          }),
        ),
      ],
      1,
    ),
    layer(
      [
        group([
          path([
            [-30, 18],
            [-20, 6],
            [-10, 18],
            [0, 6],
            [10, 18],
            [20, 6],
            [30, 18],
          ]),
          trim(
            anim([
              [0, 0],
              [50, 100],
            ]),
          ),
          stroke(BLUE, 4),
        ]),
        group([
          path([
            [-30, -20],
            [30, -20],
          ]),
          stroke(LIGHT, 3),
        ]),
        group([
          path([
            [-30, -8],
            [14, -8],
          ]),
          stroke(LIGHT, 3),
        ]),
      ],
      2,
    ),
  ]),

  // Target pulse: rings stay put while an outer ring expands and fades.
  ads: doc('ads', [
    layer(
      [
        group(
          [ellipse(56), stroke(BLUE, 3)],
          tr({
            s: anim([
              [0, [70, 70]],
              [60, [135, 135]],
              [OP, [135, 135]],
            ]),
            o: anim([
              [0, 100],
              [60, 0],
              [OP, 0],
            ]),
          }),
        ),
      ],
      1,
    ),
    layer(
      [
        group([ellipse(56), stroke(BLUE, 4)]),
        group([ellipse(32), stroke(LIGHT, 4)]),
        group(
          [ellipse(10), fill(ORANGE)],
          tr({
            s: anim([
              [0, [100, 100]],
              [20, [150, 150]],
              [45, [100, 100]],
            ]),
          }),
        ),
      ],
      2,
    ),
  ]),

  // Magnifier scan: the lens sweeps left and right over lines of "text".
  seo: doc('seo', [
    layer(
      [
        group(
          [
            group([ellipse(30), stroke(BLUE, 4)]),
            group([
              path([
                [11, 11],
                [24, 24],
              ]),
              stroke(ORANGE, 5),
            ]),
          ],
          tr({
            p: anim([
              [0, [-12, -4]],
              [40, [12, -4]],
              [70, [0, -4]],
              [OP, [0, -4]],
            ]),
          }),
        ),
      ],
      1,
    ),
    layer(
      [
        group(
          [
            path([
              [-34, -22],
              [34, -22],
            ]),
            stroke(LIGHT, 3),
          ],
          tr({ o: still(45) }),
        ),
        group(
          [
            path([
              [-34, 22],
              [20, 22],
            ]),
            stroke(LIGHT, 3),
          ],
          tr({ o: still(45) }),
        ),
      ],
      2,
    ),
  ]),

  // Gear rotation: one confident half-turn with ease in/out.
  automation: doc('automation', [
    layer([
      group(
        [
          ...Array.from({ length: 8 }, (_, i) =>
            group(
              [rect(9, 12, [0, 0], 2), fill(BLUE)],
              tr({
                p: [Math.sin((i * Math.PI) / 4) * 26, -Math.cos((i * Math.PI) / 4) * 26],
                r: still(i * 45),
              }),
            ),
          ),
          group([ellipse(46), fill(BLUE)]),
          group([ellipse(18), fill([0.071, 0.078, 0.11, 1])]),
          group([ellipse(8), fill(ORANGE)]),
        ],
        tr({
          r: anim([
            [0, 0],
            [70, 180],
            [OP, 180],
          ]),
        }),
      ),
    ]),
  ]),

  // Node network: links draw in, then nodes pop.
  strategy: doc('strategy', [
    layer(
      [
        [-24, -18],
        [22, -24],
        [26, 20],
        [-18, 24],
        [0, 0],
      ].map(([x, y], i) =>
        group(
          [ellipse(i === 4 ? 14 : 10, [x, y]), fill(i === 4 ? ORANGE : BLUE)],
          tr({
            a: [x, y],
            p: [x, y],
            s: anim([
              [10 + i * 6, [0, 0]],
              [30 + i * 6, [120, 120]],
              [40 + i * 6, [100, 100]],
            ]),
          }),
        ),
      ),
      1,
    ),
    layer(
      [
        group([
          path([
            [-24, -18],
            [0, 0],
            [22, -24],
          ]),
          path([
            [0, 0],
            [26, 20],
          ]),
          path([
            [0, 0],
            [-18, 24],
          ]),
          path([
            [-24, -18],
            [-18, 24],
          ]),
          trim(
            anim([
              [0, 0],
              [40, 100],
            ]),
          ),
          stroke(LIGHT, 2.5),
        ]),
      ],
      2,
    ),
  ]),

  // Bar chart: bars grow from the baseline, staggered.
  analytics: doc('analytics', [
    layer([
      ...[
        [-20, 26, BLUE],
        [0, 44, BLUE],
        [20, 60, ORANGE],
      ].map(([x, h, c], i) =>
        group(
          [rect(12, h, [0, -h / 2], 3), fill(c)],
          tr({
            p: [x, 30],
            s: anim([
              [i * 8, [100, 0]],
              [40 + i * 8, [100, 100]],
            ]),
          }),
        ),
      ),
      group([
        path([
          [-34, 31],
          [34, 31],
        ]),
        stroke(LIGHT, 3),
      ]),
    ]),
  ]),
};

mkdirSync(new URL('../public/lottie/', import.meta.url), { recursive: true });
for (const [name, data] of Object.entries(icons)) {
  writeFileSync(new URL(`../public/lottie/${name}.json`, import.meta.url), JSON.stringify(data));
}
console.log('Wrote', Object.keys(icons).length, 'Lottie files');
