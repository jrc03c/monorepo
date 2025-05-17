# notes

- ontology
  - hierarchy
    - corpus
    - document
    - part
    - chapter
    - section
    - paragraph
    - sentence
    - phrase
    - word
    - character
  - other
    - metadata
    - index / table of contents
    - appendix
    - annotation
    - reference / citation
    - glossary
    - metadata

every level above the _sentence_ level has _metadata_. at the very least, the metadata should include an _id_. beyond that, the exact kinds of metadata included will probably be level-specific.

every level in the hierarchy has an _index_ of its own contents (though that index probably only needs to be visible at high levels).

_words_ and _sentences_ can have _annotations_ (i.e., footnotes, endnotes, etc.), _references_, and _citations_.

when one thing contains many child things, it probably makes sense to record (perhaps as part of the metadata?) what separates the children. for example, a single chapter may contain multiple sections that are separated by triple asterisks ("* * *").
