# DAI Daddy II (Uncensored)
DAI Daddy is an autonomous, open-source platform for unwinding Maker CDPs.
<br/>

![Logo](https://github.com/sbcodes/daidaddy/blob/master/dai%20daddy%20logo.png)
<br/>

## Links
- [App Demo](https://daidaddy.xyz/)
- [Devpost](https://devpost.com/software/dai-daddy-ii-uncensored)
- [Smart Contract](XXX)

## Why DAI Daddy?
14% of Maker CDPs to date have been forcibly liquidated. When this happens, the ETH held as collateral in the CDP is automatically sold at a 3% discount to pay off the CDP holder's DAI debt, and on top of this a 13% liquidation penalty is applied.

When ETH prices drop, many CDP holders can't afford to top up their CDP with ETH to prevent liquidation; but often, they don’t have enough cash to buy DAI close their CDP. So even though they may still be collateralised at over 150% (i.e. they have sufficient assets to pay back their debt), there is no way to effectively close their CDP and pay back the debt.

How can we allow these users to close their CDP without paying a hefty liquidation fee? Introducing... DAI Daddy II (Uncensored) - an autonomous platform for unwinding Maker CDPs.

## How it Works
v2.0 of the DAI Daddy platform builds on our work with [$dai daddy](https://github.com/diffusioncon/DAI-Daddy-MakerDAO), a CDP debt marketplace where sellers can list their CDP for sale and offer a "discount rate".

The new version maintains this buy/sell functionality, but adds a new primary feature: unwinding CDPs. Under this model, rather than requiring a counterparty to ensure a CDP is repaid, the new DAI Daddy smart contract withdraws collateral from the CDP, uses [Kyber Network](https://kyber.network/) to convert this ETH to DAI, and then pays off the CDP and returns the remaining ETH collateral to the owner.

The number of withdraw/repay iterations required depends on the collateralisation ratio of the given CDP. The lower the ratio, the more iterations are required. Because this process follows an exponential curve, v1.0 of DAI Daddy is used as a backup option for CDPs whose collateralisation ratio is too low to leverage the unwinding process.

## Our Team
- 🇿🇦 Chris Maree - Financial Maths, Smart Contracts & Integrations
- 🇳🇿 Hamed Ali - Front-End
- 🇳🇿 Stefan Bachmann - Front-End
- 🇳🇿 Matthias Bachmann - UX/UI, Design
- 🇳🇿 Liesl Eichholz - UX/UI, Design

## Technical Description
DAI Daddy works by transferring the ownership of a MakerDao CDP to the `DaiDaddy` contract which holds the CDP in escrow until someone buys it. At that point the CDP is transferred to the buyer and the funds for the purchase are sent to the seller.

The value of the CDP is calculated by looking at the underlying collateral and debt associated with the CDP. These values can be found by querying the MakerDao Single Collateral Dai(SAI) `tub` contract which acts as the SAI CDP engine. From `tub` values associated with a `cup` (an instance of a CDP) can be extracted as follows:

```
struct Cup {
        address  lad;      // CDP owner
        uint256  ink;      // Locked collateral (in SKR)
        uint256  art;      // Outstanding normalised debt (tax only)
        uint256  ire;      // Outstanding normalised debt
    }
```

Using these values the total value of the CDP can be found by finding the difference between the underlying collateral and debt. DAI Daddy enables you to sell your debt at a discount, which is also considered in this equation as shown below in the `debtPrice` function.

```
function debtPrice(uint _art, uint _ire, uint _discount) public pure returns(uint) {
        return _art * (_ire/10 - 10 ** 18) * (100 - _discount) / 10 ** 20;
    }
```

This function returns value of the CDP in atto (`10^-18` fractions of a USD, as defined by a Dai being `1*10^18` atto). 

To find the value of the CDP in Ether the MakerDao price oracle is used via the `Medianzer`. This price is then used to find quantify the value of the CDP in ETH as.

## Smart Contract
DAI Daddy consists of one main smart contract: `DaiDaddy.sol` which stores all buisness logic and acts as the escrow for the CDP's during the transfer. This contract imports instances of the MakerDao `SaiTub.sol` and `Medianizer.sol` to get information on CDPs and current ether price.

The provided migrations script deploys into a local test enviroment. All contracts have also been deployed to the kovan test net and can be found here: `0x130fa137765A189E2132C2AB06F8E2617414b424`


## Environment
Everything can be set up using one command within `yarn`.
```
yarn install
```

## Testing
Tests are written in javascript for the solidity tests.
```
truffle test
```

## Deployment
To run locally use:
```
truffle migrate --network development --reset
yarn serve
```

To deploy to Kovan set up a `mnomonic.js` in the root of the directory with the following structure:
```
module.exports = 'saddle ... YOUR SEE HERE ... pool';
```

Then migrate to Kovan using:
```
truffle migrate --network kovan --reset
```

## Additional Resources
- [Pitch Deck](XXX)
- [Figma Mockups](XXX)
- [DAI Daddy v1.0](https://github.com/diffusioncon/DAI-Daddy-MakerDAO)
