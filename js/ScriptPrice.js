document.addEventListener('DOMContentLoaded', async function () {

  function extractCookie(...keys) {
    return document.cookie.split(";").filter(item => keys.some(key => item.includes(key))).reduce((acc, item) => {
      const [key, value] = item.trim().split("=")
      acc[key] = value

      return acc
    }, {})
  }

  const cookie = extractCookie('country');
  const country = window.country || cookie.country || 'us'

  const container = document.querySelector('.custom-landing-page')
  const product = container.getAttribute(["data-product"])

  const getCountryData = (variants = []) => {
    const variant = variants[0]

    if(!variant) return null
    
    const found = variant.variant_countries.find(c => c.country_iso.toLowerCase() === country)

    if(!found) return null;

    const { price, subscription_price: subPrice, currency_symbol: currency } = found;

    return { price, subPrice, currency }
  }

  const fetchVariantsDetail = async (product_id) => {

    if (!product_id) return null

    const host = "https://fluid.app"
    const url = new URL(`${host}/api/products/${product_id}`)

    try {
      const res = await fetch(url)
      const data = await res.json()

      if (!data) return null;

      return getCountryData(data.variants || [])
    }
    catch {
      return null
    }
  }

  const updateSave = (price, subPrice, currency) => {
    const saved = Number(price - subPrice).toFixed(2);
    const element = document.getElementById("saving")
    element.textContent = `${currency}${saved}`
  }

  const updateComponent = (price, subPrice) => {

    if(price){
      const oneTimePrice = document.getElementById("onetime_order_price")
     const oneTimePriceCross = document.getElementById("crossed_onetime_price")

      oneTimePrice.textContent = price
      oneTimePriceCross.textContent = price
    }
    if(subPrice){
      const subscriptionPrice = document.getElementById("subscribe_price")
      subscriptionPrice.textContent = subPrice
    }    

    const containers = document.getElementsByClassName("price_container")
    
    for(const element of containers){
      element.classList.remove("is-hide")
    }

  }

  const data = await fetchVariantsDetail(product)

  if(!data) return updateComponent();

  let { price, subPrice, currency } = data;

  price = Number(price).toFixed(2)
  subPrice = Number(subPrice).toFixed(2)
  updateSave(price, subPrice, currency)

  subPrice = currency + subPrice + '/{{month}}'
  price = currency + price

  updateComponent(price, subPrice)
})