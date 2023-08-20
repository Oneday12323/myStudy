export function CkEmail(){
    return 
}

export function CkPassWord(data){
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,15}$/
    return reg.test(data)
}