//  Store the previous card data for later retrieval.
var previouscard;

/**
 * Returns the previous Card ui
 */
function Return(){
    const cardsContainer = $('#Cards');
    cardsContainer.empty();
    console.log('Returning');
    cardsContainer.append(previouscard);
    previouscard = null;
    zingchart.exec('chart','destroy')
}

/**
 * Store the previous card data before switching to hourly data.
 */
function previousCard(){
    previouscard = $('#Cards').html();
}
  