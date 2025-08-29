'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';

function NextArrow(props: any) {
  const { className, style, onClick, currentSlide, slideCount } = props;
  const disabled = currentSlide === slideCount - 1;

  return (
    <button
      className={`${className} ${
        disabled ? 'opacity-30 cursor-not-allowed' : ''
      } absolute`}
      style={{ ...style, display: 'block' }}
      onClick={disabled ? undefined : onClick}
    >
      <ChevronRightIcon className="w-6 h-6 icon" />
    </button>
  );
};

function PrevArrow(props: any) {
  const { className, style, onClick, currentSlide } = props;
  const disabled = currentSlide === 0; 

  return (
    <button
      className={`${className} ${
        disabled ? 'opacity-30 cursor-not-allowed' : ''
      }`}
      style={{ ...style, display: 'block' }}
      onClick={disabled ? undefined : onClick}
    >
      <ChevronLeftIcon className="w-6 h-6 icon" />
    </button>
  );
};

export { NextArrow, PrevArrow };
