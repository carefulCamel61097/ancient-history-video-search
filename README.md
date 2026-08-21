# Alternative Ancient History — Video Search

Search the spoken content of YouTube channels covering alternative ancient history --
megalithic building, lost technology, catastrophe and myth -- by describing what you
half-remember, rather than by guessing the right keyword. Mainstream counterpoint
channels are indexed too, so both sides of a question are searchable.

Type something like *"walls that look the same on opposite sides of the world"* and it returns
which channel, which video, and the timestamp where it was said.

**→ [Open the search](https://carefulcamel61097.github.io/ancient-history-video-search/)**

## Why it works on descriptions

The word you remember is usually not the word the presenter used. In this corpus, "polygonal"
appears in only 9 of the first 12,000 passages — people say *"the way they fit together"*,
*"puzzle"*, *"pillowy"*, *"nubs"* instead. So keyword search alone fails on exactly the queries
people actually have.

The page runs two searches at once and merges them:

- **Meaning** — the query is embedded in your browser with
  [all-MiniLM-L6-v2](https://huggingface.co/Xenova/all-MiniLM-L6-v2) and compared against
  precomputed passage vectors. This handles a description.
- **Words** — BM25 over an inverted index. This handles proper nouns, rare terms and numbers,
  where embeddings are weak.

They fail in opposite directions, so the results are fused by reciprocal rank.

Everything runs client-side. There is no backend and no API key; the page is static files.

## About the sources

The material belongs to the channels that made it. Every result links to the creator's own video
at the moment in question — that is where the actual content is, and the point of this index is to
send you there.

Snippets shown here come from auto-generated captions, which are unreliable in exactly the places
worth citing: proper nouns, numbers and units. **They are for finding a moment, not for quoting.**
Watch the video before relying on any wording.

If you are a channel owner and would rather not be included, open an issue.

## What is in the index

Roughly 4,500 videos across 22 channels, covering both the "alternative" side of ancient history
and mainstream counterpoints, cut into ~157,000 overlapping passages of about 230 words each.

## Contents of this repo

```
index.html    the whole application
data/         generated search index
  vectors.i8    passage vectors, int8, reduced to 192 dims by uncentred SVD
  chunks.json   video ids, channels, titles, timestamps
  terms.json    keyword index vocabulary
  postings.bin  delta-varint postings with term frequency packed in
  text/         passage snippets, sharded and fetched on demand
```

`data/` is generated and can be rebuilt from the (private) research repo that holds the
download, chunking, embedding and export tooling.
