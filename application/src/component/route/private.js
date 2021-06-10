import { Route, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import util from '../../util/util';
import PropTypes from 'prop-types';
import { logout } from '../../store/action/profile.action';

const PrivateRoute = ({component: Component, ...rest}) => {

    var checkForLogin = (current_user) => current_user && current_user._id;

    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => {
            if 
            (   rest.decoded == undefined || 
                !checkForLogin(rest.decoded) 
            ) 
                rest.logoutapp();
            return (
                rest.decoded != undefined ?
                    <Component {...props} />
                : <Redirect to="/signin" />
            )
        }} />
    );
};

PrivateRoute.propTypes = {
    decoded: PropTypes.object,
    logoutapp: PropTypes.func.isRequired
};
  
const mapStateToProps = (state) => {
    return {
        decoded: util.verifyToken(state.profile.token, true),
        user: state.profile.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutapp: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);