export default function MoneyFormat(number = 0) {
    return number.toLocaleString('id-ID', {
        style: 'currency', 
        currency: 'IDR'
    });
}