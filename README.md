# Alternative Ancient History — Summarized

Collecting the arguments and evidence from the "alternative" side of ancient history in one
place, and being honest about which of them hold up. Written for someone who assumes the whole
field is nonsense — because some of it is, and telling the difference is the point.

**→ [Open the site](https://carefulcamel61097.github.io/ancient-history-video-search/)**

## The pages

| page | what it is |
|---|---|
| [`/`](https://carefulcamel61097.github.io/ancient-history-video-search/) | the argument, claim → argument → evidence. **Placeholder text for now** |
| [`/search/`](https://carefulcamel61097.github.io/ancient-history-video-search/search/) | search ~4,500 videos by describing what you half-remember |
| [`/kb/`](https://carefulcamel61097.github.io/ancient-history-video-search/kb/) | videos summarised: the argument, the evidence offered, and where it stops |
| [`/gallery/`](https://carefulcamel61097.github.io/ancient-history-video-search/gallery/) | topics and the arguments they serve. **Not built yet** |

## Searching on meaning

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

## What the summaries are, and are not

Each entry records **what was argued and what evidence was offered for it**. It does not endorse
the argument. Every entry carries two sections that are not summary and are not optional:

- **Where this is checkable** — what a reader could go and verify for themselves.
- **Open questions [the presenter] leaves** — where the argument stops, what is asserted rather
  than shown, what analysis is missing.

Where the evidence on screen turns out to be a diagram of a claim, a stock photograph or a
museum screenshot rather than a photograph of the thing itself, the entry says so. Some entries
conclude that a famous mystery has an ordinary answer; those are among the most useful ones here.

Entries are drafted, then checked by hand against the video before they are considered done.

## About the sources

The material belongs to the channels that made it. Every result and every image links to the
creator's own video at the moment in question — that is where the actual content is, and the
point of this index is to send you there.

Snippets on the search page come from auto-generated captions, which are unreliable in exactly
the places worth citing: proper nouns, numbers and units. **They are for finding a moment, not
for quoting.** Watch the video before relying on any wording.

If you are a channel owner and would rather not be included, open an issue.

## What is in the index

Roughly 4,500 videos across 22 channels, covering both the "alternative" side of ancient history
and mainstream counterpoints, cut into ~157,000 overlapping passages of about 230 words each.

## Contents of this repo

```
index.html      the argument page
search/         the transcript search application
kb/             generated knowledge-base entries
gallery/        topics and arguments
assets/         shared stylesheet and theme toggle
data/           generated search index
  vectors.i8      passage vectors, int8, reduced to 192 dims by uncentred SVD
  chunks.json     video ids, channels, titles, timestamps
  terms.json      keyword index vocabulary
  postings.bin    delta-varint postings with term frequency packed in
  text/           passage snippets, sharded and fetched on demand
```

The knowledge-base pages are generated from markdown that lives in the private research repo;
editing them here would be overwritten on the next build.
