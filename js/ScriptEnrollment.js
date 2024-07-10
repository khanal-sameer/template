document.addEventListener('DOMContentLoaded', async function () {

    function extractCookie(...keys) {
      return document.cookie.split(";").filter(item => keys.some(key => item.includes(key))).reduce((acc, item) => {
        const [key, value] = item.trim().split("=")
        acc[key] = value
  
        return acc
      }, {})
    }
  
    const cookie = extractCookie('country', "locale");
    const country = window.country || cookie.country || 'us'
    const locale = window.locale || cookie.locale || 'en'
    const selector = '[data-product^="product_"]'

  
    const container = document.getElementById("enroll-pack")
    const containers = container.querySelectorAll(selector)

    const extractId = (id="") => id.split("_").pop()
    
    const fetchEnrollmentDetail = async (product_id) => {
  
      if (!product_id) return null
  
      const host = "https://app.neumi.com"
      const url = new URL(`${host}/api/v1/enrollment_packs/${product_id}?country_iso=${country}&language_iso=${locale}`)
  
      try {
        const res = await fetch(url)
        const data = await res.json()

        return data
      }
      catch {
        return null
      }
    }

    containers.forEach(async (element, index)=> {
        const productId = element.getAttribute("data-product")
        const id = extractId(productId);
    
        const data = await fetchEnrollmentDetail(id) || {}
        const { display_price: p, image_url, title, membership_products,subscription_products } = data;

        if(!p) return ;

        const sub =  subscription_products?.map(i=>i.title).join(",")

        let one_time = membership_products?.map(i=>i.title).join(",")
        one_time = (sub && one_time) ? one_time + " + " : one_time

        const des = one_time + sub



        const img = element.querySelector('.p-image')
        img.src = image_url

        const enroll = container.querySelector(`[data-product="enrollment_${id}"]`)

        const desc = enroll.querySelector('.p-desc')
        const name = enroll.querySelector('.p-title')
        const price = enroll.querySelector('.p-price')

        name.textContent = title;
        price.textContent = p
        desc.textContent = des


        if(containers.length === index + 1) container.classList.remove("is-hide")
    })
  })