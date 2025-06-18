import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

const PriceRange = ({
  setPriceRange,
}: {
  setPriceRange: (range: [number, number]) => void;
}) => {
  const initialMinPrice = 299;
  const initialMaxPrice = 11998;

  const [sliderMinValue] = useState(initialMinPrice);
  const [sliderMaxValue] = useState(initialMaxPrice);

  const [minVal, setMinVal] = useState(initialMinPrice);
  const [maxVal, setMaxVal] = useState(initialMaxPrice);
  const [minInput, setMinInput] = useState(initialMinPrice);
  const [maxInput, setMaxInput] = useState(initialMaxPrice);

  const minGap = 5;

  const slideMin = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= sliderMinValue && maxVal - value >= minGap) {
      setMinVal(value);
      setMinInput(value);
    }
  };

  const slideMax = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value <= sliderMaxValue && value - minVal >= minGap) {
      setMaxVal(value);
      setMaxInput(value);
    }
  };

  useEffect(() => {
    const setSliderTrack = () => {
      const range: HTMLElement = document.querySelector(".slider-track");

      if (range) {
        const minPercent =
          ((minVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;
        const maxPercent =
          ((maxVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;

        range.style.left = `${minPercent}%`;
        range.style.right = `${100 - maxPercent}%`;
      }
    };
    setSliderTrack();
    setPriceRange([minVal, maxVal]);
  }, [minVal, maxVal, setPriceRange, sliderMinValue, sliderMaxValue]);

  const handleMinInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.value === "" ? sliderMinValue : parseInt(e.target.value, 10);
    if (value >= sliderMinValue && value < maxVal - minGap) {
      setMinInput(value);
      setMinVal(value);
    }
  };

  const handleMaxInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.value === "" ? sliderMaxValue : parseInt(e.target.value, 10);
    if (value <= sliderMaxValue && value > minVal + minGap) {
      setMaxInput(value);
      setMaxVal(value);
    }
  };

  const handleInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    type: string
  ) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      const value = parseInt(target.value, 10);
      if (
        type === "min" &&
        value >= sliderMinValue &&
        value < maxVal - minGap
      ) {
        setMinVal(value);
      } else if (
        type === "max" &&
        value <= sliderMaxValue &&
        value > minVal + minGap
      ) {
        setMaxVal(value);
      }
    }
  };

  return (
    <div className="double-slider-box">
      <div className="input-box">
        <div className="min-box">
          <input
            type="number"
            value={minInput}
            onChange={handleMinInput}
            onKeyDown={(e) => handleInputKeyDown(e, "min")}
            className="min-input"
            min={sliderMinValue}
            max={maxVal - minGap}
          />
        </div>
        <div className="max-box">
          <input
            type="number"
            value={maxInput}
            onChange={handleMaxInput}
            onKeyDown={(e) => handleInputKeyDown(e, "max")}
            className="max-input"
            min={minVal + minGap}
            max={sliderMaxValue}
          />
        </div>
      </div>
      <div className="range-slider">
        <div className="slider-track"></div>
        <input
          type="range"
          min={sliderMinValue}
          max={sliderMaxValue}
          value={minVal}
          onChange={slideMin}
          className="min-val"
        />
        <input
          type="range"
          min={sliderMinValue}
          max={sliderMaxValue}
          value={maxVal}
          onChange={slideMax}
          className="max-val"
        />
      </div>
      <style>
        {`
        .double-slider-box {
            width: 100%;
        }

        .range-slider {
            position: relative;
            width: 100%;
            height: 5px;
            margin: 20px 0;
            background-color: oklch(70.9% 0.01 56.259);
            border-radius: 5px;
        }

        .slider-track {
            height: 100%;
            position: absolute;
            background-color: oklch(52.7% 0.154 150.069);
            left: 0;
            right: 100%;
            border-radius: 5px;
        }

        .range-slider input[type="range"] {
            position: absolute;
            width: 100%;
            top: 0;
            transform: translateY(-50%);
            background: none;
            pointer-events: none;
            appearance: none;
            height: 5px;
        }

        input[type="range"]::-webkit-slider-thumb {
            height: 25px;
            width: 25px;
            border-radius: 50%;
            border: 3px solid #fff;
            background: oklch(79.2% 0.209 151.711);
            pointer-events: auto;
            appearance: none;
            cursor: pointer;
            box-shadow: 0 0.125rem 0.5625rem -0.125rem rgba(0, 0, 0, 0.25);
            position: relative;
            z-index: 2; /* Ensure thumbs appear above the track */
        }

        input[type="range"]::-moz-range-thumb {
            height: 25px;
            width: 25px;
            border-radius: 50%;
            border: 3px solid #fff;
            background: oklch(79.2% 0.209 151.711);
            pointer-events: auto;
            cursor: pointer;
            box-shadow: 0 0.125rem 0.5625rem -0.125rem rgba(0, 0, 0, 0.25);
            position: relative;
            z-index: 2;
        }

        .input-box {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }

        .min-box,
        .max-box {
            width: 100%;
        }

        .min-box {
            margin-right: 10px;
        }
        .max-box input {
            float: right;
        }
        input[type="number"] {
            width: 80px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            text-align: center;
        }

        .min-tooltip,
        .max-tooltip {
            position: absolute;
            top: -35px;
            font-size: 12px;
            color: #555;
            background-color: #fff;
            padding: 5px;
            border: 1px solid #ddd;
            border-radius: 5px;
            white-space: nowrap;
            z-index: 1;
        }

        .min-tooltip {
            left: 0;
            transform: translateX(-50%);
        }

        .max-tooltip {
            right: 0;
            transform: translateX(50%);
        }
        /* Chrome, Safari, Edge, and Opera */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        /* Firefox */
        input[type="number"] {
            -moz-appearance: textfield;
        }
        `}
      </style>
    </div>
  );
};

export default PriceRange;
