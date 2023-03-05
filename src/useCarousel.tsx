import type { DetailedHTMLProps, HTMLAttributes, ReactElement, ReactNode } from 'react';
import React, { Children, cloneElement, useEffect, useId, useRef, useState } from 'react';
import { classnames } from './classnames';
import { throttle } from './throttle';
import styles from './styles.module.css';

type CarouselProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: ReactNode;
};
type SlidesProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: ReactElement[];
};
type ControlsProps = DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  children: ReactNode;
  direction: 'next' | 'prev';
};
type PaginationProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  buttonClassName?: string | undefined;
  children?: (index: number) => ReactElement<DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>;
};

export const useCarousel = ({ loop = false } = {}) => {
  console.log("styles", styles);
  const slidesRef = useRef<HTMLDivElement>(null);
  const carouselId = useId();
  let hasPagination = false;
  let totalSlidesCount = 0;

  const Carousel = ({ ...rest }: CarouselProps) => {
    const findPagination = (children: ReactNode): boolean => {
      if (Array.isArray(children)) {
        if (children.some((child) => child?.type?.name === 'Pagination')) {
          return true;
        }
        if (children.every((child) => !child.props?.children)) {
          return false;
        }
        return findPagination(children.map((child) => child?.props?.children).filter(Boolean));
      }
      return false;
    };
    hasPagination = findPagination(rest.children);
    return <div {...rest} aria-roledescription="carousel" />;
  };

  const Slides = ({ children, className, ...rest }: SlidesProps) => {
    totalSlidesCount = Children.count(children);

    return (
      <div
        {...rest}
        ref={slidesRef}
        id={carouselId}
        className={classnames(styles.slides, className)}
      >
        {Children.map(children, (child, index) => {
          const slideNumber = index + 1;
          return cloneElement(child, {
            id: `${carouselId}-${index}`,
            className: classnames(styles.slide, child?.props?.className),
            role: hasPagination ? 'tabpanel' : 'group',
            'aria-roledescription': 'slide',
            'aria-label': `${slideNumber} of ${totalSlidesCount}`,
          });
        })}
      </div>
    );
  };

  const Control = ({ direction, ...rest }: ControlsProps) => {
    const [isDisabled, setIsDisabled] = useState(direction === 'prev');

    useEffect(() => {
      const carousel = slidesRef.current;
      const listener = throttle(() => {
        if (carousel) {
          const currentElement = Array.from(carousel.children).filter(
            (item) => item instanceof HTMLElement && item.offsetLeft - carousel.scrollLeft >= 0
          )[0];
          if (
            direction === 'next' &&
            (!currentElement?.nextSibling || carousel.scrollWidth === carousel.clientWidth + carousel.scrollLeft)
          ) {
            setIsDisabled(true);
          } else if (direction === 'prev' && !currentElement?.previousSibling) {
            setIsDisabled(true);
          } else {
            setIsDisabled(false);
          }
        }
      }, 60);
      if (!loop) {
        listener();
        carousel?.addEventListener('scroll', listener);
      }
      return () => carousel?.removeEventListener('scroll', listener);
    }, [slidesRef.current, direction, loop]);

    const onControlsClick = () => {
      const carousel = slidesRef.current;
      if (carousel) {
        const { nextSibling, previousSibling } = Array.from(carousel.children).filter(
          (item) => item instanceof HTMLElement && item.offsetLeft - carousel.scrollLeft >= 0
        )[0];
        if (
          loop &&
          direction === 'next' &&
          (!nextSibling || carousel.scrollWidth === carousel.clientWidth + carousel.scrollLeft)
        ) {
          carousel.scrollTo(0, 0);
        } else if (loop && direction === 'prev' && !previousSibling) {
          carousel.scrollTo(carousel.scrollWidth, 0);
        } else if (direction === 'next' && nextSibling instanceof HTMLElement) {
          carousel.scrollTo(nextSibling.offsetLeft, 0);
        } else if (direction === 'prev' && previousSibling instanceof HTMLElement) {
          carousel.scrollTo(previousSibling.offsetLeft, 0);
        }
      }
    };

    return (
      <button
        type="button"
        {...rest}
        onClick={onControlsClick}
        disabled={isDisabled}
        aria-controls={carouselId}
        aria-label={direction === 'next' ? 'Next slide' : 'Previous slide'}
      />
    );
  };

  const Pagination = ({ buttonClassName, children, ...rest }: PaginationProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
      const carousel = slidesRef.current;
      const listener = throttle(() => {
        if (carousel) {
          const currentElement = Array.from(carousel.children).filter(
            (item) => item instanceof HTMLElement && item.offsetLeft + item.offsetWidth / 2 - carousel.scrollLeft >= 0
          )[0];
          setActiveIndex(Array.from(carousel.children).indexOf(currentElement));
        }
      }, 60);
      carousel?.addEventListener('scroll', listener);
      return () => carousel?.removeEventListener('scroll', listener);
    }, [slidesRef.current, activeIndex]);

    const onPaginationClick = (index: number) => {
      const carousel = slidesRef.current;
      if (carousel) {
        const elementToScrollTo = Array.from(carousel.children)[index];
        if (elementToScrollTo instanceof HTMLElement) {
          carousel.scrollTo(elementToScrollTo.offsetLeft, 0);
        }
      }
    };

    return (
      <div {...rest} role="tablist" aria-label="Slides">
        {new Array(totalSlidesCount).fill(null).map((_, index) => {
          const slideNumber = index + 1;
          return (
            <button
              type="button"
              className={buttonClassName}
              {...(children ? children(index).props : {})}
              key={index}
              onClick={() => onPaginationClick(index)}
              role="tab"
              aria-label={`Slide ${slideNumber}`}
              aria-selected={activeIndex === index}
              aria-controls={`${carouselId}-${index}`}
            />
          );
        })}
      </div>
    );
  };

  return { Carousel, Slides, Control, Pagination };
};
