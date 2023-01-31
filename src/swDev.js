
export default function swDev(){
    // console.log("sw from tic tac toe")
let swUrl = `${process.env.PUBLIC_URL}/sw.js`
navigator.serviceWorker.register(swUrl).then((res)=>{
    console.log(res)
})
}