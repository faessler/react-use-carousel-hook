# React `useCarousel` hook 🎠

This npm package provides react components to display a carousel. The components can be loaded through a `useCarousel` hook. The carousel is quite simple but still supports a wide set of requirements and is easy to use.

## Should I use a carousel?
Short answer, no. See [shouldiuseacarousel.com](https://shouldiuseacarousel.com) for more information on this topic. If you want or have to use a carousel anyway you're more than welcome to use this one. :-)



## Key features

- Load **multiple carousels on one page** without conflicts
- Easy to use `Carousel`, `Slides`, `Control` and `Pagination` components
- **Lightweight** and **zero dependencies** (besides react)
- Supports **multiple slides per view** without any custom configurations
- Realized with vanilla JavaScript and [CSS Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap)
- **Accessible** and automatically applied aria attributes

## Installation

```bash
npm install react-use-carousel-hook
# or
yarn add react-use-carousel-hook
```

## Usage

With `react-use-carousel-hook` you can easily display a carousel by importing the hook and use the returned components. There are four available components. 
The first one is the `Carousel` component which is needed to support the aria attributes.
The second one is the `Slides` component which is used to wrap your slides. 
The third one is the `Control` component which can be used to display previous / next slide buttons. 
The last one is the `Pagination` component which can be used to display a pagination representing the carousel slides.

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

<!-- The example from above renders the following HTML:

```html
TODO
``` -->

## Hook

### Usage

The `useCarousel` hook returns four components and accpets some options as function parameter.

```tsx
const { Slides } = useCarousel({ loop: false });
```

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `loop` | `boolean` | `false` | If set to false the `Control` prev/next button will be disabled when start/end of carousel is reached. If set to true buttons can always be clicked and carousel jumps to start if at end and vice versa. |

## Components

There are four components that can be used via the `useCarousel` hook. Those components are `Carousel`, `Slides`, `Control` and `Pagination`. Each of them supports or even requires a number of props.

### `Carousel`

This component is needed to support the aria attributes. Its only purpose is to make the carousel accessible. You can pass anything as children.

```tsx
<Carousel>
  <h2>FooBar</h2>
  <Slides>
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </Slides>
</Carousel>
```

| Prop       | Type        | Default     | Description                 |
| ---------- | ----------- | ----------- | --------------------------- |
| children | `ReactNode` | `undefined` | Any elements. Used as wrapper for `Slides`, `Control`, `Pagination`. |
|  |  |  | _All props that are supported by the `<div/>` element._ |

### `Slides`

Wrapper component for the slides. It will add styles to make the slides look and feel like a carousel.

```tsx
<Slides>
  {[1, 2, 3, 4].map((item) => (
    <div key={item}>Slide {item}</div>
  ))}
</Slides>
```

| Prop       | Type             | Default     | Description                 |
| ---------- | ---------------- | ----------- | --------------------------- |
| children\* | `ReactElement[]` | `undefined` | The slides of the carousel. |
|  |  |  | _All props that are supported by the `<div/>` element._ |

_\* required_

### `Control`

This component can be used to display a previous or next slide button. To style a disabled control button use the [`:disabled`](https://developer.mozilla.org/en-US/docs/Web/CSS/:disabled) pseudo-class in CSS.

```tsx
<Control direction="prev"/>
<Control direction="next"/>
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| direction\* | `"prev" \| "next"` | `undefined` | The direction in which the carousel should scroll/slide when clicked. |
|  |  |  | _All props that are supported by the `<button/>` element._ |

_\* required_

### `Pagination`

This component can be used to display a pagination to control the carousel slides. 
To style the active pagination button use the `&[aria-selected=“true”]` [attribute selector](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Attribute_selectors) in CSS.

Usage of basic pagination with bullets:

```tsx
<Pagination buttonClassName="bg-gray aria-selected:bg-black" />
```

If you need more control and want to display a numbered pagination you can implement it like this:

```tsx
<Pagination>
  {(index) => (
    <button className="bg-gray aria-selected:bg-black">Slide number {index}</button>
  )}
</Pagination>
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| buttonClassName | `string` | `undefined` | Can be used to set classNames to the pagination buttons. |
| children | `(index: number) => HTMLButtonElement` | `undefined` | Will return basic button as pagination point if undefined. Button can be customized by returning a function returning a button. |
|  |  |  | _All props that are supported by the `<div/>` element._ |

## Contributors

Big thanks to all our contributors who helped with this project.

[![](https://github.com/faessler.png?size=50)](https://github.com/faessler)
