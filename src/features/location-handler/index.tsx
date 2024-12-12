import { useUnit } from "effector-react";
import { $location } from "../../shared/config/location";
import CAR from "../../assets/crown.webp";
import React, { useMemo } from "react";
import styled from "styled-components";
import { media } from "../../shared/lib/media";
import { $screen } from "../../shared/config/router";
import { $carup } from "../../pages/shop/carshop";

export const LocationHandler = () => {
  const location = useUnit($location);
  const screen = useUnit($screen);
  const carshop = useUnit($carup);

  console.log(carshop);

  const carImg = useMemo(() => {
    let carIdx = -1;

    carshop.forEach((element, i) => {
      if (element.price === "КУПЛЕНО" && carIdx < i) {
        carIdx = i;
      }
    });

    return carshop[carIdx]?.image;
  }, [carshop]);

  if (!carImg) return null;

  if (location === "garage" && screen === "game") {
    return (
      <Wrapper>
        <Image src={carImg} />
      </Wrapper>
    );
  }

  return null;
};

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
`;

const Image = styled.img`
  object-fit: contain;

  ${media.pure.less(media.size.xs)} {
    width: 80vw;
  }
`;
