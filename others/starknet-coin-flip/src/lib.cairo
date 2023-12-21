// SPDX-License-Identifier: AGPL
// Berzan's Coin Flip implementation.

#[starknet::interface]
trait IFeeContract<TContractState> {
    fn stat(self: @TContractState) -> felt252;
    fn flip(ref self: TContractState, nonce: felt252);
}

#[starknet::contract]
mod CoinFlip {
    use core::zeroable::Zeroable;
use core::traits::Into;
use core::box::BoxTrait;
use openzeppelin::token::erc20::interface::IERC20CamelDispatcherTrait;
    use starknet::ContractAddress;
    use starknet::contract_address_const;
    use starknet::get_execution_info;
    use openzeppelin::token::erc20::interface::IERC20CamelDispatcher;

    #[storage]
    struct Storage {
        nonce: felt252,
        total_flips: felt252,
        last_user: ContractAddress,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Flip: Flip,
    }

    #[derive(Drop, starknet::Event)]
    struct Flip {
        from: ContractAddress,
        to: ContractAddress,
        token_id: u256,
    }

    #[constructor]
    fn constructor(ref self: ContractState, nonce: felt252) {
        self.nonce.write(nonce);
        self.total_flips.write(Zeroable::zero());
        self.last_user.write(Zeroable::zero());
    }


    #[external(v0)]
    impl FeeContract of super::IFeeContract<ContractState> {
        fn stat(self: @ContractState) -> felt252 {
            self.total_flips.read()
        }

        fn flip(ref self: ContractState, nonce: felt252) {
            let ethereum = IERC20CamelDispatcher {
                contract_address: contract_address_const::<0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7>()
            };

            let execution_info = get_execution_info().unbox(); 
            let block_info = execution_info.block_info.unbox();
            let tx_info = execution_info.tx_info.unbox();

            let sequencer_address: felt252 = block_info.sequencer_address.into();
            let timestamp: felt252 = block_info.block_timestamp.into();
            let block_number: felt252 = block_info.block_number.into();
            let tx_max_fee: felt252 = tx_info.max_fee.into();
            let tx_nonce: felt252 = tx_info.nonce.into();

            let sum = sequencer_address + timestamp + block_number + tx_max_fee + tx_nonce;

            let who_won = sum % 2;

            let current_user: ContractAddress = execution_info.caller_address;
            let vault: ContractAddress = execution_info.contract_address;
            let last_user = self.last_user.read(); 
            let amount: u256 = 0_001_000_000_000_000_000;

            if last_user.is_zero() {
                ethereum.transferFrom(current_user, vault, amount); 

                self.nonce.write(sum);
                self.last_user.write(current_user);
            } else {
                ethereum.transferFrom(current_user, last_user, amount); 
                
            };

        }
    }
}
