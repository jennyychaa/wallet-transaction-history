import styled from '@emotion/styled'

const SpinnerWrapper = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  margin: 0 auto;
  border-radius: 50%;
  background: transparent;
  overflow: hidden;
  z-index: 0;
  animation: spin 1s linear infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`

const BaseSpinner = styled.div`
  width: 50%;
  height: 50%;
  z-index: -1;
`

const TopSpinner = styled.div`
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
`

const LeftSpinner = styled(BaseSpinner)`
  position: absolute;
  top: 50%;
  left: 0;
  background: ${({ theme }) => `
    linear-gradient(
      to bottom right,
      ${theme.colors.lighterGreen} 0%,
      ${theme.colors.lightGreen} 100%
    );
  `};
`

const RightSpinner = styled(BaseSpinner)`
  position: absolute;
  top: 50%;
  left: 50%;
  background: ${({ theme }) => `
    linear-gradient(
      to top right,
      ${theme.colors.lightGreen} 0%,
      ${theme.colors.green} 100%
    );
  `};
`

const BottomSpinner = styled(BaseSpinner)`
  position: absolute;
  top: 0;
  left: 50%;
  background: ${({ theme }) => `
    linear-gradient(
    to bottom right,
    transparent 0%,
    ${theme.colors.green} 100%
    );
  `};
`

const Loader = () => {
  return (
    <SpinnerWrapper aria-label="Loading transaction data...">
      <TopSpinner></TopSpinner>
      <LeftSpinner></LeftSpinner>
      <RightSpinner></RightSpinner>
      <BottomSpinner></BottomSpinner>
    </SpinnerWrapper>
  )
}

export default Loader
