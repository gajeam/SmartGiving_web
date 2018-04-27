import { createStore, combineReducers } from 'redux'
import { updateDrawer, updateNewGift, globalData } from './redux/reducers'

import data from './data/user'
import requests from './data/requests'


const initialState = {
	updateDrawer: {
		donationDrawerOpen: false,
		donationValue: undefined,
		selectedRequest: {},
	},
	updateNewGift: {
		giftData: {},
	},
	globalData: {
		...data,
		recipients: requests['recipients']
	}
}

export const store = createStore(
	combineReducers({
		updateDrawer,
		updateNewGift,
		globalData
	}),
	initialState
)