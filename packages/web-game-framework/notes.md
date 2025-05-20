# notes

i think i've gotten a little confused about the point of the event system. to clean things up, i propose:

1. the purpose of events is to make things more polite between objects. objects shouldn't call each other's methods (other than maybe `emit` or similar). instead, only objects should be able to call their own methods. it'd probably be ideal to make methods private or something, but that may be more trouble than it's worth.

2. there should maybe be two event names for every event: the default event name, and an "after" name. for example: "mouse-move" and "after-mouse-move" (or "mouse-moved" or whatever). and the latter should only be emitted (usually) by the object after it's done handling the event. so, for example, the flow might look like this:

- some entity outside the object would call `object.emit("mouse-move")`
- the object would handle the event
- after handling the event, the object would call `this.emit("after-mouse-move")`

i'm torn between using "after-mouse-move" and "mouse-moved". the former doesn't have to worry about transforming a verb into past tense, which comes with complications (e.g., "read" (present) vs. "read" (past)). but using "after-" with everything feels awfully verbose.
