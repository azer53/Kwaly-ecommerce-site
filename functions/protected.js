exports.handler = async (event, context) => {
  /* Reading the context.clientContext will give us the current user */
  const authorized = context.clientContext && context.clientContext.user
  console.log("User authorized", authorized)
  if (!authorized) {
    console.log("No valid authorization! Request denied!")
    return {
      statusCode: 401,
      body: JSON.stringify({
        data: "NOT ALLOWED",
      }),
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Request granted`,
    }),
  }
}
