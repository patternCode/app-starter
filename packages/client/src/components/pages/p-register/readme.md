# p-register



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [app-root](../../components/app-root)

### Depends on

- [c-register](../../components/c-register)
- [c-button](../../components/c-button)

### Graph
```mermaid
graph TD;
  p-register --> c-register
  p-register --> c-button
  c-register --> c-section
  c-register --> c-input
  c-register --> c-button
  c-input --> c-icon
  c-input --> c-label
  c-input --> c-helptext
  app-root --> p-register
  style p-register fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
