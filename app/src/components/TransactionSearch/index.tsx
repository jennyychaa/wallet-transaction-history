import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import styled from '@emotion/styled'

import SearchIcon from '../../assets/search.svg?react'

interface TransactionSearchProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isValidWalletAddress: boolean
}

const TransactionSearchWrapper = styled.div`
  padding: ${({ theme }) => `${theme.layout.space400} 0`};
`

const SearchTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.layout.space400};
  text-align: center;
`

const SearchWrapper = styled.div`
  display: flex;

  ${({ theme }) => `
    grid-gap: ${theme.layout.space300};
    border: 1px solid ${theme.colors.lightGray};
    border-radius: ${theme.layout.space300};
    padding: ${theme.layout.space100} ${theme.layout.space200};

    &:focus,
    &:focus-within {
      border-color: ${theme.colors.lightGreen};
    }
  `};
`

const Search = styled.input`
  width: 100%;
  border: 0;
  color: ${({ theme }) => theme.colors.gray};

  &:focus {
    outline: 0;
  }
`

const SearchMessage = styled.p`
  ${({ theme }) => `
    margin: ${theme.layout.space400} 0 0;
    color: ${theme.colors.gray};
  `};
`

const TransactionSearch = ({
  isValidWalletAddress,
  ...props
}: TransactionSearchProps) => {
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
            ? `Showing most recent transactions for wallet address ${props.value}`
            : `${props.value} is an invalid wallet address. Please try another address`
          : 'Your transaction will appear below'}
      </SearchMessage>
    </TransactionSearchWrapper>
  )
}

export default TransactionSearch
