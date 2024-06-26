import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import valeraPic from '../../assets/valera_default.png'
import bomjPic from '../../assets/bomj.png'
import { $priceFeed, addScore, isDevelopment } from '../../shared/config/game'

const Wrapper  = styled.div`
    display:flex;
    flex-direction:row;
    gap:40px;
    justify-content:center;
`
const ShowCase = styled.div`
	display: flex;
	flex-direction: column;
	background-color: green;
	height: 90vh;
	width: 60vh;
	gap: 2px;
	position: relative;
	align-items:center;
`

const ShowCaseHeader = styled.div`
	font-size:72px;
`

const ShowCasePic = styled.div`
	margin-left: 50px;
`

const ShowCaseMoney = styled.div`
	display:block;
	font-size:60px;
	position:absolute;
	bottom:0px;
	margin-bottom:50px;
`


export const Games = () => {


    const random_money = Math.floor(Math.random() * 100000)



    return (
			<div>
				<Wrapper>
					<ShowCase>
						<ShowCaseHeader>{'valerka'}</ShowCaseHeader>
						<ShowCasePic>
							<img
								style={{ objectFit: 'contain', width: '500px' }}
								src={valeraPic}
							/>
						</ShowCasePic>
						<ShowCaseMoney>{random_money}</ShowCaseMoney>
					</ShowCase>
					<ShowCase>
						<ShowCaseHeader>{'bomj'}</ShowCaseHeader>
						<ShowCasePic>
							<img
								style={{ objectFit: 'contain', width: '300px', marginTop: '150px' }}
								src={bomjPic} /></ShowCasePic>
						<ShowCaseMoney>{random_money}</ShowCaseMoney>
					</ShowCase>
				</Wrapper>
			</div>
		)
};
