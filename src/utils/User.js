import React from "react";
import PropTypes from "prop-types";

class User extends React.Component {
    render() {
        const { userId, firstName, secondName, age, sex, money, isLoading } = this.props;
        const userDetails = (
            <div className="user-details">
                <span className="id-user">ID:{userId} </span>
                <span> First name: {firstName}; </span>
                <span> Last name: {secondName}; </span>
                <span> Age: {age}; </span>
                <span> Sex: {sex}; </span>
                <span> Money: {money}; </span>
            </div>
        );
        const loadingMessage = <span className="d-flex m-auto">Loading...</span>;
        return (
            <div>
                {isLoading ? loadingMessage : userDetails}
            </div>
        );
    }
}
User.propTypes = {
    userId: PropTypes.string,
    firstName: PropTypes.string,
    secondName: PropTypes.string,
    age: PropTypes.string,
    sex: PropTypes.string,
    money: PropTypes.string,
    isLoading: PropTypes.bool
};
export default User;