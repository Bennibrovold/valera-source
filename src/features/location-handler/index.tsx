import { useUnit } from "effector-react";
import { $location } from "../../shared/config/location";
import CAR from "../../assets/crown.webp";
import React from "react";
import styled from "styled-components";
import { media } from "../../shared/lib/media";
import { $screen } from "../../shared/config/router";

export const LocationHandler = () => {
  const location = useUnit($location);
  const screen = useUnit($screen);

  if (location === "garage" && screen === "game") {
    return (
      <Wrapper>
        <Image src={CAR} />
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
