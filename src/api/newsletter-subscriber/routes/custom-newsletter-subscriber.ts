export default {
  routes: [
    {
      method: "POST",
      path: "/newsletter/subscribe",
      handler: "newsletter-subscriber.subscribe",
      config: {
        auth: {
          scope: ["api::newsletter-subscriber.newsletter-subscriber.create"],
        },
      },
    },
  ],
};
