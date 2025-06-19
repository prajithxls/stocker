async function price() {
    try {
        const response = await fetch('https://your-backend-url/api/stock/quotes');
        const result = await response.json();
        update_price(result);
    } catch (error) {
        console.error(error);
    }
}

function update_price(result) {
    const price_nodes = [
        document.querySelector('.price1'),
        document.querySelector('.price2'),
        document.querySelector('.price3'),
        document.querySelector('.price4')
    ];

    const name_nodes = [
        document.querySelector('.name1'),
        document.querySelector('.name2'),
        document.querySelector('.name3'),
        document.querySelector('.name4')
    ];

    const symb_nodes = [
        document.querySelector('.symb1'),
        document.querySelector('.symb2'),
        document.querySelector('.symb3'),
        document.querySelector('.symb4')
    ];

    const diff_nodes = [
        document.querySelector('#diff1'),
        document.querySelector('#diff2'),
        document.querySelector('#diff3'),
        document.querySelector('#diff4')
    ];

    for (let i = 0; i < 4; i++) {
        const data = result[i];
        if (!data) continue;

        price_nodes[i].textContent = `${data.currency === "INR" ? "₹" : "$"}${data.ask.fmt}`;
        name_nodes[i].textContent = data.shortName;
        symb_nodes[i].textContent = data.symbol;

        const diff = data.regularMarketChange.fmt;
        diff_nodes[i].textContent = diff;

        if (parseFloat(diff) < 0) {
            diff_nodes[i].style.backgroundColor = "red";
        } else {
            diff_nodes[i].style.backgroundColor = "rgb(33, 232, 46)";
        }
    }
}


function get_date() {
    fetch('/api/stock/date')
        .then(response => response.json())
        .then(data => {
            document.getElementById('datemonth').textContent = data.today_date;
        });
}

document.addEventListener('DOMContentLoaded', get_date);
document.addEventListener('DOMContentLoaded', price);
