const api_key="6fb49c1151msh4b776f1ab7020b1p1912c5jsn99503b8a9e46"
const price_node1=document.querySelector('.price1');
const price_node2=document.querySelector(".price2");
const price_node3=document.querySelector(".price3");
const name_node1=document.querySelector('.name1');
const name_node2=document.querySelector(".name2");
const name_node3=document.querySelector(".name3");
const symb_node1=document.querySelector('.symb1');
const symb_node2=document.querySelector(".symb2");
const symb_node3=document.querySelector(".symb3");

const diff_node1=document.querySelector("#diff1");
const diff_node2=document.querySelector("#diff2");
const diff_node3=document.querySelector("#diff3");

const diff_node=document.querySelectorAll('.diff')

// const data=[-10,5,-5]
// // var temp=0;
// for(i=0;i<diff_node.length;i++){
//     if(data[i]<0){
//         diff_node[i].style.background='red'
//         diff_node[i].innerHTML=data[i];
//     }
//     diff_node[i].innerHTML=data[i];
//     // temp++;
// }


// const url = `https://yahoo-finance127.p.rapidapi.com/search/${company_name}/price/eth-usd`;
const url = 'https://yahoo-finance127.p.rapidapi.com/multi-quote/sbux,aapl,msft'
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': api_key,
		'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
	}
};

async function price(){
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        update_price(result)
    } catch (error) {
        console.error(error);
    }
}


function update_price(result){
    console.log(result);
    price_node1.innerHTML=`$${result[0].ask['fmt']}`;
    price_node2.innerHTML=`$${result[1].ask['fmt']}`;
    price_node3.innerHTML=`$${result[2].ask['fmt']}`;
    name_node1.innerHTML=result[0].shortName;
    name_node2.innerHTML=result[1].shortName;
    name_node3.innerHTML=result[2].shortName;
    symb_node1.innerHTML=result[0].symbol;
    symb_node2.innerHTML=result[1].symbol;
    symb_node3.innerHTML=result[2].symbol;
    for(i=0;i<3;i++){
        if(result[i].regularMarketChange['fmt']<0){
            diff_node[i].style.background='red'
            diff_node[i].innerHTML=result[i].regularMarketChange['fmt']
        }
        else{
            diff_node[i].innerHTML=result[i].regularMarketChange['fmt']
        }
    }

}


let today_date
function get_date(){
    const date=new Date()
    let day=date.getDate();
    let month=date.getMonth()+1;
    let year=date.getFullYear();
    if(month>=10){
        today_date=`${day}-${month}-${year}`
    }
    today_date=`${day}-0${month}-${year}`
    const date_node=document.getElementById('datemonth').innerHTML=today_date;
}



const symbol_node=document.querySelector('#symbol');
const down_node=document.querySelector('.drop_down');


symbol_node.addEventListener('click',()=>{
    if (down_node.style.display==='none'){
        down_node.style.display='block';
    }
    else{
        down_node.style.display='none';
    }
})



document.addEventListener('DOMContentLoaded',get_date)
document.addEventListener('DOMContentLoaded',price)







    
