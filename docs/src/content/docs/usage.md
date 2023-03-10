---
title: 'Usage'
description: 'Docs on how to implement and use the react-use-carousel-hook npm package'
---

## Overview

You can easily display a carousel by importing the hook and use the returned components from said hook. There are four available components. 
- The first one is the `Carousel` component which is needed to enable propper a11y.
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

## Styles

You can import the provided CSS file, which will add styles to make the carousel slides look and feel like a carousel. You control with your own CSS how many slides per view you want to show. See the [examples]("/examples") page for more informations.

```tsx
import 'react-use-carousel-hook/dist/index.css';
```

## Hook

### Usage

The `useCarousel` hook returns four components and accpets [options](#options) as parameter.

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
| children | `ReactNode` | `undefined` | Used as wrapper for `Slides`, `Control`, `Pagination`. Can also include any other jsx. |
|  |  |  | _+ All props that are supported by the `<div/>` element._ |

### `Slides`

Wrapper component for the slides.

```tsx
<Slides>
  {[1, 2, 3, 4].map((item) => (
    <div key={item}>Slide {item}</div>
  ))}
</Slides>
```

| Prop       | Type             | Default     | Description                 |
| ---------- | ---------------- | ----------- | --------------------------- |
| children | `ReactElement[]` | `undefined` | The slides of the carousel. |
|  |  |  | _+ All props that are supported by the `<div/>` element._ |

### `Control`

This component can be used to display a previous or next slide button. To style a disabled control button use the [`:disabled`](https://developer.mozilla.org/en-US/docs/Web/CSS/:disabled) pseudo-class in CSS.

```tsx
<Control direction="prev"/>
<Control direction="next"/>
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| direction | `"prev" \| "next"` | `undefined` | The direction in which the carousel should scroll/slide when clicked. |
|  |  |  | _+ All props that are supported by the `<button/>` element._ |

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
|  |  |  | _+ All props that are supported by the `<div/>` element._ |

##### Next: [Examples](/examples)
