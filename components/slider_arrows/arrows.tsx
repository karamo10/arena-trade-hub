'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  currentSlide?: number;
  slideCount?: number;

}

function NextArrow({className, style, onClick, currentSlide, slideCount}: ArrowProps) {
  const disabled = currentSlide === (slideCount ?? 0) - 1

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



function PrevArrow({className, style, onClick, currentSlide, slideCount}: ArrowProps) {
  const disabled = currentSlide === (slideCount ?? 0) - 1;

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
