import React from 'react';
import styled from 'styled-components'

const Background = styled.div`
    background-color: #333232;
    width: 100vw;
    height: 100vh;
`
const PreviewPageContainer = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-direction: column;
`
/*Spotenu logo settings*/
const SpotenuLogo = styled.h1`
  font-family: Sahitya;
  font-style: normal;
  font-weight: bold;
  font-size: 6.25rem;
  color: #C7B198;
  height: auto;
    :hover{
            color: black;
          }
`
/*Preview page paragraph settings*/
const PreviewParagraph = styled.p`
    font-family: 'Scope One', serif;
    font-style: normal;
    font-weight: normal;
    font-size: 3rem;
    height: auto;
    color: #F0ECE3;
`
/*Signup button settings*/
const SignupButton = styled.button`
    border: none;
    background-color: #333232;
    color: #C7B198;
    width: 90px;
    height: min-content;
    font-size: x-large;
`
function PreviewPage(){
return(
    <Background>
        <PreviewPageContainer>
          <SpotenuLogo>SPOTENU</SpotenuLogo>
          <PreviewParagraph>music moves</PreviewParagraph>
          <SignupButton href="#">get started</SignupButton>
       </PreviewPageContainer>
    </Background>
)
}
export default PreviewPage;