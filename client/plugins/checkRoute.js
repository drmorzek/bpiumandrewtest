var url = require('url');

export default async (context) => {


  const {
    app,
    store,
    route,
    params,
    query,
    env,
    isDev,
    isHMR,
    redirect,
    error,
    $config
  } = context
  // Server-side
  // if (process.server) {
    const {
      req,
      res,
      beforeNuxtRender
    } = context
  // }
  // Client-side
  // if (process.client) {
    const {
      from,
      nuxtState
    } = context
  // }

  // console.log(app);
  // console.log(app.context.ssrContext.req)
  // try {
  //   let requrl = app.context.ssrContext.req.url;
  //   let parseUrl = (requrl.split('?')[1] !== undefined) ? url.parse(requrl, true).query : requrl;


  //   console.log(parseUrl)
  // } catch (e) {
  //   console.log(e.message)
  // }

}
