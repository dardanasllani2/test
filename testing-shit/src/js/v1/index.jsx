/* eslint-disable yoda */
/* eslint-disable no-else-return */
/* eslint-disable radix */
/* eslint-disable no-use-before-define */
/* eslint-disable id-length */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { runScript } from '@sogody/experiment-framework';

runScript(() => {
    const variantIds = document.querySelectorAll('.featured-products-wrapper');
    const productsArray = [];
    let qtySum = 4;
    const checkOutButton = document.querySelector('.checkout-button');
    let checkoutPrice = 3580;
    variantIds.forEach((id, index) => {
        const variantId = id.getAttribute('data-variant-id');
        const qtyButtons = id.querySelectorAll('.quantity-element:not(.quantity-input)');
        const variantQty = id.querySelector('.quantity-input-control input');
        variantQty.classList.add('is-zero');

        const prodPrice = id.getAttribute('data-price');
        
        qtyButtons.forEach((button) => {
            button.addEventListener('click', () => {
                !button.getAttribute('disabled') && (
                    setTimeout(() => {
                        variantQty.value > 0 ? id.classList.add('has-quantity') : id.classList.remove('has-quantity');
                        button.classList.contains('quantity-minus') ? (checkoutPrice -= parseInt(prodPrice)) && (qtySum -= 1) : (checkoutPrice += parseInt(prodPrice)) && (qtySum += 1);
                        function discountStrikethrough(qty) {
                            if (qty >= 6 && qty <= 8) {
                                return `CHECKOUT <s>$${(checkoutPrice / 100).toFixed(2)}</s> $${((checkoutPrice * 0.85) / 100).toFixed(2)}`;
                            } else if (qty >= 9 && qty <= 11) {
                                return `CHECKOUT <s>$${(checkoutPrice / 100).toFixed(2)}</s> $${((checkoutPrice * 0.80) / 100).toFixed(2)}`;
                            } else if (qty >= 12) {
                                return `CHECKOUT <s>$${(checkoutPrice / 100).toFixed(2)}</s> $${((checkoutPrice * 0.75) / 100).toFixed(2)}`;
                            }
                            return `CHECKOUT $${(checkoutPrice / 100).toFixed(2)}`;
                        }
                        checkOutButton.innerHTML = discountStrikethrough(qtySum);
                    }, 100));
            });
        });
        variantQty.value > 0 ? variantQty.classList.remove('is-zero') : variantQty.classList.add('is-zero');
        checkOutButton.addEventListener('click', () => {
            variantQty.value !== '0' && productsArray.push(`${variantId}:${variantQty.value}`, ',');
            (productsArray[productsArray.length - 1] === ',' && index === variantIds.length - 1) && productsArray.pop();
            index === variantIds.length - 1 && checkOutButton.setAttribute('href', `https://hatestains.myshopify.com/cart/${productsArray.join('')}`);
        });
    });
});
