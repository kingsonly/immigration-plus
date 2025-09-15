export default {
  routes: [
    {
      method: "GET",
      path: "/services/:slug",
      handler: "service.findOneBySlug",
      config: {
        auth: false,
      },
    },
  ],
};
