import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { toggleDrawer, selectRequest } from '../redux/actions'

import CardPage from '../components/CardPage'

import CharityCard from '../components/CharityCard'
import {MerchantPreButtons, MerchantActionButtons, MerchantPostButtons} from '../components/CardComponents'
import CharityDonationDrawer from '../components/CharityDonationDrawer'
import { ImageLibrary } from '../components/ImageLibrary'

import "../style/DonorHome.css"

class MerchantHome extends Component {

	render() {
		const storeState = this.props.store.getState()
		const selectDonate = (request) => () => {
			this.props.showRequest(true, request)
		}
		const learnMore = (request) => () => {
			this.props.history.push({
			pathname: "/gift/" + request.id,
			state: {request}}
			)
		}

		const requests = storeState.requests
		const cards = requests.map((r, i) => {
			return (
			<CharityCard key={i}
				title={r.charity.title}
				description={r.summary}
				image={ImageLibrary(r.charity.image)}
				onImageClick={learnMore(r)}
				preButtons={MerchantPreButtons(r)}
				buttons={MerchantActionButtons(learnMore(r), selectDonate(r))}
				postButtons={MerchantPostButtons(r)}
			/>)
		})

		const drawerRequest = () => {
			if (Object.keys(storeState.selectedRequest).length === 0) {
				return undefined
			}
			return storeState.selectedRequest
		}
		const drawer = <CharityDonationDrawer store={this.props.store} request={drawerRequest()}/>

		return (
			<CardPage cards={cards} drawer={drawer}/>
		)
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		showRequest: (showDrawer, request={}) => {
			dispatch(selectRequest(request))
			dispatch(toggleDrawer(showDrawer))
		}
	}
}

MerchantHome = connect(
	null,
	mapDispatchToProps
)(MerchantHome)

export default withRouter(MerchantHome)


