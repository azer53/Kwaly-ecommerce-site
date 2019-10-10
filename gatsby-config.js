require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Commerce 2020`,
    description: `E-Commerce JAM starter with Gatsby as static site generator, utility based styling with Tailwind and deployment on Netlify. To be cloned to extend with API's and content management for E-commerce`,
    author: `Eli Colpaert`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
        {
      resolve: 'gatsby-background-image',
      options: {
        // add your own characters to escape, replacing the default ':/'
        specialChars: '/:',
      },
    },{
      resolve:`gatsby-plugin-sharp`,
      options: {
      defaultQuality: 90,
    },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-stripe`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Commerce 2020`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ['Product', 'Sku', 'Subscription'],
        secretKey: process.env.STRIPE_SECRET_KEY,
        downloadFiles: true,
      }
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        purgeOnly: [`src/css/style.css`]
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    }
  ],
}
