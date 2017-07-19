import Get from './Get'
import { setCommonData } from '../actions'

const get = new Get()


export const getCommonData = async(dispatch) => {

	const data = await get.commonData()
	
	dispatch(setCommonData(data))
}