import { createStore } from "@stencil/store";

const { state } = createStore({
  clicks: 0,
  tag: '',
  categories: {
    "tag": "c-categories",
    "items": [
      {
        "id": 10,
        "name": "📱  Elektronik",
        "link": ""
      },
      {
        "id": 20,
        "name": "🎩  Mode",
        "link": ""
      },
      {
        "id": 30,
        "name": "🏡  Haus & Garten",
        "link": ""
      },
      {
        "id": 40,
        "name": "🥕  Supermarkt",
        "link": ""
      },
      {
        "id": 50,
        "name": "🎾  Sport",
        "link": ""
      }
    ]
  }
});

/* onChange('clicks', (value) => {
  state.clicks = value;
}); */

export const homeState = state;
