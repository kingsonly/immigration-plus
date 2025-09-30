export default {
  routes: [
    {
      method: "GET",
      path: "/resources/slug/:slug",
      handler: "resource.findOneBySlug",
      config: {
        auth: false,
      },
    },
  ],
};
