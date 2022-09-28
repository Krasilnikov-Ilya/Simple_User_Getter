import React from "react";
import CreateCarForm from "../../blocks/cars/createCarForm";
import PostUser from "../users/postUser";
import CreateHouseForm from "../../blocks/houses/createHouseform";
import PostUserHouse from "./postUserHouse";
import PostUserMoney from "../users/postUserMoney";
import PostUserCar from "./postUserCar";

/**
 * React-компонент, отвечающий за отображение всех форм создания POST запросов одновременно.
 */

export class AllPostBlock extends React.Component {

    render() {
        return (
            <div>
                <PostUser/>
                <PostUserMoney/>
                <PostUserHouse/>

                <PostUserCar/>
                <CreateCarForm/>
                <CreateHouseForm/>


            </div>
        )
    }
}

export default AllPostBlock
