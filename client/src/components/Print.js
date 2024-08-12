import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPrint, addToCart } from '../server';
import { catchErrors } from '../utils';

import Loader from './Loader';

import styled, { css } from 'styled-components';
import { theme, media, Main } from '../styles';
const { colors, fontSizes, spacing } = theme;

const PrintContainer = styled.div`
  display: flex;
  gap: ${spacing.lg};
  margin: auto;
  ${media.tablet`
    flex-direction: column;
		gap: ${spacing.md};
  `};
`;
const PrintImage = styled.img`
  border: 8px solid black;
  width: 50%;
  ${media.tablet`
    width: 100%;
		height: auto;
  `};
`;
const PrintTitle = styled.h3`
  font-weight: 700;
  font-size: ${fontSizes.xxl};
	${media.tablet`
    font-size: ${fontSizes.xl};
  `};
`;
const PrintPrice = styled.p`
  color: ${colors.grey};
  font-size: ${fontSizes.lg};
`;
const SizeSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 16px 0;
  width: 100%;
`;
const RadioOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 12px;
  font-size: ${fontSizes.sm};
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  border: 1px solid #ccc;
  background-color: white;
  color: #333;

  ${({ active, checked }) => css`
    ${active && `
      ring: 2px solid black;
      ring-offset: 2px;
    `}
    ${checked ? `
      background-color: black;
      color: white;
    ` : `
      &:hover {
        background-color: #f5f5f5;
      }
    `}
  `}
`;
const AddToCartButton = styled.button`
  color: ${colors.white};
  background-color: ${colors.black};
  width: 100%;
  &:hover,
    &:focus {
      color: ${colors.white};
      background-color: ${colors.grey};
    }
`;
const ConfirmationMessage = styled.p`
  color: ${colors.green};
  margin-top: ${spacing.md};
`;

const Print = () => {
  const { slug } = useParams();

  const [print, setPrint] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPrint(slug);
      setPrint(data);
      setSelectedVariant(data.variants[0]);
    };
    catchErrors(fetchData());
  }, [slug]);

  const handleVariantChange = (selectedVariant) => {
    setSelectedVariant(selectedVariant);
  };

  const handleAddToCart = async (event) => {
		setConfirmationMessage('')
    event.preventDefault();
		const addItem = async () => {
      const { data } = await addToCart(selectedVariant.id);
      setConfirmationMessage(data.message);
    };
    catchErrors(addItem());
  };

  return (
    <React.Fragment>
      {print && selectedVariant ? (
        <Main>
          <PrintContainer>
            <PrintImage src={print.image} alt="Print Art" />

            <div>
              <PrintTitle>{print.name}</PrintTitle>
              <PrintPrice>${selectedVariant.price}</PrintPrice>
              <form onSubmit={handleAddToCart}>
                <SizeSelector>
                  {print.variants.map((variant) => (
                    <RadioOption
                      key={variant.id}
                      active={variant === selectedVariant}
                      checked={variant === selectedVariant}
                      onClick={() => handleVariantChange(variant)}
                    >
                      {variant.width}&times;{variant.length}" - {variant.size}
                    </RadioOption>
                  ))}
                </SizeSelector>
                <AddToCartButton type="submit">
                  Add to cart
                </AddToCartButton>
              </form>
              {confirmationMessage && (
                <ConfirmationMessage>{confirmationMessage}</ConfirmationMessage>
              )}
            </div>
          </PrintContainer>
        </Main>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default Print;
