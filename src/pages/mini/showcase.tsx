import React, { useEffect, useState} from 'react'
import styled,{keyframes} from 'styled-components'
import valeraPic from '../../assets/valera_default.png'
import bomjPic from '../../assets/bomj.png'

export const ShowCase = () => {
	const random_money = Math.floor(Math.random() * 100000)

	const [isFading, setIsFading] = useState(true)
	const [isCompletelyFading, setIsCompletelyFading] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsFading(false)
			setIsCompletelyFading(true)
		}, 3000)

		return () => clearTimeout(timer)
	}, [])

	return (
		<div>
			{isCompletelyFading ? (
				<FadeOutDiv>
					<Wrapper>
						<ShowCaseWrapper>
							<ShowCaseHeader>{'valerka'}</ShowCaseHeader>
							<ShowCasePic>
								<img
									style={{ objectFit: 'contain', width: '500px' }}
									src={valeraPic}
								/>
							</ShowCasePic>
							<ShowCaseMoney>{random_money}</ShowCaseMoney>
						</ShowCaseWrapper>
						<ShowCaseWrapper>
							<ShowCaseHeader>{'bomj'}</ShowCaseHeader>
							<ShowCasePic>
								<img
									style={{
										objectFit: 'contain',
										width: '300px',
										marginTop: '150px',
									}}
									src={bomjPic}
								/>
							</ShowCasePic>
							<ShowCaseMoney>{random_money}</ShowCaseMoney>
						</ShowCaseWrapper>
					</Wrapper>
				</FadeOutDiv>
			) : (
				<FadeDiv isFading={isFading}>
					<Wrapper>
						<ShowCaseWrapper>
							<ShowCaseHeader>{'valerka'}</ShowCaseHeader>
							<ShowCasePic>
								<img
									style={{ objectFit: 'contain', width: '500px' }}
									src={valeraPic}
								/>
							</ShowCasePic>
							<ShowCaseMoney>{random_money}</ShowCaseMoney>
						</ShowCaseWrapper>
						<ShowCaseWrapper>
							<ShowCaseHeader>{'bomj'}</ShowCaseHeader>
							<ShowCasePic>
								<img
									style={{
										objectFit: 'contain',
										width: '300px',
										marginTop: '150px',
									}}
									src={bomjPic}
								/>
							</ShowCasePic>
							<ShowCaseMoney>{random_money}</ShowCaseMoney>
						</ShowCaseWrapper>
					</Wrapper>
				</FadeDiv>
			)}
		</div>
	)
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	gap: 40px;
	justify-content: center;
`

const fadeInOut = keyframes`
  0% {
    opacity: 1;
  }
  95% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const FadeDiv = styled.div`
	animation: ${fadeInOut} 3s ease-in-out;
	opacity: ${props => (props.isFading ? 1 : 0)};
	transition: opacity 0s ease-in-out 1s;
`

const FadeOutDiv = styled.div`
	animation: ${fadeOut} 0.7ms ease-in-out forwards;
`

const ShowCaseWrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-color: green;
	height: 90vh;
	width: 60vh;
	gap: 2px;
	position: relative;
	align-items: center;
`

const ShowCaseHeader = styled.div`
	margin-top: 25px;
	font-size: 72px;
`

const ShowCasePic = styled.div`
	margin-left: 50px;
`

const ShowCaseMoney = styled.div`
	display: block;
	font-size: 60px;
	position: absolute;
	bottom: 0px;
	margin-bottom: 50px;
`
