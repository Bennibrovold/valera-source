import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import VALERA from '../../assets/valera_default.png'
import { $priceFeed, addScore, isDevelopment } from '../../shared/config/game'

const Wrapper  = styled.div`
    display:flex;
    flex-direction:row;
    gap:40px;
    justify-content:center;
`
const ShowCase = styled.div`
    display:flex;
    flex-direction:column;
    background-color:green;
    height:90vh;
    width:60vh;
    gap:2px;
`

const ShowCaseHeader = styled.div`
    border:3px solid black;
    display:flex;
    justify-content:center;
`

const ShowCasePic = styled.div`
    
`

const ShowCaseMoney = styled.div`
	border: 3px solid black;
	display: flex;
	justify-content: center;
`


export const Games = () => {


    const random_money = Math.floor(Math.random() * 100000)



    return (
			<div>
				<Wrapper>
					<ShowCase>
						<ShowCaseHeader>{'valerka'}</ShowCaseHeader>
						<ShowCasePic> valerka img</ShowCasePic>
						<ShowCaseMoney>{random_money}</ShowCaseMoney>
					</ShowCase>
					<ShowCase>
						<ShowCaseHeader>{'enemy_name'}</ShowCaseHeader>
						<ShowCasePic>ejejsdaj</ShowCasePic>
						<ShowCaseMoney>{random_money}</ShowCaseMoney>
					</ShowCase>
				</Wrapper>
			</div>
		)
};
