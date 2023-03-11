# React `useCarousel` hook 🎠

This npm package provides react components to display a carousel. The components can be loaded through a `useCarousel` hook. The carousel is quite simple but still supports a wide set of requirements and is easy to use.

## Key features

- 🫱🏾‍🫲🏼 Load **multiple carousels on one page** without conflicts
- ⚡️ Easy to use `Carousel`, `Slides`, `Control` and `Pagination` components
- 📦 **Lightweight** and **zero dependencies** (besides react)
- 𝌕 Supports **multiple slides per view** without any custom configurations 
- ⚛️ Realized with vanilla JavaScript and [CSS Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap) for React apps
- 🦮 **Accessible** and automatically applied aria attributes

## Installation

```bash
npm install react-use-carousel-hook
# or
yarn add react-use-carousel-hook
```

## Usage

With `react-use-carousel-hook` you can easily display a carousel by importing the hook and use the returned components. There are four available components. 
- The first one is the `Carousel` component which is needed to support the aria attributes.
- The second one is the `Slides` component which is used to wrap your slides. 
- The third one is the `Control` component which can be used to display previous / next slide buttons. 
- The last one is the `Pagination` component which can be used to display a pagination representing the carousel slides.

```tsx
import { useCarousel } from 'react-use-carousel-hook';
import "react-use-carousel-hook/dist/index.css";

const YourComponent = ({ items = [] }) => {
  const { Carousel, Slides, Control, Pagination } = useCarousel();

  return (
    <Carousel>
      <Slides>
        {items.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))}
      </Slides>

      <Control direction="prev" />

      <Pagination buttonClassName="bg-gray aria-selected:bg-black" />
      {/* OR */}
      <Pagination>
        {(index) => <button className="bg-gray aria-selected:bg-black">Slide number {index}</button>}
      </Pagination>

      <Control direction="next" />
    </Carousel>
  );
};
```

See [the docs](https://react-use-carousel-hook.vercel.app/) for API reference, examples and more.

## Should I use a carousel?
Short answer, no. See [shouldiuseacarousel.com](https://shouldiuseacarousel.com) for more information on this topic. If you want or have to use a carousel anyway you're more than welcome to use this one. :-)

## Contributors

Big thanks to all our contributors who helped with this project.

[![](https://github.com/faessler.png?size=50)](https://github.com/faessler)
