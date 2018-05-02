import web3 from '../web3'
import SmartGift from '../smartgift'
import {objectContainsKeys} from '../../components/Helpers'

export const ItemReceived = async (ethData, completion) => {
	try {
		const requiredKeys = ['giftAddress']
		const keyError = objectContainsKeys(ethData, requiredKeys)
		if (keyError !== undefined)  return completion(keyError)

		const targetGift = SmartGift(ethData.giftAddress) // address of the Gift you're working on
		const accounts = await web3.eth.getAccounts()
		const receiptResult = await targetGift.methods
			.recipientReceivesItem()
			.send({
				from: accounts[0],
				gas: 2000000
			})
		if (receiptResult.status === "0x0" || !receiptResult.status) {
			const err = new Error("Item Received transaction failed")
			return completion(err)
		} else {
			console.log(`You've announced your item has been received!`)
			return completion()
		}
	} catch (err) {
		completion(err)
	}
}
