import { useUnit } from "effector-react";
import { $location } from "../../shared/config/location";
import CAR from "../../assets/3.png";
import React from "react";
import styled from "styled-components";
import { media } from "../../shared/lib/media";

export const LocationHandler = () => {
  const location = useUnit($location);

  if (location === "garage") {
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
