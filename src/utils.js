const getToday = () => {
    let today = new Date();
    let month = (today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)
    let date = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
    let result = today.getFullYear() + "-" + month + "-" + date;
    return result;
  }

/**
 * @param date 
 * @returns 오늘 날짜와 같으면 false, 아니라면 true
 */
module.exports.isDisabled = (date) => {
    let today = getToday();
    if(today === date){
        return false;
    }else{
        return true;
    }
} 

module.exports.getToday = () => {
    let today = new Date();
    let month = (today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)
    let date = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
    let result = today.getFullYear() + "-" + month + "-" + date;
    return result;
}