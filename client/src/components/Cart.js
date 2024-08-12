import React, { useState, useEffect } from 'react';
import { getCart, removeFromCart, updateQuantity, createCheckout } from '../server';
import { catchErrors } from '../utils';

import styled from 'styled-components';
import { theme, media, Main } from '../styles';
const { colors, fontSizes, spacing } = theme;

const Header = styled.header`
  max-width: 800px;
  margin: auto;
`;
const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: auto;
`;
const CartItems = styled.div`
  margin-top: ${spacing.md};
  & > * {
    border-bottom: 1px solid ${colors.lightGrey};
  }
  & > *:first-child {
    border-top: 1px solid ${colors.lightGrey};
  }
  & > *:last-child {
    border-bottom: 1px solid ${colors.lightGrey};
  }
`;
const CartItem = styled.div`
  display: grid;
  grid-template-columns: 200px 2fr 1fr auto;
  grid-gap: ${spacing.md};
  padding: ${spacing.md} 0;
  ${media.tablet`
    grid-template-columns: 150px 2fr 1fr auto;
  `};
`;
const ItemThumbnail = styled.img`
  width: 100%;
  object-fit: cover;
  border: 4px solid black;
`;
const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;
const ItemName = styled.a`
  color: ${colors.grey};
  font-size: ${fontSizes.md};
  text-decoration: none;
  &:hover, &:focus {
    color: ${colors.black};
  }
`;
const ItemDimensions = styled.div`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  margin-top: ${spacing.xs};
`;
const ItemPrice = styled.p`
  color: ${colors.black};
  font-size: ${fontSizes.md};
`;
const QuantityLabel = styled.label`
  position: absolute;
  visibility: hidden;
`;
const QuantitySelect = styled.select`
  max-width: 100%;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  padding: 6px 8px;
  font-size: 16px;
  font-weight: medium;
  color: black;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:focus {
    border-color: #6366f1;
    outline: none;
    box-shadow: 0 0 0 1px #6366f1;
  }

  @media (min-width: 640px) {
    font-size: small;
  }
`;
const RemoveButton = styled.button`
  color: gray;
  background: none;
  border: none;
  cursor: pointer;
	align-self: flex-start;
	padding: 0;

  &:hover {
    color: black;
  }
`;
const CheckoutButton = styled.button`
  color: white;
  background: ${colors.black};
  cursor: pointer;
	align-self: center;
	margin-top: ${spacing.md};

  &:hover {
		color: white;
    background: ${colors.darkGrey};;
  }
`;


const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCart();
      setCart(data);
    };
    catchErrors(fetchData());
  }, []);

  const handleRemoveFromCart = async (variantId) => {
    const updateData = async () => {
			await removeFromCart(variantId);
			const { data } = await getCart();
			setCart(data);
		};
		catchErrors(updateData());
  };

  const handleUpdateQuantity = async (variantId, quantity) => {
    const updateData = async () => {
			await updateQuantity(variantId, quantity);
			const { data } = await getCart();
      setCart(data);
		};
		catchErrors(updateData());
  };

	const handleCreateCheckout = (event) => {
		event.preventDefault();
		const checkout = async () => {
			const { data } = await createCheckout();
			window.location.href = data.url;
		};
		catchErrors(checkout());
	};

  return (
    <React.Fragment>
      {cart && Object.keys(cart).length > 0 ? (
        <Main>
          <Header>
            <h1>Shopping Cart</h1>
          </Header>
          <CartContainer>
            <CartItems>
              {Object.entries(cart).map(([variantId, variantData]) =>
                <CartItem key={`${variantId}`}>
									<ItemThumbnail alt={variantData.name} src={variantData.image} />
									<ItemDetails>
										<ItemName href={`store/${variantData.slug}`}>{variantData.name}</ItemName>
										<ItemDimensions>
											<p>{`Width: ${variantData.width}"`}</p>
											<p>{`Length: ${variantData.length}"`}</p>
										</ItemDimensions>
										<ItemPrice>${`${variantData.price}`}</ItemPrice>
									</ItemDetails>
									<div>
										<QuantityLabel htmlFor={`quantity-${variantId}`}>
											Quantity, {variantData.name}
										</QuantityLabel>
										<QuantitySelect
											id={`quantity-${variantId}`}
											name={`quantity-${variantId}`}
											value={variantData.quantity}
											onChange={(e) => handleUpdateQuantity(variantId, e.target.value)}
										>
											{[...Array(8).keys()].map(num => (
												<option key={num + 1} value={num + 1}>
													{num + 1}
												</option>
											))}
										</QuantitySelect>
									</div>
									<RemoveButton onClick={() => handleRemoveFromCart(variantId)}>
										Remove
									</RemoveButton>
								</CartItem>
              )}
            </CartItems>
						<CheckoutButton onClick={handleCreateCheckout}>Checkout</CheckoutButton>
          </CartContainer>
        </Main>
      ) : (
        <Main>
          <Header>
            <h1>Your cart is empty</h1>
            <p>Navigate to the store to browse and shop prints.</p>
          </Header>
        </Main>
      )}
    </React.Fragment>
  );
};

export default Cart;
