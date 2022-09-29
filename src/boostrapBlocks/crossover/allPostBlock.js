import React from "react";
import PostCar from "../cars/postCar";
import PostUser from "../users/postUser";
import PostHouse from "../houses/postHouse";
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
                <PostCar/>
                <PostHouse/>


            </div>
        )
    }
}

export default AllPostBlock
