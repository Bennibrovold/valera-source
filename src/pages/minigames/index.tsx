import React, { useRef } from 'react'
import styled from 'styled-components'
import { GAMES_DATA } from './games.data'

export const Games = () => {
	const wrapperRef = useRef(null)


	// Функция для прокрутки влево
	const scrollLeft = () => {
		if (wrapperRef.current) {
			wrapperRef.current.scrollLeft -= 240 
		}
	}

	
	const scrollRight = () => {
		if (wrapperRef.current) {
			wrapperRef.current.scrollLeft += 240 
		}
	}

	const listItems = GAMES_DATA.map((game, index) => {
		return (
			<WrapperItem key={index}>
				<div>{game.name}</div>
				<div>{game.description}</div>
				<div>{game.rules}</div>
			</WrapperItem>
		)
	})

	return (
		<GlobalWrapper>
			<Container>
				<Button onClick={scrollLeft}>{'<'}</Button>
				<Wrapper ref={wrapperRef}>{listItems}</Wrapper>
				<Button onClick={scrollRight}> {'>'} </Button>
			</Container>
		</GlobalWrapper>
	)
}

const Container = styled.div`
	display: flex;
	align-items: center;
`

const Button = styled.button`
	background-color: teal;
	color: white;
	border: none;
	padding: 10px;
	cursor: pointer;
	
`

const Wrapper = styled.div`
	display: flex;
	overflow-x: auto; 
	white-space: nowrap;
	width: 720px; // 240 
	&::-webkit-scrollbar {
		display: none; 
	}
`
const GlobalWrapper = styled.div`
	margin:0 auto;
`

const WrapperItem = styled.div`
	flex: 0 0 auto; 
	width: 200px; 
	margin: 10px;
	background-color: black;
	padding: 10px;
	border-radius: 5px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`
