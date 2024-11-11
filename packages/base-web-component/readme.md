# Notes

- Importantly, the base web component does _not_ register itself in the global custom element registry (i.e., it does not do `customElements.define("x-base", BaseComponent)`)! Therefore, it's up to you, the user of the library, to register it yourself. I don't like that it has to be that way, but registering the component from within the library seems to cause bundling issues downstream.
