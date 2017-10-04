/*
 Core UI logic.
 Submit order and resource.
 */

$(document).ready(() => {
  // Add a resource to the blg hub
  $('#submitResource').click(e => {
    e.preventDefault()

    const resourceUrl = $('#resourceUrl').val()

    // Confirm valid input, url and url in correct format
    if (!resourceUrl) {
      $('#urlIncorrectModal').modal('show')

    // Valid, submit resource
    } else if (isUrlValid(resourceUrl)) {
      window.hub.addResource(
        resourceUrl,
        {
          from: window.defaultAccount,
          gas: 4e6
        },
        (err, res) => {
          if (err) console.log(err)
          console.log(res)
        }
      )

    } else {
      $('#urlIncorrectModal').modal('show')
    }
  })

  $('#submitOrder').click(e => {
    e.preventDefault()

    const offerToken = $('#offerToken').val()
    const offerAmount = $('#offerAmount').val()
    const wantToken = $('#wantToken').val()
    const wantAmount = $('#wantAmount').val()

    if (offerAmount <= 0 || wantAmount <= 0) {
      alert('Invlaid input, amounts must be > 0.')
      return

    } else if (wantToken === offerToken) {
      alert('Want and offer token may not be the same!')
      return
    }

    // If offer token is eth send the ether to the exchange contract
    if (offerToken === 'ETH') {
        submitOrder(offerToken, offerAmount* 10**18, wantToken, wantAmount, offerAmount * 10**18) // convert to ether

    // If the offer token is not eth and therefore some other ERC20 token approve
    // the exchange to spend on sender's behalf
    } else if (offerToken === 'BLG') {
      // Need to check token balance TODO move verification on chain
      window.blgToken.balanceOf(window.defaultAccount, (error, balance) => {
        if (balance.toNumber() < offerAmount) {
          alert('Insufficient token balance!')

        } else {
          window.blgToken.approve(
            window.exchange.address,
            offerAmount,
            {
              from: window.defaultAccount,
              gas: 4e6
            }, (error, tx) => {
              if (error) {
                console.error(error)
              } else {
                console.log(tx)
                submitOrder(offerToken, offerAmount, wantToken, wantAmount * 10**18, 0)
              }
            }
          )
        }
      })
    }
  })
})

/**
 * Submit the actual order to the order book.
 * @param  {String} offerToken  The address of the token contract offered.
 * @param  {Number} offerAmount The amount of tokens offered.
 * @param  {String} wantToken  The address of the token contract wanted.
 * @param  {Number} wantAmount The amount of tokens wanted.
 * @param  {Number} value The ether value to send along with the tx. Used in the case
 * when offering ether to transfer the value to the exchange to broker the trade.
 */
function submitOrder(offerToken, offerAmount, wantToken, wantAmount, value) {
  window.exchange.submitOrder(
    window.approvedTokens[offerToken],
    offerAmount,
    window.approvedTokens[wantToken],
    wantAmount,
    {
      from: window.defaultAccount,
      gas : 4e6,
      value: value
    }, (error, tx) => {
      if (error)
        console.error(error)
      else
        console.log(tx)
    }
  )
}

/**
 * Helper to validate the format of a url.
 * @param  {String}  url The url being checked.
 * @return {Boolean}  Vailidity of the formatting of a url.
 */
function isUrlValid (url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}
