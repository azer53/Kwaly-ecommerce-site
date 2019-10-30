import React from "react"

const BaseProduct = props => {
  const isOdd = value => {
    return value % 2 === 1
  }
  const baseProduct = props.product
  const skus = props.skus
  return (
    <div>
      <h3 className="text-3xl">{baseProduct.name}</h3>
      <table class="table-fixed my-8">
        <thead>
          <tr>
            <th class="w-1/2 px-4 py-2">Sku Id</th>
            <th class="w-1/4 px-4 py-2">Initial Stock</th>
            <th class="w-1/4 px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {skus.map((item, index) => {
            const sku = item.node
            return (
              <tr className={isOdd(index) ? "bg-gray-100" : ""}>
                <td class="border px-4 py-2"> {sku.attributes.size}</td>
                <td class="border px-4 py-2">{sku.inventory.quantity}</td>
                <td class="border px-4 py-2">{sku.price / 100}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default BaseProduct
