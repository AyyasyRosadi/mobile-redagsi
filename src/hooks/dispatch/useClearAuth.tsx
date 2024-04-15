import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '../../store'
import { authActions } from '../../store/slices/auth'

export default function useClearAuth(): { payload: undefined; type: "auth/clearAuth" } {
    const dispatch = useDispatch<AppThunkDispatch>()
    return dispatch(authActions.clearAuth())
}
