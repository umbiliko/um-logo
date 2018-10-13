const argbExpr = /^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i;

export default (color: string): number[] | null => color.replace(
    argbExpr,
    (a, r, g, b) => [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), parseInt(a, 16)].join(',')
).split(/,/).map(d => parseInt(d, 10));