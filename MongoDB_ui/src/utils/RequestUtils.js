/**
 * Created by kazimunalan on 31/10/2017.
 */
import axios from "axios";
import Toast from "pre-toast/lib/Toast";


export const RequestUtils = {

    getRequest(path){
        let datas = [];
        axios.get(path)
            .then(response => {
                datas = response.data;
                return datas;
            })
            .catch(response => {
                //this.__handleError(jqXHR, errorThrown, error)
                console.log("Veriler gelmedi")
            });

    },

    __handleError(jqXHR, errorThrown, error){
        if (jqXHR.status === 401)
            Toast.error("Authorization not found.");
        else if (jqXHR.status === 403)
            Toast.error("Authentication not found.");
        else if (jqXHR.status === 200) {
            //do nothing
        }
        else {
            if (error)
                error(jqXHR, errorThrown);
            else
                Toast.error("Something went wrong.");
        }
    }

}
export default RequestUtils;
