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
    const selector = '[id^="{{selector}}"]';


    const containers = document.querySelectorAll(selector)
    // const product = container.getAttribute(["data-product"])

    const extractId = (id="") => id.split("_").pop()

    const getCountryData = (variants = []) => {
      const variant = variants[0]

      if(!variant) return null

      const found = variant.variant_countries.find(c => c.country_iso.toLowerCase() === country)

      if(!found) return null;

      const { display_price: price, display_wholesale_price: subPrice } = found;

      return { price, subPrice }
    }

    const fetchVariantsDetail = async (product_id) => {

      if (!product_id) return null

      const host = "https://fluid.app"
      const url = new URL(`${host}/api/products/${product_id}`)

      try {
        const res = await fetch(url)
        const data = await res.json()

        if (!data) return null;

        const {price,subPrice} = getCountryData(data.variants || []) || {}
        const {image_url, title} = data;

        return { price, subPrice, image_url, title }
      }
      catch {
        return null
      }
    }

    containers.forEach(async (element)=> {
        const id = extractId    (element.id);
        const data = await fetchVariantsDetail(id) || {}
        const { price: p, image_url, title} = data;

        if(!p) return ;

        const img = element.querySelector('.p-image');
        const bg_image = element.querySelector('.bg-image')
        const name = element.querySelector('.p-name')
        const price = element.querySelector('.p-price')
        if( img != null){
          img.src = image_url
        }
        if(bg_image != null){
          bg_image.style.backgroundImage = `url(${image_url})`
        }
        name.textContent = title;
        price.textContent = p

        element.classList.remove('is-hide')
    })
  })