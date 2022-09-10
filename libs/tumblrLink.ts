// TODO:絶対もっといいやり方ある
export const addAgentToHtml = () => {
  {
    const userAgent = window.navigator.userAgent.toLowerCase()
    //モバイルの時
    if (
      userAgent.includes('iphone') ||
      userAgent.includes('ipad') ||
      userAgent.includes('android')
    ) {
      document.querySelector('html')?.classList.add('mobile')
    } else {
      document.querySelector('html')?.classList.add('desktop')
    }
    userAgent.includes('android') && document.querySelector('html')?.classList.add('android')
    // userAgent.indexOf('gecko') !== -1 &&
    //   document.querySelector('html')?.classList.add('gecko');
    /**スマホでアクセスした時tumblrへのリンクをアプリから開くリンクに書き換え*/
    document
      .querySelector('.mobile .tumblr')
      ?.setAttribute(
        'href',
        `http://www.tumblr.com/open/app?app_args=blog&blogName=${process.env.NEXT_PUBLIC_Tumblr_username}&page=blog`
      )
  }
}
