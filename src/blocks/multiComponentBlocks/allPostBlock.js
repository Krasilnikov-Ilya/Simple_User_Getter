import React from "react";
import CreateCarForm from "../cars/createCarForm";
import CreateUserForm from "../users/createUserForm";
import CreateHouseForm from "../houses/createHouseform";
import SettleUserToHomeForm from "../houses/settleUserToHomeForm";
import PlusUserMoneyForm from "../users/plusUserMoneyForm";
import BuyCarForm from "../users/buyCarForm";

/**
 * React-компонент, отвечающий за отображение всех форм создания POST запросов одновременно.
 */

export class AllPostBlock extends React.Component {

    render() {
        return (
            <div>
                <CreateUserForm/>
                <CreateCarForm/>
                <CreateHouseForm/>

                <SettleUserToHomeForm/>
                <PlusUserMoneyForm/>
                <BuyCarForm/>
            </div>
        )
    }
}

export default AllPostBlock