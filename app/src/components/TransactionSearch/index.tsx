import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { isAddress } from 'web3-validator'
import styled from '@emotion/styled'

import SearchIcon from '../../assets/search.svg?react'

const TransactionSearchWrapper = styled.div`
  padding: ${(props) => `${props.theme.layout.space400} 0`};
`

const SearchTitle = styled.h2`
  margin-bottom: ${(props) => props.theme.layout.space400};
  text-align: center;
`

const SearchWrapper = styled.div`
  display: flex;

  ${(props) => `
    grid-gap: ${props.theme.layout.space300};
    border: 1px solid ${props.theme.colors.lightGray};
    border-radius: ${props.theme.layout.space300};
    padding: ${props.theme.layout.space100} ${props.theme.layout.space200};

    &:focus,
    &:focus-within {
      border-color: ${props.theme.colors.lightGreen};
    }
  `};
`

const Search = styled.input`
  width: 100%;
  border: 0;
  color: ${(props) => props.theme.colors.gray};

  &:focus {
    outline: 0;
  }
`

const SearchMessage = styled.p`
  ${(props) => `
    margin-top: ${props.theme.layout.space400};
    color: ${props.theme.colors.gray};
  `};
`

const TransactionSearch = ({
  ...props
}: DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  const isValidWalletAddress = isAddress(props.value as string)

  return (
    <TransactionSearchWrapper>
      <SearchTitle>Transaction history</SearchTitle>
      <SearchWrapper>
        <SearchIcon />
        <Search {...props} type="search" />
      </SearchWrapper>
      <SearchMessage>
        {props.value && String(props.value).length > 0
          ? isValidWalletAddress
            ? `Showing most recent transactions for wallet address ${props.value}.`
            : `${props.value} is an invalid wallet address. Please try another address.`
          : 'Your transaction will appear below.'}
      </SearchMessage>
    </TransactionSearchWrapper>
  )
}

export default TransactionSearch
