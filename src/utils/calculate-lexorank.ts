import { LexoRank } from 'lexorank';

interface Props {
  prev?: LexoRank;
  next?: LexoRank;
}

function calculateLexorank({ prev, next }: Props) {
  if (!prev && !next) return LexoRank.middle().toString();
  if (!prev) return next?.genPrev().toString();
  if (!next) return prev?.genNext().toString();
  return prev.between(next).toString();
}

function parseLexorank(lexorank: string | undefined) {
  if (lexorank) return LexoRank.parse(lexorank);
  return undefined;
}

export { calculateLexorank, parseLexorank };
