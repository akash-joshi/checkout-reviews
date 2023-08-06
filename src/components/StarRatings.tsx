import { useState } from "react";
import type { StarStates } from "./Star";
import Star from "./Star";

interface StarRatingsProps {
  className?: string;
  rating?: number;
  selectable?: boolean;
  onChange?: (rating: number) => void;
}

export default function StarRatings({
  className,
  rating,
  onChange,
  selectable,
}: StarRatingsProps) {
  const initialStarHoverState: boolean[] = [false, false, false, false, false];

  const [starHover, setStarHover] = useState<boolean[]>(initialStarHoverState);

  return (
    <span
      className={`stars flex gap-1 ${className ? className : ``}`}
      title={rating?.toFixed(1)}
      onMouseLeave={() => setStarHover(initialStarHoverState)}
    >
      {[0, 1, 2, 3, 4].map((num) => {
        let starState: StarStates = "empty";

        if (rating) {
          if (
            num < rating &&
            num + 1 > rating &&
            rating - Math.floor(rating) < 0.75 &&
            rating - Math.floor(rating) > 0.25
          ) {
            // starState = "half";
          } else {
            if (num < Math.round(rating)) {
              starState = "full";
            }
          }
        }

        return (
          <Star
            onMouseMove={(e) => {
              if (selectable) {
                setStarHover(
                  starHover.map((_, index) => {
                    if (index <= num) {
                      return true;
                    }
                    return false;
                  })
                );
              }
            }}
            key={num}
            state={starState}
            onClick={() => {
              if (onChange) {
                onChange(num + 1);
              }
            }}
            className={`${starState} ${starHover[num] ? " hover" : ""}`}
          />
        );
      })}
    </span>
  );
}
